window.onload=initializeCatalogo();
function initializeCatalogo(){
    //para obtener o entrar a ella CUANDO ESTOY EN LA OTRA PAG
    let listSearch=sessionStorage.getItem("productsFound");
    let listaProducts=JSON.parse(listSearch);

    let dataVal=sessionStorage.getItem("valorData");
    let dataReturn=JSON.parse(dataVal);
    let elemento;
        
    if('sessionStorage' in window && window['sessionStorage'] !== null && sessionStorage.getItem("productsFound") !== null){
        let letterSearch=dataReturn.map(cadaObjeto=> cadaObjeto.name[0]);
        let initialLetter=listaProducts.filter(obj=> letterSearch.indexOf(obj.name[0]) != -1);
        elemento=initialLetter.map(elemento=> elemento);
        getcatalogoProductos(elemento);    
    }else{
            elemento=dataReturn;
            getcatalogoProductos(elemento);
            //por defaut deje todos 
    }  
}

//en las col s3 cuando solo entre un producto no se logra acomodar y se tendria que desabilitar de materialize las cols3 para que creesca
//pregunta para ver si asi lo dejo o entraria en condicional para que se acomode a uno o mas???
function getcatalogoProductos(cadaProducto){
	console.log("cadaProductoesArray",cadaProducto);
	const contenedor=document.getElementById('contenedor');

    let nameProductoNodo='';
    let urlxImg;
    cadaProducto.filter(porUnObj => {
    	if(typeof porUnObj.imagen === 'string'){
    		urlxImg=porUnObj.imagen;
    	}else{
    		urlxImg=porUnObj.imagen[0];
    	}	
    	let precioxProduct;
    	if(typeof porUnObj.price === 'string'){
    		precioxProduct=porUnObj.price;
    	}else{
    		precioxProduct=porUnObj.price[0];
    	};
        console.log("precio",precioxProduct);
        nameProductoNodo += 

	`
		<div class="col s3">
			<div onclick="selectProduct('${porUnObj.name}','${porUnObj.id}', this)">
				<div class="card card horizontal">
					<div id="imgs" class="card-image">
						<img class="img" src="${urlxImg}" alt="img-${porUnObj.name}"/>
					</div>
					<div  class="card-stacked">
						<div class="card-content">
							<p>${porUnObj.name}</p>
							<p>${precioxProduct}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
        `;

    });
    contenedor.innerHTML=`<div class="row">${nameProductoNodo}</div>`;
    //return nameProductoNodo;

}
//TODO:next page de producto.html
//funcion para saber cual producto seleccione de la parte del catalogo
function selectProduct(unProducto,id){
	console.log("unProducto",unProducto,"idProducto",id);
    let idProduct=id;
    console.log("idProduct",idProduct)
    //para guardarla mi variable ANTES DE QUE ME ENLACE A OTRA
        let objetoConvertido=JSON.stringify(idProduct);
        sessionStorage.setItem("idProducto",objetoConvertido);
        window.location.href = "producto.html";

}