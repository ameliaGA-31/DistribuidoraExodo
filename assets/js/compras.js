let listaCompras;
window.onload=initializeCompras();

function initializeCompras(){
	listaCompras=JSON.parse(sessionStorage.getItem("listCompra"));
	setDatosList();
	setEventElilimarTodo();
	getFullPrice();
	
}
function setDatos(datos,id){
	datos=JSON.parse(datos);
	let listPedidosNodo=
		`
	<div id="fila" class="row">
		<div id="cajaImg">
			<div id="times" onclick="setEventIconElim(${id})"> 
				<span><i class="times fas fa-times"></i></span>
			</div>
			<img class="imgCar" src="${datos.imagen}"/>
		</div>
		<div id="info">
			<div id="name">${datos.name.charAt(0).toUpperCase()+ datos.name.slice(1)}</div>
			<div id="tamaño">${datos.size.charAt(0).toUpperCase()+ datos.size.slice(1)}</div>
		</div>
		<div class="calcCompra">
			<div id="cajaPrice">
				<p>Precio</p>
				<div id="price${id}">${datos.price}</div>
			</div>
			<div id="calProduct">
				<p>Cantidad</p>
				<div class="sumRest">
					<button id="rest${id}" onclick="contadormenos(${id})" class="rest"> - </button>
					<input id="valor${id}" class="valor" type="text" readonly  name="" value="${datos.cantidad}" class="conteo"/>
					<button id="sum${id}" onclick="contadormas(${id})" class="sum"> + </button>
				</div>
			</div>
			<div id="cajatotal">
				<p>total</p>
				<div id="total${id}">${datos.total}</div>
			</div>
		</div>
    </div>
        `;
	return listPedidosNodo;

}

function setDatosList(){
	let listProducts=document.getElementById('cajaList');
	let listPedidosNodo="";
	listaCompras.forEach((cadaobj,index)=>{
		listPedidosNodo+=setDatos(cadaobj,index);
	});
	listProducts.innerHTML=listPedidosNodo;
}	
function setTotalProduct(id){
	let total=document.getElementById(`total${id}`);
	var contador = document.getElementById(`valor${id}`);
	let price=document.getElementById(`price${id}`).textContent;
	let operacion=price.replace('$','')*contador.value;
	total.innerHTML=`<div>$${operacion.toFixed(2)}</div>`;
	let calculo=operacion.toFixed(2);
	upDateListaCompras(id,total.textContent,contador.value);
}
function upDateListaCompras(id,total,cantidad){
	let objeto=JSON.parse(listaCompras[id]);
	objeto.total=total;
	objeto.cantidad=cantidad;
	listaCompras[id]=JSON.stringify(objeto);
	setItemSession();

}

function getFullPrice(){
	let arr;
	let sumTotal;
	let totales=[];
	let unObj;
	listaCompras.forEach(cadaobje=>{
		unObj=JSON.parse(cadaobje);
		totales.push(Number(unObj.total.replace('$',' ')));

	});
	if(listaCompras.length > 0){
		sumTotal=totales.reduce((x,y)=> x + y);
		document.getElementById('totales').innerText=`$${sumTotal.toFixed(2)}`;
	}
}
function contadormas(id){
	var contador = document.getElementById(`valor${id}`);
	contador.value = contador.value ++;
	contador.value++;	setTotalProduct(id);

}
function contadormenos(id){ 
	var contador = document.getElementById(`valor${id}`);
    if(contador.value>1){
        contador.value = contador.value --; 
        contador.value --;
        setTotalProduct(id);
    }
}
function setEventElilimarTodo(){
	let elim=document.getElementById('cajElim');
	elim.addEventListener('click',()=>removeTodo());
}
function removeTodo(){

	let cajaList=document.getElementById('cajaList');

	cajaList.innerHTML=`<p>Aún no hay producto en tu carrito</p> <img id="catCom" src="images/catCompras.jpg"> `;
	document.getElementById('totales').innerText=`$${0}`;
	listaCompras=[];
	let listaenCero=JSON.stringify(listaCompras);
	sessionStorage.setItem("listCompra",listaenCero);

}
function setEventIconElim(id){
	//elimine del arreglo de lista
	let hijo=document.getElementById('fila');
	listaCompras.splice(id,1);
	if(listaCompras.length == []){
		hijo.innerText="";
	}
	document.getElementById('totales').innerText=`$${0}`;
	//convertir a string
	let listaComprasString=JSON.stringify(listaCompras);
	sessionStorage.setItem("listCompra",listaComprasString);
	setItemSession();
	setDatosList();

}
function setItemSession(){
	let listaComprasString=JSON.stringify(listaCompras);
	sessionStorage.setItem("listCompra",listaComprasString);
	getFullPrice();

}

