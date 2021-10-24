const spreadsheetsId='1WfxVETEfl-fmU4QGfOG1wk-93ClARjK5wkgUbAg3BXg';
//const range='Respuestas de formulario 1!A1:F5';
const range='Data!A1:F5';
const apiKey='AIzaSyBb1-sH8j-c6qSKNT4UK7CqP65w7v-ugq8';
const urlOriginal=`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetsId}/values/${range}?key=${apiKey}`;

window.onload=initialize(urlOriginal);

function initialize(url){
	fetch(url)
	.then(response => response.json())
	.then(data =>{
		console.log("data",data);
		transformData(data);
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


/*let price="*$3.20 *$ 3.20 *$ 4.00 *$5.00";
let cambioPrice=price.split('*');
let nuevoArreglo=cambioPrice.filter(element=>{
  return element != "";
})
let eliminaEspacios=cambioPrice.map(element=> element.trim());
console.log(cambioPrice,eliminaEspacios,nuevoArreglo);*/

function valor(value){
	if(value.indexOf('*') !== -1){
		return value.split('*').filter(element => element != "").map(val => val.trim());
	}
	//console.log("valoresdePropiedades",value)
	return value;
}

//inicializacion de carrucel desde materialize
 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.carousel').carousel();
  });

  //input frutas
   
 let frutas=['manzana','mango','tuna','platano','pera','limón'];
let input=document.getElementById('search');
//console.log("input",input.indexOf(frutas));
let lista=document.getElementById('list');


input.addEventListener('keyup',ev => typing(ev))
 /*uno es que tenga valor input.values== '';
  otro es que se encuentre en result y que result .length !=0
  */
function typing(ev){
  let listaFrutas='';
  if(input.value == '' ){
    //se oculta la lista
    lista.setAttribute('class','hide')
  } else{
    //se muestra lista
    lista.removeAttribute('class','hide');
      let result = frutas.filter((elemento,indice,array)=>  elemento.indexOf(input.value.toLowerCase()) != -1);
    listaFrutas= result.map((fruta) =>`<li>${fruta}</li>`).join("");
    
    lista.innerHTML =(listaFrutas.length != 0) ? listaFrutas:"No se encontro coincidencias";
    console.log("result",result,listaFrutas);
    return listaFrutas;
  
  }
}