/**
 * ==================================================================================
 * Additional Mathematical function not included on the `Math` class
 *
 * ==================================================================================
 **/

export default class Math2 {

    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Get `x` & `y` coordinates using Quadratic Bezier curve
     * @param  Vector2 point  Vector2 object to update
     * @param  Vector2 p0     starting point
     * @param  Vector2 p1     control point
     * @param  Vector2 p2     end point
     * @param  float   t      fractional value along the length of the line (0 <= t <= 1)
     */
    static quadraticBezier(point, p0, p1, p2, t) {
        point.x = Math.pow(1 - t, 2) * p0.x +
                  (1 - t) * 2 * t * p1.x +
                  t * t * p2.x;

        point.y = Math.pow(1 - t, 2) * p0.y +
                  (1 - t) * 2 * t * p1.y +
                  t * t * p2.y;
    }

    /**
     * Get `x` & `y` coordinates using Cubic Bezier curve
     * @param  Vector2 point  Vector2 object to update
     * @param  Vector2 p0     starting point
     * @param  Vector2 p1     control point 1
     * @param  Vector2 p2     control point 2
     * @param  Vector2 p3     end point
     * @param  float   t      fractional value along the length of the line (0 <= t <= 1)
     * @param  Vector2 pFinal
     * @return Vector2
     */
    static cubicBezier(point, p0, p1, p2, p3,  t) {
        point.x = Math.pow(1 - t, 3) * p0.x +
                  Math.pow(1 - t, 2) * 3 * t * p1.x +
                  (1 - t) * 3 * t * t * p2.x +
                  t * t * t * p3.x;

        point.y = Math.pow(1 - t, 3) * p0.y +
                  Math.pow(1 - t, 2) * 3 * t * p1.y +
                  (1 - t) * 3 * t * t * p2.y +
                  t * t * t * p3.y;
    }


    /**
     * Random number from `min` to `max`
     * @param  {int}   min
     * @param  {int}   max
     * @param  {bool}  roundOf
     * @return {int|float}
     */
    static randomInt(min, max, roundOf = true) {
        let equal = min + Math.random() * (max - min);

        return roundOf ? Math.floor(equal) : equal;
    }

    /**
     * Linear Interpolation
     * Get the value between `min` & `max` depending on the `t` value
     * @param  {float|int} t
     * @param  {float|int} min
     * @param  {float|int} max
     * @return {float|int}
     */
    static lerp(t, min, max) {
        return (max - min) * t + min;
    }

    /**
     * Returns a number whose is limited to the `min` & `max` value
     * @param  {float|int} value
     * @param  {float|int} min
     * @param  {float|int} max
     * @return {float|int}
     */
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * Get percent of specified element
     * @param {value}  value
     * @param {float}  percent
     */
    static percentOf(value, percent) {
        return value * (percent / 100);
    }

    /**
     * Convert radians to degrees
     * @param  int|float radian
     * @return int|float
     */
    static radianToDegrees(radian) {
        return (radian * 180) / Math.PI;
    }

    /**
     * Convert degrees to radians
     * @param  int|float degree
     * @return int|float
     */
    static degreeToRadians(degree) {
        return (degree * Math.PI) / 180;
    }

    /**
     * Check if `value` is in range of `min` and `max` value
     * @param  int value
     * @param  int min
     * @param  int max
     * @return boolean
     */
    static inRange(value, min, max) {
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    }

    /**
     * Check if the range intersects w/ another range (`min` and `max`)
     * @param  int min0
     * @param  int max0
     * @param  int min1
     * @param  int max1
     * @return boolean
     */
    static rangeIntersect(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) &&
               Math.min(min0, max0) <= Math.max(min1, max1);
    }
}