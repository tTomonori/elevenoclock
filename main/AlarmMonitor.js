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
		this.clearTimer()
		this.lastSetTime=new Date()
		this.searcher.getNextAlarm(this.lastSetTime,(aData)=>{
			if(aData[0]==null)return;
			console.log(aData);
			this.timer=setTimeout(()=>{
				for(let i=0;i<aData.length;i++){
					this.alarmCallback(aData[i])
				}
				this.set()
			},aData[0].time.getTime()-Date.now())
		})
	}
	review(aCallback){
		this.clearTimer()
		this.searcher.getPassedAlarm(this.lastSetTime,new Date(),(aData)=>{
			for(let i=0;i<aData.length;i++){
				this.alarmCallback(aData[i])
			}
		})
		this.set()
	}
}
module.exports = AlarmMonitor;
