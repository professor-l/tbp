/**
 * Error raised when an invalid custom value is inputted
 * @typedef {Error} CustomValueError
 */
class CustomValueError extends Error {
    /**
     * @param {any} given - The invalid value that was given
     * @param {number} [min] - The minimum permissible value
     * @param {number} [max] - The maximum permissible value
     */
    constructor(given, min, max) {

        let message = "Given value '" + given + "' is invalid";

        if (min === max)
            void 0;
        else if (min === undefined || min === null)
            message += ", must be less than " + max;
        else if (max === undefined || max === null)
            message += ", must be greater than " + min;
        else
            message += ", must be between " + min + " and " + max;

        super(message);

        this.name = "CustomValueError";
    }
}

/**
 * Error raised when an imposed limit is reached
 * @typedef {Error} LimitError
 */
class LimitError extends Error {
    /**
     * @param {string} name - The name of the variable or limit 
     * @param {*} limit - The value of the limit
     */
    constructor(name, limit = undefined) {
        let extra = (limit === undefined) ? "" : (" of " + limit);
        
        let message = "Limit" + extra + " for " + name + " has been reached.";
        super(message);
        
        this.name = "LimitError";
    }
}

/**
 * Error raised when a particular task is not ready to be executed
 * @typedef {Error} NotReadyError
 */
class NotReadyError extends Error {
    /**
     * @param {string} task - Prerequisite task, present tense (git commit convention)
     */
    constructor(task) {
        super("Cannot execute - you must " + task + " first.");
        this.name = "NotReadyError";
    }
}

export { CustomValueError, LimitError, NotReadyError };