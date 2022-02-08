const Scope = require('./Scope')
const { isNumber, isString } = require('util');

/*
 * Note interpreter
 */

class Note {
    constructor(global = new Scope()) {
        this.global = global
    }

    eval(exp, scope = this.global) {
        if (isNumber(exp)) {
            return exp
        } 

        if (isString(exp) && exp[0] === "'" && exp.slice(-1)[0] === "'") {
            return exp.slice(1, -1)
        }

        // Math operations
        if (exp[0] === '+') {
            return this.eval(exp[1], scope) + this.eval(exp[2], scope)
        }

        if (exp[0] === '-') {
            return this.eval(exp[1], scope) - this.eval(exp[2], scope)
        }

        if (exp[0] === '*') {
            return this.eval(exp[1], scope) * this.eval(exp[2], scope)
        }

        if (exp[0] === '/') {
            return this.eval(exp[1], scope) / this.eval(exp[2], scope)
        }

        // Comparison operators
        if (exp[0] === '>') {
            return this.eval(exp[1], scope) > this.eval(exp[2], scope)
        }

        if (exp[0] === '>=') {
            return this.eval(exp[1], scope) >= this.eval(exp[2], scope)
        }

        if (exp[0] === '<') {
            return this.eval(exp[1], scope) < this.eval(exp[2], scope)
        }

        if (exp[0] === '<=') {
            return this.eval(exp[1], scope) <= this.eval(exp[2], scope)
        }


        // Variable declarations
        if (exp[0] === 'let') {
            const [_, name, value] = exp

            return scope.define(name, this.eval(value, scope))
        }

        // Assignment
        if (exp[0] === 'set') {
            const [_, name, value] = exp

            return scope.assign(name, this.eval(value, scope))
        }

        // Variable access
        if (isVariableName(exp)) {
            return scope.lookup(exp)
        }

        // Block
        if (exp[0] === 'BEGIN') {
            const newScope = new Scope({}, scope)

            return this._evalBlock(exp, newScope)
        }

        // if-statement
        if (exp[0] === 'if') {
            const [_tag, condition, consequent, alternate] = exp

            if (this.eval(condition, scope)) {
                return this.eval(consequent, scope)
            }

            return this.eval(alternate, scope)
        }

        // while loop
        if (exp[0] === 'while') {
            let result
            const [_tag, condition, body] = exp

            while (this.eval(condition, scope)) {
                result = this.eval(body, scope)
            }

            return result
        }
    
        throw `Unimplemented: ${JSON.stringify(exp)}`
    }

    _evalBlock(block, scope) {
        let result

        const [_tag, ...expressions] = block

        expressions.forEach(exp => {
            result = this.eval(exp, scope)
        })

        // Block returns the result of the last line
        return result
    }
}

/*
 * Helper functions
*/
function isVariableName(exp) {
    return isString(exp) && /^[a-zA-Z][a-zA-Z0-9]*$/.test(exp)
}

module.exports = Note;
