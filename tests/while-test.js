const assert = require('assert');

/*
 * (while <condition> <cbody>)
 */
module.exports = note => {
    assert.strictEqual(
        note.eval(
            ['BEGIN',
                ['let', 'counter', 0],
                ['let', 'result', 0],
                ['while', ['<', 'counter', 10],
                    ['BEGIN',
                        ['set', 'result', ['+', 'result', 10]],
                        ['set', 'counter', ['+', 'counter', 1]],
                    ]
                ],
                'result',
            ],
        ),
    100);
};
