const options = {
  interactive: { default: true },
  whichFeature: {
    type: 'number',
    default: '1',
    describe: '(Ծ‸ Ծ) What do you want to do?'
      +'\n1. Parse emails lists into Google Sheet (answer me with 1)'
      +'\n2. Parse emails from markdown files into Google Sheet (answer me with 2)'
  },
};

const words = {
  interactive: { default: true },
  getWords: {
    type: 'number',
    default: '1',
    describe: '(Ծ‸ Ծ) Give me your list of words here: '
  },
};

module.exports = {
  options,
  words,
}
