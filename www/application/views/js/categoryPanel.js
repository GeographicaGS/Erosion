function categoryPanelEvents(){
	
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
	$('.contenidoCatalogo #capasCatalogo').on('click', '.families .family_header', function(){

		if($(this).next().next().is(":visible")){

			$(this).next().next().slideUp();
			$($(this).find("img")[0]).attr("src", "application/views/img/MED_icon_familia.png")

		}else if($(this).next().next().find("li").length > 0){

			$(this).next().next().slideDown();
			$($(this).find("img")[0]).attr("src", "application/views/img/MED_icon_cerrar_capas.png")
		}
	});

	//Pulsar sobre el tipo de capa para que salga el fancybox dónde se indica en qué mapa cargar la capa o para
	//cargar un proyecto
	$(".contenidoCatalogo, .cuerpoInfoCatalogo").on( "click", '.tiposCapas' ,function(){
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
			showFancySelectPanel(event.pageY,event.pageX,$(this).parent().attr("idCapa"),$(this).parent().attr("tipo"));
		}
		
	});	
}