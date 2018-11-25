const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const babel = require('babel-core');

let ID = 0;

module.exports = function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8');

  const ast = babylon.parse(content, {
    sourceType: 'module'
  });

  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  });

  const id = ID++;

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['env']
  });

  return {
    id,
    filename,
    dependencies,
    code
  };

};
