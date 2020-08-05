let NeDatabase=require("./NeDatabase.js")
class ConfigDatabase extends NeDatabase{
	load(){
		// super.load("database/config.db")
	}
	getDbDirPath(aCallback){
		aCallback("/Users/tomo/Library/myTools/11o'clock_plans");
		return;

		this.db.find({"_id":"config"},(err,doc)=>{
			aCallback(doc[0].dbDirPath)
		})
	}
}

module.exports=ConfigDatabase
