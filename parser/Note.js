const assert = require('assert');
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

        // Variable declarations
        if (exp[0] === 'let') {
            const [_, name, value] = exp

            return scope.define(name, this.eval(value, scope))
        }

        // Varaible access
        if (isVariableName(exp)) {
            return scope.lookup(exp)
        }

        // Block
        if (exp[0] === 'BEGIN' && exp.slice(-1)[0] === 'END') {
            const newScope = new Scope({}, scope)

            return this._evalBlock(exp, newScope)
        }
    
        throw `Unimplemented: ${JSON.stringify(exp)}`
    }

    _evalBlock(block, scope) {
        let result

        const expressions = block.slice(1, -1)

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

// -----------------------> Tests <-----------------------
const note = new Note(new Scope({
    // Built-in variables
    null: null,
    true: true,
    false: false,
    VERSION: '0.1a',
}));

// Self evaluations
assert.strictEqual(note.eval(1), 1)
assert.strictEqual(note.eval("'Hello world.'"), 'Hello world.')

// Math operations
assert.strictEqual(note.eval(['+', 5, 13]), 18)
assert.strictEqual(note.eval(['+', ['+', 4, 7], 13]), 24)
assert.strictEqual(note.eval(['-', 5, 13]), -8)
assert.strictEqual(note.eval(['-', ['-', 24, 7], 13]), 4)
assert.strictEqual(note.eval(['*', 2, 3]), 6)
assert.strictEqual(note.eval(['*', ['*', 2, 4], 5]), 40)
assert.strictEqual(note.eval(['/', 10, 2]), 5)
assert.strictEqual(note.eval(['/', ['/', 20, 2], 5]), 2)
assert.strictEqual(note.eval(['/', ['+', 6, 4], 2]), 5)

// Variable declarations
assert.strictEqual(note.eval(['let', 'foo', 7]), 7)
assert.strictEqual(note.eval('foo'), 7)
assert.throws(function () {note.eval('bar')}, ReferenceError)
assert.strictEqual(note.eval('VERSION'), '0.1a')
assert.strictEqual(note.eval(['let', 'isValid', 'true']), true)
assert.strictEqual(note.eval(['let', 'foo', ['+', 5, ['*', 2 ,3]]]), 11)

// Block
assert.strictEqual(note.eval(
    ['BEGIN',
        ['let', 'foo', "'bar'"],
        ['let', 'total', ['+', 3, 7]],
        ['let', 'num', 5],
        ['/', 'total', 'num'],
    'END',
    ]),
2)
assert.strictEqual(note.eval(
    ['BEGIN',
        ['let', 'foo', 5],
        ['BEGIN',
            ['let', 'foo', ['+', 3, 7]],
        'END',
        ],
        'foo',
    'END',
    ]),
5)
assert.strictEqual(note.eval(
    ['BEGIN',
        ['let', 'foo', 15],
        ['BEGIN',
            'foo',
        'END',
        ],
    'END',
    ]),
15)


// End of tests
console.log("All assertions passed!")
