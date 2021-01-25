module.exports = {
    globals: {
      URL: "https://localhost:8080"
    },
    preset: "jest-puppeteer",
    testMatch: [
      "**/test/*.test.js"
    ],
    verbose: true,
  }; 
