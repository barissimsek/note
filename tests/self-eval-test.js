const assert = require('assert');

module.exports = note => {
    // Self evaluations
    assert.strictEqual(note.eval(1), 1)
    assert.strictEqual(note.eval("'Hello world.'"), 'Hello world.')    
}