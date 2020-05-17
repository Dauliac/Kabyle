const fs = require('fs')
const path = require("path")

const PossibleConfigPath = ["/etc/kabyle/config.json", "./config.json"]

const directoryPath = path.join(__dirname, "files")
let config;

function readConfig(possibleConfigPath) {
    let config = {};
    possibleConfigPath.forEach(function(path){
        console.log("check config file path:" + path );
        try {
          if (fs.existsSync(path)) {
            console.log("Use config file: " + path );
            config.values = require(path);
            config.path= path;
          }
        } catch(err) {
          console.error(err);
        }
    });
    if (config == null) {
        console.warn("No config file found");
    }
    return config;
}

config = readConfig(PossibleConfigPath);
module.exports = { 'values': config.values, 'path': config.path };
