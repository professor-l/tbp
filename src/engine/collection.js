import { LimitError } from "./errors";
import { Position, MotionVector } from "./fundamentals";
import Body from "./body";

/**
 * Class representing a collection of bodies that interact with one another
 * @typedef {Object} BodyCollection 
 * @property {Body[]=[]} bodies - An array of the bodies in the collection
 */
class BodyCollection {

    static MAX_BODIES = 10;

    constructor(bodies=[]) {
        this.bodies = bodies;

        this.centerOfMass = new Position();
        this.velocity = new MotionVector();
        this.position = this.centerOfMass;

        this.updateMetaInfo();
    }

    /**
     * Adds a body to the collection with no velocity and mass 1
     * @param {number} posx - The x position of the body
     * @param {number} posy - The y position of the body
     * @returns {Body} The Body object that was added to the collection
     */
    addBody(posx=0, posy=0) {
        return this.addBodyCustom(1, posx, posy, 0, 0);
    }

    /**
     * Adds a body to the collection with all custom properties
     * @param {number} mass - The mass of the body 
     * @param {number} posx - The x position of the body
     * @param {number} posy - The y position of the body
     * @param {number} momx - The x component of the body's velocity
     * @param {number} momy - The y component of the body's velocity
     * @returns {Body} The body object that was added to the collection
     */
    addBodyCustom(mass, posx, posy, momx, momy) {
        if (this.bodies.length >= BodyCollection.MAX_BODIES) {
            throw new LimitError("body count", BodyCollection.MAX_BODIES);
        }

        let p = new Position(posx, posy);
        let m = new MotionVector(momx, momy);

        let b = new Body(mass, p, m);
        this.bodies.push(b);

        return b;
    }

    /**
     * Remove a body from this collection
     * @param {number} index - The index of the body in this.bodies
     * @returns {Body} The body that was removed
     */
    removeBody(index) {
        return this.bodies.splice(index, 1)[0];
    }
    
    /**
     * Updates the motion vectors of all bodies in the collection
     * by calculating each of their influences on all the others
     * at a static point in time
     */
    async updateVectors() {
        for (let i = 0; i < this.bodies.length; i++) {
            for (let j = 0; j < this.bodies.length; j++) {
                if (i === j)
                    continue;
                await this.bodies[i].adjustVector(this.bodies[j]);
            }
        }
    }

    /**
     * Updates the positions of all the bodies based on their
     * current velocity vectors.
     */
    async updatePositions() {
        for (let i = 0; i < this.bodies.length; i++) {
            await this.bodies[i].adjustPosition();
        }

        await this.updateMetaInfo();
    }

    /**
     * Updates the center of mass and velocity fields of the collection
     */
    async updateMetaInfo() {
        await this.centerOfMass.multiply(0);
        await this.velocity.multiply(0);

        let total = 0;

        for (let i = 0; i < this.bodies.length; i++) {
            await this.velocity.addObject(await this.bodies[i].getMomentum());
            await this.centerOfMass.addObject(await this.bodies[i].getWeightedPosition());
            total += this.bodies[i].mass;
        }

        await this.centerOfMass.multiply(1 / total);
        await this.velocity.multiply(1 / total);
    }

    /**
     * Updates the entire simulation, consecutively rather
     * than concurrently to avoid miscalculations
     */
    async updateSimulation() {
        await this.updateVectors();
        await this.updatePositions();
    }

    /**
     * Logs the velocitys of each body to the console
     */
    logvelocitys() {
        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].logvelocity(i);
        }
    }

    /**
     * Logs the positions of each body to the console
     */
    logPositions() {
        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].logPosition(i);
        }
    }

    /**
     * Logs full information, both position and velocity,
     * on all bodies in the collection, as well as the
     * collection's center of mass, to the console
     */
    log() {
        console.log("CENTER OF MASS: " + this.centerOfMass().string);
        console.log("\nBODIES: ");
        for (let i = 0; i < this.bodies.length; i++) {
            console.log(this.bodies[i].string);
        }
    }

}

export default BodyCollection;