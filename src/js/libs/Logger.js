/**
 * ==================================================================================
 * Handles all logging events
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../Global.js';

class Logger {

    constructor() {
        //
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Write to console log
     * @param {string} message
     * @param {int}    level
     */
    log(message, level) {
        if(!this.canLog(level) || !message) return;

        console.log(message);
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Check if app can log the message. Negative value means display for the
     * specified category only (ex: -1 means display `States` logs only)
     * @param {int} level
     */
    canLog(level) {
        let debugLevel = GLOBAL.getDebugLogLevel();

        if(!GLOBAL.getDebug())
            return false;

        return debugLevel < 0 ? (debugLevel * -1) == level : level <= debugLevel;
    }
}



export const LOGGER = new Logger();
export default LOGGER;