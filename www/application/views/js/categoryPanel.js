function categoryPanelEvents(){

	//Mostrar y ocultar herramientas
	$(".toolsFlange").click(function(){
		if($(".toolsBody").is(":visible")){
			var left = "-235px";
			$(".tools").animate({"left":left},function(){
				$(".toolsBody").hide();
				$(".toolsFlange").find("img").attr("src",$(".toolsFlange").find("img").attr("src").replace("ERO_icon_herramientas.png","ERO_icon_herramientas_close.png"));
			});
			$(".toolsBody").parent().css({'z-index':''});
			
		}else{
			$(".toolsBody").show();
			$(".tools").animate({"left":""});
			$(".toolsFlange").find("img").attr("src",$(".toolsFlange").find("img").attr("src").replace("ERO_icon_herramientas_close.png","ERO_icon_herramientas.png"));
			$(".toolsBody").parent().css({'z-index':'1003'});
		}
	});
	
	//Mostrar y ocultar catálogo
	$(".petaniaCatalogo").click(function(){
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
			$(".cuerpoCatalogo").parent().css({'z-index':''});
			
		}else{
			$(".cuerpoCatalogo").show();
			$(".catalogo").animate({"left":""});
			$(".petaniaCatalogo").find("img").attr("src",$(".petaniaCatalogo").find("img").attr("src").replace("ERO_icon_pestana_catalogo_off.png","ERO_icon_pestana_catalogo.png"));
			$(".cuerpoCatalogo").parent().css({'z-index':'1003'});
		}
	});

	//Cambiar entre pestañas del catálogo
	$(".catalogo .cuerpoCatalogo .cabecera .seccion").click(function(){
		$(".catalogo .cuerpoCatalogo .cabecera .seccion").removeClass("active");
		$(this).addClass("active");
		$(".catalogueSection").hide();
		$("div[idSection=" + $(this).attr("idSection") + "]").show();
	});

	//Ratón sobre el botón de añadir capa
	$(".contenidoCatalogo #capasCatalogo").on( "mouseenter mouseleave", '.families .family_content li .botonAddImage' ,function(){
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
	
	//Raton sobre el tipo de capa
	$(".contenidoCatalogo #capasCatalogo").on( "mouseenter mouseleave", '.families .family_content li .listaTipos' ,function(){
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

	//Desplegar cada capa
	$('.contenidoCatalogo #capasCatalogo').on('click', '.families .family_header, .ico_info', function(e){

		if($(this).hasClass("ico_info")){
			e.stopPropagation();
			$(".deleteProyect").hide();
			$("#commentsVector").hide();
			$("#geometryVector").hide();
			$("#addHistoryForm").hide();
			$("#kmlAll").remove();
			$(".botonAddImageLeyenda").hide();
			$(".extraLeyenda").children(".title3, .divLeyenda").hide();
			$(".infoCatalogo .cuerpoInfoCatalogo .moreInfo").hide();
			$(".defaultProject").hide();
			$(".listaTiposLeyenda").hide();

			$(".cuerpoInfoCatalogo").find(".title1").text($(this).parent().find(".name").text());
			$(".cuerpoInfoCatalogo").find(".title2").text($(this).find(".description").text());
			var info = $(this).find(".info");
			if(info && info.text().length > 0){
				$(".infoCatalogo .cuerpoInfoCatalogo .moreInfo").show();
				$(".infoCatalogo .cuerpoInfoCatalogo .moreInfo").attr("href",info.text());
			}
			$(".petaniaInfoCatalogo").show();
			if(!$(".cuerpoInfoCatalogo").is(":visible")){
				$(".petaniaInfoCatalogo").trigger("click");
			}

		}else{
			if($(this).next().next().is(":visible")){

				$(this).next().next().slideUp();
				$($(this).find("img")[0]).attr("src", "application/views/img/MED_icon_familia.png")

			}else if($(this).next().next().find("li").length > 0){

				$(this).next().next().slideDown();
				$($(this).find("img")[0]).attr("src", "application/views/img/MED_icon_cerrar_capas.png")
			}
		}
	});

	//Pulsar sobre el tipo de capa para que salga el fancybox dónde se indica en qué mapa cargar la capa o para
	//cargar un proyecto
	$(".contenidoCatalogo, .cuerpoInfoCatalogo").on( "click", '.tiposCapas' ,function(){
		// $(this).closest("li").trigger("click");
		
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
		        	var base_map = "Google satélite";
		        	
		        	Split.syncEnable = true;
		        	Split.sync();
		        	if(capas.hasOwnProperty('leftState')){
		        		Split.__mapLeft.getMap().setView(L.latLng(capas.leftState.lat,capas.leftState.lng),capas.leftState.zoom);
		        		if(capas.leftState.hasOwnProperty("base_map")){
		        			base_map = capas.leftState.base_map;
		        		}
		        		$("#map_left input[name='leaflet-base-layers']").next("span:contains(" + base_map + ")").prev("input").trigger("click");
		        	}
		        	if(capas.hasOwnProperty('rightState')){
		        		Split.__mapRight.getMap().setView(L.latLng(capas.rightState.lat,capas.rightState.lng),capas.rightState.zoom);
		        		if(capas.rightState.hasOwnProperty("base_map")){
		        			base_map = capas.rightState.base_map;
		        		}
		        		$("#map_right input[name='leaflet-base-layers']").next("span:contains(" + base_map + ")").prev("input").trigger("click");
		        	}
		        	
		        	if(capas.leftState.zoom == capas.rightState.zoom && capas.leftState.lat == capas.rightState.lat && capas.leftState.lng == capas.rightState.lng){
		        		Split.syncEnable = false;
		        		Split.sync();
		        	}
		        	
		        	Split.__mapRight.project = project;
		        	Split.__mapLeft.project = project;
		        	
		        	addLayerFromProyect(capasRight,1);
		        	addLayerFromProyect(capasLeft,2);

		        	drawCategoriesWithData();
		        }
			});

		}else{
			showFancySelectPanel(event.pageY,event.pageX,$(this).parent().attr("idCapa"),$(this).parent().attr("tipo"));
		}
		
	});	
}

function addLayerFromProyect(layers, panel){
	for(var i=0; i<layers.length; i++){
		if(layers[i].tipo == "geoJson"){
			
			$.ajax({
		        url: 'index.php/draw/getDraws/' + layers[i].id, 
		        dataType: "json",
		        success: function(response) {
		        	Split.addLayer(null,"vectorial", null, response,panel,layers[i].visible);  
		        }
			});
			
		}else{
			var capa = {};
			//Si la capa viene de un servicio externo
			if(layers[i].id == -1){
				capa["id"] = layers[i].id;
				capa["tipo"] = layers[i].tipo;
				capa["visible"] = layers[i].visible;
				capa["opacity"] = layers[i].opacity;
				capa[layers[i].tipo] = {"server":layers[i].url, "name":layers[i].name, "simple_tile":(layers[i].simpleLayer != null ? layers[i].simpleLayer : false)};
				capa["title"] = layers[i].title;
				capa["description"] = layers[i].description;

			}else{
				capa = buscarCapa(layers[i].id, categories);
			}
			
			if(layers[i].alternativeTitle ){
				capa["alternativeTitle"] = layers[i].alternativeTitle ;
			}

			leyenda = null;
			if(capa.wms){
				leyenda = capa.wms.server;
			}

			Split.addLayer(capa,layers[i].tipo, leyenda, null,panel, layers[i].visible, layers[i].opacity);
		}
	}
}