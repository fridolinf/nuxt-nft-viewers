module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "mjs", "ts", "vue"],
  /* `moduleNameMapper` is a configuration option for Jest that allows you to map specific module paths
  to other paths. In this case, the first mapping `^@/(.*)` is mapping any path that starts with
  `@/` to the corresponding path in the root directory. This is useful for resolving aliases in your
  code. */
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/$1",
    "#app": "<rootDir>/node_modules/nuxt3/dist/app/index.mjs",
  },
  /* This code block is configuring the Jest test runner to transform different types of files before
  running tests. */
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
    ".*\\.(vue)$": "@vue/vue3-jest",
  },
  /* `transformIgnorePatterns: ["node_modules/(?!(nuxt3|unenv))"],` is configuring Jest to ignore
  certain files in the `node_modules` directory during the transformation process. Specifically, it
  is telling Jest to ignore all files in `node_modules` except for those that contain the strings
  "nuxt3" or "unenv" in their file path. This is useful for excluding certain dependencies or
  modules that may cause issues during testing. */
  transformIgnorePatterns: ["node_modules/(?!(nuxt3|unenv))"],
};
