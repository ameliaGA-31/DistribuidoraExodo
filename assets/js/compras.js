let listaCompras;
window.onload=initializeCompras();

function initializeCompras(){
	listaCompras=JSON.parse(sessionStorage.getItem("listCompra"));
	setDatosList();
	setEventElilimarTodo();
	getFullPrice();

}
function setDatos(datos,id){
	console.log(datos,"datos");
	datos=JSON.parse(datos);
	let listPedidosNodo=
		`
	<div id="fila" class="row">
		<div id="cajaImg">
			<div id="times" onclick="setEventIconElim(${id})"> 
				<i class="times fas fa-times"></i>
			</div>
			<img class="imgCar" src="${datos.imagen}"/>
		</div>
		<div id="info">
			<div id="name">${datos.name}</div>
			<div id="tamaño">${datos.size}</div>
		</div>
		<div class="calcCompra">
			<div id="calProduct">
				<p>Cantidad</p>
				<div class="sumRest">
					<button id="rest${id}" onclick="contadormenos(${id})" class="rest"> - </button>
					<input id="valor${id}" class="valor" type="text" readonly  name="" value="${datos.cantidad}" class="conteo"/>
					<button id="sum${id}" onclick="contadormas(${id})" class="sum"> + </button>
				</div>
			</div>
			<div id="cajaPrice">
				<p>Precio</p>
				<div id="price${id}">${datos.price}</div>
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
	console.log("lista",listaCompras)
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
	upDateListaCompras(id,total.textContent,contador.value);
	//console.log(calculo,"etiqueTotal",id,"id")
	//getFullPrice(calculo,id);
}
function upDateListaCompras(id,total,cantidad){
	let objeto=JSON.parse(listaCompras[id]);
	objeto.total=total;
	objeto.cantidad=cantidad;
	listaCompras[id]=JSON.stringify(objeto);
	//console.log(total,cantidad,"total y cantidad",listaModificada,"lista");
	setItemSession();

}

function getFullPrice(){
	let sumTotal;
	let totales=[];
	let unObj;
	listaCompras.forEach(cadaobje=>{
		unObj=JSON.parse(cadaobje);
		totales.push(Number(unObj.total.replace('$',' ')));
	});
	sumTotal=totales.reduce((x,y)=> x + y);
	document.getElementById('totales').innerText=sumTotal;
	console.log(totales,"totales",sumTotal,"sumTotal",listaCompras,"lista3")
}
function contadormas(id){
	var contador = document.getElementById(`valor${id}`);
	contador.value = contador.value ++;
	contador.value++;
	//console.log("contadorIni+",contador.value);
	setTotalProduct(id);
	
	
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
	//let hijo=document.getElementById()
	let cajaList=document.getElementById('cajaList');
	let hijo=document.getElementById('fila');
	cajaList.innerHTML=`<p>Aun no hay producto a tu carrito</p>`;
	listaCompras=[];
	let listaenCero=JSON.stringify(listaCompras);
	sessionStorage.setItem("listCompra",listaenCero);
	//cajaList.removeChild(hijo);
	//console.log(cajaList,'cajaList')
	//return cajaList
}
function setEventIconElim(id){
	//elimine del arreglo de lista
	listaCompras.splice(id,1);
	//convertir a string
	setItemSession();
	setDatosList();
	//console.log(id,"id",listaCompras,"listaCompras");
	//let elimRom=document.getElementById('times');
	//elimRom.addEventListener('click',()=>removeFila());
}
function setItemSession(){
	let listaComprasString=JSON.stringify(listaCompras);
	sessionStorage.setItem("listCompra",listaComprasString);
	//console.log(listaCompras,"listaCom")
	getFullPrice();

}

