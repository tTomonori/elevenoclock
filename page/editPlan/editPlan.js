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

const PlanDatabase = window.parent.require("../../dbscript/PlanDatabase");
const Plan = window.parent.require("../../data/Plan");
const AlarmFeild = window.parent.require("../../common/AlarmFeild");
let gId;
let gPlanDb;
let gPlan;
let gNew;
let gAlarmFeild;

window.onload=()=>{
  gId=queryObject.id;//urlから予定のid取得(id="+"の場合は新規作成)
  gPlanDb=new PlanDatabase()
  gPlanDb.load(()=>{
    if(queryObject.id=="+"){
      gNew=true;
      gPlan=new Plan();
      gPlan.init({});
      setEditor(gPlan)
    }else{
      gNew=false;
      gPlanDb.getPlan(queryObject.id,(aPlan)=>{
        gPlan=aPlan
        setEditor(gPlan)
      })
    }
  })
}
//エディタに初期情報を入力
function setEditor(aPlan){
  document.getElementsByName("name")[0].value=aPlan.name
  document.getElementsByName("year")[0].value=aPlan.year
  document.getElementsByName("month")[0].value=aPlan.month
  document.getElementsByName("date")[0].value=aPlan.date
  document.getElementsByName("period")[0].value=aPlan.period
  document.getElementsByName("notice")[0].value=aPlan.notice
  document.getElementsByName("alarmOn")[0].checked=aPlan.alarmOn
  document.getElementsByName("remark")[0].value=aPlan.remark

  document.getElementById("garbageButton").onclick=()=>{clickButtonGarbage();}
  document.getElementById("buttonX").onclick=()=>{clickButtonX();}
  document.getElementById("buttonO").onclick=()=>{clickButtonO();}

  if(gNew){
    document.getElementById("garbageButton").remove()//ゴミばこボタン削除
  }
  setAlarmFeild(aPlan)
}
//アラームフィールドに初期情報入力
function setAlarmFeild(aPlan){
  gAlarmFeild=new AlarmFeild(document.getElementById("alarmFeild"))
  gAlarmFeild.setAlarmFeild(aPlan.alarm)
}

//フォームの入力情報を元にPlanを作成
function getPlanObject(){
  let tObject={}
  tObject.name=document.getElementsByName("name")[0].value
  tObject.period=document.getElementsByName("period")[0].value
  tObject.notice=document.getElementsByName("notice")[0].value
  tObject.alarmOn=document.getElementsByName("alarmOn")[0].checked
  tObject.remark=document.getElementsByName("remark")[0].value
  tObject.time=new Date(document.getElementsByName("year")[0].value,document.getElementsByName("month")[0].value-1,document.getElementsByName("date")[0].value).getTime()
  tObject.alarm=gAlarmFeild.convertToAlarmDictionary()
  return tObject;
}


function clickButtonGarbage(){
  let tConfirmation=new ConfirmationWindow()
  tConfirmation.confirm("ほんとに消しちゃってもいい？",(a)=>{
    if(a){
      //消す
      gPlanDb.remove(gId,()=>{
        window.parent.sendUpdate()
        window.parent.openPage("plan/plan.html")
      })
    }
  })
}
function clickButtonX(){
  window.parent.openPage("plan/plan.html")
}
function clickButtonO(){
  let tObject= getPlanObject()
  let tPlan=new Plan();
  tPlan.init(tObject)
  if(gNew){
    gPlanDb.insert(tPlan,(a)=>{
      if(a){
        window.parent.sendUpdate()
        window.parent.openPage("plan/plan.html")
        return;
      }
      alart("同じ予定が登録済だよ",()=>{})
    })
  }else{
    gPlanDb.update(gId,tPlan,(a)=>{
      if(a){
        window.parent.sendUpdate()
        window.parent.openPage("plan/plan.html")
        return;
      }
      alart("同じ予定が登録済だよ",()=>{})
    })
  }
}

function alart(aText,aCallback){
  let tAlart= new AlartWindow()
  tAlart.alart(aText,aCallback)
}
