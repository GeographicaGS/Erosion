function drawCategories() {
	
	var html = "<ul class='families'>";
	for(var i=0; i<categories.length; i++){
		html +=
					"<ul class='family_header' title='" + categories[i].title + "'>" +
						"<li class='ico_open_close'><img src='application/views/img/MED_icon_familia.png'></li>" +
						"<li class='name ellipsis'>" + categories[i].title + "</li>" +
						"<li class='n_elements'>(" + categories[i].layers.length + ")</li>" +
					"</ul>"+
					
					"<div class='clear'></div>"+
					
					"<ul class='family_content' style='display:none;'>";
						
						for(var y=0; y<categories[i].layers.length; y++){
						html += "<li style='border-top: 1px solid #ccc;'>" + 
							"<p class='ellipsis' title='"+ categories[i].layers[y].title + "'>" + categories[i].layers[y].title + "</p>" +
							"<img title='Añadir capa' class='botonAddImage' src='application/views/img/ERO_icon_anadir_capa.png'>";
							;
							
							html += "<div class='listaTipos'>"
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
	
	$("#capasCatalogo").html(html);
	eventosCatalogo();
	
	$.ajax({
        url: 'index.php/draw/getCategories', dataType: "json",
        success: function(response) {
        	var html = "<ul class='family_content'>";
					
					for(var y=0; y<response.length; y++){
						html += "<li style='border-top: 1px solid #ccc;'>" + 
						"<p class='ellipsis' title='"+ response[y].title + "'>" + response[y].title + "</p>" +
						"<img title='Añadir capa' class='botonAddImage' src='application/views/img/ERO_icon_anadir_capa.png'>";
						;
					
						html+= "<div idCapa='"+ response[y].id_category +"' tipo='vectorial' class='fleft fright'><span class='tiposCapas'>CAPA VECTORIAL</span></div>";
						
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
        				"<p class='ellipsis' title='"+ response[y].titulo + "'>" + response[y].titulo + "</p>" +
        				"<img title='Añadir capa' class='botonAddImage' src='application/views/img/ERO_icon_anadir_capa.png'>";
        				;
            			
            			html+= "<div class='fleft fright' idProject='"+ response[y].titulo +"' tipo='proyecto' class='fleft'><span class='tiposCapas'>Cargar proyecto</span></div>";
            			
            			
            			
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
    				"<p class='ellipsis' title='"+ response[y].titulo + "'>" + response[y].titulo + "</p>" +
    				"<img title='Añadir capa' class='botonAddImage' src='application/views/img/ERO_icon_anadir_capa.png'>";
    				;
        			
        			html+= "<div class='fleft fright' idProject='"+ response[y].titulo +"' tipo='proyecto' class='fleft'><span class='tiposCapas'>Cargar proyecto</span></div>";
        			
        			html+= "<div class='clear'></div>" + 
        		"</li>";
        		}

        		html += "</ul>"+
        		
        		"<div class='clear'></div>" + 
        		"</li>";
        		
        		html += "</ul></div>";
        		$("#publicProyectCatalogo").html(html);
        		eventosCatalogo();
        }
	});
	
	$(".petaniaCatalogo").unbind().bind( "click", function(){
		if($(".cuerpoCatalogo").is(":visible")){
			$(".catalogo").animate({"left":"-30%"},function(){
				$(".cuerpoCatalogo").hide();
				$(".petaniaCatalogo").find("img").attr("src",$(".petaniaCatalogo").find("img").attr("src").replace("ERO_icon_pestana_catalogo.png","ERO_icon_pestana_catalogo_off.png"));
			});
			
		}else{
			$(".cuerpoCatalogo").show();
			$(".catalogo").animate({"left":""});
			$(".petaniaCatalogo").find("img").attr("src",$(".petaniaCatalogo").find("img").attr("src").replace("ERO_icon_pestana_catalogo_off.png","ERO_icon_pestana_catalogo.png"));
		}
	});
	
	$(".petaniaInfoCatalogo").unbind().bind( "click", function(){
		if($(".cuerpoInfoCatalogo").is(":visible")){
			$(".infoCatalogo").animate({"right":"-25%"},function(){
				$(".cuerpoInfoCatalogo").hide();
				$(".petaniaInfoCatalogo").find("img").attr("src",$(".petaniaInfoCatalogo").find("img").attr("src").replace("ERO_icon_pestana_info.png","ERO_icon_pestana_info_off.png"));
			});
			
		}else{
			$(".cuerpoInfoCatalogo").show();
			$(".infoCatalogo").animate({"right":""});
			$(".petaniaInfoCatalogo").find("img").attr("src",$(".petaniaInfoCatalogo").find("img").attr("src").replace("ERO_icon_pestana_info_off.png","ERO_icon_pestana_info.png"));
		}
	});
	
	$(".catalogo .cuerpoCatalogo .cabecera .seccion").unbind().bind( "click", function(){
		$(".catalogo .cuerpoCatalogo .cabecera .seccion").removeClass("active");
		$(this).addClass("active");
		$(".catalogueSection").hide();
		$("div[idSection=" + $(this).attr("idSection") + "]").show();
	});
	
	$(".botonAddImage").unbind().bind( "click", function(){
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
	
function buscarCapa(id){
	for(var i=0; i<categories.length; i++){
		for(var y=0; y<categories[i].layers.length; y++){
			if(categories[i].layers[y].id==id){
				return categories[i].layers[y];
			}
		}
	}
}


function eventosCatalogo(){
	
	$(".tiposCapas").unbind().bind( "click", function(){
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
		        	
		        	
		        	Split.__mapRight.project = project;
		        	Split.__mapLeft.project = project;
		        	
		        	
		        	for(var i=0; i<capasRight.length; i++){
		        		if(capasRight[i].tipo == "geoJson"){
		        			
		        			$.ajax({
                		        url: 'index.php/draw/getDraws/' + capasRight[i].id, 
                		        dataType: "json",
                		        success: function(response) {
                		        	Split.addLayer(null,"vectorial", null, response,1);  
                		        	//navigate(0);
                		        }
                			});
		        			
		        		}else{
		        			var capa = buscarCapa(capasRight[i].id);
                			leyenda = null;
                			if(capa.wms){
                				leyenda = capa.wms.server;
                			}
                			Split.addLayer(capa,capasRight[i].tipo, leyenda, null,1);
                			//navigate(0);
		        		}
		        	}
		        	
		        	for(var i=0; i<capasLeft.length; i++){
		        		if(capasLeft[i].tipo == "geoJson"){
		        			
		        			$.ajax({
                		        url: 'index.php/draw/getDraws/' + capasLeft[i].id, 
                		        dataType: "json",
                		        success: function(response) {
                		        	Split.addLayer(null,"vectorial", null, response,2);  
                		        	//navigate(0);
                		        }
                			});
		        			
		        		}else{
		        			var capa = buscarCapa(capasLeft[i].id);
                			leyenda = null;
                			if(capa.wms){
                				leyenda = capa.wms.server;
                			}
                			Split.addLayer(capa,capasLeft[i].tipo, leyenda, null,2);
                			//navigate(0);
		        		}
		        	}
		        	
		        }
			});
			
			
			
		}else{
			var self = $(this);
    		$("#fancy_select_panel").css({"top":event.y, "left":event.x});
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
        		else{
        			capa = buscarCapa(self.parent().attr("idCapa"));
        			leyenda = null;
        			if(capa.wms){
        				leyenda = capa.wms.server;
        			}
        			Split.addLayer(capa,tipo, leyenda, null,panel);
        			//navigate(0);
        		}
    		});
    		
    		event.stopPropagation()
		}
		
	});	
	
	$("body").unbind().bind( "click", function(){
		$("#fancy_select_panel").hide(300);
	});
}