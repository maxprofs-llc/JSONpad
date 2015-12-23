/* eslint strict: 0 */

'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
const shell = electron.shell;

let menu;
let template;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

crashReporter.start({
  productName: 'JSONpad',
  companyName: 'ShrimpDev',
  submitURL: '',
  autoSubmit: false
});

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 728 });

  if (process.env.HOT) {
    mainWindow.loadURL('file://${__dirname}/app/hot-dev-app.html');
  } else {
    mainWindow.loadURL('file://${__dirname}/app/app.html');
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  if (process.platform === 'darwin') {
    template = [{
      label: 'Main',
      submenu: [{
        label: 'About JSONpad',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
//  }
//      label: 'Edit',
//      submenu: [{
//        label: 'Undo',
//        accelerator: 'Command+Z',
//        selector: 'undo:'
//      }, {
//        label: 'Redo',
//        accelerator: 'Shift+Command+Z',
//        selector: 'redo:'
//      }, {
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&Main',
      submenu: [{
        label: '&About JSONpad',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close();
        }
      }]
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});
