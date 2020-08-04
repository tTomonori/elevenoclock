let Plan=require("../data/Plan.js")
let NeDatabase=require("./NeDatabase.js")
let ConfigDatabase=require("./ConfigDatabase.js")
class PlanDatabase extends NeDatabase{
	load(aCallback,aDirPath){
		if(aDirPath!=null){
			super.load(aDirPath+"/plans.db");
			aCallback();
			return;
		}
		this.configDb=new ConfigDatabase();
		this.configDb.load();
		this.configDb.getDbDirPath((aPath)=>{
			super.load(aPath+"/plans.db");
			aCallback();
		})
	}
	getAllPlans(aCallback){
		this.db.find({},(err,doc)=>{
			let tList=[]
			for(let i=0;i<doc.length;i++){
				let tPlan=new Plan()
				tPlan.init(doc[i])
				tList.push(tPlan)
			}
			aCallback(tList)
		})
	}
	getPlan(aId,aCallback){
		this.db.find({_id:aId},(err,doc)=>{
			let tPlan=new Plan()
			tPlan.init(doc[0]);
			aCallback(tPlan)
		})
	}
	//追加(失敗したらfalse)
	insert(aPlan,aCallback){
		this.get(aPlan._id,(a)=>{
			if(a!=null){//idが被った
				aCallback(false)
				return;
			}
			super.insert(aPlan.convertToObject(),()=>{aCallback(true)})
		})
	}
	update(aId,aPlan,aCallback){
		if(aId==aPlan._id){
			super.update(aId,aPlan.convertToObject(),()=>{aCallback(true)})
			return;
		}
		this.get(aId,(a)=>{
			if(a!=null){//idが被った
				aCallback(false)
				return;
			}
			super.update(aPlan.convertToObject(),()=>{aCallback(true)})
		})
	}
}

module.exports=PlanDatabase
