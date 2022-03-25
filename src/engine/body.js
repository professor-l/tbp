import { CustomValueError } from "./errors";
import { Position, MotionVector } from "./fundamentals";

/**
 * Class representing a gravitationally interacting "body" in space
 * @typedef {Object} Body
 * @property {number} mass - A value in (0, 1] representing the body's mass
 * @property {Position} position - The body's position in space
 * @property {MotionVector} velocity - The body's velocityin space
 * @property {number} trailLength - The number of previous positions stored
 * @property {number[][]} trail - The body's previous positions as a 2d array
 * 
 * @property {number} trailThickness - The thickness of the trail in pixels
 * @property {boolean} highlight - Whether or not the body is highlighted
 */
class Body {

    static MAX_TRAIL_LENGTH = 2000;
    static MIN_MASS = 0.1;
    static MAX_MASS = 1;

    static colorOptions = [
        "#f44336",  // Red
        "#E91E63",  // Pink
        "#9C27B0",  // Purple
        "#673AB7",  // Deep Purple
        "#3F51B5",  // Indigo
        "#2196F3",  // Blue
        "#00BCD4",  // Cyan
        "#009688",  // Teal
        "#4CAF50",  // Green
        "#CDDC39",  // Lime
        "#FFEB3B",  // Yellow
        "#FFC107",  // Amber
        "#FF9800",  // Orange
        "#FF5722",  // Deep Orange
    ];
    
    /**
     * 
     * @param {number} mass - The body's mass, some float in (0, 1]
     * @param {Position} position - The body's position in space
     * @param {MotionVector} velocity - The body's velocity in space
     */
    constructor(mass, position, velocity) {
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;

        this.trailLength = 0;
        this.trail = [];

        // Visual properties
        this.colorIndex = 0;
        this.trailThickness = 2;
        this.highlight = false;

        this.setRandomColor();
    }

    /**
     * @returns {number} - The body's position in the x dimension
     */
    get x() {
        return this.position.x;
    }
    /**
     * @returns {number} - The body's position in the y direction
     */
    get y() {
        return this.position.y;
    }
    /**
     * @returns {number} - The body's radius in pixels
     */
    get radius() {
        return this.mass * 10;
    }
    /**
     * @returns {string} - The body's color as a css-permissible string
     */
    get color() {
        return Body.colorOptions[this.colorIndex];
    }

    /**
     * @returns {Position} The position of the body weighted by its mass
     */
    async getWeightedPosition() {
        let p = new Position(this.x, this.y);
        p.multiply(this.mass);
        return p;
    }

    /**
     * @returns {MotionVector} The momentum of the body (p = m * v)
     */
    async getMomentum() {
        let v = new MotionVector(this.velocity.x, this.velocity.y);
        v.multiply(this.mass);
        return v;
    }

    /**
     * Set this body's trail length to some number of frames
     * @param {number} n - The desired length of the trail 
     * @returns {number} The body's new trial length
     */
    setTrailLength(n) {
        if (n < 0 || n > Body.MAX_TRAIL_LENGTH)
            throw new CustomValueError(n, 0, Body.MAX_TRAIL_LENGTH);

        this.trailLength = n;
        return this.trailLength;
    }

    /**
     * Alter this body's velocity based on the gravitaional attraction of 
     * another body using Newton's equation, the product of two bodies' masses
     * divided by the square of the distance between them.
     * @param {Body} body - The body influencing this one
     */
    async adjustVector(body) {
        let c = await this.gravCoeff(body);

        // Convert force to velocity by multiplying by inverse of mass
        c *= (1 / this.mass);


        let posDiff = await this.position.difference(body.position);

        await this.velocity.addCoords(c * posDiff.x, c * posDiff.y);
    }

    /**
     * Alter this body's position based on its velocity, updating
     * the trail array if necessary
     */
    async adjustPosition() {
        if (this.trailLength !== 0 && this.trailLength >= this.trail.length)
            this.trail.push(this.position.exportCoordinates());
        
        if (this.trail.length > this.trailLength)
            this.trail.splice(0, this.trail.length - this.trailLength);
            
        await this.position.addVector(this.velocity);
    }

    /**
     * Calculates the strength of the gravitational attraction of this body to
     * another, a value that is used as a coefficient for subsequent alterations
     * to motion vector components (coefficients distribute)
     * @param {Body} body - The body to which the gravitational attraction is calculated
     * @returns {number} The strength of the gravitational attraction
     */
    async gravCoeff(body) {
        let radius = await this.position.distance(body.position);
        return (this.mass * body.mass) / (radius * radius) * 0.5;
    }

    /**
     * Safely (without altering momentum) sets the mass of the body
     * Preserves global momentum (center of mass) in an n-body system
     * @param {number} mass - The new mass
     */
    setMassSafe(mass) {
        let old = this.mass;
        try {
            this.setMass(mass);
        }
        catch (e) {
            throw e;
        }
        finally {
            this.velocity.multiply(old / this.mass);
        }
    }

    /**
     * Sets the mass of  the body
     * @param {number} mass - The new mass 
     */
    setMass(mass) {
        if (mass < Body.MIN_MASS || mass > Body.MAX_MASS)
            throw new CustomValueError(mass, Body.MIN_MASS, Body.MAX_MASS);
        
        this.mass = mass;
    }



    // VISUAL METHODS
    
    /**
     * Sets color of body to a random color from the options
     * @returns {number} The index of the color in the options list
     */
    setRandomColor() {
        this.colorIndex = Math.floor(Math.random() * Body.colorOptions.length);
        return this.colorIndex;
    }

    /**
     * Sets color of body to the specified index
     * @param {number} i - The index of the color selected 
     * @returns {number} The index of the color in the options list    
     */
    setColor(i) {
        if (i < 0 || i >= Body.colorOptions.length)
            throw new CustomValueError(i, 0, Body.colorOptions.length);
        this.colorIndex = i;
        return i;
    }

    /**
     * Sets the trail thickness of the body
     * @param {number} pixels - The new thickness, in pixels
     * @returns {number} The thickness, in pixels, of the body
     */
    setTrailThickness(pixels) {
        if (pixels <= 0 || pixels > this.radius)
            throw new CustomValueError(pixels, 0, this.radius);

        this.trailThickness = pixels;
        return this.trailThickness;
    }



    /**
     * A short informative string for logging
     */
    get string() {
        let p = "  Position: " + this.position.string;
        let m = "  Motion vector: " + this.velocity.string;
        return "BODY SNAPSHOT\n" + p + "\n" + m + "\n";
    }

    /**
     * Logs the position of the body in space
     */
    logPosition() {
        console.log("Position snapshot: " + this.position.string);
    }

    /**
     * Logs the velocity of the body in space
     */
    logvelocity() {
        console.log("velocity snapshot: " + this.velocity.string);
    }
}

export default Body;