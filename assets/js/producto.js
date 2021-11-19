var contadorInicial = 1;
let objeto;
window.onload=initialiceProduct();
//producto no funciona bien ....platicar con rosa
function initialiceProduct(){
	//para obtener o entrar a ella CUANDO ESTOY EN LA OTRA PAG
		let unproducto=sessionStorage.getItem("idProducto");
		let objetoRegresado=JSON.parse(unproducto);
		console.log("objetoRegresado",objetoRegresado);

		let dataVal=sessionStorage.getItem("dataValor");
		let dataReturn=JSON.parse(dataVal);
		//console.log(dataReturn,"dataReturn")
		let objetoProducto=dataReturn.filter(cadaObj=> cadaObj.id == objetoRegresado);
		setImages(objetoProducto[0]);
}

//traer imagenes pagina del producto
function setImages(productInfo) {
	console.log(productInfo,"productInfo",objeto,"objeto")
    let visor = document.getElementById('visor');
    let img1;
    	if(typeof productInfo.imagen === 'string'){
    		img1=productInfo.imagen;
    		document.getElementById('mainImg').innerHTML = `<img src="${img1}"/>`;
    		document.getElementById('listImg').setAttribute('class','hide'); 
    	}else{
    		img1=productInfo.imagen[0];
    		document.getElementById('mainImg').innerHTML = `<img src="${img1}"/>`;
    		document.getElementById('listImg').removeAttribute('class','hide');
    		document.getElementById('listImg').innerHTML = productInfo.imagen.map((url,idx) => `<img class="imgProduct" id="${idx}" src="${url}" />`).join('');
    	}; 
    	setEventImages();
		setInfoProduct(productInfo, "information");
    
}
//funcion de cada imagen en pag de producto las llamo y agrego evento
function setEventImages() {
  let images =Array.from(document.getElementsByClassName('imgProduct') );
  images.forEach(img => img.addEventListener('click', (img) => changeImg(img.target.id), false));
}
//funcion evento del cambio de imagen por la posicion
function changeImg(id) {
	let cambioImg=dataValue[7];
  document.getElementById('mainImg').innerHTML =  `<img src="${cambioImg.imagen[id]}"/>`;
}

//datos de cada producto en la pag de producto 
function setInfoProduct(infoCadaUno,nameNodo){
	console.log(infoCadaUno,"nodos")
	let nameProducto=document.getElementById("nameP");
	let contDatosProducto=document.getElementById(nameNodo);
	let price=document.getElementById("price");

	const divSize=document.createElement("div");
	divSize.setAttribute("class", "input-field col s3");
	const selectSize=document.createElement("select");
	selectSize.setAttribute("class","show");
	divSize.appendChild(selectSize);
	contDatosProducto.appendChild(divSize);

	nameProducto.innerHTML=`<div class="datoIndividual"> ${infoCadaUno.name}</div>`;
	let optionSize;
    	if(typeof infoCadaUno.size === 'string' & typeof infoCadaUno.price === 'string'){
    		optionSize=infoCadaUno.size;
    		document.getElementById('information').innerHTML = `<div>${optionSize}</div>`;
    		price.innerHTML=`<div>${infoCadaUno.price}</div>`
    		setTotalProduct();
    	}else{
	    	optionSize=infoCadaUno.size.map(medida=> `<option class="optionSize">${medida}</option>`);
			price.innerText=`${infoCadaUno.price[0]}`;
			setTotalProduct();
			selectSize.innerHTML=optionSize;
			selectSize.addEventListener('change',(e)=> setEventMedidas(e.target.selectedIndex),false);
	 };	 
	setEventContador();
}
function setTotalProduct(){
	let total=document.getElementById("total");
	var contador = document.getElementById("valor");
	let price=document.getElementById("price").textContent;

	total.innerHTML=`<div>$${price.replace('$','')*contador.value}</div>`;
	
	console.log("contador",contador.value,"price",price,"total",total.target)
}
//funcion que optiene precio deacuerdo a las medidas que tuvieron evento (select) 
function setEventMedidas(index){
	let cambioPrecio=dataValue[7];
  	let price=document.getElementById("price").innerHTML =`${cambioPrecio.price[index]}`;
  	setTotalProduct();
}

//boton mas y menos de la pag producto
function setEventContador(){ 
	var menos=document.getElementById('rest');
	menos.addEventListener('click',()=>contadormenos());
	                                                            
	var mas=document.getElementById('sum');
	mas.addEventListener('click',()=>contadormas());
}
function contadormas(){
	var contador = document.getElementById("valor");
	contadorInicial = contadorInicial +1;
	contador.value = contadorInicial;
	console.log("contadorIni+",contadorInicial);
	setTotalProduct()

	console.log("contador.value",contador.value)
}
function contadormenos(){ 
	var contador = document.getElementById("valor");
    if(contadorInicial>1){
        contadorInicial = contadorInicial - 1; 
        contador.value = contadorInicial;
        setTotalProduct()
        console.log("contadorIni-",contadorInicial);
    }
}
