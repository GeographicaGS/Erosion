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
	
	$(".petaniaCatalogo").unbind().bind( "click", function(){
		if($(".cuerpoCatalogo").is(":visible")){
			var left;
			if($(".catalogo").outerWidth() > 311){
				left = "-30.1%";
			}else{
				left = "-311px";
			}
			$(".catalogo").animate({"left":left},function(){
				$(".cuerpoCatalogo").hide();
				$(".petaniaCatalogo").find("img").attr("src",$(".petaniaCatalogo").find("img").attr("src").replace("ERO_icon_pestana_catalogo.png","ERO_icon_pestana_catalogo_off.png"));
			});
			
		}else{
			$(".cuerpoCatalogo").show();
			$(".catalogo").animate({"left":""});
			$(".petaniaCatalogo").find("img").attr("src",$(".petaniaCatalogo").find("img").attr("src").replace("ERO_icon_pestana_catalogo_off.png","ERO_icon_pestana_catalogo.png"));
		}
	});
	
	$(".petaniaInfoCatalogo").unbind().bind( "click", function(e){
		if($(".cuerpoInfoCatalogo").is(":visible")){
			$(".infoCatalogo").animate({"right": "-" + $(".infoCatalogo").outerWidth() + "px"},function(){
				$(".cuerpoInfoCatalogo").hide();
				$(".petaniaInfoCatalogo").find("img").attr("src",$(".petaniaInfoCatalogo").find("img").attr("src").replace("ERO_icon_pestana_info.png","ERO_icon_pestana_info_off.png"));
			});
			
		}else{
			$(".cuerpoInfoCatalogo").show();
			$(".infoCatalogo").animate({"right":""});
			$(".petaniaInfoCatalogo").find("img").attr("src",$(".petaniaInfoCatalogo").find("img").attr("src").replace("ERO_icon_pestana_info_off.png","ERO_icon_pestana_info.png"));
		}
		e.stopPropagation();
	});

	//Menú de información resizable
	// $(".cuerpoInfoCatalogo").on('click', function(e) {
	// 	$("#fancy_select_panel").hide(300);
	// 	e.stopPropagation();
	// });

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

	//Fin menú de información resizable

	$(".catalogo .cuerpoCatalogo .cabecera .seccion").unbind().bind( "click", function(){
		$(".catalogo .cuerpoCatalogo .cabecera .seccion").removeClass("active");
		$(this).addClass("active");
		$(".catalogueSection").hide();
		$("div[idSection=" + $(this).attr("idSection") + "]").show();
	});
	
	$(".botonAddImage").unbind().bind( "hover", function(){
		var lista = $(this).siblings(".listaTipos");
		var aux;
		
		if($(lista).is(":visible")){
			aux = $(lista).parent().outerWidth() - $(this).outerWidth() - 40;
			$(this).siblings("p").css({"width":aux});
			lista.hide();
		}else{
			aux = $(lista).parent().outerWidth() - $(lista).siblings("p").outerWidth() - $(this).outerWidth()-40;
			if($(this).siblings("p").width() > aux){
				$(this).siblings("p").css({"width":$(this).siblings("p").outerWidth() + aux - lista.outerWidth()});
			}
			lista.show();
		}
	});
	
	$(".listaTipos").unbind().bind( "hover", function(){
		var aux;
		if($(this).is(":visible")){
			$(this).hide();
			aux = $(this).parent().outerWidth() - $(this).outerWidth() - 40;
			$(this).siblings("p").css({"width":aux});
		}else{
			aux = $(this).parent().outerWidth() - $(this).siblings("p").outerWidth() - $(this).parent().find(".botonAddImage").outerWidth()-40;
			if($(this).siblings("p").width() > aux){
				$(this).siblings("p").css({"width":$(this).siblings("p").outerWidth() + aux - $(this).outerWidth()});
			}
			$(this).show();
		}
	});
	

		
	$(".family_header").unbind().bind( "click", function(){
//		for(var i=0; i<$(".name").length; i++){
//			if(!$($(".name")[i]).is(":visible")){
//				$($(".name")[i]).css({"font-weight":"normal"});
//			}
//		}
		if($(this).next().next().is(":visible")){
//			$(this).find(".name").css({"font-weight":"normal"})
			$(this).next().next().slideUp();
			$($(this).find("img")[0]).attr("src", "application/views/img/MED_icon_familia.png")
//			$(this).parent().css({"background-color":"white"});
		}else if($(this).next().next().find("li").length > 0){
//			$(this).find(".name").css({"font-weight":"bold"})
			$(this).next().next().slideDown();
			$($(this).find("img")[0]).attr("src", "application/views/img/MED_icon_cerrar_capas.png")
//			if($(this).attr('tipo') && $(this).attr('tipo') == 'project'){
//				$(this).parent().css({"background-color":"#e5eff6"});
//			}else{
//				$(this).parent().css({"background-color":"#ecedef"});
//			}
		}
	});
	
};



