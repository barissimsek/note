/*
 * Scope and storage for variables
*/

class Scope {
    constructor(record = {}, parent = null) {
        this.record = record
        this.parent = parent
    }

    // Creates new variables in the scope
    define(name, value) {
        this.record[name] = value
        return value
    }

    // Updates an existing variable in the scope
    assign(name, value) {
        this.resolve(name).record[name] = value
        return value
    }

    // Returns the value of the variable if defined in the scope, throws otherwise
    lookup(name) {
        return this.resolve(name).record[name]
    }

    resolve(name) {
        // If variable is in the current scope
        if (this.record.hasOwnProperty(name)) {
            return this
        }

        if (this.parent == null) {
            throw new ReferenceError(`Variable ${name} is not defined.`)
        }

        // Resolve variable from the parent scope
        return this.parent.resolve(name)
    }
}

module.exports = Scope;
