const assert = require('assert');

module.exports = note => {
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
}
