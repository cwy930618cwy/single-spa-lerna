const tsc = require('typescript')

const babelJest = require('babel-jest');

module.exports = {
  process(src, path, options, transformOptions) {
      const isTsx = path.endsWith('.tsx');
      if (isTsx) {
          src = tsc.transpileModule(
              src,
              {
                  compilerOptions: {
                      'module': tsc.ModuleKind.ES6,
                      'target': tsc.ScriptTarget.ES6,
                      'moduleResolution': tsc.ModuleResolutionKind.Node,
                      'allowSyntheticDefaultImports': true,
                      'jsx': tsc.JsxEmit.Preserve,
                      'sourceMap': true,
                  },
                  fileName: path
              }
          );
          src = src.outputText;

          // update the path so babel can try and process the output
          path = path.substr(0, path.lastIndexOf('.')) + '.jsx';
          src = babelJest.process(src, path, options, transformOptions);
      }

      return src;
  },
};
