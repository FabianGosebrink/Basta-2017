const { app, BrowserWindow, globalShortcut, Menu, ipcMain, dialog } = require('electron');
const fs = require('fs');

const path = require('path');
const url = require('url');
const cpuValues = require('./cpuValues');
const trayIcon = require('./trayIcon');

let mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  globalShortcut.register('CmdOrCtrl+Shift+i', () => {
    mainWindow.webContents.toggleDevTools();
  });

  trayIcon.buildTrayIcon(mainWindow);
  startSendCpuValues();
});

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('save-picture', function (event, arg) {
  var data = arg.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');

  dialog.showSaveDialog({
    filters: [
      { name: 'Images', extensions: ['png'] },
    ]
  }, (fileName) => {
    if (fileName === undefined) {
      console.log("You didn't save the file because you exit or didn't give a name");
      return;
    }
    fs.writeFile(fileName, buf, (err) => {
      if (err) {
        console.log("Cannot save the file");
      }
    });
  });
});

let startSendCpuValues = () => {
  setInterval(() => {
    cpuValues.getCPUUsage((percentage) => {
      console.log("sending to ipc channel: " + percentage);
      if (mainWindow) {
        mainWindow.webContents.send('newCpuValue', (percentage * 100).toFixed(2));
      }
    });
  }, 1000);
}
