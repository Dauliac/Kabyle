const player = require('play-sound')(opts = {})
const fs = require('fs')
const path = require('path')
const express = require('express')
const reload = require('reload')
const app = express()

let config = require('./config.js').values;
let configPath = require('./config.js').path;
console.log(config);

let IsPlaying = {};

function reloadServer(app) {
    console.log('Try to reload server..');
    reload(app).then(function (reloadReturned) {
        try {
          app.listen(config.port);
          console.log('Server reloaded');
        } catch(err) {
          console.error('Reload could not start, could not start server/sample app', err)
        }
    })
}

function stopSound() {
    try {
        IsPlaying.kill();
    } catch(err) {
        console.error(err);
        return err;
    }
}

function getSoundFiles(path){
    try {
        files = fs.readdirSync(path);
        return files;
    } catch(err) {
        console.error(err);
        return err;
    }
}
function playSoundFile(file){
    console.log(IsPlaying);
    if(Object.keys(IsPlaying).length !== 0){
        IsPlaying.kill();
    }
    IsPlaying = player.play(file, function(err){
        if (err && !err.killed) return err
    })
}


app.get('/soundfiles', async (req, res) => {
  try {
    console.log('List files from config folder: %s', config.soundFilesPath);
    files = getSoundFiles(config.soundFilesPath);
    res.send(files);
  } catch (err) {
      console.error(err);
      res.send(err);
  }
})

app.get('/soundfiles/:file', (req, res) => {
  file = path.join(config.soundFilesPath, req.params.file);
  try {
    console.log('Play sound file: %s', file);
    playSoundFile(file);
    res.send(req.params.file);
  } catch (err) {
      console.error(err);
      res.send(err);
  }
})

app.get('/stop', (req, res) => {
  try {
    console.log('Stop sound');
    data = stopSound();
    res.send(data);
  } catch (err) {
      console.error(err);
      res.send(err);
  }
})

app.get('/config', (req, res) => {
    console.log('Get config');
    console.log(config);
    res.send(config);
})

app.get('/config/update', (req, res) => {
    console.log('Update config from: %s', configPath);
    config = require('./config.js');
    reloadServer(app);
    res.send(config);
})

app.listen(config.port);

// configure arguments for executable if any
// player.play('music.mp3', { afplay: ['-v', 1 ] [> lower volume for afplay on OSX <] }, function(err){
//   if (err) throw err
// })

// access the node child_process in case you need to kill it on demand
// var audio = player.play('.mp3', function(err){
//   if (err && !err.killed) throw err
// })
// audio.kill()// switch (expr) {
//   case 'Oranges':
//     console.log('Oranges are $0.59 a pound.');
//     break;
//   case 'Mangoes':
//   case 'Papayas':
//     console.log('Mangoes and papayas are $2.79 a pound.');

