const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')

let gMainWindow
let gAlarmWindows=[]

function createWindow () {

  gMainWindow = new BrowserWindow({width: 600, height: 700, transparent: true, frame: false, resizable:false, hasShadowcd:false})
  gMainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'page/main/main.html'),
    protocol: 'file:',
    slashes: true
  }))
  createAlarmWindow("テストのよていだよーん",20,9)
  setTimeout(()=>{createAlarmWindow("テストのよていだよーん",20,9)},5000)

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

function createAlarmWindow(aName,aHour,aMinute){
  for(let i=0;;i++){
    if(gAlarmWindows[i]!=null)continue;
    gAlarmWindows[i] = new BrowserWindow({width: 250, height: 250,x:250*i,y:0, transparent: true, frame: false, resizable:false, hasShadowcd:false})
    gAlarmWindows[i].loadURL(`file://${__dirname}/alarmWindow/alarmWindow.html?name=`+aName+"&hour="+aHour+"&minute="+aMinute)
    gAlarmWindows[i].webContents.openDevTools()
    gAlarmWindows[i].on('closed', function () {
      gAlarmWindows[i]=null
    })
    return;
  }
}

ipcMain.on("update",(e,a)=>{
  console.log("update");
})
ipcMain.on("getTimer",(e,a)=>{
  console.log("getTimer");
  gMainWindow.send("getTimer",{})
})
ipcMain.on("setTimer",(e,a)=>{
  console.log("setTimer");
})
