const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')

const AlarmMonitor = require("./main/AlarmMonitor")

let gMainWindow
let gAlarmWindows=[]
let gAlarmMonitor=new AlarmMonitor()

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
app.on('ready', ()=>{
  createWindow()
  gAlarmMonitor.setAlarmFunc(gettedAlarmData)
  gAlarmMonitor.set()
  electron.powerMonitor.on("resume",()=>{
    gAlarmMonitor.review()
  })
})
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

//アラームのウィンドウ生成
function createAlarmWindow(aName,aHour,aMinute,aType){
  for(let i=0;;i++){
    if(gAlarmWindows[i]!=null)continue;
    gAlarmWindows[i] = new BrowserWindow({width: 250, height: 250,x:250*i,y:0, transparent: true, frame: false, resizable:false, hasShadowcd:false})
    gAlarmWindows[i].loadURL(`file://${__dirname}/alarmWindow/alarmWindow.html?name=`+aName+"&hour="+aHour+"&minute="+aMinute+"&type="+aType)
    gAlarmWindows[i].webContents.openDevTools()
    gAlarmWindows[i].on('closed', function () {
      gAlarmWindows[i]=null
    })
    return;
  }
}
//アラームウィンドウ生成データからウィンドウ生成
function gettedAlarmData(aData){
  createAlarmWindow(aData.data.name,aData.time.getHours(),aData.time.getMinutes(),aData.type)
}

ipcMain.on("update",(e,a)=>{
  console.log("update");
  gAlarmMonitor.set();
})
