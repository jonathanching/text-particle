/**
 * ==================================================================================
 * Manages all scene objects/elements
 *
 * ==================================================================================
 **/

import { GLOBAL } from './Global.js';
import { LOGGER } from './libs/Logger.js';

import { OPTIONSTATE } from './states/OptionState.js';
import { STAGESTATE } from './states/StageState.js';

import Word from './elements/Word.js';


export default class SceneManager {

    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.getCanvasContext();


        this.init();
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Initiate class
     */
    init() {
        this.setupStates();
        this.setupStage();

        this.buildOptions();
        this.buildElements();

        this.render();
    }

    /**
     * Initialize states
     */
    setupStates() {
        //
    }

    /**
     * Initialze `stage` variables
     */
    setupStage() {
        this.fps = 60;
        this.interval = 1000 / this.fps;
        this.lastTime = (new Date()).getTime();
        this.currentTime = 0;
        this.delta = 0;

        this.countdown = 3000;


        //
    }


    /**
     * Create all option fields
     */
    buildOptions() {
        /* Create control button */
        this.panel = document.getElementById('controlPanel');
        this.control = document.getElementById('controlBtn');
        this.control.addEventListener('click', () => { this.togglePanel(); });
        this.reset = document.getElementById('resetBtn');
        this.reset.addEventListener('click', () => { this.resetDrawing(); });


        /* Create checkbox fields */
        this.boldField = this.createFields('boldField', OPTIONSTATE.isBold, this.toggleBoldField);
        this.italicField = this.createFields('italicField', OPTIONSTATE.isItalic, this.toggleItalicField);
        this.randomColorField = this.createFields('randomColorField', OPTIONSTATE.isRandomColor, this.toggleRandomColorField);
    }

    /**
     * Create all elements
     */
    buildElements() {
        this.word = new Word(this.canvas, this.context);
    }


    /**
     * Create and bind input fields
     * @param {string}    id
     * @param {boolean}   state
     * @param {function}  func
     */
    createFields(id, state, func) {
        let field = this.getFieldById(id);

        if(field) {
            field.addEventListener('change', (event) => { func(event); });

            /* Set default state */
            field.checked = state;

            return field;
        }
    }


    /**
     * ==================================================================================
     * @Events
     * ==================================================================================
     **/

    /**
     * Callback on window size changes
     */
    onWindowResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Reset `text` drawing
     */
    resetDrawing() {
        STAGESTATE.populated(false);
    }

    /**
     * Show/hide the option panel
     */
    togglePanel() {
        this.panel.classList.toggle('controls__border--visible');
    }

    /**
     * Toggle option states
     * @param {Event} event
     */
    toggleBoldField(event) { OPTIONSTATE.bold(event.target.checked); }
    toggleItalicField(event) { OPTIONSTATE.italic(event.target.checked); }
    toggleRandomColorField(event) { OPTIONSTATE.randomColor(event.target.checked); }


    /**
     * Handles all needed variable update per tick. Called on the `render` function
     */
    update() {
        this.word.update();
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get DOM element by Id
     * @param  {String} id
     * @return {DOMElement}
     */
    getFieldById(id) {
        return document.getElementById(id);
    }

    /**
     * Get canvas context object
     * @return {Context}
     */
    getCanvasContext() {
        if(this.canvas)
            return this.canvas.getContext('2d');

        return null;
    }


    /**
     * ==================================================================================
     * @Renderers
     * ==================================================================================
     **/

    /**
     * Clear all canvas context
     */
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * Canvas callback per tick
     */
    render() {
        /* Update timers */
        this.currentTime = (new Date()).getTime();
        this.delta = this.currentTime - this.lastTime;

        if(this.delta > this.interval) {

            this.clearCanvas();


            /**
             * Draw the text if there are no particles yet otherwise
             * proceed w/ the usual context drawing
             */

            if(!STAGESTATE.isPopulated) {
                this.word.populateParticles();
            } else {
                this.word.draw();
            }


            this.lastTime = this.currentTime - (this.delta % this.interval);
        }


        requestAnimationFrame(() => {
            this.update();
            this.render();
        });
    }





    /**
     * ==================================================================================
     * @DEVELOPMENT
     * ==================================================================================
     **/

    //
}