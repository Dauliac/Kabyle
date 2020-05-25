const path = require('path');
const process = require("process")

const rootPath = process.cwd();
const assetsPath = path.join(rootPath, "assets");
const asciiPath = path.join(assetsPath, "ascii");
const welcomeFile = path.join(asciiPath, "welcome.txt");
console.log('Working on directory %s', rootPath)

module.exports = { 'rootPath': rootPath, 'welcomeFile': welcomeFile };
