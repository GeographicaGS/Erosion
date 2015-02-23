function drawCategories(unLoadDefaultProject) {
	
	var html = "<ul class='families'>";
	html += getHtmlCategories(categories,0);
	
	$("#capasCatalogo").html(html);


	// $(".families").append("	<ul class='family_header' style='padding-left:0px' title='SERVICIOS DE TERCEROS'> "+
	// 							"<li class='ico_open_close'><img style='vertical-align: top;' src='application/views/img/MED_icon_familia.png'></li>"+
	// 							"<li class='name ellipsis'>SERVICIOS DE TERCEROS</li>"+
	// 							"<li class='n_elements'>(1)</li>"+
	// 						"</ul>"+
	// 						"<div class='clear'></div>"+
	// 						"<ul class='family_content' style='padding-left: 0px; display:none;'>"+
	// 							"<li idcapa='60' style='border-top: 1px solid #ccc;'>"+
	// 								"<p class='ellipsis' title='Panoramio'>Panoramio</p>"+
	// 								"<div class='fleft fright mr' style='margin-top:8px;' tipo='panoramio'>"+
	// 									"<span class='tiposCapas plus'>PANORAMIO</span></div></div><div class='clear'>"+
	// 								"</div>"+
	// 							"</li>"+
	// 						"</ul>");

	
	
	$.ajax({
        url: 'index.php/draw/getCategoriesWithData', dataType: "json",
        success: function(response) {
        	var html = "<ul class='family_content'>";
					
					for(var y=0; y<response.length; y++){
						html += "<li style='border-top: 1px solid #ccc; " + (parseInt(response[y].numdraws) == 0 ? 'display:none;' : '') + "'>" + 
						"<p class='ellipsis' title='"+ response[y].title + "'>" + response[y].title + "</p>" +
						// "<img title='Añadir capa' class='botonAddImage' src='application/views/img/ERO_icon_anadir_capa.png'>"+
						"<span style='display:none;'>" + (response[y].descripcion != null ?  response[y].descripcion : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.") + "</span>"
						;
					
						html+= "<div idCapa='"+ response[y].id_category +"' tipo='vectorial' class='fleft fright' style='margin-top:8px;'><span class='tiposCapas plus mr'>CAPA VECTORIAL</span></div>";
						
						html += "</div>"
							html+= "<div class='clear'></div>" + 
						"</li>";
					}

        		html += "</ul>"+
				
				"<div class='clear'></div>" + 
				"</li>";
        		
        	html += "</ul></div>";	
        	
        	$("#usuariosCatalogo").html(html);
        	
        }
    });
	
	$.ajax({
		url: 'index.php/project/getMyProjects', dataType: "json",
        success: function(response) {
        	if(isLoged){
        		$(".seccion[idSection=4]").show();
            	var html = "";
            	
            	html += "<ul class='family_content'>";
            		
            		for(var y=0; y<response.length; y++){
            			html += "<li style='border-top: 1px solid #ccc;'>" + 
        				"<p class='ellipsis " + ((defaultProject && defaultProject == response[y].titulo) ? 'default':'') + "' title='"+ ((defaultProject && defaultProject == response[y].titulo) ? response[y].titulo + ' - Establecido por defecto':response[y].titulo) + "'>" + response[y].titulo + "</p>" +
        				// "<img title='Añadir capa' class='botonAddImage' src='application/views/img/ERO_icon_anadir_capa.png'>"+
        				"<span style='display:none;'>" + response[y].descripcion + "</span>"
        				;
            			
            			html+= "<div class='fleft fright' style='margin-top:8px;' idProject='"+ response[y].titulo +"' tipo='proyecto' class='fleft'><span class='tiposCapas plus mr'>CARGAR PROYECTO</span></div>";
            			
            			
            			
            			html+= "<div class='clear'></div>" + 
            		"</li>";
            		}

            		html += "</ul>"+
            		
            		"<div class='clear'></div>" + 
            		"</li>";
            		
            		html += "</ul></div>";
            		$("#myProyectCatalogo").html(html);
            		
        	}else{
        		$("div[idSection='4']").hide();
        		if($(".catalogo .cuerpoCatalogo .cabecera .active").attr("idSection") == 4){
        			$(".seccion[idSection=1]").trigger("click");
        		}
        	}
        }
	});
	
	
	$.ajax({
        url: 'index.php/project/getPublicProjects', dataType: "json",
        success: function(response) {
        	var html = "<ul class='family_content'>";
        		
        		for(var y=0; y<response.length; y++){
        			html += "<li style='border-top: 1px solid #ccc;'>" + 
    				"<p class='ellipsis " + ((defaultProject && defaultProject == response[y].titulo) ? 'default':'') + "' title='"+ ((defaultProject && defaultProject == response[y].titulo) ? response[y].titulo + ' - Establecido por defecto':response[y].titulo) + "'>" + response[y].titulo + "</p>" +
    				"<span style='display:none;'>" + response[y].descripcion + "</span>"	
    				;
        			
        			html+= "<div class='fleft fright' style='margin-top:8px;' idProject='"+ response[y].titulo +"' tipo='proyecto' class='fleft'><span class='tiposCapas plus mr'>CARGAR PROYECTO</span></div>";
        			
        			html+= "<div class='clear'></div>" + 
        		"</li>";
        		}

        		html += "</ul>"+
        		
        		"<div class='clear'></div>" + 
        		"</li>";
        		
        		html += "</ul></div>";
        		$("#publicProyectCatalogo").html(html);

        		if(defaultProject && !unLoadDefaultProject){
        			$(".contenidoCatalogo").find("div[idProject='" + defaultProject + "']").find(".tiposCapas").trigger("click")
        		}
        }
	});
};
	
function buscarCapa(id, categories){
	for(var i=0; i<categories.length; i++){
		for(var y=0; y<categories[i].layers.length; y++){
			if(categories[i].layers[y].id==id){
				//Devuelvo el objeto clonado para poder utilizarlo en otras partes de la aplicación sin que me modifique
				//el catálogo
				return JSON.parse(JSON.stringify(categories[i].layers[y]));
			}
		}
		if(categories[i].hasOwnProperty("categories")){
			var capa = buscarCapa(id, categories[i].categories);
			if(capa){
				return capa;
			}
		}
	}
}

function getHtmlCategories(categories, index) {
	var html = "";
	
	for(var i=0; i<categories.length; i++){
		html +=
					"<ul class='family_header' style='padding-left:" + index*10 +"px' title='" + categories[i].title + "'>" +
						"<li class='ico_open_close'><img style='vertical-align: top;' src='application/views/img/MED_icon_familia.png'></li>" +
						"<li class='name ellipsis'>" + categories[i].title + "</li>";

		if(categories[i].layers.length > 0){
			html +=		"<li class='n_elements'>(" + categories[i].layers.length + ")</li>";
		}
		
		html +=			"</ul>"+
					
					"<div class='clear'></div>"+
					
					"<ul class='family_content' style='display:none;padding-left:" + index*10 +"px'>";
						
						if(categories[i].hasOwnProperty("categories")){
								html += getHtmlCategories(categories[i].categories, index+1);
						}

						for(var y=0; y<categories[i].layers.length; y++){
							html += "<li idCapa='" + categories[i].layers[y].id + "' style='border-top: 1px solid #ccc;'>" + 
								"<p class='ellipsis' title='"+ categories[i].layers[y].title + "'>" + categories[i].layers[y].title + "</p>" +
								"<img title='Añadir capa' class='botonAddImage' src='application/views/img/ERO_icon_anadir_capa.png'>" +
								"<span style='display:none;'>" + categories[i].layers[y].description + "</span>"
								;

								if(categories[i].layers[y].info){
	    							html += "<a href='" + categories[i].layers[y].info + "' target='_blank' class='moreInfo' style='display:none;'>Más información</a>"
	    						}
								
								html += "<div class='listaTipos mt'>"
	    							if((categories[i].layers[y].wms) && (categories[i].layers[y].wms.server) && (categories[i].layers[y].wms.name)){
	    								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='wms' class='fleft fright'><span class='tiposCapas'>WMS</span></div>";
	    							}
	                        							
	    							if((categories[i].layers[y].wmts) && (categories[i].layers[y].wmts.server) && (categories[i].layers[y].wmts.name)){
	    								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='wmts' class='fleft fright'><span class='tiposCapas'>WMTS</span></div>";
	    							}
	                        							
	    							if((categories[i].layers[y].tms) && (categories[i].layers[y].tms.server) && (categories[i].layers[y].tms.name)){
	    								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='tms' class='fleft fright'><span class='tiposCapas'>TILES</span></div>";
	    								
	    							}
	                        							
	    							if(categories[i].layers[y].simbolo){
	    								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='simbolo' class='fleft fright'><span class='tiposCapas'>Símbolos</span></div>";
	    							}

								html += "</div>"
								html+= "<div class='clear'></div>" + 
							"</li>";
						}

					html += "</ul>"+
					
				"<div class='clear'></div>" + 
				"</li>";
	}
	
	return html;
}

function existCapaVectorial(map, idCapa){
	for(var i=0; i<map.layers.length; i++){
		if(map.layers[i].tipo == "geoJson" && map.layers[i].id == idCapa){
			return true;
		}
	}
	return false;
}

function removeGeometryFromLayer(map, idCapa, idDraw){
	for(var i=0; i<map.layers.length; i++){
		if(map.layers[i].tipo == "geoJson" && map.layers[i].id == idCapa){
			var layers = map.layers[i].layer._layers;
			for(var key in layers){
				if(layers[key].feature.properties.id == idDraw){
					var a = 9;
					map.getMap().removeLayer(layers[key]);
					delete layers[key];
					break;
				}
			}
		}
	}
}