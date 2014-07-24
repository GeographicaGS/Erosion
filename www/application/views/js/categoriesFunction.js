function drawCategories() {
	
	var html = "<ul class='families'>";
	html += getHtmlCategories(categories,0);
//	for(var i=0; i<categories.length; i++){
//		html +=
//					"<ul class='family_header' title='" + categories[i].title + "'>" +
//						"<li class='ico_open_close'><img src='application/views/img/MED_icon_familia.png'></li>" +
//						"<li class='name ellipsis'>" + categories[i].title + "</li>" +
//						"<li class='n_elements'>(" + categories[i].layers.length + ")</li>" +
//					"</ul>"+
//					
//					"<div class='clear'></div>"+
//					
//					"<ul class='family_content' style='display:none;'>";
//						
//						for(var y=0; y<categories[i].layers.length; y++){
//						html += "<li idCapa='" + categories[i].layers[y].id + "' style='border-top: 1px solid #ccc;'>" + 
//							"<p class='ellipsis' title='"+ categories[i].layers[y].title + "'>" + categories[i].layers[y].title + "</p>" +
//							"<img title='Añadir capa' class='botonAddImage' src='application/views/img/ERO_icon_anadir_capa.png'>" +
//							"<span style='display:none;'>" + categories[i].layers[y].description + "</span>"
//							;
//							
//							html += "<div class='listaTipos'>"
//    							if((categories[i].layers[y].wms) && (categories[i].layers[y].wms.server) && (categories[i].layers[y].wms.name)){
//    								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='wms' class='fleft fright'><span class='tiposCapas'>WMS</span></div>";
//    							}
//                        							
//    							if((categories[i].layers[y].wmts) && (categories[i].layers[y].wmts.server) && (categories[i].layers[y].wmts.name)){
//    								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='wmts' class='fleft fright'><span class='tiposCapas'>WMTS</span></div>";
//    							}
//                        							
//    							if((categories[i].layers[y].tms) && (categories[i].layers[y].tms.server) && (categories[i].layers[y].tms.name)){
//    								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='tms' class='fleft fright'><span class='tiposCapas'>TILES</span></div>";
//    								
//    							}
//                        							
//    							if(categories[i].layers[y].simbolo){
//    								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='simbolo' class='fleft fright'><span class='tiposCapas'>Símbolos</span></div>";
//    							}
//							html += "</div>"
//							html+= "<div class='clear'></div>" + 
//						"</li>";
//						}
//
//					html += "</ul>"+
//					
//				"<div class='clear'></div>" + 
//				"</li>";
//	}
	
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
						html += "<li style='border-top: 1px solid #ccc;'>" + 
						"<p class='ellipsis' title='"+ response[y].title + "'>" + response[y].title + "</p>" +
						// "<img title='Añadir capa' class='botonAddImage' src='application/views/img/ERO_icon_anadir_capa.png'>"+
						"<span style='display:none;'></span>"
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
        				"<p class='ellipsis' title='"+ response[y].titulo + "'>" + response[y].titulo + "</p>" +
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
    				"<p class='ellipsis' title='"+ response[y].titulo + "'>" + response[y].titulo + "</p>" +
    				// "<img title='Añadir capa' class='botonAddImage' src='application/views/img/ERO_icon_anadir_capa.png'>" +
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
	
	$(".petaniaInfoCatalogo").unbind().bind( "click", function(){
		if($(".cuerpoInfoCatalogo").is(":visible")){
			$(".infoCatalogo").animate({"right":"-270px"},function(){
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
                			Split.addLayer(capa,capasRight[i].tipo, leyenda, null,1, capasRight[i].visible);
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
                			Split.addLayer(capa,capasLeft[i].tipo, leyenda, null,2, capasLeft[i].visible);
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
    		
    		event.stopPropagation()
		}
		
	});	
	
	$("body").unbind().bind( "click", function(){
		$("#fancy_select_panel").hide(300);
	});
	
	$(".family_content li").unbind().bind( "click", function(){
		if($(this).parent().hasClass("family_content")){
			$(".infoCatalogo .petaniaInfoCatalogo").show();
			// if(!$(".infoCatalogo .cuerpoInfoCatalogo").is(":visible")){
			// 	$(".infoCatalogo .petaniaInfoCatalogo").trigger("click");
			// }
			
			
			$(".cuerpoInfoCatalogo").find(".title1").text($(this).find("p").text());
			$(".cuerpoInfoCatalogo").find(".title1").prop('title', $(this).find("p").text());
			$(".cuerpoInfoCatalogo").find(".title2").text($($(this).find("span")[0]).text());
			
			$(".cuerpoInfoCatalogo").find(".divLeyenda").html("<div class='diagonal1'></div><div class='diagonal2'></div>");
			$(".cuerpoInfoCatalogo").find(".divLeyenda").css({"height": ""});
			
			$(".extraLeyenda").show();
			$(".botonAddImageLeyenda").show();
			
			var tipos = $(this).find(".listaTipos").children();
			$(".cuerpoInfoCatalogo").find(".listaTiposLeyenda").html("");
			var aux;
			if(tipos.length > 0){
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
				$(".cuerpoInfoCatalogo").find(".listaTiposLeyenda").append(aux);			
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
						"<li class='name ellipsis'>" + categories[i].title + "</li>" +
						"<li class='n_elements'>(" + categories[i].layers.length + ")</li>" +
					"</ul>"+
					
					"<div class='clear'></div>"+
					
					"<ul class='family_content' style='display:none;padding-left:" + index*10 +"px'>";
						
						for(var y=0; y<categories[i].layers.length; y++){
							if(categories[i].hasOwnProperty("categories")){
								html += getHtmlCategories(categories[i].categories, index+1);
							}
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