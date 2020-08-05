let gStart=false;
let gInterval;
let gDate;
window.onload=()=>{
	window.parent.getTimer((a)=>{
		if(a==null)return;
		console.log(a);
		gStart=true;
		gDate=a;
		document.getElementsByClassName("textAlarm")[0].style.display="none"
		document.getElementsByClassName("divAlarm")[0].style.display="block"
		setTimerInterval()
	})
}


function clickStart(){
	if(gStart)return;
	let tObject=getTimeFromTextFeild();
	if(tObject==null)return;
	gStart=true;
	document.getElementsByClassName("textAlarm")[0].style.display="none"
	document.getElementsByClassName("divAlarm")[0].style.display="block"

	gDate=convertToDate(tObject)
	setTimerInterval()
	window.parent.setTimer(gDate)
}
function clickStop(){
	if(!gStart)return;
	gStart=false;
	clearInterval(gInterval)
	document.getElementsByClassName("textAlarm")[0].style.display="block"
	document.getElementsByClassName("divAlarm")[0].style.display="none"
	displayTimeObject(getTimeFromDivFeild())
	window.parent.stopTimer()
}

function getTimeFromTextFeild(){
	let tFeild=document.getElementsByClassName("textFeild")
	let tObject={h:Number(tFeild[0].value),m:Number(tFeild[1].value),s:Number(tFeild[2].value),ms:Number(tFeild[3].value)}
	if(!isNaN(tObject.h)&&!isNaN(tObject.m)&&!isNaN(tObject.s)&&!isNaN(tObject.ms))return tObject;
	else return null;
}
function getTimeFromDivFeild(){
	let tFeild=document.getElementsByClassName("divFeild")
	let tObject={h:Number(tFeild[0].textContent),m:Number(tFeild[1].textContent),s:Number(tFeild[2].textContent),ms:Number(tFeild[3].textContent)}
	if(!isNaN(tObject.h)&&!isNaN(tObject.m)&&!isNaN(tObject.s)&&!isNaN(tObject.ms))return tObject;
	else return null;
}
function convertToDate(aObject){
	let tTime=0;
	tTime+=aObject.ms;
	tTime+=aObject.s*1000
	tTime+=aObject.m*1000*60
	tTime+=aObject.h*1000*60*60
	return new Date(Date.now()+tTime)
}
function setTimerInterval(){
	gInterval=setInterval(()=>{
		if(gDate.getTime()<Date.now()){
			displayLeftTime(new Date())
			clearInterval(gInterval)
			return;
		}
		displayLeftTime(gDate)
	},10)
}
function displayLeftTime(aDate){
	let tTime=aDate.getTime()-Date.now()
	let tFeild=document.getElementsByClassName("divFeild")
	tFeild[0].textContent=("00"+Math.floor(tTime/1000/60/60)).slice(-2)
	tTime=tTime%(1000*60*60)
	tFeild[1].textContent=("00"+Math.floor(tTime/1000/60)).slice(-2)
	tTime=tTime%(1000*60)
	tFeild[2].textContent=("00"+Math.floor(tTime/1000)).slice(-2)
	tTime=tTime%(1000)
	tFeild[3].textContent=("00"+Math.floor(tTime/10)).slice(-2)
}
function displayTimeObject(aObject){
	let tFeild=document.getElementsByClassName("textFeild")
	tFeild[0].value=aObject.h
	tFeild[1].value=aObject.m
	tFeild[2].value=aObject.s
	tFeild[3].value=aObject.ms
}
