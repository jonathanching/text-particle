/**
 * ==================================================================================
 * Word element
 *
 * ==================================================================================
 **/

import { UTILS } from '../libs/Utils.js';

import { OPTIONSTATE } from '../states/OptionState.js';
import { STAGESTATE } from '../states/StageState.js';
import { PARTICLEATTR } from '../attributes/ParticleAttr.js';
import { MOUSEATTR } from '../attributes/MouseAttr.js';

import Vector2 from '../libs/Vector2.js';
import Particle from './Particle.js';
import Spring from './Spring.js';

export default class Word {

    constructor(canvas, context) {
    	this.canvas = canvas;
    	this.context = context;

        this.particles = [];

    	this.init();
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Initial setup
     */
    init() {
        this.setupField();
        this.setupControls();
    }


    /**
     * Setup word and input field
     */
    setupField() {
        this.wordField = document.getElementById('wordField');

        /* Set initial text value */
        this.text = this.wordField.value;

        /* Bind change event on `text` field */
        this.wordField.addEventListener('change', (event) => {
            this.setText(event.target.value);
        });
    }

    /**
     * Setup controls
     */
    setupControls() {
        /* Bind mouse `hover` events */
        this.bindMouseEvent('mousemove');
        this.bindMouseEvent('touchmove');
    }


    /**
     * Create `Particle` element
     * @param  {int} x
     * @param  {int} y
     */
    createParticle(x, y) {
        let particle = new Particle(this.context, x, y);

        /* Set needed values */
        particle.friction = PARTICLEATTR.friction;
        /* Attach to initial position */
        let spring = new Spring(x, y, PARTICLEATTR.stiffness, PARTICLEATTR.offset);
        particle.addSpring(spring.position, spring.stiffness, spring.offset);

        this.particles.push(particle);
    }

    /**
     * Bind controls to a mouse listener
     * @param  {String} eventName
     */
    bindMouseEvent(eventName) {
        this.canvas.addEventListener(eventName, (event) => {
            this.setMouseCoords(event);
        });
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Trace the word drawn on the canvas and replaced with `Particle` elements
     */
    populateParticles() {
        /* Draw the `text` only once */
        this.drawText();

        /* Fetch the canvas image */
        let img = this.getImageData();
        /* Get the `Particle` coordinates from the image */
        this.updateCoordinates(img);


        STAGESTATE.populated();
    }


    /**
     * Handle mouse radius collision to all particles
     */
    handleMouseCollision() {
        for(var i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            if(this.checkParticleCollision(p))
                p.repulseTo(this.getMouseCoords(), MOUSEATTR.force);
        }
    }


    /**
     * Update `Particle` coordinates
     * @param  {Image} image
     */
    updateCoordinates(image) {
        /* Clear all particles */
        this.particles = [];

        /* Loop through the image data */
        for(var y = 0; y < this.canvas.height; y += PARTICLEATTR.density) {
            for(var x = 0; x < this.canvas.width; x += PARTICLEATTR.density) {
                /* Get the alpha element (4th element) on the RGBA array */
                let opacity = image.data[((x + (y * this.canvas.width)) * 4 + 3)];
                /* Check opacity */
                if(opacity > 0)
                    this.createParticle(x, y);
            }
        }
    }


    /**
     * Run 'update' function on specified collection
     * @param {array} collection
     */
    updateCollection(collection) {
        for(var i = 0; i < collection.length; i++) {
            collection[i].update();
        }
    }

    update() {
        this.handleMouseCollision();

        this.updateCollection(this.particles);
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    /**
     * Draw the `text`
     */
    drawText() {
        this.context.save();

        this.context.fillStyle = "#000000";
        this.context.font = OPTIONSTATE.getFontStyle() + " 250px Arial";

        /* Position the `text` at the center of the screen */
        let textSize = this.context.measureText(this.text),
            textHeight = -20;
        this.context.translate((this.canvas.width / 2) - (textSize.width / 2), this.canvas.height / 2);
        this.context.fillText(this.text, 0, textHeight);

        this.context.restore();
    }

    /**
     * Run 'draw' function on specified collection
     * @return {array} collection
     */
    drawCollection(collection) {
        for(var i = 0; i < collection.length; i++) {
            collection[i].draw();
        }
    }

    draw() {
        this.drawCollection(this.particles);
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Set `text` value
     * @param {String} text
     */
    setText(text) {
        if(text == this.text) return;

        this.text = text;
        /* Update drawn `text` */
        STAGESTATE.populated(false);
    }

    /**
     * Get mouse coordinates
     * @return {Vector2}
     */
    getMouseCoords() {
        return new Vector2(this.mouseX, this.mouseY);
    }

    /**
     * Set mouse coordinates
     * @param {MouseEvent} event
     */
    setMouseCoords(event) {
        let coords = this.getEventMouseCoords(event);
        this.mouseX = coords.x - this.canvas.offsetLeft,
        this.mouseY = coords.y - this.canvas.offsetTop;
    }

    /**
     * Get the mouse coordinate
     * @param  {MouseEvent}  event
     * @return {Object}
     */
    getEventMouseCoords(event) {
        return {
            x: this.isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
            y: this.isTouchEvent(event) ? event.touches[0].clientY : event.clientY
        };
    }

    /**
     * Get canvas image data
     * @return {Image}
     */
    getImageData() {
        return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Check particle collision
     * @param {Particle} c1
     */
    checkParticleCollision(c1) {
        /* Check if the distance of the circles is less than the total radius of both circles */
        let distVec = c1.distanceTo(this.getMouseCoords());
        if(distVec.distance <= c1.radius + MOUSEATTR.radius)
            return true;

        return false;
    }

    /**
     * Check if `touch` event
     * @param  {MouseEvent}  event
     * @return {Boolean}
     */
    isTouchEvent(event) {
        return event.type === 'touchmove' || event.type === 'touchstart';
    }
}
