window.onload=()=>{
	window.parent.getTimer((a)=>{
		if(a=={}){
			setTimerForm({timerType:"afterTime",time:0})
		}else {
			setTimerForm(a)
		}
	})
}

function setTimerForm(a){
	switch (a.timerType) {
		case "afterTime":

			break;
		case "onTime":

			break;
		default:

	}
}
