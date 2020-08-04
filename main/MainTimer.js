class MainTimer{
	setTimerCallback(aCallback){
		this.callback=aCallback
	}
	getTimer(){
		if(this.targetTime==null)return null;
		else return this.targetTime.getTime()
	}
	setTimer(aTime){
		this.targetTime=new Date(aTime)
		this.set()
	}
	stopTimer(){
		clearTimeout(this.timer)
		this.targetTime=null
	}
	resumeTimer(){
		if(this.targetTime==null)
		return
		clearTimeout(this.timer)
		this.set()
	}
	set(){
		this.timer=setTimeout(()=>{
			this.callback(this.targetTime)
			this.targetTime=null
		},this.targetTime.getTime()-Date.now())
	}
}
module.exports = MainTimer;
