function drawCategories(unLoadDefaultProject) {
	
	var html = "<ul class='families'>";
	html += getHtmlCategories(categories,0);
	
	$("#capasCatalogo").html(html);


	$(".families").append("	<ul class='family_header' style='padding-left:0px' title='SERVICIOS DE TERCEROS'> "+
								"<li class='ico_open_close'><img style='vertical-align: top;' src='application/views/img/MED_icon_familia.png'></li>"+
								"<li class='name ellipsis'>SERVICIOS DE TERCEROS</li>"+
								"<li class='n_elements'>(1)</li>"+
							"</ul>"+
							"<div class='clear'></div>"+
							"<ul class='family_content' style='padding-left: 0px; display:none;'>"+
								"<li idcapa='60' style='border-top: 1px solid #ccc;'>"+
									"<p class='ellipsis' title='Panoramio'>Panoramio</p>"+
									"<div class='fleft fright mr' style='margin-top:8px;' tipo='panoramio'>"+
										"<span class='tiposCapas plus'>PANORAMIO</span></div></div><div class='clear'>"+
									"</div>"+
								"</li>"+
							"</ul>");

	eventosCatalogo();
	
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
        	eventosCatalogo();
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
            		eventosCatalogo();
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
        		eventosCatalogo();
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
				return categories[i].layers[y];
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


function eventosCatalogo(){
	
	$(".tiposCapas").unbind().bind( "click", function(event){
		$(this).closest("li").trigger("click");
		
		if($(this).parent().attr("tipo") == "proyecto"){
			
			Split.removeAllLayers();
			var project = $(this).parent().attr("idproject");
			$.ajax({
		        url: 'index.php/project/getLayersProject/' + encodeURIComponent(project), 
		        dataType: "json",
		        success: function(response) {
		        	var capas = JSON.parse(response.capas);
		        	var capasLeft = JSON.parse(capas.left);
		        	var capasRight = JSON.parse(capas.right);
		        	
		        	if(capas.hasOwnProperty('leftState')){
		        		Split.__mapLeft.getMap().setView(L.latLng(capas.leftState.lat,capas.leftState.lng),capas.leftState.zoom);
		        	}
		        	if(capas.hasOwnProperty('rightState')){
		        		Split.__mapRight.getMap().setView(L.latLng(capas.rightState.lat,capas.rightState.lng),capas.rightState.zoom);
		        	}
		        	
		        	
		        	Split.__mapRight.project = project;
		        	Split.__mapLeft.project = project;
		        	
		        	
		        	for(var i=0; i<capasRight.length; i++){
		        		if(capasRight[i].tipo == "geoJson"){
		        			
		        			$.ajax({
                		        url: 'index.php/draw/getDraws/' + capasRight[i].id, 
                		        dataType: "json",
                		        success: function(response) {
                		        	Split.addLayer(null,"vectorial", null, response,1,capasRight[i].visible);  
                		        }
                			});
		        			
		        		}else{
		        			var capa = buscarCapa(capasRight[i].id, categories);
                			leyenda = null;
                			if(capa.wms){
                				leyenda = capa.wms.server;
                			}
                			Split.addLayer(capa,capasRight[i].tipo, leyenda, null,1, capasRight[i].visible, capasRight[i].opacity);
		        		}
		        	}
		        	
		        	for(var i=0; i<capasLeft.length; i++){
		        		if(capasLeft[i].tipo == "geoJson"){
		        			
		        			$.ajax({
                		        url: 'index.php/draw/getDraws/' + capasLeft[i].id, 
                		        dataType: "json",
                		        success: function(response) {
                		        	Split.addLayer(null,"vectorial", null, response,2, capasLeft[i].visible);  
                		        }
                			});
		        			
		        		}else{
		        			var capa = buscarCapa(capasLeft[i].id, categories);
                			leyenda = null;
                			if(capa.wms){
                				leyenda = capa.wms.server;
                			}
                			Split.addLayer(capa,capasLeft[i].tipo, leyenda, null,2, capasLeft[i].visible, capasLeft[i].opacity);
		        		}
		        	}
		        	
		        }
			});
			
			
			
		}else{
			var self = $(this);
    		$("#fancy_select_panel").css({"top":event.pageY, "left":event.pageX});
    		$("#fancy_select_panel").show(300);
    		
    		$(".panelSelect").unbind().bind( "click", function(){
    			var panel = $(this).attr("panel");
    			tipo = self.parent().attr("tipo");
    			if(tipo == "vectorial"){
        			$.ajax({
        		        url: 'index.php/draw/getDraws/' + self.parent().attr("idCapa"), 
        		        dataType: "json",
        		        success: function(response) {
        		        	Split.addLayer(null,tipo, null, response,panel);  
        		        }
        			});
        		}
        		else if(tipo == "panoramio"){
        			Split.addLayer("null","panoramio",null,null,panel,null)

        		}else{
        			capa = buscarCapa(self.parent().attr("idCapa"), categories);
        			leyenda = null;
        			if(capa.wms){
        				leyenda = capa.wms.server;
        			}
        			Split.addLayer(capa,tipo, leyenda, null,panel);
        		}
    		});
    		
    		event.stopPropagation();
		}
		
	});	

	$(".family_content li").unbind().bind( "click", function(){
		//Restauro vistas
		if($(".seccion.active").attr("idSection") == 4){
			$(".deleteProyect").show();
		}else{
			$(".deleteProyect").hide();
		}
		$("#commentsVector").hide();
		$("#geometryVector").hide();
		$("#addHistoryForm").hide();
		$("#kmlAll").remove();
		$(".botonAddImageLeyenda").show();
		$(".extraLeyenda").children(".title3, .divLeyenda").show();
		$(".moreInfo").hide();


		if($(this).parent().hasClass("family_content")){
			$(".infoCatalogo .petaniaInfoCatalogo").show();
			
			$(".cuerpoInfoCatalogo").find(".title1").text($(this).find("p").text());
			if($(this).find(".moreInfo").length > 0){
				$(".infoCatalogo .cuerpoInfoCatalogo .moreInfo").attr("href",$(this).find(".moreInfo").attr("href"));
				$(".infoCatalogo .cuerpoInfoCatalogo .moreInfo").show();
			}
			$(".cuerpoInfoCatalogo").find(".title1").prop('title', $(this).find("p").text());
			
			//Si es un proyecto compruebo el estado del botón de proyecto por defecto
			if(isAdmin && ($(this).find("div[idProject]").length > 0)){
				$(".defaultProject").show();
				if(defaultProject && defaultProject == $(this).find("p").text()){
					$(".defaultProject").addClass('active');
					$(".defaultProject").prop("title", "Establecido por defecto");
				}else{
					$(".defaultProject").removeClass('active');
					$(".defaultProject").prop("title", "Establecer por defecto");
				}

			}else{
				$(".defaultProject").hide();
			}
			

			$(".cuerpoInfoCatalogo").find(".title2").text($($(this).find("span")[0]).text());
			
			$(".cuerpoInfoCatalogo").find(".divLeyenda").html("<div class='diagonal1'></div><div class='diagonal2'></div>");
			$(".cuerpoInfoCatalogo").find(".divLeyenda").css({"height": ""});
			
			$(".extraLeyenda").show();
			$(".botonAddImageLeyenda").show();
			$(".cuerpoInfoCatalogo").find(".title1").show();
			$(".cuerpoInfoCatalogo").find(".title2").show();
			
			var tipos = $(this).find(".listaTipos").children();
			$(".cuerpoInfoCatalogo").find(".listaTiposLeyenda").html("");
			var aux;
			if(tipos.length > 0){
				$(".botonAddImageLeyenda").show();
				$(".extraLeyenda").children(".title3, .divLeyenda").show();
				for(var i=0; i<tipos.length; i++){
					aux = $(tipos[i]).clone();
					$(aux).removeClass();
					$(aux).find("span").addClass("fleft");
					$(".cuerpoInfoCatalogo").find(".listaTiposLeyenda").append(aux);
				}
				var capa = buscarCapa($(this).attr("idCapa"),categories);
				if(capa.wms){
					var legendUrl = capa.wms.server.replace("/gwc/service", "") + "?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&"
					+"EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + capa.wms.name;
					$(".cuerpoInfoCatalogo").find(".divLeyenda").html("<img src='" + legendUrl +"'/>");
					$(".cuerpoInfoCatalogo").find(".divLeyenda").css({"height": "auto"});
				}
				
				
			}else{
				aux = $(this).find("div[tipo]").clone();
				$(aux).removeClass();
				$(aux).find("span").addClass("fleft");
				$(aux).css({"margin-left":"10"});
				$(".cuerpoInfoCatalogo").find(".listaTiposLeyenda").append(aux);
				$(".botonAddImageLeyenda").hide();

				//Para el caso de los vectoriales
				if($($(this).find("div[idcapa]")[0]).attr("tipo") == "vectorial"){
					aux.append('<img id="kmlAll" class="mb5" title="Exportar toda la categoria a kml" src="application/views/img/ERO_icon_kml.png">')
					$(".extraLeyenda").children(".title3, .divLeyenda").hide();
					$("#geometryVector").show();
					$("#geometryVectorList").html("");
					var idCapa = $($(this).find("div[idcapa]")[0]).attr("idcapa");

					$("#kmlAll").unbind().bind("click", function() {
						window.location.href = 'index.php/draw/getAllKml/' + idCapa
					});

					$.ajax({
						url: 'index.php/draw/getDrawList/' + idCapa, 
						dataType: "json",
						success: function(response) {
							$("#geometryVector").find(".title3").text("HISTORIAS (" + response.length + ")")
							for(var i=0; i<response.length; i++){
								$("#geometryVectorList").append("<img title='Eliminar historia' class='deleteHistory' idUser='" + response[i].id_user +"' src='application/views/img/MED_icon_delete.png'> <p idDraw='" + response[i].id_draw + "' tipo= '" + response[i].tipo + "' comentario='" + response[i].comentario +"' idUser='" + response[i].id_user + "'>" + response[i].titulo + "</p>");
							}
							updatedState();
							$(".deleteHistory").unbind().bind("click", function(event) {
								var idDrawtoDelte = $(this).next().attr("idDraw");
								var aux = $(this);
								showConfirmDialog(function(){
									$.ajax({
										url: 'index.php/draw/deteleDraw/' + idDrawtoDelte,
											success: function(response) {
												removeGeometryFromLayer(Split.__mapLeft, idCapa, idDrawtoDelte);
												removeGeometryFromLayer(Split.__mapRight, idCapa, idDrawtoDelte);
												aux.next().remove();
												aux.remove();
												var numDraw = parseInt($("#geometryVector").find(".title3").text().split("(")[1].replace(")","")) -1;
												$("#geometryVector").find(".title3").text("HISTORIAS (" + numDraw + ")")
												if(numDraw == 0){
													drawCategories(true);
												}
										    }
									});           
								},"¿Desea borrar la historia seleccionada?");
							});
							$("#geometryVectorList p").unbind().bind("click", function(event) {
								var tipo = $(this).attr("tipo");
								var idDraw = $(this).attr("idDraw");
								$(".addCommentInput").val("");
								
								$(".deleteGeometry").remove();
								$("#kmlExport").remove()
								if(tipo == "marker" || tipo == "linea" || tipo == "poligono"){
									$("#deleteGeometry").append("<p class='deleteGeometry' idUser=''>Eliminar geometría</p><p id='kmlExport' idUser='' title='Exportar geometría a kml'>Exportar a kml</p>");
									$(".deleteGeometry").attr("idUser", $(this).attr("idUser"));
									$(".deleteGeometry").unbind().bind("click", function(event) {
										showConfirmDialog(function(){
											$.ajax({
									        	url: 'index.php/draw/deteleGeom/' + idDraw,
										        success: function(response) {
										        	removeGeometryFromLayer(Split.__mapLeft, idCapa, idDraw);
													removeGeometryFromLayer(Split.__mapRight, idCapa, idDraw);
													$(".deleteGeometry").remove();
													$("#kmlExport").remove()
													$("#commentsVector img").attr("src", "");
										        }
									        });           
										    },"¿Desea borrar la geometría seleccionada? <br><br> Esta accción eliminará la geometría del mapa pero mantendrá la historia y sus comentarios");
									});

									$("#kmlExport").unbind().bind("click", function(event) {
										window.location.href = 'index.php/draw/getKml/' + idDraw
									});
								}

								if(tipo == "marker"){
					    			$("#commentsVector img").attr("src", "application/views/img/ERO_icon_punto.png");
						    	}else if(tipo == "linea"){
						    		$("#commentsVector img").attr("src", "application/views/img/ERO_icon_linea.png");
						    	}else if(tipo == "poligono"){
						    		$("#commentsVector img").attr("src", "application/views/img/ERO_icon_poligono.png");
		    					}else{
		    						$("#commentsVector img").attr("src", "");
		    					}
								$("#commentsVector h1").text($(this).text());
								$("#commentsVector h2").html($(this).attr("comentario"));
								updatedState();
								$.ajax({
									url: 'index.php/draw/getBoundingBox/' + idDraw, 
									dataType: "json",
									success: function(response) {
										var loadLeft = existCapaVectorial(Split.__mapLeft, idCapa);
										var loadRight = existCapaVectorial(Split.__mapRight, idCapa);
										if(!loadLeft && !loadRight){
											$(".cuerpoInfoCatalogo").find(".tiposCapas").trigger("click");
											$("#fancy_select_panel").css({"top":$(".cuerpoInfoCatalogo").find(".tiposCapas").offset().top +20, "left":$(".cuerpoInfoCatalogo").find(".tiposCapas").offset().left+20});
											
											if(response.latmin != null && response.lngmin != null && response.latmax != null && response.lngmax != null){
												$(".panelSelect").addClass("clickVectorial")
												$(".clickVectorial").on("click", function() {
													$(".panelSelect").removeClass("clickVectorial");
													var panel = $(this).attr("panel");
													if(panel == "1"){
														Split.__mapRight.getMap().fitBounds([[response.latmin, response.lngmin],[response.latmax, response.lngmax]])
													}else if(panel == "2"){
														Split.__mapLeft.getMap().fitBounds([[response.latmin, response.lngmin],[response.latmax, response.lngmax]])
													}else{
														Split.__mapRight.getMap().fitBounds([[response.latmin, response.lngmin],[response.latmax, response.lngmax]])
														Split.__mapLeft.getMap().fitBounds([[response.latmin, response.lngmin],[response.latmax, response.lngmax]])
													}
												});
											}
										}
										if(response.latmin != null && response.lngmin != null && response.latmax != null && response.lngmax != null){
											if(loadLeft){
												Split.__mapLeft.getMap().fitBounds([[response.latmin, response.lngmin],[response.latmax, response.lngmax]])
											}
											if(loadRight){
												Split.__mapRight.getMap().fitBounds([[response.latmin, response.lngmin],[response.latmax, response.lngmax]])
											}
										}
									}
								});
								
								$("#geometryVector").hide();
								$("#commentsVectorVectorList").html("");
								$("#commentsVector").show();
								$.ajax({
									url: 'index.php/draw/getDrawsComents/' + idDraw, 
									dataType: "json",
									success: function(response) {
										for(var i=0; i<response.result.length; i++){
											$("#commentsVectorVectorList").append("<p class='size11'>" +
														"<span class='userComentTable'>" + response.result[i].name + " " + response.result[i].surname +"</span>" +
														"<span class='pl5' style='font-weight: normal;'>" + response.result[i].fecha + "</span>" +
														"<span class='deleteComment' idComment='" + response.result[i].id_coment + "' idUser='" + response.result[i].id_user + "''>Eliminar</span>" +
														"</br>" +
														response.result[i].comentario +
													"</p>" +
													"<div style='border-top: 1px solid #cccccc;width: 100%;'></div>");
										}
										deleteCommentEvent();
										updatedState();
									}
								});

								$("#commentsVector h1").unbind().bind("click", function() {
									$("#geometryVectorList").find("p[idDraw='" + idDraw + "']").trigger('click');
								});

								$(".addComentButton").unbind().bind("click", function() {
									if($(".addCommentInput").val() != ""){
										$.ajax({
					        		        url: 'index.php/draw/addComent/' + idDraw,
					        		        data: { cometario:$(".addCommentInput").val()},
					        		        dataType: "json",
					        		        type: 'POST',
					        		        success: function(response) {
					        		        	$("#commentsVectorVectorList").append("<p class='size11'>" +
																					"<span class='userComentTable'>" + response.user +"</span>" +
																					"<span class='pl5' style='font-weight: normal;'>" + response.fecha + "</span>" +
																					"<span class='deleteComment' idComment='" + response.id_coment + "' idUser='" + idUser + "''>Eliminar</span>" +
																					"</br>" +
																					response.comentario +
																				"</p>" +
																				"<div style='border-top: 1px solid #cccccc;width: 100%;'></div>");

					        		        	deleteCommentEvent();
					        		        	 $(".addCommentInput").val("");
					        		        	 $(".cuerpoInfoCatalogo").scrollTop($(".cuerpoInfoCatalogo").outerHeight())
					        		        }
					        			});
									}
								});
							});       		        	
						}
					});
				}
			}	
			
			eventosCatalogo();
		}
	});

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