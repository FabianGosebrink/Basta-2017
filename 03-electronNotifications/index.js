const { app, BrowserWindow, globalShortcut, Menu, ipcMain } = require('electron');

const path = require('path');
const url = require('url');

let mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  });

  // console.log("from main process --> " + __dirname);
  console.log(`from main process --> ${__dirname}`);

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  globalShortcut.register('CmdOrCtrl+Shift+i', () => {
    mainWindow.webContents.toggleDevTools();
  });
});
