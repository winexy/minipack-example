const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify');
const createGraph = require('./createGraph');
const bundle = require('./bundle');
const outputDirectory = './dist';
const outputFilename = 'bundle.js';

const graph = createGraph('./src/entry.js');
let output = bundle(graph);


if (!fs.existsSync(outputDirectory)){
  fs.mkdirSync(outputDirectory);
}
output = beautify(output, {
  indent_size: 2,
  space_in_empty_paren: true
});

fs.writeFileSync(path.resolve(__dirname, outputDirectory, outputFilename), output);


