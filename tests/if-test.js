const assert = require('assert');

/*
 * (if <condition>
 *     <consequent>
 *     <alternate>)
 */
module.exports = note => {
    assert.strictEqual(
        note.eval(
            ['BEGIN',
                ['let', 'foo', 10],
                ['let', 'bar', 5],
                ['if', ['>', 'foo', 10],
                    ['set', 'bar', 20],
                    ['set', 'bar', 30],
                ],
                'bar',
            ],
        ),
    30);
};
