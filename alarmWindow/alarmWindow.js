//urlのパラメータ取得
var queryString = window.location.search;
var queryObject = new Object();
if(queryString){
  queryString = queryString.substring(1);
  var parameters = queryString.split('&');
  for (var i = 0; i < parameters.length; i++) {
    var element = parameters[i].split('=');
    var paramName = decodeURIComponent(element[0]);
    var paramValue = decodeURIComponent(element[1]);
    queryObject[paramName] = paramValue;
  }
}

window.onload=()=>{
	let tNum=Math.ceil( Math.random()*12 );
	let tImg=document.getElementById("img")
	tImg.src="../image/card/c"+tNum+".png"

	let tName=document.getElementById("name")
	tName.textContent=queryObject.name

	let tTime=document.getElementById("time")
	tTime.textContent=queryObject.hour+"時"+queryObject.minute+"分"

	let tUsas=["1/download-0.png","1/download-10.png","1/download-33.png","1/download-36.png","2/download-0.png","2/download-1.png",,"2/download-2.png","2/download-3.png","2/download-32.png"]
	let tIndex=Math.floor( Math.random()*(tUsas.length-1) );
	let tUsagi=document.getElementById("usagi")
	tUsagi.src="../image/stamp/"+tUsas[tIndex]
}
