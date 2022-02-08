const assert = require('assert');

module.exports = note => {
    // Block
    assert.strictEqual(note.eval(
        ['BEGIN',
            ['let', 'foo', "'bar'"],
            ['let', 'total', ['+', 3, 7]],
            ['let', 'num', 5],
            ['/', 'total', 'num'],
        ]),
    2)
    assert.strictEqual(note.eval(
        ['BEGIN',
            ['let', 'foo', 5],
            ['BEGIN',
                ['let', 'foo', ['+', 3, 7]],
            ],
            'foo',
        ]),
    5)
    assert.strictEqual(note.eval(
        ['BEGIN',
            ['let', 'foo', 15],
            ['BEGIN',
                'foo',
            ],
        ]),
    15)
}
