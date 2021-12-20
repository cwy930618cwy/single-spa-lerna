import { createFilter } from 'rollup-pluginutils'
import tsc from 'typescript'
import { transform} from 'babel-core'
export default function tsx () {
  const filter = createFilter(['*.tsx', '**/*.tsx'], ['*.d.tsx', '**/*.d.tsx'])
  return {
    name: 'tsx-plugin',
    resolveId (importee) {
      if (filter(importee)) return importee
      return null
    },
    transform (code, id) {
      if (!filter(id)) return null
      code = tsc.transpileModule(
        code, {
          compilerOptions: {
              'module': tsc.ModuleKind.ESNext,
              'target': tsc.ScriptTarget.ES6,
              'moduleResolution': tsc.ModuleResolutionKind.ES6,
              'allowSyntheticDefaultImports': true,
              'jsx': tsc.JsxEmit.Preserve,
              'sourceMap': true,
          },
          fileName: id
        }
      ).outputText;

      // update the path so babel can try and process the output
      id = id.substr(0, id.lastIndexOf('.')) + '.jsx';
      code = transform(code, {
        filename: id, 
        presets: ['vue', ['es2015', { modules: false }]]
      }).code

			return { code }
    }
  }
}