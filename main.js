const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')

let gMainWindow

function createWindow () {

  gMainWindow = new BrowserWindow({width: 600, height: 700, transparent: true, frame: false, resizable:false, hasShadowcd:false})
  gMainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'page/main/main.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  gMainWindow.webContents.openDevTools()


  gMainWindow.on('closed', function () {
    electron.session.defaultSession.clearCache(() => {})
    gMainWindow = null;
  })
}


app.on('ready', createWindow)


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (gMainWindow === null) {
    createWindow()
  }
})

ipcMain.on("update",(e,a)=>{
  console.log("update");
})
