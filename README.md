# Custom component library to use in Slate

This repository holds a mixture of vanilla JS and React components that are built to be used in Slate within NHS Foundry.

## How can I run this repo?

1. Clone the repo and move into the directory in your terminal
2. Run `npm install`
3. Run `npm run build` to call webpack and build the dist directory
4. Run `npm run start` to initialise a basic server that builds [index.html](index.html)

Note: npm run start creates a simple python server so you will need to have python installed on your machine. If you don't have python installed you can use Node instead to start a [simple server](https://www.npmjs.com/package/http-server)

## How the main.js file is built

The repo uses webpack to bundle the javascript components into a single minified javascript file called main.js

### Setting up webpack config

## React components

https://carnall-farrar.github.io/foundry-chart-library/
