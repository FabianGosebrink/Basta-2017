const {ipcRenderer} = require('electron');

console.log("from renderer...");

console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
});

ipcRenderer.send('asynchronous-message', 'ping')