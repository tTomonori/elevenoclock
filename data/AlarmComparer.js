class AlarmComparer{
	searchLatestAlarm(aDate,aAlarms){
		let tLatest=null
		for(let i=0;i<aAlarms.length;i++){
			let tAlarm=aAlarms[i]
			let tDate=getNextAlarm(aDate,tAlarm)
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
	searchPassedAlarm(aDate1,aDate2,aAlarms){
		let tList=[]
		for(let i=0;i<aAlarms.length;i++){
			let tAlarm=aAlarms[i]
			let tDate=getPassedAlarm(aDate1,aDate2,tAlarm)
			if(tDate==null)continue;
			tList.push(tDate)
		}
		return tList
	}
	getNextAlarm(aDate,aAlarm){
		let tDate=new MyDate(aAlarm.time)
		switch (aAlarm.par) {
			case "parDate":
				let tNextDate=new MyDate(aDate.getTime())
				tNextDate.nextHours(tDate.getHours(),tDate.getMinutes())
				return tNextDate;
				break;
			case "parWeek":
				let tNextDate=new MyDate(aDate.getTime())
				tNextDate.nextDayOfWeek(tDate.getDay())
				tNextDate.setHours(tDate.getHours(),tDate.getMinutes(),0,0)
				if((tNextDate.getTime()-aDate.getTime())<0){
					tNextDate.setDate(tNextDate.getDate()+7)
				}
				return tNextDate;
				break;
			case "onTime":
				if(tDate.getTime()<aData.getTime())return null;
				return tDate;
				break;
			default:throw new Error("PopupWindow : 「"+aAlarm.par+"」ってなに?");
		}
	}
	getPassedAlarm(aDate1,aDate2,aAlarm){
		let tDate=new MyDate(aAlarm.time)
		switch (aAlarm.par) {
			case "parDate":
				let tNextDate=new MyDate(aDate1.getTime())
				tNextDate.setDate(tNextDate.getDate()-1)
				tNextDate.nextHours(tDate.getHours(),tDate.getMinutes())
				if(tNextDate.getTime()<aDate2.getTime())return tNextDate;
				else return null;
				break;
			case "parWeek":
				let tNextDate=new MyDate(aDate1.getTime())
				tNextDate.nextDayOfWeek(tDate.getDay())
				tNextDate.setHours(tDate.getHours(),tDate.getMinutes(),0,0)
				if((tNextDate.getTime()-aDate1.getTime())<0){
					tNextDate.setDate(tNextDate.getDate()+7)
				}
				if(tNextDate.getTime()<aData2.getTime())return tNextDate;
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
