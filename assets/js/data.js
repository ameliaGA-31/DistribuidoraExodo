const spreadsheetsId='1WfxVETEfl-fmU4QGfOG1wk-93ClARjK5wkgUbAg3BXg';
//const range='Respuestas de formulario 1!A1:F5';
const range='Data!A1:F100';
const apiKey='AIzaSyBb1-sH8j-c6qSKNT4UK7CqP65w7v-ugq8';
const urlOriginal=`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetsId}/values/${range}?key=${apiKey}`;
let dataValue;
window.onload=initialize(urlOriginal);

function initialize(url){
	fetch(url)
	.then(response => response.json())
	.then(data =>{
		console.log("data",data);
		dataValue=transformData(data);
		getOptionCategory(dataValue);
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
	console.log("arraysConvertidos",arrays)
	return arrays;
}


function valor(value){
	if(value.indexOf('*') !== -1){
		return value.split('*').filter(element => element != "").map(val => val.trim());
	}
	//console.log("valoresdePropiedades",value)
	return value;
}
//continuacion de mi codigo html

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
	setEventOptions(categories);
	return categories;
}
//integrando for in de objeto para selector 
function setEventOptions(categoriesObj){
	for(const property in categoriesObj){
		let selectContainer=document.querySelector(`#${property}Content`);
		let optionSelect=categoriesObj[property].map(infoProduct => `<option>${infoProduct.name}</option>`);
	    //optionSelect.unshift(`<option disabled selected>${categoriesObj.property[0].category}</option>`);
		selectContainer.innerHTML=optionSelect;
		selectContainer.addEventListener('change',(e)=> selectOption(e),false);
	}
}
//console por si index y valor
function selectOption(event) {
    console.log('seleccionada:::', event.target.value, 'index: ', event.target.selectedIndex);
  }

//input de html + eventos 
let input=document.getElementById('searchInput');
let lista=document.getElementById('list');
input.addEventListener('keyup',()=> typing(dataValue))


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
//funcion que agrega a funcion  typing para entrar al nombre del producto
function getProductList(valuesArr){

	let names=valuesArr.map(objeto => objeto.name.toLowerCase())
	console.log("propiedades",names);
	return names;
}

function selectItem(opcion){
	console.log("selectItem",opcion);
}

//inicializacion de vento de Icono a las lista por categoria
//funcion anonima 
/*funcion  (){
	return "";
}
//funcion se ejecuta al momento
()=> ""*/


// creando abecedario
let abecedario="abcdefghijklmnñopqrstuvwxyz";
abecedario=abecedario.split('');
console.log(abecedario);
let ul=document.getElementById("abecedario");
let nuevoAbc=abecedario.map(elemento =>`<li class="abc">${elemento}</li>`).join("").toUpperCase();
ul.innerHTML=nuevoAbc;

//inicializacion de carrucel desde materialize
 /*document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, options);
  });*/
 

  // Or with jQuery

  $(document).ready(function(){
    $('.carousel').carousel();
  });

  //inicializacions de modal

  /*document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });*/

  // Or with jQuery

 $(document).ready(function(){
    $('.modal').modal();
  });

