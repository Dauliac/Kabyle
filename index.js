const player = require('play-sound')(opts = {})
const fs = require('fs')
const path = require('path')
const express = require('express')
const reload = require('reload')
const process = require('process')

const app = express()

let appRoot = process.env.PWD
let rootPath = require('./src/modules/meta').rootPath
let welcolmeFile = require('./src/modules/meta').welcolmeFile
let config = require('./src/modules/config').values
let configPath = require('./src/modules/config').path
console.log(config)

let IsPlaying = {}

// function playYoutubeVideo(videoId){
//     ytPlayer.loadVideoById(videoId)
//     ytPlayer.playVideo()
// }

function reloadServer(app) {
    console.log('Try to reload server..')
    reload(app).then(function (reloadReturned) {
        try {
          app.listen(config.port)
          console.log('Server reloaded')
        } catch(err) {
          console.error('Reload could not start, could not start server/sample app', err)
        }
    })
}

function stopSound() {
    try {
        IsPlaying.kill()
    } catch(err) {
        console.error(err)
        return err
    }
}

function getFile(path){


}
function getSoundFiles(path){
    try {
        files = fs.readdirSync(path)
        return files
    } catch(err) {
        console.error(err)
        return err
    }
}
function playSoundFile(file){
    console.log(IsPlaying)
    if(Object.keys(IsPlaying).length !== 0){
        IsPlaying.kill()
    }
    IsPlaying = player.play(file, function(err){
        if (err && !err.killed) return err
    })
}

app.get('/', async (req, res) => {
  try {
    console.log('Get on /')
    fs.readFile(meta.welcomeFile, function(err, welcomeMessage){
        if (err) {
            throw err
        }
        res.setHeader('Content-type','text/html')
        res.send(welcomeMessage)
        })
  } catch (err) {
      console.error(err)
      res.send(err)
  }
})

app.get('/soundfiles', async (req, res) => {
  try {
    console.log('List files from config folder: %s', config.soundFilesPath)
    files = getSoundFiles(config.soundFilesPath)
    res.send(files)
  } catch (err) {
      console.error(err)
      res.send(err)
  }
})

app.get('/soundfiles/:file', (req, res) => {
  file = path.join(config.soundFilesPath, req.params.file)
  try {
    console.log('Play sound file: %s', file)
    playSoundFile(file)
    res.send(req.params.file)
  } catch (err) {
      console.error(err)
      res.send(err)
  }
})

app.get('/youtube/:videoId', (req, res) => {
  try {
    console.log('Play sound video: %s', file)
    playYoutubeVideo(videoId)
    res.send(req.params.videoId)
  } catch (err) {
      console.error(err)
      res.send(err)
  }
})



app.get('/stop', (req, res) => {
  try {
    console.log('Stop sound')
    data = stopSound()
    res.send(data)
  } catch (err) {
      console.error(err)
      res.send(err)
  }
})

app.get('/config', (req, res) => {
    console.log('Get config')
    console.log(config)
    res.send(config)
})

app.get('/config/update', (req, res) => {
    console.log('Update config from: %s', configPath)
    config = require('./config.js')
    reloadServer(app)
    res.send(config)
})

app.listen(config.port)
