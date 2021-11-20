const spreadsheetsId='1WfxVETEfl-fmU4QGfOG1wk-93ClARjK5wkgUbAg3BXg';
//const range='Respuestas de formulario 1!A1:F5';
const range='Data!A1:I9';
const apiKey='AIzaSyBb1-sH8j-c6qSKNT4UK7CqP65w7v-ugq8';
const urlOriginal=`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetsId}/values/${range}?key=${apiKey}`;
let dataValue;

window.onload=initialize(urlOriginal);

function initialize(url){
	fetch(url)
	.then(response => response.json())
	.then(data =>{
		//console.log("data",data);
		dataValue=transformData(data);
		getOptionCategory(dataValue);
		//getAbecedario(dataValue);
		setEventInputSearch();
		//setDatos(dataValue[7]);
		//getcatalogoProductos(dataValue);
		//setEvenIcon();


	})
	.catch(error=>console.log("error:*",error))
	
}
//modifico mi data en proppiedad=valor
function transformData(data){
	////console.log(data);
	let arrays=[];
	if(data && data.values && data.values.length >1){
		let propiedadesPrincipales=data.values[0];
		for (var i=1; i<data.values.length; i++){
			let objetoPersonal={};
			propiedadesPrincipales.forEach((propiedad,index)=>{
				objetoPersonal[propiedad]=valor(data.values[i][index]);
			});
			////console.log("price",objetoPersonal.category);
			arrays.push(objetoPersonal);
		}
	}
	//console.log("arrayDeObjetos",arrays)
	return arrays;
}

//le doy el valor qiutando caracteres
function valor(value){
	if(value){ 
		if(value.indexOf('*') !== -1){
			return value.split('*').filter(element => element != "").map(val => val.trim());
		}
		if(value.indexOf(',') !== -1){
			return value.split(',').filter(element => element != "").map(val => val.trim());
		}
	}
	////console.log("valoresdePropiedades",value)
	return value;
}

 
//continuacion de mi codigo html

//TODO: next page producto.html
//opcion seleccionada por el INPUT
function selectItem(opcion){
	let idProduct=opcion.id;
	console.log("idProduct",idProduct)
	//para guardarla mi variable ANTES DE QUE ME ENLACE A OTRA
		let objetoConvertido=JSON.stringify(idProduct);
		sessionStorage.setItem("idProducto",objetoConvertido);
		window.location.href = "producto.html";
		
		//para obtener o entrar a ella CUANDO ESTOY EN LA OTRA PAG
		/*unproducto=localStorage-getItem("objetoC");
		let objetoRegresado=JSON.parse(unproducto);*/
	/*window.location.href = "producto.html";
	
	let objetoProducto=dataValue.filter(cadaObj=> cadaObj.id == idProduct);
	console.log("selectItem",idProduct,"objetop",objetoProducto);
	setImages(objetoProducto[0]);*/
	
}



//TODO::next page Carrito compras.html... 
//funcion que enlaza pag del carrito al icono
/*function changePage()
	console.log("ver pagina carrito ")
	window.location.href = "carritoCompras.html";*/ 
	//{producto:}
		/*window.location.href = "carritoCompras.html";
		//para guardarla mi variable ANTES DE QUE ME ENLACE A OTRA
		let objetoConvertido=JSON.stringify(unproducto);
		localStorage-setItem("objetoC",objetoConvdertido);
		
		//para obtener o entrar a ella CUANDO ESTOY EN LA OTRA PAG
		unproducto=localStorage-getItem("objetoC");
		let objetoRegresado=JSON.parse(unproducto);

		*/
