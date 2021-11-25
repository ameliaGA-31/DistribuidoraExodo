let listaCompras;
window.onload=initializeCompras();

function initializeCompras(){
	listaCompras=JSON.parse(sessionStorage.getItem("listCompra"));
	listaCompras.forEach(cadaobj=> setDatos(cadaobj));
	
}
/*document.getElementById('name').innerText=`${datos.name}`;
	document.getElementById('tamaño').innerText=`${datos.size}"`;
	document.getElementById('price').innerText=`${datos.price}`;
	document.getElementById('price').innerText=`${datos.total}`;
	let valor=document.getElementById("valor").value=`${datos.cantidad}`;
	*/
//funcion que inicia para carrito trallendo solo un producto y llenando los campos...
function setDatos(datos){
	console.log(datos,"datos");
	datos=JSON.parse(datos);
	let listProducts=document.getElementById('cajaList');
	 let listPedidosNodo="";
	 listPedidosNodo+=
	/*let listPedidosNodo;
	 for (const property in datos) {
	 	listPedidosNodo+=`
	 	<div id="cajaImg">
			<i class="times fas fa-times"></i>
			<img id="imgCar" src="${datos.imagen}"/>;
		</div>
		<div id="info">
			<div id="name">${datos.name}</div>
			<div id="tamaño">${datos.size}</div>
		</div>
		<div class="calcCompra">
			<div id="calProduct">
          		<p>Cantidad</p>
	          	<div class="sumRest">
          			<button id="rest" class="rest"> - </button>
          			<input id="valor" type="text" readonly  name="" value="${datos.cantidad}" class="conteo"/>
          			<button id="sum" class="sum"> + </button>
          		</div>
          	</div>
				<div id="cajaPrice">
          		<p>Precio unitario</p>
          		<div id="price">${datos.price}</div>
      		</div>
      		<div id="cajatotal">
          		<p>total</p>
          		<div id="total">${datos.total}</div>
      		</div>
      	</div>
						`;

}
listProducts.innerHTML= `<div class="row">${listPedidosNodo}</div>`;*/

		`
		
		<div id="cajaImg">
			<i class="times fas fa-times"></i>
			<img class="imgCar" src="${datos.imagen}"/>;
		</div>
		<div id="info">
			<div id="name">${datos.name}</div>
			<div id="tamaño">${datos.size}</div>
		</div>
		<div class="calcCompra">
			<div id="calProduct">
          		<p>Cantidad</p>
	          	<div class="sumRest">
          			<button id="rest" class="rest"> - </button>
          			<input id="valor" type="text" readonly  name="" value="${datos.cantidad}" class="conteo"/>
          			<button id="sum" class="sum"> + </button>
          		</div>
          	</div>
				<div id="cajaPrice">
          		<p>Precio unitario</p>
          		<div id="price">${datos.price}</div>
      		</div>
      		<div id="cajatotal">
          		<p>total</p>
          		<div id="total">${datos.total}</div>
      		</div>
      	</div>
    </div>
        `;
	listProducts.innerHTML= `<div class="row">${listPedidosNodo}</div>`;

	setEventContador();
	setTotalProduct();
	getFullPrice();
}	
function setTotalProduct(){
	let total=document.getElementById("total");
	var contador = document.getElementById("valor");
	let price=document.getElementById("price").textContent;

	total.innerHTML=`<div>$${price.replace('$','')*contador.value}</div>`;
	//console.log("contador",contador.value,"price",price)
}

function getFullPrice(){
	let total=document.getElementById("total").textContent;
	let totales=document.getElementById("totales");
	totales.innerText=`${total}`
	console.log(totales,"contenidoTotal")
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
	contador.value = contador.value ++;
	contador.value++;
	console.log("contadorIni+",contador.value);
	setTotalProduct();
	getFullPrice();
}
function contadormenos(){ 
	var contador = document.getElementById("valor");
    if(contador.value>1){
        contador.value = contador.value --; 
        contador.value --;
        setTotalProduct();
        getFullPrice();
    }
}
