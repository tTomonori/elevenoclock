const PlanDatabase = window.parent.require("../dbscript/PlanDatabase");
let gPlanDatabase

window.onload=()=>{
	gPlanDatabase=new PlanDatabase()
	gPlanDatabase.load(()=>{
		gPlanDatabase.getAllPlans((aData)=>{
			for(let i=0;i<aData.length;i++){
				let tData=aData[i]
				if(tData.isNearness(new Date())){
					addToBoard(tData)
				}
			}
			addSpaceToBoard()
			showUsagi()
		})
	})
}

function addToBoard(aPlan){
	let tBar=document.createElement("div")
	tBar.classList.add("bar")
	tBar.classList.add("left"+aPlan.getDaysLeft())

	let tLeftDay=document.createElement("div")
	tLeftDay.classList.add("leftDay")
	tBar.textContent=(aPlan.getDaysLeft()==0)?"本日!":"あと"+aPlan.getDaysLeft()+"日"
	tBar.append(tLeftDay);

	let tPlanName=document.createElement("div")
	tPlanName.classList.add("planName")
	tBar.textContent+=aPlan.name
	tBar.append(tPlanName);

	document.getElementById("content").append(tBar)
}
function addSpaceToBoard(){
	let tSpace=document.createElement("div")
	tSpace.style.height="200px"
	document.getElementById("content").append(tSpace)
}

function showUsagi(){
	let tUsas=["1/download-0.png","1/download-10.png","1/download-33.png","1/download-36.png","2/download-0.png","2/download-1.png","2/download-2.png","2/download-3.png","2/download-32.png"]
	let tIndex=Math.floor( Math.random()*(tUsas.length) );
	let tUsagi=document.getElementById("usagi")
	tUsagi.src="../image/stamp/"+tUsas[tIndex]
}
