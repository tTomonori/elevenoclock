const PlanDatabase = require("../dbscript/PlanDatabase");
const AlarmDatabase = require("../dbscript/AlarmDatabase");
const AlarmComparer = require("../data/AlarmComparer");

class AlarmSearcher{
	reload(aCallback){
		this.pDb=new PlanDatabase();
		this.pDb.load(()=>{
			this.aDb=new AlarmDatabase();
			this.aDb.load(()=>{
				aCallback();
			})
		})
	}
	getNextAlarm(aCallback){
		
	}
	getDataList(aCallback){
		this.pDb=new PlanDatabase()
		this.pDb.load(()=>{
			this.pDb.getAllPlans((aPlans)=>{
				this.aDb=new AlarmDatabase()
				this.aDb.load(()=>{
					this.aDb.getAllAlarms((aAlarms)=>{
						aCallback(aPlans.concat(aAlarms))
					})
				})
			})
		})
	}
	getNextAlarmData(aDate,aData){
		let tLatestTime
		let tDataList=[]
		for(let i=0;i<aData.length;i++){
			let tData=aData[i]
			if(!tData.alarmOn)continue;
			let tTime=searchLatestAlarm(tData)
			if(tTime==null)continue
			if(tDataList[0]==null){
				tDataList=[tData]
				tLatestTime=tTime
			}else{
				if(tTime.getTime()<tLatestTime.getTime()){
					tDataList=[tData]
					tLatestTime=tTime
				}else if(tTime.getTime()==tLatestTime.getTime()){
					tDataList.push(tData)
				}
			}
		}
		return {data:tDataList,time:tLatestTime}
	}
}
module.exports = AlarmSearcher;
