/**
 * ==================================================================================
 * Holds all global variables
 *
 * ==================================================================================
 **/

class Global {

    constructor() {
        //
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Convert string to boolean value
     * @param  {string}  value
     * @return {boolean}
     */
    convertStrToBool(value) {
        return value === 'true';
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    getEnv() { return process.env['APP_ENV']; }
    getDebug() { return this.convertStrToBool(process.env['DEBUG']); }
    getInspector() { return this.convertStrToBool(process.env['DEBUG_INSPECTOR']); }
    getDebugRay() { return this.convertStrToBool(process.env['DEBUG_RAY']); }
    getDebugCollision() { return this.convertStrToBool(process.env['DEBUG_COLLISION']); }
    getDebugCamera() { return this.convertStrToBool(process.env['DEBUG_CAMERA']); }
    getDebugLogLevel() { return process.env['DEBUG_LOG_LEVEL']; }


    /**
     * Get strings used for dev environment
     * @return {array}
     */
    getDevTriggers() {
        return [
            'dev', 'development', 'local', 'local'
        ];
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Find log level base on specified category
     * @param  {string} str
     * @return {int}
     */
    findLogLevel(str) {
        switch(str.toLowerCase()) {
            /* Includes `EventBus` logs */
            case 'states': return 1;
            case 'events': return 2;
            case 'controls': return 3;
            case 'elements': return 4;
            case 'others': return 5;
            default: return 0;
        }
    }

    /**
     * Check if inspector is viewable
     */
    showInspector() {
        return this.isDebug() && this.getInspector();
    }

    /**
     * Check if ray helper is viewable
     */
    showDebugRay() {
        return this.isDebug() && this.getDebugRay();
    }

    /**
     * Check if collision boxes are viewable
     */
    showDebugCollision() {
        return this.isDebug() && this.getDebugCollision();
    }

    /**
     * Check if debug camera is enable
     */
    showDebugCamera() {
        return this.isDebug() && this.getDebugCamera();
    }

    /**
     * Check if env. is on development
     */
    isDev() {
        if(this.getDevTriggers().indexOf(this.getEnv().toLowerCase()) >= 0)
            return true;

        return false;
    }

    /**
     * Check if debug mode is open
     */
    isDebug() {
        return this.getDebug();
    }
}



export const GLOBAL = new Global();
export default GLOBAL;