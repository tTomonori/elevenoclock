//urlのパラメータ取得
var queryString = window.location.search;
var queryObject = new Object();
if(queryString){
  queryString = queryString.substring(1);
  var parameters = queryString.split('&');
  for (var i = 0; i < parameters.length; i++) {
    var element = parameters[i].split('=');
    var paramName = decodeURIComponent(element[0]);
    var paramValue = decodeURIComponent(element[1]);
    queryObject[paramName] = paramValue;
  }
}

const AlarmDatabase = window.parent.require("../../dbscript/AlarmDatabase");
const Alarm = window.parent.require("../../data/Alarm");
const AlarmFeild = window.parent.require("../../common/AlarmFeild");
let gId;
let gAlarmDb;
let gAlarm;
let gNew;
let gAlarmFeild;

window.onload=()=>{
  gId=queryObject.id;//urlから予定のid取得(id="+"の場合は新規作成)
  gAlarmDb=new AlarmDatabase()
  gAlarmDb.load(()=>{
    if(queryObject.id=="+"){
      gNew=true;
      gAlarm=new Alarm();
      gAlarm.init({});
      setEditor(gAlarm)
    }else{
      gNew=false;
      gAlarmDb.getAlarm(queryObject.id,(aAlarm)=>{
        gAlarm=aAlarm
        setEditor(gAlarm)
      })
    }
  })
}
//エディタに初期情報を入力
function setEditor(aAlarm){
  document.getElementsByName("name")[0].value=aAlarm.name
  document.getElementsByName("alarmOn")[0].checked=aAlarm.alarmOn
  document.getElementsByName("remark")[0].value=aAlarm.remark

  document.getElementById("garbageButton").onclick=()=>{clickButtonGarbage();}
  document.getElementById("buttonX").onclick=()=>{clickButtonX();}
  document.getElementById("buttonO").onclick=()=>{clickButtonO();}

  if(gNew){
    document.getElementById("garbageButton").remove()//ゴミばこボタン削除
  }
  setAlarmFeild(aAlarm)
}
//アラームフィールドに初期情報入力
function setAlarmFeild(aAlarm){
  gAlarmFeild=new AlarmFeild(document.getElementById("alarmFeild"))
  gAlarmFeild.setAlarmFeild(aAlarm.alarm)
}

//フォームの入力情報を元にPlanを作成
function getAlarmObject(){
  let tObject={}
  tObject.name=document.getElementsByName("name")[0].value
  tObject.alarmOn=document.getElementsByName("alarmOn")[0].checked
  tObject.remark=document.getElementsByName("remark")[0].value
  tObject.alarm=gAlarmFeild.convertToAlarmDictionary()
  return tObject;
}


function clickButtonGarbage(){
  let tConfirmation=new ConfirmationWindow()
  tConfirmation.confirm("ほんとに消しちゃってもいい？",(a)=>{
    if(a){
      //消す
      gAlarmDb.remove(gId,()=>{
				window.parent.sendUpdate()
        window.parent.openPage("alarm/alarm.html")
      })
    }
  })
}
function clickButtonX(){
  window.parent.openPage("alarm/alarm.html")
}
function clickButtonO(){
  let tObject= getAlarmObject()
  let tAlarm=new Alarm();
  tAlarm.init(tObject)
  if(gNew){
    gAlarmDb.insert(tAlarm,(a)=>{
      if(a){
				window.parent.sendUpdate()
        window.parent.openPage("alarm/alarm.html")
        return;
      }
      alart("同じアラームが登録済だよ",()=>{})
    })
  }else{
    gAlarmDb.update(gId,tAlarm,(a)=>{
      if(a){
				window.parent.sendUpdate()
        window.parent.openPage("alarm/alarm.html")
        return;
      }
      alart("同じアラームが登録済だよ",()=>{})
    })
  }
}

function alart(aText,aCallback){
  let tAlart= new AlartWindow()
  tAlart.alart(aText,aCallback)
}
