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
		getImages(dataValue[7]);
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

//input de html + eventos 
let input=document.getElementById('searchInput');
let lista=document.getElementById('list');
input.addEventListener('keyup',()=> typing(dataValue));


function typing(dataMyList){
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
    //console.log("productsList",productsList);
    setEventList();
    return productsList;
  }
}

//eventos de las lista de resultados del input
function setEventList(){
	let getLi=Array.from(document.getElementsByClassName("item"));
	getLi.forEach((elemento) => elemento.addEventListener("click",()=>selectItem(elemento),false));
}
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
	let nuevoAbc=letrasEncontradas.map(elemento =>`<li id="abc" class="abc">${elemento}</li>`).join("").toUpperCase();
	ul.innerHTML=nuevoAbc;	                                        
console.log("letra encontrada",nuevoAbc);
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
//integrando for in de objeto para selector 
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
//console por si index y valor
function selectOption(event) {
    console.log('seleccionada:::', event.target.value, 'index: ', event.target.selectedIndex);
  }

//traer imagenes pagina del producto
function getImages(productInfo) {
	console.log("productInfo",productInfo)
    let visor = document.getElementById('visor');
    let img=productInfo.imagen;
    document.getElementById('mainImg').innerHTML = `<img class="urls" src="${img[0]}"/>`; 
    document.getElementById('listImg').innerHTML = img.map(url => `<img class="urls" src="${url}" />`).join('');
   // console.log("imagen",img);
    setInfoProduct(productInfo, "information");
    setEventContador();
}
//datos de cada producto en la pag de producto 
function setInfoProduct(infoCadaUno,nameNodo){
	console.log("infoCadaUno",infoCadaUno);
	document.getElementById(nameNodo).innerHTML=
	`<div class="datoIndividual"> ${infoCadaUno.name}</div>
	<div class="datoIndividual"> ${infoCadaUno.size}</div>
	<div class="datoIndividual"> ${infoCadaUno.price}</div>`
	
}

//boton mas y menos de la pag producto
function setEventContador(){ 
	var menos=document.getElementById('rest');
	menos.addEventListener('click',()=>contadormenos());
	                                                            
	var mas=document.getElementById('sum');
	mas.addEventListener('click',()=>contadormas());

	var contador = document.getElementById("valor");
}
function contadormas(){
	contador.value = contadorInicial;
	contadorInicial = contadorInicial + 1;
}
function contadormenos(){ 
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



  

