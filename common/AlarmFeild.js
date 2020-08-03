const MyDate=require("../common/MyDate.js")
class AlarmFeild{
	constructor(aFeild){
		this.feild=aFeild
	}
	//アラーム欄設定
	setAlarmFeild(aAlarms){
		for(let tAlarm of aAlarms){
			let tBar=this.createAlarmBar()
			this.setAlarmBar(tBar,tAlarm)
			this.feild.insertBefore(tBar,this.feild.lastElementChild)
		}
		//アラーム追加ボタン
		this.feild.querySelector("[name=newAlarmButton]").onclick=()=>{
			let tBar=this.createAlarmBar()
			this.setAlarmBar(tBar,{par:"parDate",time:Date.now()})
			this.feild.insertBefore(tBar,this.feild.lastElementChild)
		}
	}
	//アラーム設定
 setAlarmBar(aBar,aAlarm){
		let tOptions=aBar.querySelectorAll(".alarmOption")
		//optionの表示非表示設定
		for(let tOption of tOptions){
			if(!tOption.classList.contains(aAlarm.par+"Option"))tOption.style.display="none"
			else tOption.style.display="inline"
		}
		//削除ボタン
		let tGarbageButton=aBar.querySelector(".garbageButton")
		tGarbageButton.onclick=()=>{
			aBar.remove()
		}
		//アラームタイプ変更時
		let tTypeSelector=aBar.querySelector("[name=alarmType]")
		tTypeSelector.value=aAlarm.par
		tTypeSelector.onchange=()=>{
			this.setAlarmBar(aBar,{par:tTypeSelector.value,time:Date.now()})
		}
		//情報表示
		let tOption=aBar.querySelector("."+aAlarm.par+"Option")
		let tDate=new MyDate(aAlarm.time)
		switch (aAlarm.par) {
			case "parDate":
			tOption.querySelector("[name=hour]").value=tDate.getHours()
			tOption.querySelector("[name=minute]").value=tDate.getMinutes()
			break;
			case "parWeek":
			tOption.querySelector("[name=dayOfWeek]").selectedIndex=tDate.getDay()
			tOption.querySelector("[name=hour]").value=tDate.getHours()
			tOption.querySelector("[name=minute]").value=tDate.getMinutes()
			break;
			case "onTime":
			tOption.querySelector("[name=year]").value=tDate.getFullYear()
			tOption.querySelector("[name=month]").value=tDate.getMonth()+1
			tOption.querySelector("[name=date]").value=tDate.getDate()
			tOption.querySelector("[name=hour]").value=tDate.getHours()
			tOption.querySelector("[name=minute]").value=tDate.getMinutes()
			break;
			default:throw new Error("PopupWindow : 「"+aAlarm.par+"」ってなに?");
		}
	}
	//アラーム欄をdictionaryの配列に
 convertToAlarmDictionary(){
		let tList=[]
		for(let tBar of this.feild.querySelectorAll(".alarmBar")){
			let tDic={}
			tDic.par=tBar.querySelector("[name=alarmType]").value
			let tOption=tBar.querySelector("."+tDic.par+"Option")
			let tDate=new MyDate()
			switch (tDic.par) {
				case "parDate":
				tDate.setHours(tOption.querySelector("[name=hour]").value,tOption.querySelector("[name=minute]").value)
				break;
				case "parWeek":
				tDate.setHours(tOption.querySelector("[name=hour]").value,tOption.querySelector("[name=minute]").value)
				tDate.nextDayOfWeek(tOption.querySelector("[name=dayOfWeek]").selectedIndex)
				break;
				case "onTime":
				tDate.nextHours(tOption.querySelector("[name=hour]").value,tOption.querySelector("[name=minute]").value)
				tDate.setMonth(tOption.querySelector("[name=month]").value-1)
				tDate.setDate(tOption.querySelector("[name=date]").value)
				tDate.setYear(tOption.querySelector("[name=year]").value)
				break;
				default:throw new Error("PopupWindow : 「"+tDic.par+"」ってなに?");
			}
			tDic.time=tDate.getTime()
			tList.push(tDic)
		}
		return tList
	}
	createAlarmBar(){
		let tBar=document.createElement("div")
		tBar.classList.add("alarmBar")
		tBar.innerHTML='	<select class="" name="alarmType">'+
		'<option value="parDate">毎日</option><option value="parWeek">毎週</option><option value="onTime">指定時間</option>'+
		'</select>'+
		'<div class="parDateOption alarmOption">'+
			'<input class="textFeild" placeholder="0" type="number" min="0" max="23" name="hour" value="" maxlength="2" style="width:2ch;">時'+
			'<input class="textFeild" placeholder="0" type="number" min="0" max="59" name="minute" value="" maxlength="2" style="width:2ch;">分'+
		'</div>'+
		'<div class="parWeekOption alarmOption">'+
			'<select class="" name="dayOfWeek">'+
				'<option value="0">日</option><option value="1">月</option><option value="2">火</option><option value="3">水</option>'+
				'<option value="4">木</option><option value="5">金</option><option value="6">土</option>'+
			'</select>曜日'+
			'<input class="textFeild" placeholder="0" type="number" min="0" max="23" name="hour" value="" maxlength="2" style="width:2ch;">時'+
			'<input class="textFeild" placeholder="0" type="number" min="0" max="59" name="minute" value="" maxlength="2" style="width:2ch;">分'+
		'</div>'+
		'<div class="onTimeOption alarmOption">'+
			'<input class="textFeild" placeholder="2000" type="number" min="2000" max="3000" name="year" value="" maxlength="4" style="width:4ch;">年'+
			'<input class="textFeild" placeholder="1" type="number" min="1" max="12" name="month" value="" maxlength="2" style="width:2ch;">月'+
			'<input class="textFeild" placeholder="1" type="number" min="1" max="31" name="date" value="" maxlength="2" style="width:2ch;">日'+
			'<input class="textFeild" placeholder="0" type="number" min="0" max="23" name="hour" value="" maxlength="2" style="width:2ch;">時'+
			'<input class="textFeild" placeholder="0" type="number" min="0" max="59" name="minute" value="" maxlength="2" style="width:2ch;">分'+
		'</div>'+
		'<div class="garbageButton" style="width:19px;height:24px;"></div>'
		return tBar
	}
}
module.exports = AlarmFeild;
