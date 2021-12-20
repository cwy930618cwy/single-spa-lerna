import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript";
import url from "rollup-plugin-url";
import postcssUrl from "postcss-url";
import tsx from "./rollup-plugin-tsx";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "./src/main.js",
  output: {
    format: "esm",
    file: "dist/components.js",
  },
  onwarn(warning, next) {
    if (
      warning
        .toString()
        .match(
          "The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten"
        )
    )
      return;
    next(warning);
  },
  external: [
    "vue",
    "vue-property-decorator",
    "vue-js-modal",
    "vue-runtime-helpers/normalize-component.js",
    "vue-touch-ripple",
    "vue-touch-ripple/dist/vue-touch-ripple.css",
  ],
  plugins: [
    commonjs(),
    url({
      emitFiles: true,
    }),
    typescript({
      tsconfig: false,
      experimentalDecorators: true,
      module: "es2015",
    }),
    tsx(),
    vue({
      css: false,
      template: { transformAssetUrls: true },
      style: {
        postcssPlugins: [
          require("autoprefixer"),
          postcssUrl({
            url: "inline",
          }),
        ],
        postcssOptions: {
          isAsync: true,
        },
      },
    }),
  ],
};
