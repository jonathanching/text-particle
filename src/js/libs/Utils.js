/**
 * ==================================================================================
 * Collection of helper utils methods
 *
 * ==================================================================================
 **/

class Utils {

    constructor() {
        //
    }


    /**
     * ==================================================================================
     * @Colors
     * ==================================================================================
     **/

    /**
     * Convert RGB to Color object
     * @param  {int} r Red
     * @param  {int} g Green
     * @param  {int} b Blue
     * @param  {int} a Alpha
     * @return {BABYLON.Color}
     */
    rgbToColor(r, g, b, a = null) {
        if(a != null)
            return new BABYLON.Color4(r / 255, g / 255, b / 255, a);

        return new BABYLON.Color3(r / 255, g / 255, b / 255);
    }

    /**
     * Get alpha value from pixel data
     * @param  {Image.Data} pixels
     * @param  {int}        i
     * @return {int}
     */
    getAlphaFromPixel(pixels, i) {
        return pixels[i * 4 + 3];
    }


    /**
     * ==================================================================================
     * @Arrays
     * ==================================================================================
     **/

    /**
     * Get object from specified array
     * @param  {array}  name
     * @param  {string} name
     * @return {obj}
     */
    getFromArrByName(arr, name, collection = false) {
        let result = collection ? [] : null;
        for(var i = 0; i < arr.length; i++) {
            let item = arr[i];

            if(item.name && item.name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
                if(!collection)
                    return item;

                result.push(item);
            }
        }

        return result;
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Check if specified value is an object
     * @param  {mixed}  value
     * @return {boolean}
     */
    isObject(value) {
        let type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }
}



export const UTILS = new Utils();
export default UTILS;