function clickPlan(){
	closeAndOpen("plan/plan.html")
}
function clickAlarm(){
	closeAndOpen("alarm/alarm.html")
}
function clickTimer(){
	closeAndOpen("timer/timer.html")
}
function clickPrePlan(){
	closeAndOpen("passed/passed.html")
}

function closeAndOpen(aFile){
	window.parent.cover(true)
	moveBars(700,()=>{
		window.parent.cover(false)
		window.parent.openPage(aFile);
	})
}


window.onload=()=>{
	window.parent.cover(true)
	moveBars(0,()=>{
		window.parent.cover(false)
	})
}

function moveBars(aMargin,aCallback){
	$("#barContainer").animate({marginLeft:aMargin},500,"linear",aCallback)
}
