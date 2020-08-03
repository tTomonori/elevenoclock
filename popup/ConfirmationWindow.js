class ConfirmationWindow extends PopupWindow{
	confirm(aText,aCallback){
		this.callback=aCallback
		super.open()

		let tText=document.createElement("div")
		tText.innerHTML=aText
		tText.style.position="fixed"
		tText.style.top="60px"
		tText.style.left="50px"
		tText.style.fontSize="20px"
		this.popup.append(tText)

		let tButtonO=document.createElement("div")
		tButtonO.classList.add("buttonO")
		tButtonO.style.position="fixed"
		tButtonO.style.top="200px";
		tButtonO.style.left="50px"
		tButtonO.style.width="50px"
		tButtonO.style.height="50px"
		tButtonO.onclick=()=>{this.clickButtonO()}
		this.popup.append(tButtonO)

		let tButtonX=document.createElement("div")
		tButtonX.classList.add("buttonX")
		tButtonX.style.position="fixed"
		tButtonX.style.top="200px";
		tButtonX.style.left="280px"
		tButtonX.style.width="50px"
		tButtonX.style.height="50px"
		tButtonX.onclick=()=>{this.clickButtonX()}
		this.popup.append(tButtonX)

		let tImage=document.createElement("img")
		tImage.src=(Math.random()<0.5)?"../../image/stamp/1/download-30.png":"../../image/stamp/1/download-32.png"
		tImage.style.position="fixed"
		tImage.style.width="209px"
		tImage.style.top="340px"
		tImage.style.left="250px"
		this.popup.append(tImage)
	}
	clickButtonO(){
		super.close()
		this.callback(true)
	}
	clickButtonX(){
		super.close()
		this.callback(false)
	}
}
