import { CustomValueError, NotReadyError } from "./errors";
import CanvasInterface from "./visual";

/**
 * Class providing methods to help animate a BodyCollection
 * @typedef {Object} Animator
 * @property {BodyCollection} collection - The collection of bodies
 * @property {CanvasInterface} interface - The interface of the target canvas
 * @property {number} speed - The speed of the animation, default 1
 * @property {boolean} isRunning - Whether or not the animation is running (being drawn)
 * @property {boolean} isPaused - Whether or not the animation is paused (being calculated)
 * @property {number} frame - The requestAnimationFrame return value (or 0)
 */
class Animator {
    constructor(collection, canvasId) {
        this.collection = collection;
        this.id = canvasId;

        this.speed = 1;

        this.isRunning = false;
        this.isPaused = true;

        this.isDrawing = false;

        this.frame = 0;

        this.scale = 1;

        // Interface initialized separately
        // Allows user to instantiate Animator without rendering a canvas
        this.interface = null;
    }

    /**
     * Initialize animator 
     * NOTE: Must be run with canvas rendered in the DOM
     */
    initialize() {
        this.interface = new CanvasInterface(this.id);
    }

    /**
     * Put animator on standby, discarding existing CanvasInterface
     * NOTE: Will stop animator if it is running
     */
    standby() {
        this.stop();
        this.interface = null;
    }

    /**
     * Update canvas dimension; should be run whenever canvas is resized
     */
    dimensionUpdate() {
        if (this.interface !== null)
            this.interface.update();
    }

    /**
     * Change the canvas associated with the animator
     * NOTE: Must be invoked while animator is in standby or uninitialized
     * @param {string} newId - The ID of the animator's new canvas
     */
    changeId(newId) {
        if (this.interface !== null)
            throw new NotReadyError("put animator in standby with the standby() method");
        this.id = newId;
    }

    /**
     * Change the scale of the animation to enlarge or shrink bodies
     * by some coefficient based on the desired visuals.
     * @param {number} newScale - The new scale of the animation
     */
    changeScale(newScale) {
        if (newScale < 1)
            throw new CustomValueError(newScale, 1);

        this.scale = newScale;
    }

    /**
     * Get a particular body from the collection
     * @param {number} i - The index of the body to retrieve
     * @returns {Body} The requested body
     */
    body(i) {
        return this.collection.bodies[i];
    }

    /**
     * Updates all numerical values in the simulation
     */
    calculate() {
        for (let i = 0; i < this.speed; i++)
            this.collection.updateSimulation();
    }

    /**
     * Draw the current state of the collection, as is
     */
    async draw() {
        this.isDrawing = true;

        this.interface.clear();

        // Draw bodies
        for (let i = 0; i < this.collection.bodies.length; i++)
            await this.interface.drawBody(this.body(i), this.scale);

        // Draw center of mass
        this.interface.drawPosition(
            this.collection.centerOfMass, 2, "white"
        );

        this.isDrawing = false;
    }

    /**
     * Run the entire animation loop, calculation and drawing
     */
    loop() {
        if (!this.isPaused)
            this.calculate();
            
        if (!this.isDrawing)
            this.draw();

        if (this.isRunning)
            requestAnimationFrame(() => this.loop());
    }

    /**
     * Pause the animation (continues drawing, but does not calculate)
     */
    pause() {
        this.isPaused = true;
    }

    /**
     * Unpause the animation (resume calculating)
     */
    unpause() {
        this.isPaused = false;
    }

    /**
     * Toggle the animation's calculation loop
     */
    togglePause() {
        if (this.isPaused)
            this.unpause();
        else
            this.pause();
    }

    /**
     * Start the animation (starts drawing loop)
     */
    start() {
        this.frame = requestAnimationFrame(() => this.loop());
        this.isRunning = true;
    }

    /**
     * Stop the animation (stops drawing loop)
     */
    stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.frame);
    }

    /**
     * Toggle the full animation
     */
    toggle() {
        if (this.interface === null) {
            throw new NotReadyError("initialize Animator instance")
        }
        if (this.isRunning)
            this.stop();
        else
            this.start();
    }

}

export default Animator;