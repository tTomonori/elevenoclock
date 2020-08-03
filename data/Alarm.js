const MyDate=require("../common/MyDate.js")
class Alarm{
	init(aData){
		this.name=(aData.name==null)?"新しいアラーム":aData.name
		this.alarm=(aData.alarm==null)?[]:aData.alarm
		this.alarmOn=(aData.alarmOn==null)?true:aData.alarmOn
		this.remark=(aData.remark==null)?"":aData.remark
		this._id=this.name
	}
	convertToObject(){
		let tObject={}
		tObject.name=this.name
		tObject.alarm=this.alarm
		tObject.alarmOn=this.alarmOn
		tObject.remark=this.remark
		tObject._id=this._id
		return tObject
	}
}
module.exports=Alarm
