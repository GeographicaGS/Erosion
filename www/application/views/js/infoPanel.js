//Esta variable se usa por si se pincha sobre una geometría y la categoría no está cargada en el panel derecho,
//se le da valor en GSLayerGeoJson.js en onEachFeatureGeoJson
var geometryClicked = null;

function infoPanelEvents(){
	//Muestra u oculta el panel de información
	$(".petaniaInfoCatalogo").click(function(e){
		if($(".cuerpoInfoCatalogo").is(":visible")){
			$(".infoCatalogo").animate({"right": "-" + $(".infoCatalogo").outerWidth() + "px"},function(){
				$(".cuerpoInfoCatalogo").hide();
				$(".petaniaInfoCatalogo").find("img").attr("src",$(".petaniaInfoCatalogo").find("img").attr("src").replace("ERO_icon_pestana_info.png","ERO_icon_pestana_info_off.png"));
			});
			$(".cuerpoInfoCatalogo").parent().css({'z-index':''});
			
		}else{
			$(".cuerpoInfoCatalogo").show();
			$(".infoCatalogo").animate({"right":""});
			$(".petaniaInfoCatalogo").find("img").attr("src",$(".petaniaInfoCatalogo").find("img").attr("src").replace("ERO_icon_pestana_info_off.png","ERO_icon_pestana_info.png"));			
			$(".cuerpoInfoCatalogo").parent().css({'z-index':'1003'});
		}
		e.stopPropagation();
	});

	//Eventos relacionados con la redimensión del catálogo///////////////////////////////////////////////////
	$(".cuerpoInfoCatalogo").mousedown(function(e) {
		e.stopPropagation();
	}).mouseup(function(e) {
		e.stopPropagation();
	});
	
	$(".petaniaInfoCatalogo").mousedown(function(e) {
		e.stopPropagation();
	}).mouseup(function(e) {
		e.stopPropagation();
	});

	$(".infoCatalogo").mousedown(function() {
		$(".cuerpoInfoCatalogo, #container").css({"cursor":"col-resize"});
		$(".cuerpoInfoCatalogo, #container").mousemove(function(e) {
			$(".infoCatalogo").outerWidth($("#proyecto").outerWidth() - e.originalEvent.clientX);
		});
	});

	$("#container, .cuerpoInfoCatalogo, header, footer").mouseup(function(e) {
		$(".cuerpoInfoCatalogo, #container").css({"cursor":""});
		$(".cuerpoInfoCatalogo, #container").off("mousemove");
		if($(this).hasClass("cuerpoInfoCatalogo")){
			$("#fancy_select_panel").hide(300);
			e.stopPropagation();
		}
	});

	//////////////////////////////////////////////////////////////////////////////////////////////////////

	//Eventos relacionados con las historias/////////////////////////////////////////////////////////////
	$(".addHistoryButton").click(function(event, latlng) {
		$("#geometryVector").hide();
		$("#addHistoryForm input[type='text']").val("");
		$(".addCommentHistory").val("");
		$("#addHistoryForm").show();
		$("#addHistoryForm input[type='text']").removeClass("errorBorder");
		$(".addCommentHistory").removeClass("errorBorder");
		$("#typeHistory").val("Historia");
		$("#addHistoryForm").find(".goBack").show();

		// Cargo las categorias
		$("#addHistoryForm select").html("");

		var idProject = Split.__mapLeft.project;
		if(!idProject){
			idProject = Split.__mapRight.project;
		}

		$.ajax({
		        url: 'index.php/draw/getCategories/' + encodeURIComponent(idProject), dataType: "json",
		        success: function(response) {
		        	$("#fancy_box_form_save_draw").find("select").children().remove();
		        	for(var i=0; i<response.length; i++){
			    		$("#addHistoryForm select").append("<option value='" + response[i].id_category + "' " + ($(".extraLeyenda").find("div[idCapa]").attr("idCapa") == response[i].id_category ?  'selected' : '') + ">" + response[i].title + "</option>");
			    	}
			    }
		});

		$(".saveHistoryButton").unbind().click(function() {
			$("#addHistoryForm input[type='text']").removeClass("errorBorder");
			$(".addCommentHistory").removeClass("errorBorder");
			var guardar = true;
			if($("#addHistoryForm input[type='text']").val() == ""){
				$("#addHistoryForm input[type='text']").addClass("errorBorder");
				guardar = false;
			}
			if($(".addCommentHistory").val() == ""){
				$(".addCommentHistory").addClass("errorBorder");
				guardar = false;
			}
			if(guardar){
				$.ajax({
					url: 'index.php/draw/saveDraw',
					data: "puntos=" + (latlng != null ? JSON.stringify(latlng): "") + "&type=" + $("#typeHistory").val() + "&" + "&titulo=" + $("#addHistoryForm input[type='text']").val() + "&comentario=" + $(".addCommentHistory").val() + "&categoria=" + $("#addHistoryForm select").val(),
					type: "POST",
					success: function(response) {
						var htmlCategory = $(".contenidoCatalogo").find("div[idCapa='" + $("#addHistoryForm select").val() + "'][tipo='vectorial']").parent();
						htmlCategory.show();
						htmlCategory.trigger("click");

						if(latlng != null){
							//Borro la geomatría y refresco la categoría
							$.each(Split.__mapLeft.getMap()._layers, function(key){
								if((Split.__mapLeft.getMap()._layers[key]._latlng && compareLayersCoordinates(Split.__mapLeft.getMap()._layers[key]._latlng, latlng)) || (Split.__mapLeft.getMap()._layers[key]._latlngs && compareLayersCoordinates(Split.__mapLeft.getMap()._layers[key]._latlngs, latlng))){
									Split.__mapLeft.getMap().removeLayer(Split.__mapLeft.getMap()._layers[key]);
									return true;
								}
							});
									        	
							$.each(Split.__mapRight.getMap()._layers, function(key){
								if((Split.__mapRight.getMap()._layers[key]._latlng && compareLayersCoordinates(Split.__mapRight.getMap()._layers[key]._latlng, latlng)) || (Split.__mapRight.getMap()._layers[key]._latlngs && compareLayersCoordinates(Split.__mapRight.getMap()._layers[key]._latlngs, latlng))){
									Split.__mapRight.getMap().removeLayer(Split.__mapRight.getMap()._layers[key]);
									return true;
								}
							});

							// REFRESCAR CATEGORIA EN EL MAPA, TENGO QUE BORRARLA SI ESTÁ CARGADA Y VOLVERLA A CARGAR
							Split.__mapLeft.removeLayer($("#addHistoryForm select option:selected").text(), "geoJson");
							Split.__mapRight.removeLayer($("#addHistoryForm select option:selected").text(), "geoJson");
							$.ajax({
								url: 'index.php/draw/getDraws/' + $("#addHistoryForm select").val(), 
								dataType: "json",
								success: function(response) {
									Split.addLayer(null,"vectorial", null, response,3);  
								}
							});
						}

					}
				});
			}
		});

	});

	$(".goBack").click(function() {
		$("#commentsVector").hide();
		$("#addHistoryForm").hide();
		$("#geometryVector").show()
	});

	$(".cuerpoInfoCatalogo").on( "click", '.deleteHistory' ,function(){
		var idDrawtoDelte = $(this).next().attr("idDraw");
		var idCapa = $(".infoCatalogo div[idCapa]").attr("idCapa");
		console.log(idDrawtoDelte);
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

	$(".cuerpoInfoCatalogo").on( "click", '.deleteGeometry' ,function(){
		var idDraw = $(this).attr("idDraw");
		var idCapa = $(".infoCatalogo div[idCapa]").attr("idCapa");
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

	$(".cuerpoInfoCatalogo").on( "click", '#kmlExport' ,function(){
		window.location.href = 'index.php/draw/getKml/' + $(this).attr("idDraw")
	});

	$("#commentsVector h1").click(function() {
		$("#geometryVectorList").find("p[idDraw='" + $("#commentsVector h1").parent().attr("idDraw") + "']").trigger('click');
	});

	$(".addComentButton").click(function() {
		if($(".addCommentInput").val() != ""){
			$.ajax({
		        url: 'index.php/draw/addComent/' + $("#commentsVector").attr("idDraw"),
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

		        	 $(".addCommentInput").val("");
		        	 $(".cuerpoInfoCatalogo").scrollTop($(".cuerpoInfoCatalogo").outerHeight())
		        }
			});
		}
	});

	$(".cuerpoInfoCatalogo").on( "click", '.deleteComment' ,function(){
		var idComment = $(this).attr("idComment");
		var comment = $(this).parent();
		showConfirmDialog(function(){
		$.ajax({
        	url: 'index.php/draw/deteleComent/' + idComment,
	        success: function(response) {
	        	comment.next().remove();
				comment.remove();
	        }
        });           
	    },"¿Desea borrar el comentario seleccionado?");
	});

	$("#geometryVectorList").on( "click", 'p' ,function(event){
		var tipo = $(this).attr("tipo");
		var idDraw = $(this).attr("idDraw");
		var idCapa = $(".infoCatalogo div[idCapa]").attr("idCapa");
		$(".addCommentInput").val("");
		
		$(".deleteGeometry").remove();
		$("#kmlExport").remove()
		if(tipo == "marker" || tipo == "linea" || tipo == "polyline" || tipo == "poligono" || tipo == "polygon"){
			$("#deleteGeometry").append("<p class='deleteGeometry' idDraw=" + idDraw + " idUser=''>Eliminar geometría</p><p id='kmlExport' idDraw=" + idDraw + " idUser='' title='Exportar geometría a kml'>Exportar a kml</p>");
			$(".deleteGeometry").attr("idUser", $(this).attr("idUser"));
		}

		if(tipo == "marker"){
			$("#commentsVector img").attr("src", "application/views/img/ERO_icon_punto.png");
    	}else if(tipo == "linea" || tipo == "polyline"){
    		$("#commentsVector img").attr("src", "application/views/img/ERO_icon_linea.png");
    	}else if(tipo == "poligono" || tipo == "polygon"){
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
					showFancySelectPanel(event.pageY,event.pageX,idCapa,"vectorial", event);

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
				}else{
					$("#deleteGeometry").children().remove()
				}
			}
		});
		
		$("#geometryVector").hide();
		$("#commentsVectorVectorList").html("");
		$("#commentsVector").show();
		$("#commentsVector").attr("idDraw",idDraw);

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
				updatedState();
			}
		});
	});

	//////////////////////////////////////////////////////////////////////////////////////////////////////

	//Eventos relacionados con los proyectos/////////////////////////////////////////////////////////////
	$(".deleteProyect").click(function(event){
		var project = $(".extraLeyenda").find("div[idproject]").attr("idProject");
		showConfirmDialog(function(){
			$.ajax({
				url: 'index.php/project/deleteProyect/' + encodeURIComponent(project), 
					success: function(response) {
						Split.removeAllLayers();
						drawCategories();
						$(".infoCatalogo .petaniaInfoCatalogo").trigger("click")
						$(".infoCatalogo .petaniaInfoCatalogo").hide()
					}
			});           
		},"¿Desea borrar el proyecto seleccionado?");
	});

	$(".defaultProject").click(function(event){
		var self = $(this);
		if($(this).hasClass('active')){
			$.ajax({
				url: 'index.php/project/removeDefaultProyect', 
				success: function(response) {
					self.removeClass('active');
					$(".defaultProject").prop("title", "Establecer por defecto");
					defaultProject = null;
				}
			});

		}else{
			var project = $(".extraLeyenda").find("div[idproject]").attr("idProject");
			$.ajax({
				url: 'index.php/project/defaultProyect/' + encodeURIComponent(project), 
					success: function(response) {
						drawCategories(true);
						self.addClass('active');
						$(".defaultProject").prop("title", "Establecido por defecto");
						defaultProject = project;
					}
			});
		}
		return false;
	});
	//////////////////////////////////////////////////////////////////////////////////////////////////////

	//Redibujado del panel de información en función de lo que se seleccione en el catálogo
	$(".contenidoCatalogo").on( "click", '.family_content li' ,function(e){
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
		$(".infoCatalogo .cuerpoInfoCatalogo .moreInfo").hide();
		$(".listaTiposLeyenda").show();


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
				if(capa.wms || capa.wmts){
					var legendUrl;
					if(capa.wms){
						legendUrl = capa.wms.server.replace("/gwc/service", "") + "?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&"
									+"EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + capa.wms.name;
					}else{
						legendUrl = capa.wmts.server.replace("/gwc/service", "").replace("wmts", "wms") + "?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&"
									+"EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + capa.wmts.name;
					}
					

					$(".cuerpoInfoCatalogo").find(".divLeyenda").html("<img src='" + legendUrl +"' alt='Leyenda no disponible'/>");
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

					$("#kmlAll").click(function() {
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

							if(geometryClicked){
								$("#geometryVectorList").find("p[idDraw='" + geometryClicked + "']").trigger("click");
								geometryClicked = null;
							}
						}
					});
				}
			}	
			
			// eventosCatalogo();
		}
	});

}
