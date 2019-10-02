/**
 * ==================================================================================
 * Holds all stage state
 *
 * ==================================================================================
 **/

class StageState {

    constructor() {
        this.isPopulated = false;
    }



    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Toggle state of `isPopulated` state
     */
    populated(bool = true) {
    	this.isPopulated = bool;
    }
}



export const STAGESTATE = new StageState();
export default STAGESTATE;