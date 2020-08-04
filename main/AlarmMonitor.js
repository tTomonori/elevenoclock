const AlarmSearcher = require("../main/AlarmSearcher");
class AlarmMonitor{
	constructor(){
		this.searcher=new AlarmSearcher()
	}
	setAlarmFunc(aFunc){
		this.alarmCallback=aFunc;
	}
	clearTimer(){
		if(this.timer!=null){
			clearTimeout(this.timer)
		}
	}
	set(){
		console.log("set");
		this.clearTimer()
		this.lastSetTime=new Date()
		this.searcher.getNextAlarm(this.lastSetTime,(aData)=>{
			if(aData.length==0)return;
			this.timer=setTimeout(()=>{
				for(let i=0;i<aData.length;i++){
					this.alarmCallback(aData[i])
				}
				this.set()
			},aData[0].time.getTime()-Date.now())
		})
	}
	resume(aCallback){
		this.clearTimer()
		this.searcher.getPassedAlarm(this.lastSetTime,new Date(),(aData)=>{
			for(let i=0;i<aData.length;i++){
				this.alarmCallback(aData[i])
			}
			setTimeout(()=>{this.set()},10)
		})
	}
}
module.exports = AlarmMonitor;
