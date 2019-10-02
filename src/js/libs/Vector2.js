/**
 * ==================================================================================
 * Vector2 class
 *
 * ==================================================================================
 **/

export default class Vector2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Reset values of `x` and `y` to 0
     */
    clear() {
        this.x = 0;
        this.y = 0;
    }

    /**
     * Normalize vector and return a new `Vector2` instance
     */
    normalize() {
        let length = this.getLength();

        if(length > 0) {
            this.x = this.x / length;
            this.y = this.y / length;
        }
    }


    /**
     * Add or subtract the `Vector2` parameter and return as a new `Vector2` instance
     * @param  Vector2 vector2
     * @return Vector2
     */
    add(vector2) {
        return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }

    subtract(vector2) {
        return new Vector2(this.x - vector2.x, this.y - vector2.y);
    }

    /**
     * Multiply or divide the `Vector2` parameter and return as a `Vector2` new instance
     * @param  int val
     * @return Vector2
     */
    multiply(value) {
        return new Vector2(this.x * value, this.y * value);
    }

    divide(value) {
        return new Vector2(this.x / value, this.y / value);
    }

    /**
     * Add or subtract the `Vector2` parameter
     * @param Vector2 vector2
     */
    addTo(vector2) {
        this.x += vector2.x;
        this.y += vector2.y;
    }

    subtractTo(vector2) {
        this.x -= vector2.x;
        this.y -= vector2.y;
    }

    /**
     * Multiply or divide to the value parameter
     * @param int val
     */
    multiplyBy(val) {
        this.x *= val;
        this.y *= val;
    }

    divideBy(val) {
        this.x /= val;
        this.y /= val;
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Set vector angle
     */
    setAngle(angle) {
        let length = this.getLength();

        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    /**
     * Get vector angle
     */
    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Set vector length
     */
    setLength(length) {
        let angle = this.getAngle();

        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    /**
     * Get vector length
     */
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}