const assert = require('assert');

module.exports = note => {
    // Variable declarations
    assert.strictEqual(note.eval(['let', 'foo', 7]), 7)
    assert.strictEqual(note.eval('foo'), 7)
    assert.throws(function () {note.eval('bar')}, ReferenceError)
    assert.strictEqual(note.eval('VERSION'), '0.1a')
    assert.strictEqual(note.eval(['let', 'isValid', 'true']), true)
    assert.strictEqual(note.eval(['let', 'foo', ['+', 5, ['*', 2 ,3]]]), 11)

    // Assignment
    assert.strictEqual(note.eval(
        ['BEGIN',
            ['let', 'foo', 15],
            ['BEGIN',
                ['set', 'foo', 20],
            'END',
            ],
            'foo',
        'END',
        ]),
    20)
}
