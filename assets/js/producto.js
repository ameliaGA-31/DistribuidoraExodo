window.onload=initialiceProduct();
function initialiceProduct(){
	//para obtener o entrar a ella CUANDO ESTOY EN LA OTRA PAG
		let unproducto=sessionStorage.getItem("objetoC");
		let objetoRegresado=JSON.parse(unproducto);
		console.log("objetoRegresado",objetoRegresado);
}
console.log("dataValue",dataValue);