let listaCompras;
window.onload=initializeCompras();

function initializeCompras(){
	listaCompras=JSON.parse(sessionStorage.getItem("listCompra"));
	let listProducts=document.getElementById('cajaList');
	let listPedidosNodo="";
	listaCompras.forEach((cadaobj,index)=>{
		listPedidosNodo+=setDatos(cadaobj,index);
	});
	listProducts.innerHTML= `<div id="fila" class="row">${listPedidosNodo}</div>`;
}
function setDatos(datos,id){
	console.log(datos,"datos");
	datos=JSON.parse(datos);
	let listPedidosNodo=
		`
		<div id="cajaImg">
			<div id="times"> 
				<i class="times fas fa-times"></i>
			</div>
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
          			<button id="rest${id}" class="rest"> - </button>
          			<input id="valor${id}" type="text" readonly  name="" value="${datos.cantidad}" class="conteo"/>
          			<button id="sum${id}" class="sum"> + </button>
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

	//setEventContador();
	//setTotalProduct();
	//getFullPrice();
	//setEventElilimarTodo();
	//setEventIconElim();
	return listPedidosNodo;
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
	//console.log("contadorIni+",contador.value);
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
function setEventElilimarTodo(){
	let elim=document.getElementById('cajElim');
	elim.addEventListener('click',()=>removeTodo());
}
function removeTodo(){
	//let hijo=document.getElementById()
	let cajaList=document.getElementById('cajaList');
	let hijo=document.getElementById('fila');
	cajaList.removeChild(hijo);
	//console.log(cajaList,'cajaList')
	//return cajaList
}
function setEventIconElim(){
	let elimRom=document.getElementById('times');
	elimRom.addEventListener('click',()=>removeFila());
}
function removeFila(){
	let cajaList=document.getElementById('cajaList');
	let hijo=document.getElementById('fila');
	cajaList.removeChild(hijo);
}
