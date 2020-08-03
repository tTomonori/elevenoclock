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

function sendUpdate(){
	ipc.send("update")
}

//window側
// var iframe = document.getElementById('page').contentWindow;
// iframe.postMessage({action: 'SyncMessage',message: 'Hello'}, '*' );


//iframe側
// window.parent.postMessage("s","*");

// window.addEventListener("message", function (e) {
// 	console.log(e.data)
// });