//funcion de lo que entra en el input de html mas eventos
function setEventInputSearch(){ 
	let input=document.getElementById('searchInput');
	input.addEventListener('keyup',(input)=> typing(dataValue,input.target));
}
//funcion del evento al escribir en input y su busueda por producto
function typing(dataMyList,input){
	let lista=document.getElementById('list');
  let productsList='';
  if(input.value == '' ){
    //se oculta la lista
    lista.setAttribute('class','hide')
  } else{
    //se muestra lista
    lista.removeAttribute('class','hide');
      let result = dataMyList.filter((elemento,indice,array)=>elemento.name.toLowerCase().indexOf(input.value.toLowerCase()) != -1);
      console.log("result",result,"dataMyList",dataMyList)
    productsList= result.map((product,index) =>`<li id="${product.id}" class="item">${product.name.charAt(0).toUpperCase()+ product.name.slice(1)}</li>`).join("");
    
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

//traigo a mi abecedario
function getAbecedario(namesArr){
	// creando abecedario
	let abecedario="abcdefghijklmnñopqrstuvwxyz";
	abecedario=abecedario.split('');
	let primeraLetra=namesArr.map(cadaObj=> cadaObj.name[0].toLowerCase());
	let letrasEncontradas=abecedario.filter(letra => primeraLetra.indexOf(letra) != -1); 
	let ul=document.getElementById("abecedario");
	let nuevoAbc=letrasEncontradas.map(elemento =>`<li class="abc">${elemento.toUpperCase()}</li>`).join("");
	ul.innerHTML=nuevoAbc;
	setEventAbecedario();
}
//evento a letra abecedario
function setEventAbecedario(){

	let abc=Array.from(document.getElementsByClassName("abc"));
	abc.forEach((unaLi)=> unaLi.addEventListener('click',(unaLi)=>getProductCoincidencia(unaLi.target.textContent),false));
} 
//TODO:next page catalogo.html
//funcion que encuentra coincidencias en el ABECEDARIO
function getProductCoincidencia(letra){
	let listProduct=dataValue.filter(productInfo=> productInfo.name[0].toLowerCase() == letra.toLowerCase());
	console.log("letra",letra,"listProduct",listProduct);
}

//carrouzel
$ (document).ready(function(){
    $ ('.carousel').carousel();
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
			let optionSelect=categoriesObj[property].map(infoProduct => `<option id="${infoProduct.id}">${infoProduct.name}</option>`);
		    optionSelect.unshift(`<option disabled selected>${categoriesObj[property][0].category}</option>`);
		    
			select.innerHTML=optionSelect;
			select.addEventListener('change',(e)=> selectOption(e),false);
		}
		
	}
}
//TODO:next page producto.html
//opcion selecciona por el SELECT de CATEGORIAS por su nombre y index 
function selectOption(event){
	let idLista=event.target.selectedIndex;
	let etiqueta=event.target[idLista];
    console.log('idOriginal select',etiqueta);
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

 //funcion para traer todos los productos a la pag del catalogo
 function getcatalogoProductos(cadaProducto){
	console.log("cadaProducto",cadaProducto);
	const contenedor=document.getElementById('contenedor');

    let nameProducto='';
    let urlxImg;
    cadaProducto.forEach(contenido =>{
    	if(typeof contenido.imagen === 'string'){
    		urlxImg=contenido.imagen;
    	}else{
    		urlxImg=contenido.imagen[0];
    	}	
    	let precioxProduct;
    	if(typeof contenido.price === 'string'){
    		precioxProduct=contenido.price;
    	}else{
    		precioxProduct=contenido.price[0];
    	};
        console.log("precio",precioxProduct);
        nameProducto = 

	`
		<div class="col s3">
			<div onclick="selectProduct('${contenido.name}','${contenido.id}', this)">
				<div class="card horizontal">
					<div class="card-image">
						<img class="img" src="${urlxImg}" alt="img-${contenido.name}"/>
					</div>
					<div  class="card-stacked">
						<div class="card-content">
							<p>${contenido.name}</p>
							<p>${precioxProduct}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
        ` +nameProducto;

    });
    contenedor.innerHTML=`<div class="row">${nameProducto}</div>`;
    return nameProducto;

}
//TODO:next page de producto.html
//funcion para saber cual producto seleccione de la parte del catalogo
function selectProduct(unProducto,idProducto){
	console.log("unProducto",unProducto,"idProducto",idProducto);
	/*window.location.href = "producto.html";
	let productCata=dataValue.filter(cadaObjeto=> cadaObjeto.id == idProduct);
	console.log("selectItem",idProduct,"objetop",productCata);
	---fu--(productCata);*/
}   







  

