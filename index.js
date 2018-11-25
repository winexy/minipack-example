const createGraph = require('./createGraph');
const bundle = require('./bundle');


const graph = createGraph('./src/entry.js');
const result = bundle(graph);

console.log(result);
