/**
 * ==================================================================================
 * Particle class
 *
 * ==================================================================================
 **/

import { OPTIONSTATE } from '../states/OptionState.js';
import { PARTICLEATTR } from '../attributes/ParticleAttr.js';

import Math2 from '../libs/Math2.js';
import Vector2 from '../libs/Vector2.js';

export default class Particle {

    constructor(context, x, y, speed = 0, direction = 0) {
        this.context = context;
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 0);

        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);


        this.init();
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    init() {
        /* Set default collections */
        this.springs = [];

        /* Set default values */
        this.radius = PARTICLEATTR.density / 2;
        this.friction = null;

        this.color = this.getColor();
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Add a force vector pushing the element away from the specified point
     * @param {Vector2} point
     * @param {int}     force
     */
    repulseTo(point, force) {
        /* Get the vector and distance from the point */
        let distVec = this.distanceTo(point),
            repulseVec = new Vector2(distVec.x, distVec.y),
            repulseAngle = repulseVec.getAngle(),
            /* Calculate force */
            repulseForce = force / distVec.distance;


        /* Add the `repulse` force to the velocity */
        this.velocity.x += Math.cos(repulseAngle) * repulseForce;
        this.velocity.y += Math.sin(repulseAngle) * repulseForce;
    }

    /**
     * Get distance to point
     * @param  {Vector2} point
     * @return {Integer}
     */
    distanceTo(point) {
        let dX = point.x - this.position.x,
            dY = point.y - this.position.y,
            distance = Math.sqrt(dX * dX + dY * dY);

        return {
            x: dX,
            y: dY,
            distance: distance
        };
    }

    /**
     * Add `spring` point object to collection
     * @param {int} point
     * @param {int} k
     * @param {int} length
     */
    addSpring(point, k, length) {
        /* Prevent duplicate on collection */
        this.removeSpring(point);
        this.springs.push({
                point: point,
                k: k,
                length: length
            });
    }

    /**
     * Remove `spring` point object to collection
     * @param {int} point
     */
    removeSpring(point) {
        for(var i = 0; i < this.springs.length; i++) {
            if(point === this.springs[i].point)
                return this.springs.splice(i, 1);
        }
    }

    /**
     * Adds in a `spring` force vector toward the `p2` element to the `velocity` vector
     * @param {int} point
     * @param {int} k
     * @param {int} length
     */
    springTo(point, k, length) {
        /**
         * Calculate `spring force` (`f = kx`)
         *
         * `f` = Force
         * `k` = Spring stiffness
         * `x` = Distance
         */
        /* Get distance vector of `spring point` to object */
        let distance = point.subtract(this.position);
        /* Move `spring point` by the `offset` value */
        distance.setLength(distance.getLength() - length);

        /* `f = kx` */
        let springForce = distance.multiply(k);


        /* Add `spring` force to the velocity */
        this.velocity.addTo(springForce);
    }


    /**
     * Add in all `spring` force vector to the velocity
     */
    handleSpring() {
        for(var i = 0; i < this.springs.length; i++) {
            let spring = this.springs[i];
            this.springTo(spring.point, spring.k, spring.length);
        }
    }


    update() {

        /* Add the `spring` forces to the velocity */
        this.handleSpring();


        /* Subtract friction to current velocity */
        if(this.friction) {
            this.velocity.multiplyBy(this.friction);
        }


        /* Add velocity to current position */
        this.position.addTo(this.velocity);
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Draw a ball
     */
    drawBall() {
        this.context.fillStyle = this.color;

        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        this.context.fill();
    }

    draw() {
        this.drawBall();
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get random color
     * @return {String}
     */
    getColor() {
        return OPTIONSTATE.isRandomColor ?
                    this.getRandomizeColor() :
                    this.getDefaultColor();
    }

    /**
     * Get default color
     * @return {String}
     */
    getDefaultColor() {
        return PARTICLEATTR.color;
    }

    /**
     * Get randomize color
     * @return {String}
     */
    getRandomizeColor() {
        let colors = PARTICLEATTR.getColors();
        return colors[Math2.randomInt(0, colors.length - 1)];
    }
}