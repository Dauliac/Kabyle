const fs = require("fs")
const path = require("path")

const PossibleConfigPath = ["/etc/kabyle/config.json", "./config.json", "../defaults/config.json"]

const rootPath = require('./meta').rootPath
let config
function readConfig(possibleConfigPath) {
    let config = {}
    possibleConfigPath.forEach(function(checkPath){
        checkPath = path.resolve(
                                 path.join(rootPath,
                                           checkPath)
                                )
        try {
          if (fs.existsSync(checkPath)) {
            console.log("Use config file: " + checkPath)
            config.values = require(checkPath)
            config.path = checkPath
            config.values.soundFilesPath = path.resolve(
                                 path.join(rootPath,
                                           config.values.soundFilesPath)
                                )
          }
        } catch(err) {
          console.error(err)
        }
    })
    if (config == null) {
        console.warn("No config file found")
    }
    return config
}

config = readConfig(PossibleConfigPath)
module.exports = { 'values': config.values, 'path': config.path }
