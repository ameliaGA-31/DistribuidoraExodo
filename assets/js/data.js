const spreadsheetsId='1WfxVETEfl-fmU4QGfOG1wk-93ClARjK5wkgUbAg3BXg';
//const range='Respuestas de formulario 1!A1:F5';
const range='Data!A1:I178';
const apiKey='AIzaSyBb1-sH8j-c6qSKNT4UK7CqP65w7v-ugq8';
const urlOriginal=`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetsId}/values/${range}?key=${apiKey}`;
let dataValue;
var contadorInicial = 0;
window.onload=initialize(urlOriginal);

function initialize(url){
	fetch(url)
	.then(response => response.json())
	.then(data =>{
		console.log("data",data);
		dataValue=transformData(data);
		getOptionCategory(dataValue);
		getAbecedario(getProductList(dataValue));
		setEventInputSearch();
		setImages(dataValue[7]);
	})
	.catch(error=> console.log("error:*",error))
	
}

function transformData(data){
	//console.log(data);
	let arrays=[];
	if(data && data.values && data.values.length >1){
		let propiedadesPrincipales=data.values[0];
		for (var i=1; i<data.values.length; i++){
			let objetoPersonal={};
			propiedadesPrincipales.forEach((propiedad,index)=>{
				objetoPersonal[propiedad]=valor(data.values[i][index]);
			});
			//console.log("price",objetoPersonal.category);
			arrays.push(objetoPersonal);
		}
	}
	console.log("arrayDeObjetos",arrays)
	return arrays;
}


function valor(value){
	if(value){ 
		if(value.indexOf('*') !== -1){
			return value.split('*').filter(element => element != "").map(val => val.trim());
		}
		if(value.indexOf(',') !== -1){
			return value.split(',').filter(element => element != "").map(val => val.trim());
		}
	}
	//console.log("valoresdePropiedades",value)
	return value;
}
//continuacion de mi codigo html
function setEventInputSearch(){
	//input de html + eventos 
	let input=document.getElementById('searchInput');
	input.addEventListener('keyup',(input)=> typing(dataValue,input.target));
}
//funcion del evento al escribir en input y su busueda por producto
function typing(dataMyList,input){
	let lista=document.getElementById('list');
	let productsArr=getProductList(dataMyList);
  let productsList='';
  if(input.value == '' ){
    //se oculta la lista
    lista.setAttribute('class','hide')
  } else{
    //se muestra lista
    lista.removeAttribute('class','hide');
      let result = productsArr.filter((elemento,indice,array)=>  elemento.indexOf(input.value.toLowerCase()) != -1);
    productsList= result.map((product,index) =>`<li id="${index}" class="item">${product.charAt(0).toUpperCase()+ product.slice(1)}</li>`).join("");
    
    lista.innerHTML =(productsList.length != 0) ? productsList:"No se encontro coincidencias";
    setEventList();
    return productsList;
  }
}

//eventos de las lista de resultados del input
function setEventList(){
	let getLi=Array.from(document.getElementsByClassName("item"));
	getLi.forEach((elemento) => elemento.addEventListener("click",()=>selectItem(elemento),false));
}
//TODO: next page producto.html
//opcion seleccionada por el buscador
function selectItem(opcion){
	console.log("selectItem",opcion);
}
//funcion que agrega a funcion  typing para entrar al nombre del producto
function getProductList(valuesArr){

	let names=valuesArr.map(objeto => objeto.name.toLowerCase())
	console.log("propiedades",names);
	return names;
}
function getAbecedario(namesArr){
	// creando abecedario
	let abecedario="abcdefghijklmnñopqrstuvwxyz";
	abecedario=abecedario.split('');
	//busqueda por inicial abecedario
	let primeraLetra=namesArr.map(name=> name[0]);
	let letrasEncontradas=abecedario.filter(letra => primeraLetra.indexOf(letra) != -1); 
	let ul=document.getElementById("abecedario");
	let nuevoAbc=letrasEncontradas.map(elemento =>`<li class="abc">${elemento.toUpperCase()}</li>`).join("");
	ul.innerHTML=nuevoAbc;
	setEventAbecedario();

console.log("letra encontrada",nuevoAbc);
}

//evento a letra abecedario
function setEventAbecedario(){

	let abc=Array.from(document.getElementsByClassName("abc"));
	abc.forEach((unaLi)=> unaLi.addEventListener('click',(unaLi)=>getProductCoincidencia(unaLi.target.textContent),false));
} 
//TODO:next page catalogo.html
//funcion que encuentra coincidencias en el abecedario
function getProductCoincidencia(letra){
	let listProduct=dataValue.filter(productInfo=> productInfo.name[0] == letra);
	console.log("letra",letra,"listProduct",listProduct);
}

//carrouzel
$(document).ready(function(){
    $('.carousel').carousel();
  });

