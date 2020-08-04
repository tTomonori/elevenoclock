const MyDate = require("../common/MyDate");
class AlarmComparer{
	static searchLatestAlarm(aDate,aAlarms){
		let tLatest=null
		for(let i=0;i<aAlarms.length;i++){
			let tAlarm=aAlarms[i]
			let tDate=this.getNextAlarm(aDate,tAlarm)
			if(tDate==null)continue;
			if(tLatest==null){
				tLatest=tDate
			}else{
				if(tDate.getTime()<tLatest.getTime()){
					tLatest=tDate
				}
			}
		}
		return tLatest
	}
	static searchPassedAlarm(aDate1,aDate2,aAlarms){
		let tList=[]
		for(let i=0;i<aAlarms.length;i++){
			let tAlarm=aAlarms[i]
			let tDate=this.getPassedAlarm(aDate1,aDate2,tAlarm)
			if(tDate==null)continue;
			tList.push(tDate)
		}
		return tList
	}
	static getNextAlarm(aDate,aAlarm){
		let tDate=new MyDate(aAlarm.time)
		switch (aAlarm.par) {
			case "parDate":
				let tParDate=new MyDate(aDate.getTime())
				tParDate.nextHours(tDate.getHours(),tDate.getMinutes())
				return tParDate;
				break;
			case "parWeek":
				let tParWeek=new MyDate(aDate.getTime())
				tParWeek.nextDayOfWeek(tDate.getDay())
				tParWeek.setHours(tDate.getHours(),tDate.getMinutes(),0,0)
				if((tParWeek.getTime()-aDate.getTime())<0){
					tParWeek.setDate(tParWeek.getDate()+7)
				}
				return tParWeek;
				break;
			case "onTime":
				if(tDate.getTime()<aDate.getTime())return null;
				return tDate;
				break;
			default:throw new Error("PopupWindow : 「"+aAlarm.par+"」ってなに?");
		}
	}
	static getPassedAlarm(aDate1,aDate2,aAlarm){
		let tDate=new MyDate(aAlarm.time)
		switch (aAlarm.par) {
			case "parDate":
				let tParDate=new MyDate(aDate1.getTime())
				tParDate.nextHours(tDate.getHours(),tDate.getMinutes())
				if(tParDate.getTime()<aDate2.getTime())return tParDate;
				else return null;
				break;
			case "parWeek":
				let tParWeek=new MyDate(aDate1.getTime())
				tParWeek.nextDayOfWeek(tDate.getDay())
				tParWeek.setHours(tDate.getHours(),tDate.getMinutes(),0,0)
				if((tParWeek.getTime()-aDate1.getTime())<0){
					tParWeek.setDate(tParWeek.getDate()+7)
				}
				if(tParWeek.getTime()<aDate2.getTime())return tParWeek;
				else return null;
				break;
			case "onTime":
				if(aDate1.getTime()<=tDate.getTime()&&tDate.getTime()<=aDate2.getTime())return tDate;
				else return null;
				break;
			default:throw new Error("PopupWindow : 「"+aAlarm.par+"」ってなに?");
		}
	}
}
module.exports = AlarmComparer;
