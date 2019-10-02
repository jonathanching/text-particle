/**
 * ==================================================================================
 * Holds all option state
 *
 * ==================================================================================
 **/

class OptionState {

    constructor() {
        this.isBold = true;
        this.isItalic = false;
        this.isRandomColor = true;
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Toggle state of `isBold` state
     */
    bold(bool = true) {
    	this.isBold = bool;
    }

    /**
     * Toggle state of `isItalic` state
     */
    italic(bool = true) {
        this.isItalic = bool;
    }

            /**
     * Toggle state of `isRandomColor` state
     */
    randomColor(bool = true) {
        this.isRandomColor = bool;
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get font style
     * @return {String}
     */
    getFontStyle() {
        let style = '';

        if(this.isBold) style += ' Bold';
        if(this.isItalic) style += ' Italic';

        return style;
    }
}



export const OPTIONSTATE = new OptionState();
export default OPTIONSTATE;