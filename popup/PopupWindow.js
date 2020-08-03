class PopupWindow{
	open(){
		let tBody=document.getElementsByTagName("body")[0]
		let tPopup=document.createElement("div");
		tPopup.style.position="fixed";
		tPopup.style.width="100%";
		tPopup.style.height="100%";
		tPopup.style.top="0";
		tPopup.style.left="0";
		let tImage=document.createElement("img")
		tImage.src="../../image/notebook.png"
		tImage.style.position="fixed"
		tImage.style.width="80%";
		tImage.style.top="20px";
		tImage.style.left="20px";
		tPopup.append(tImage)
		tBody.append(tPopup)

		this.popup=tPopup
	}
	close(){
		this.popup.remove()
	}
}
