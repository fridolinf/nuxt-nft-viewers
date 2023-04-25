module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "vue", "js"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.(js)$": "babel-jest",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
    ".*\\.(vue)$": "@vue/vue3-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(nuxt3|unenv))"],
};
