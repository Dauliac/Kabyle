const path = require('path');

const rootPath = "../";
const assetsPath = path.join(rootPath, "assets");
const asciiPath = path.join(assetsPath, "ascii");
const welcomeFile = path.join(asciiPath, "welcome.txt");
console.log('Working on directory %s', rootPath)

module.exports = { 'rootPath': rootPath, 'welcomeFile': welcomeFile };
