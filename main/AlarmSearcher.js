const ConfigDatabase = require("../dbscript/ConfigDatabase");
const PlanDatabase = require("../dbscript/PlanDatabase");
const AlarmDatabase = require("../dbscript/AlarmDatabase");
const AlarmComparer = require("../data/AlarmComparer");

class AlarmSearcher{
	getDbDirPath(aCallback){
		if(this.dirPath!=null){
			aCallback(this.dirPath)
			return;
		}
		this.cDb=new ConfigDatabase();
		this.cDb.load();
		this.cDb.getDbDirPath((aPath)=>{
				this.dirPath=aPath
				aCallback(aPath)
		})
	}
	reload(aCallback){
		this.getDbDirPath((aPath)=>{
			this.pDb=new PlanDatabase();
			this.pDb.load(()=>{
				this.aDb=new AlarmDatabase();
				this.aDb.load(()=>{
					aCallback();
				},aPath)
			},aPath)
		})
	}
	getNextAlarm(aDate,aCallback){
		this.getDataList((aList)=>{
			aCallback(this.getNextAlarmData(aDate,aList))
		})
	}
	getPassedAlarm(aDate1,aDate2,aCallback){
		this.getDataList((aList)=>{
			aCallback(this.getPassedAlarmData(aDate1,aDate2,aList))
		})
	}
	getDataList(aCallback){
		this.reload(()=>{
			this.pDb.getAllPlans((aPlans)=>{
				this.aDb.getAllAlarms((aAlarms)=>{
					aCallback(aPlans.concat(aAlarms))
				})
			})
		})
	}
	getNextAlarmData(aDate,aList){
		let tLatestTime
		let tDataList=[]
		for(let i=0;i<aList.length;i++){
			let tData=aList[i]
			if(!tData.alarmOn)continue;
			let tTime=AlarmComparer.searchLatestAlarm(aDate,tData.alarm)
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
	getPassedAlarmData(aDate1,aDate2,aList){

	}
}
module.exports = AlarmSearcher;
