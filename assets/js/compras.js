var contadorInicial = 1;
let listaCompras;
window.onload=initializeCompras();

function initializeCompras(){
	listaCompras=JSON.parse(sessionStorage.getItem("listCompra"));
	listaCompras.forEach(cadaobj=> setDatos(cadaobj));
	console.log("listaCompras",listaCompras)
}
//funcion que inicia para carrito trallendo solo un producto y llenando los campos...
function setDatos(datos){
	datos=JSON.parse(datos);
	document.getElementById('name').innerText=`${datos.name}`;
	let tamaño;
	let price;
	console.log("tamañoImg",datos)
	//let precio;
	
		tamaño=datos.size;
		price=datos.price;
		document.getElementById('tamaño').innerText=`${tamaño}"`;
		document.getElementById('price').innerText=`${datos.price}`;
		document.getElementById('imgCar').innerHTML=`<img src="${datos.imagen}"/>`;

	setEventContador();
	setTotalProduct();
}	
function setTotalProduct(){
	let total=document.getElementById("total");
	var contador = document.getElementById("valor");
	let price=document.getElementById("price").textContent;

	total.innerHTML=`<div>$${price.replace('$','')*contador.value}</div>`;
	console.log("contador",contador.value,"price",price)
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