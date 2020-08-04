const ipc=require("electron").ipcRenderer;
const gFrame = document.getElementById('page');

function openPage(aPage){
	gFrame.src="../"+aPage;
}
function cover(aBool){
	if(aBool){
		$("#frameCover").css("zIndex",5)
	}else{
		$("#frameCover").css("zIndex",-5)
	}
}

//予定やアラームを更新した時に呼ぶ
function sendUpdate(){
	ipc.send("update")
}



//TimerWindow用
let gGetTimerCallback
function getTimer(aCallback){
	gGetTimerCallback=aCallback
	ipc.send("getTimer")
}
ipc.on("getTimer",(e,a)=>{
	if(a==null)gGetTimerCallback(null)
	else gGetTimerCallback(new Date(a))
})
function setTimer(a){
	ipc.send("setTimer",a.getTime())
}
function stopTimer(a){
	ipc.send("stopTimer")
}


//window側
// var iframe = document.getElementById('page').contentWindow;
// iframe.postMessage({action: 'SyncMessage',message: 'Hello'}, '*' );


//iframe側
// window.parent.postMessage("s","*");

// window.addEventListener("message", function (e) {
// 	console.log(e.data)
// });
