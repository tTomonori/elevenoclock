const MyDate=require("../common/MyDate.js")
class Plan{
	init(aPlan){
		this.name=(aPlan.name==null)?"新しい予定":aPlan.name
		this.time=(aPlan.time==null)?Date.now():Number(aPlan.time)
		this.myDate=new MyDate(this.time)
		this.year=this.myDate.getYear()+1900
		this.month=this.myDate.getMonth()+1
		this.date=this.myDate.getDate()
		this.day=this.myDate.getDayString
		this.period=(aPlan.period==null)?0:aPlan.period
		this.notice=(aPlan.notice==null)?0:aPlan.notice
		this.alarm=(aPlan.alarm==null)?[]:aPlan.alarm
		this.alarmOn=(aPlan.alarmOn==null)?true:aPlan.alarmOn
		this.remark=(aPlan.remark==null)?"":aPlan.remark
		this._id=this.time+this.name+this.period
	}
	//通知すべき予定
	isNearness(aDate){
		return aDate.getTime()>this.time-(this.notice*86400000)
	}
	//過ぎた予定
	isPast(aDate){
		return aDate.getTime()<this.time+(this.period*86400000)
	}
	//id判定
	isThisId(aId){
		return (aId==this._id)
	}
	//予定日までの日数
	getDaysLeft(){
		let tToday=new MyDate()
		tToday.setHours(0,0,0,0)
		let tProgramDate=new MyDate(this.time)
		tProgramDate.setHours(0,0,0,0)
		return Math.round((tProgramDate.getTime()-tToday.getTime())/86400000)
	}
	convertToObject(){
		let tObject={}
		tObject.name=this.name
		tObject.time=this.time
		tObject.period=this.period
		tObject.notice=this.notice
		tObject.alarm=this.alarm
		tObject.alarmOn=this.alarmOn
		tObject.remark=this.remark
		tObject._id=this._id
		return tObject
	}
}
module.exports=Plan
