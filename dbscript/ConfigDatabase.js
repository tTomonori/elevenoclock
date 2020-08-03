let NeDatabase=require("./NeDatabase.js")
class ConfigDatabase extends NeDatabase{
	load(){
		super.load("database/config.db")
	}
	getDbDirPath(aCallback){
		this.db.find({"_id":"config"},(err,doc)=>{
			aCallback(doc[0].dbDirPath)
		})
	}
}

module.exports=ConfigDatabase
