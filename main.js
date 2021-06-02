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
const img_files = []

// funcs
function isImage(filename) {
  const ext = filename.substring(filename.lastIndexOf('.') + 1);
    if (['png', 'jpeg', 'jpg'].includes(ext)) {
    return true
  } else {
    return false
  }
}

// API routing
ipcMain.on('img_files', (event, data) => {
  for (const elem of data) {
    if (isImage(elem)) {
      img_files.push(elem);
    }
  }
})

ipcMain.handle('img_files', (event) => {
  return(img_files)
})