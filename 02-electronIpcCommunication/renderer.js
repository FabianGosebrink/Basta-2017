const {ipcRenderer} = require('electron');

let message = ipcRenderer.sendSync('synchronous-message', 'ping');
console.log(message) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
});

ipcRenderer.send('asynchronous-message', 'ping')