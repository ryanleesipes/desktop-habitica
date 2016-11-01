'use strict';

const fs = require('fs');
const path = require('path');
const electron = require('electron');
const appMenu = require('./menu');
const windowStateKeeper = require('electron-window-state');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

app.on('ready', () => {
    if (!isEmptyObject(appMenu)) {
        electron.Menu.setApplicationMenu(appMenu);
    }

    let mainWindowState = windowStateKeeper({
      defaultWidth: 1000,
      defaultHeight: 800
    });

    function createWindow() {

      mainWindow = new BrowserWindow({
          title: app.getName(),
          'x': mainWindowState.x,
          'y': mainWindowState.y,
          'width': mainWindowState.width,
          'height': mainWindowState.height,
          minWidth: 500,
          minHeight: 300,
          webPreferences: {
              nodeIntegration: false
          }
      });

      mainWindow.loadURL('https://habitica.com/#/tasks');
      mainWindow.setMenu(null);
      //Menu bar kept around in event that we want to use in future.
      //mainWindow.setAutoHideMenuBar(true);

      mainWindow.on('closed', () => {
          mainWindow = null;
      });
    }

    createWindow();

    mainWindowState.manage(mainWindow);

    const page = mainWindow.webContents;
    page.on('dom-ready', () => {
        page.insertCSS(
            fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
    })
});

// Quit when all windows are closed, except on OS X
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {

});

// On OS X, recreate app window if dock icon is clicked and no windows are open
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
