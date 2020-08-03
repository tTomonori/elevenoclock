const PlanDatabase = require("../dbscript/PlanDatabase");
const AlarmDatabase = require("../dbscript/AlarmDatabase");

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
	getNextAlarm(){

	}
	getNextPlanAlarm(){

	}
	getNextAlarmAlarm(){

	}
}
module.exports = AlarmSearcher;
