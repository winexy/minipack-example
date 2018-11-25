module.exports = function bundle(graph) {
  const modules = graph.map(module => {
    return `${module.id}: [
      function(require, module, exports) {
        ${module.code}
      },
      ${JSON.stringify(module.mapping)},
    ],`;
  }).join('');

  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        
        function localRequire(relativePath) {
          return require(mapping[relativePath]);
        }
        
        const module = { exports: {} };
        
        fn(localRequire, module, module.exports);
        
        return module.exports;
      }
      
      require(0);
    })({${modules}})
  `;

  return result;
};