//separador por categorias 
function getOptionCategory(arrObj){
	let tlapaleria=arrObj.filter(objeto => objeto.category == 'Tlapaleria general');
	let plomeria=arrObj.filter(objeto => objeto.category == 'Plomeria');
	let herreria=arrObj.filter(objeto => objeto.category == 'Herreria');
	let cartones=arrObj.filter(objeto => objeto.category == 'Cartones');
	let empaques=arrObj.filter(objeto => objeto.category == 'Empeques');
	let categories={
		tlapaleria:tlapaleria,
		plomeria:plomeria,
		herreria:herreria,
		cartones:cartones,
		empaques:empaques
	}
	//console.log("categories",categories);
	setEventOptions(categories);
	return "";
}
//integrando metodo For In de objeto para select 
function setEventOptions(categoriesObj){
		let selectContainer=document.getElementById('selectContainer');

	for(const property in categoriesObj){
		if (categoriesObj[property].length != 0) {
			const div = document.createElement("div");
			div.setAttribute("class", "input-field col s3");
			const select = document.createElement("select");
			div.appendChild(select);
			selectContainer.appendChild(div);
			let optionSelect=categoriesObj[property].map(infoProduct => `<option>${infoProduct.name}</option>`);
		    optionSelect.unshift(`<option disabled selected>${categoriesObj[property][0].category}</option>`);
		    
			select.innerHTML=optionSelect;
			select.addEventListener('change',(e)=> selectOption(e),false);
		}
		
	}
}
//TODO:next page producto.html
//opcion selecciona por el select por su nombre y index 
function selectOption(event) {
    console.log('seleccionada:::', event.target.value, 'index: ', event.target.selectedIndex);
  }

//traer imagenes pagina del producto
function setImages(productInfo) {
    let visor = document.getElementById('visor');
    //let img=productInfo.imagen;
    document.getElementById('mainImg').innerHTML = `<img src="${productInfo.imagen[0]}"/>`; 
    document.getElementById('listImg').innerHTML = productInfo.imagen.map((url,idx) => `<img class="imgProduct" id="${idx}" src="${url}" />`).join('');
   // console.log("imagen",img);
   	setEventImages();
    setInfoProduct(productInfo, "information");
    
}

function setEventImages() {
  let images =Array.from(document.getElementsByClassName('imgProduct') );
  images.forEach(img => img.addEventListener('click', (img) => changeImg(img.target.id), false));
  //console.log("imagenes en for",images)
}

function changeImg(id) {
	console.log("id",id)
	let cambioImg=dataValue[7];
  document.getElementById('mainImg').innerHTML =  `<img src="${cambioImg.imagen[id]}" />`;
}

//datos de cada producto en la pag de producto 
function setInfoProduct(infoCadaUno,nameNodo){
	//opcion 1 sin poder ver el select y agregando por separados los contenedores de html---->
	let nameProducto=document.getElementById("nameP");
	let contDatosProducto=document.getElementById(nameNodo);
	let information2=document.getElementById("information2");

	const divSize=document.createElement("div");
	divSize.setAttribute("class", "input-field col s3");
	const selectSize=document.createElement("select");
	divSize.appendChild(selectSize);
	contDatosProducto.appendChild(divSize);
	const divPrice=document.createElement("div");
	divPrice.setAttribute("class", "input-field col s3");
	const selectPrice=document.createElement("select");
	divPrice.appendChild(selectPrice);
	information2.appendChild(divPrice);

	nameProducto.innerHTML=`<div class="datoIndividual"> ${infoCadaUno.name}</div>`;
	let optionSize= `<option >${infoCadaUno.size}</option>`;
	let optionPrice=`<option>${infoCadaUno.price}</option>`;
	console.log("optionPrice",optionPrice,"nameNodo",nameNodo,"optionSize",optionSize);

	selectSize.innerHTML=optionSize;
	selectSize.addEventListener('change',(e)=> changePrice(e),false);
	selectPrice.innerHTML=optionPrice;
	setEventContador();	
}
function changePrice(val){
	console.log('opcionSeleccionada:', event.target.value, 'indice: ', event.target.selectedIndex);
}


//TODO::next page Carrito compras.html PENDIENTE:CALCULO DE SUMAS DE PRODUCTOS... 
//boton mas y menos de la pag producto
function setEventContador(){ 
	var menos=document.getElementById('rest');
	menos.addEventListener('click',()=>contadormenos());
	                                                            
	var mas=document.getElementById('sum');
	mas.addEventListener('click',()=>contadormas());
}
function contadormas(){
	var contador = document.getElementById("valor");
	contador.value = contadorInicial +1;
	contadorInicial = contadorInicial + 1;
}
function contadormenos(){ 
	var contador = document.getElementById("valor");
    if(contadorInicial>=1){
        contadorInicial = contadorInicial - 1; 
        contador.value = contadorInicial;
    }
}




//inicializacion de vento de Icono a las lista por categoria
//funcion anonima 
/*funcion  (){
	return "";
}
//funcion se ejecuta al momento
()=> ""*/




//inicializacion de carrucel desde materialize
 /*document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, options);
  });*/
 

  // Or with jQuery

  

  //inicializacions de modal

  /*document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });*/

  // Or with jQuery

 $(document).ready(function(){
    $('.modal').modal();
  });



 //parte del select de precio y tamaños dentro de un solo contenedor desde html 

/*	let contDatosProducto=document.getElementById(nameNodo);

			const divPS = document.createElement("div");
			divPS.setAttribute("class", "input-field col s3");
			const selectPS = document.createElement("select");
			divPS.appendChild(selectPS);
			contDatosProducto.appendChild(divPS);
			let optionPS= `<option>${infoCadaUno.price}</option>
			<option>${infoCadaUno.size}</option>`;
		    
			selectPS.innerHTML=optionPS;
			selectPS.addEventListener('change',(e)=> changePrice(e),false);*/
		




  

