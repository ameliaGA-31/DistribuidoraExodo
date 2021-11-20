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
function selectProduct(unProducto,id){
	console.log("unProducto",unProducto,"idProducto",id);
    let idProduct=id;
    console.log("idProduct",idProduct)
    //para guardarla mi variable ANTES DE QUE ME ENLACE A OTRA
        let objetoConvertido=JSON.stringify(idProduct);
        sessionStorage.setItem("idProducto",objetoConvertido);
        window.location.href = "producto.html";

}