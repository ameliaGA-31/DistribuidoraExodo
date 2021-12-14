window.onload=initializeCatalogo();
function initializeCatalogo(){
    //para obtener o entrar a ella CUANDO ESTOY EN LA OTRA PAG
    let dataReturn;
    //recibo demi promesa anterior promiseData
    window.dataStoredValorData.then((promiseData)=>{
        let dataVal=promiseData;
        dataReturn=JSON.parse(dataVal);
        processData(dataReturn);
    });
    
}
function processData(dataReturn){
    let listSearch=sessionStorage.getItem("productsFound");
    let listaProducts=JSON.parse(listSearch);
    let elemento;

    if(dataReturn){
        let letterSearch=dataReturn.map(cadaObjeto=> cadaObjeto.name[0]);
        if('sessionStorage' in window && window['sessionStorage'] !== null && listSearch !== null){
            let initialLetter=listaProducts.filter(obj=> letterSearch.indexOf(obj.name[0]) != -1);
            elemento=initialLetter.map(elemento=> elemento);
            getcatalogoProductos(elemento);    
        }else{
            let carga=dataReturn.filter(obje=> obje.name.indexOf('la') != -1);
            getcatalogoProductos(carga);
        } 
        
    }
        
    
 
}

//en las col s3 cuando solo entre un producto no se logra acomodar y se tendria que desabilitar de materialize las cols3 para que creesca
//pregunta para ver si asi lo dejo o entraria en condicional para que se acomode a uno o mas???
function getcatalogoProductos(cadaProducto){
	const contenedor=document.getElementById('contenedor');
    let prices;
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
        nameProductoNodo += 

	`
		<div id="cols" class="col s6 m3">
			<div onclick="selectProduct('${porUnObj.name}','${porUnObj.id}', this)">
				<div id="cardH" class="card card horizontal">
					<div id="imgs" class="card-image">
						<img class="img imgC" src="${urlxImg}" alt="img-${porUnObj.name}"/>                        
					</div>
					<div  class="card-stacked">
						<div class="card-content">
							<p>${porUnObj.name.charAt(0).toUpperCase()+ porUnObj.name.slice(1)}</p>
							<p>${precioxProduct}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
        `;
    });
    contenedor.innerHTML=`<div class="row contNodo">${nameProductoNodo}</div>`;
    //return nameProductoNodo;

}
//TODO:next page de producto.html
//funcion para saber cual producto seleccione de la parte del catalogo
function selectProduct(unProducto,id){
    let idProduct=id;
    //para guardarla mi variable ANTES DE QUE ME ENLACE A OTRA
        let objetoConvertido=JSON.stringify(idProduct);
        sessionStorage.setItem("idProducto",objetoConvertido);
        window.location.href = "producto.html";

}