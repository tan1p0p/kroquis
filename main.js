const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  mainWindow.loadFile('./view/html/index.html')
  mainWindow.webContents.openDevTools()
}

// main app process
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', function () {
  app.quit()
})

// vars
let app_data = {}

// API routing
ipcMain.on('app_data', (event, data) => {
  app_data = data;
})

ipcMain.handle('app_data', (event) => {
  return(app_data)
})