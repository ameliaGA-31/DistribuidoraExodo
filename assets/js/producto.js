var contadorInicial = 1;
let objetoProducto;
window.onload=initialiceProduct();
//producto no funciona bien ....platicar con rosa
function initialiceProduct(){
	//para obtener o entrar a ella CUANDO ESTOY EN LA OTRA PAG
		let unproducto=sessionStorage.getItem("idProducto");
		let objetoRegresado=JSON.parse(unproducto);

		let dataVal=sessionStorage.getItem("valorData");
		let dataReturn=JSON.parse(dataVal);

		if('sessionStorage' in window && window['sessionStorage'] !== null && sessionStorage.getItem('idProducto') !== null){
			objetoProducto=dataReturn.filter(cadaObj=> cadaObj.id == objetoRegresado)[0];
			console.log(objetoProducto,"dataReturn")
			setImages(objetoProducto);		
		}else{
			objetoProducto=dataReturn.filter(objetoProduct=> objetoProduct.id)[0];
			setImages(objetoProducto);
		}	
}

//traer imagenes pagina del producto
function setImages(productInfo) {
	console.log(productInfo.imagen,"productInfo")
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
  let images =Array.from(document.getElementsByClassName('imgProduct'));
  images.forEach(img => img.addEventListener('click', (img) => changeImg(img.target.id), false));
}
//funcion evento del cambio de imagen por la posicion
function changeImg(id) {
	let cambioImg=objetoProducto;
  document.getElementById('mainImg').innerHTML =  `<img src="${cambioImg.imagen[id]}"/>`;

}

//datos de cada producto en la pag de producto 
function setInfoProduct(infoCadaUno,nameNodo){
	console.log(nameNodo,"nameNodo")
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
    	if(typeof infoCadaUno.size === 'string' && typeof infoCadaUno.price === 'string'){
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
	 setEventAñadirCompra();	 
	setEventContador();
}
function setTotalProduct(){
	let total=document.getElementById("total");
	var contador = document.getElementById("valor");
	let price=document.getElementById("price").textContent;

	total.innerHTML=`<div>$${price.replace('$','')*contador.value}</div>`;
	return [price,total.textContent,contador.value];
	
}
//funcion que optiene precio deacuerdo a las medidas que tuvieron evento (select) 
function setEventMedidas(index){
	let cambioPrecio=objetoProducto;
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
	setTotalProduct()

}
function contadormenos(){ 
	var contador = document.getElementById("valor");
    if(contadorInicial>1){
        contadorInicial = contadorInicial - 1; 
        contador.value = contadorInicial;
        setTotalProduct();
    }
}

function setEventAñadirCompra(){
		let agregar=document.getElementById('agregarCar');
	//agregar.addEventListener('click',(agregar)=> newObje(agregar.target));
	agregar.addEventListener('click',createListShop);

	console.log(agregar,'agregar')
}
function newObje(){
	let mainImg=Array.from(document.getElementById('mainImg').getElementsByTagName('img'))[0];
	let valuePriceProduct=setTotalProduct();
	let newObjeto={
		id:objetoProducto.id,
		name:objetoProducto.name,
		imagen:mainImg.src,
		price:valuePriceProduct[0],
		total:valuePriceProduct[1],
		cantidad:valuePriceProduct[2],
	};
	let objTransform=JSON.stringify(newObjeto);	
	return objTransform;
}
function createListShop(){
	let newObjeto=newObje();
	if('sessionStorage' in window && window['sessionStorage'] !== null && sessionStorage.getItem('listCompra') !== null) {
    	let arrList=JSON.parse(sessionStorage.getItem("listCompra"));
    	arrList.push(newObjeto);
    	arrList=JSON.stringify(arrList);
    	sessionStorage.setItem('listCompra',arrList);
	} else { 
		let arr=[];
		arr.push(newObjeto)
		let arrString=JSON.stringify(arr);
		sessionStorage.setItem("listCompra",arrString);
	}
	window.location.href = "carritoCompras.html";
}

