const Note = require('../parser/Note')
const Scope = require('../parser/Scope')

const tests = [
    require('./self-eval-test'),
    require('./math-test'),
    require('./variables-test'),
    require('./block-test'),
    require('./while-test'),
]

const note = new Note(new Scope({
    // Built-in variables
    null: null,
    true: true,
    false: false,
    VERSION: '0.1a',
}));

tests.forEach(test => test(note))

console.log('All assertions passed!')
