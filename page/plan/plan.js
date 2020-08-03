const PlanDatabase = window.parent.require("../../dbscript/PlanDatabase");

window.onload=()=>{
	window.parent.cover(true)

	let planDb= new PlanDatabase();
	planDb.load(()=>{
		planDb.getAllPlans((aPlans)=>{
			createPlanBars(aPlans)
			moveBars(0,()=>{
				window.parent.cover(false)
			})
		})
	})
}

function createPlanBars(aData){
	let tContainer=document.getElementById("barContainer")
	let i;
	for(i=0;i<aData.length;i++){
		let tData=aData[i]
		let tBar=document.createElement("div")
		tBar.classList.add("planBar")
		if(i%3==0){
			tBar.classList.add("usagiPink")
		}else if(i%3==1){
			tBar.classList.add("usagiBlue")
		}else{
			tBar.classList.add("unicornPurple")
		}
		tBar.innerHTML="&nbsp&nbsp"+(tData.month<10?"&nbsp&nbsp":"")+(tData.month)+"月"
		tBar.innerHTML+=(tData.date<10?"&nbsp&nbsp":"")+(tData.date)+"日"
		tBar.innerHTML+="&nbsp&nbsp"+tData.name
		tBar.style.top=i*40+10+"px"
		tBar.onclick=()=>{
			clickPlan(tData)
		}
		tContainer.append(tBar)
	}
	//+バー追加
	let tBar=document.createElement("div")
	tBar.classList.add("planBar")
	if(i%3==0){
		tBar.classList.add("usagiPink")
	}else if(i%3==1){
		tBar.classList.add("usagiBlue")
	}else{
		tBar.classList.add("unicornPurple")
	}
	tBar.innerHTML="&nbsp&nbsp"+"＋"
	tBar.style.top=i*40+10+"px"
	tBar.onclick=()=>{
		clickPlan("+")
	}
	tContainer.append(tBar)
}
function clickPlan(aData){
	if(aData=="+"){
		window.parent.openPage("editPlan/editPlan.html?id=+")
	}else{
		window.parent.openPage("editPlan/editPlan.html?id="+aData._id)
	}
}

function moveBars(aMargin,aCallback){
	$("#barContainer").animate({marginLeft:aMargin},500,"linear",aCallback)
}
