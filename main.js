const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const Tray = electron.Tray
const image = electron.nativeImage
const Menu = electron.Menu

const path = require('path')
const url = require('url')

const AlarmMonitor = require("./main/AlarmMonitor")
const MainTimer = require("./main/MainTimer")

let gScreenSize;
let gMainWindow
let gAlarmWindows=[]
let gDayWindow
let gAlarmMonitor=new AlarmMonitor()
let gMainTimer=new MainTimer()

app.dock.hide()

app.on('ready', ()=>{
  gScreenSize=electron.screen.getPrimaryDisplay().workAreaSize;

  // createWindow()
  createTray()

  gAlarmMonitor.setAlarmFunc(gettedAlarmData)
  gAlarmMonitor.set()
  gMainTimer.setTimerCallback(timerRing)

  setTimeout(()=>{
    createDayWindow()
  },500)

  electron.powerMonitor.on("resume",()=>{
    console.log("resume");
    gAlarmMonitor.resume()
    gMainTimer.resumeTimer()
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

//dayウィンドウ生成
function createDayWindow(){
  if(gDayWindow!=null)return;
  gDayWindow = new BrowserWindow({width: 466, height: 615,x: gScreenSize.width, y: 0, transparent: true, frame: false, resizable:false, hasShadowcd:false})
  gDayWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dayWindow/dayWindow.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // gDayWindow.webContents.openDevTools()

  gDayWindow.on('closed', function () {
    electron.session.defaultSession.clearCache(() => {})
    gDayWindow = null;
  })
}
//エディタウィンドウ生成
function createWindow () {
  if(gMainWindow!=null)return;
  gMainWindow = new BrowserWindow({width: 600, height: 700, transparent: true, frame: false, resizable:false, hasShadowcd:false})
  gMainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'page/main/main.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // gMainWindow.webContents.openDevTools()

  gMainWindow.on('closed', function () {
    electron.session.defaultSession.clearCache(() => {})
    gMainWindow = null;
  })
}
//アラームのウィンドウ生成
function createAlarmWindow(aName,aHour,aMinute,aType){
  for(let i=0;;i++){
    if(gAlarmWindows[i]!=null)continue;
    gAlarmWindows[i] = new BrowserWindow({width: 250, height: 250,x:250*i,y:0, transparent: true, frame: false, resizable:false, hasShadowcd:false})
    gAlarmWindows[i].loadURL(`file://${__dirname}/alarmWindow/alarmWindow.html?name=`+aName+"&hour="+aHour+"&minute="+aMinute+"&type="+aType)
    // gAlarmWindows[i].webContents.openDevTools()
    gAlarmWindows[i].on('closed', function () {
      gAlarmWindows[i]=null
    })
    return;
  }
}
//アラームウィンドウ生成データからウィンドウ生成
function gettedAlarmData(aData){
  createAlarmWindow(aData.data.name,aData.time.getHours(),aData.time.getMinutes(),aData.data.type)
}
//メインタイマーの時間がきた
function timerRing(aDate){
  createAlarmWindow("タイマー",aDate.getHours(),aDate.getMinutes(),"timer")
}

ipcMain.on("update",(e,a)=>{
  console.log("update");
  gAlarmMonitor.set();
})

ipcMain.on("getTimer",(e,a)=>{
  gMainWindow.send("getTimer",gMainTimer.getTimer())
})
ipcMain.on("setTimer",(e,a)=>{
  gMainTimer.setTimer(a)
})
ipcMain.on("stopTimer",(e,a)=>{
  gMainTimer.stopTimer()
})

//メニューバーにアイコン追加
function createTray(){
  mTray = new Tray(image.createFromPath(__dirname+"/image/icon.png").resize({width:20,height:20}));
  var tTrayMenu=[
    { label: "通知", click:createDayWindow },
    { label: "編集", click:createWindow },
  ]
  mTray.setContextMenu(Menu.buildFromTemplate(tTrayMenu));
  //ショートカットキー系
  var template = [{
    label: "Application",
    submenu: [
      { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      // { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
      ]}
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