function coloreaEtiquetas(e){
	if($(e).is("img")){
		$(e).parent().prev().find("span").css({"cssText":"color:white !important"});
		$(e).parent().prev().find("span").css({"background-color":"#ff6600"});
		$(e).attr("src", "application/views/img/ERO_icon_link_gris.png");
		$(e).css({"background-color":"#ff6600", "border-left":"1px solid white"});
		
	}else{
		$(e).css({"cssText":"color:white !important", "background-color":"#ff6600"});
		$(e).parent().next().find("img").css({"background-color":"#ff6600", "border-left":"1px solid white"});
		$(e).parent().next().find("img").attr("src", "application/views/img/ERO_icon_link_gris.png");
	}
}

function desColoreaEtiquetas(e){
	if($(e).is("img")){
		$(e).parent().prev().find("span").css({"cssText":"color:#ff6600 !important"});
		$(e).parent().prev().find("span").css({"background-color":"white"});
		$(e).attr("src", "application/views/img/ERO_icon_link_naranja.png");
		$(e).css({"background-color":"white", "border-left":"1px solid #ff6600"});
		
	}else{
		$(e).css({"cssText":"color:#ff6600 !important", "background-color":"white"});
		$(e).parent().next().find("img").css({"background-color":"white", "border-left":"1px solid #ff6600"});
		$(e).parent().next().find("img").attr("src", "application/views/img/ERO_icon_link_naranja.png");
	}
}
	
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
                		        	//navigate(0);
                		        }
                			});
		        			
		        		}else{
		        			var capa = buscarCapa(capasRight[i].id, categories);
                			leyenda = null;
                			if(capa.wms){
                				leyenda = capa.wms.server;
                			}
                			Split.addLayer(capa,capasRight[i].tipo, leyenda, null,1, capasRight[i].visible, capasRight[i].opacity);
                			//navigate(0);
		        		}
		        	}
		        	
		        	for(var i=0; i<capasLeft.length; i++){
		        		if(capasLeft[i].tipo == "geoJson"){
		        			
		        			$.ajax({
                		        url: 'index.php/draw/getDraws/' + capasLeft[i].id, 
                		        dataType: "json",
                		        success: function(response) {
                		        	Split.addLayer(null,"vectorial", null, response,2, capasLeft[i].visible);  
                		        	//navigate(0);
                		        }
                			});
		        			
		        		}else{
		        			var capa = buscarCapa(capasLeft[i].id, categories);
                			leyenda = null;
                			if(capa.wms){
                				leyenda = capa.wms.server;
                			}
                			Split.addLayer(capa,capasLeft[i].tipo, leyenda, null,2, capasLeft[i].visible, capasLeft[i].opacity);
                			//navigate(0);
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
        		        	//navigate(0);
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
        			//navigate(0);
        		}
    		});
    		
    		event.stopPropagation();
		}
		
	});	

	$(".deleteProyect").unbind().bind( "click", function(event){
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

	$(".defaultProject").unbind().bind( "click", function(event){
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
	
	$("body").unbind().bind( "click", function(){
		$("#fancy_select_panel").hide(300);
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


		if($(this).parent().hasClass("family_content")){
			$(".infoCatalogo .petaniaInfoCatalogo").show();
			// if(!$(".infoCatalogo .cuerpoInfoCatalogo").is(":visible")){
			// 	$(".infoCatalogo .petaniaInfoCatalogo").trigger("click");
			// }
			
			
			$(".cuerpoInfoCatalogo").find(".title1").text($(this).find("p").text());
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
					aux.append("<p id='kmlAll'>Exportar a kml</p>")
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
									$("#deleteGeometry").append("<p class='deleteGeometry' idUser=''>Eliminar geometría</p><p id='kmlExport' idUser=''>Exportar a kml</p>");
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

	$(".goBack").unbind().bind("click", function() {
		$("#commentsVector").hide();
		$("#addHistoryForm").hide();
		$("#geometryVector").show()
	});

	$(".addHistoryButton").unbind().bind("click", function(event, latlng) {
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
		$.ajax({
		        url: 'index.php/draw/getCategories', dataType: "json",
		        success: function(response) {
		        	$("#fancy_box_form_save_draw").find("select").children().remove();
		        	for(var i=0; i<response.length; i++){
			    		$("#addHistoryForm select").append("<option value='" + response[i].id_category + "' " + ($(".extraLeyenda").find("div[idCapa]").attr("idCapa") == response[i].id_category ?  'selected' : '') + ">" + response[i].title + "</option>");
			    	}
			    }
		});

		$(".saveHistoryButton").unbind().bind("click", function() {
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

}

function getHtmlCategories(categories, index) {
	var html = "";
	
	for(var i=0; i<categories.length; i++){
		html +=
					"<ul class='family_header' style='padding-left:" + index*10 +"px' title='" + categories[i].title + "'>" +
						"<li class='ico_open_close'><img style='vertical-align: top;' src='application/views/img/MED_icon_familia.png'></li>" +
						"<li class='name ellipsis'>" + categories[i].title + "</li>" +
						"<li class='n_elements'>(" + categories[i].layers.length + ")</li>" +
					"</ul>"+
					
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

function deleteCommentEvent(){
	$(".deleteComment").unbind().bind("click", function() {
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
}