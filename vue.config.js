const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  /* // unplugin-auto-import , BUT I AM NOT SURE ABOUT USING IT
  configureWebpack: {
    plugins: [
      require("unplugin-auto-import/webpack")({
        // OPTION START
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],

        // global imports to register
        imports: [
          // presets
          "vue",
          "vue-router",
          // custom
          {
            axios: [
              // default imports
              ["default", "axios"], // import { default as axios } from 'axios',
            ],
          },
          // example type import
          {
            from: "vue-router",
            imports: ["RouteLocationRaw"],
            type: true,
          },
        ],
        // Enable auto import by filename for default module exports under directories
        defaultExportByFilename: false,

        // Auto import for module exports under directories
        // by default it only scan one level of modules under the directory
        dirs: [
          // './hooks',
          // './composables' // only root modules
          "./composables/**", // all nested modules
          "./pages/**",
          "./router/**",
          // ...
        ],

        // Filepath to generate corresponding .d.ts file.
        // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
        // Set `false` to disable.
        dts: "./auto-imports.d.ts",

        // Auto import inside Vue template
        vueTemplate: false,

        // Custom resolvers, compatible with `unplugin-vue-components`
        resolvers: [],

        // Inject the imports at the end of other imports
        injectAtEnd: true,

        // Generate corresponding .eslintrc-auto-import.json file.
        eslintrc: {
          enabled: false, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        // OPTION END
      }),
    ],
  },
  */
});
