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
			if(aData.data[0]==null)return;
			this.timer=setTimeout(()=>{
				for(let i=0;i<aData.data.length;i++){
					this.alarmCallback({data:aData.data[i],time:aData.time})
				}
				this.set()
			},aData.time.getTime()-Date.now())
		})
	}
	review(aCallback){
		this.clearTimer()

	}
}
module.exports = AlarmMonitor;
