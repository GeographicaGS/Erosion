function drawCategories() {
	
	var html = "<div class='co_families'><ul class='families'>";
	
	$.ajax({
        url: 'index.php/project/getPublicProjects', dataType: "json",
        success: function(response) {
        	html += "<li class='close'>" + "" +
        	"<ul class='family_header' tipo='project'>" +
        		"<li class='ico_open_close'><img src='application/views/img/MED_icon_familia.png'></li>" +
        		"<li class='ico'><img src='application/views/img/ERO_icon_proyecto.png'></li>" +
        		"<li class='name'>Proyectos</li>" +
        		"<li class='n_elements'>(" + response.length + ")</li>" +
        	"</ul>"+
        	
        	"<ul class='family_content'>" +
        		"<li><p style='margin: 0px;'></p></li> ";
        		
        		for(var y=0; y<response.length; y++){
        		html += "<li style='border-top: 1px dotted #ccc;'>" + 
        			"<span style='margin-left:20px;'>" + response[y].titulo + "</span>" + 
        			"<a class='ml reducir' href='#'>Colapsar</a>" +
        			"<p style='font-size:11px'>" + response[y].descripcion + "</p>" +
        			"<p style='font-size:11px'>Autor: " + response[y].name + " " + response[y].surname + "</p>"
        			;
        			
        			html+= "<div style='margin-left:20px; margin-bottom: 25px;' idProject='"+ response[y].titulo +"' tipo='proyecto' class='fleft'><span class='tiposCapas'>Cargar proyecto</span></div>" +
        			"<div idProject='"+ response[y].titulo +"' tipo='proyecto' class='fleft'><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>";
        			
        			html+= "<div class='clear'></div>" + 
        		"</li>";
        		}

        	html += "</ul>"+
        	
        	"<div class='clear'></div>" + 
        	"</li>";
        	
        	$.ajax({
        		url: 'index.php/project/getMyProjects', dataType: "json",
                success: function(response) {
                	html += "<li class='close'>" + "" +
                	"<ul class='family_header' tipo='project'>" +
                		"<li class='ico_open_close'><img src='application/views/img/MED_icon_familia.png'></li>" +
                		"<li class='ico'><img src='application/views/img/ERO_icon_proyectos_personales.png'></li>" +
                		"<li class='name'>Proyectos personales</li>" +
                		"<li class='n_elements'>(" + response.length + ")</li>" +
                	"</ul>"+
                	
                	"<ul class='family_content'>" +
                		"<li><p style='margin: 0px;'></p></li> ";
                		
                		for(var y=0; y<response.length; y++){
                		html += "<li style='border-top: 1px dotted #ccc;'>" + 
                			"<span style='margin-left:20px;'>" + response[y].titulo + "</span>" + 
                			"<a class='ml reducir' href='#'>Colapsar</a>" +
                			"<p style='font-size:11px'>" + response[y].descripcion + "</p>"+
                			"<p style='font-size:11px'>Autor: " + response[y].name + " " + response[y].surname + "</p>";
                			
                			html+= "<div style='margin-left:20px; margin-bottom: 25px;' idProject='"+ response[y].titulo +"' tipo='proyecto' class='fleft'><span class='tiposCapas'>Cargar proyecto</span></div>" +
                			"<div idProject='"+ response[y].titulo +"' tipo='proyecto' class='fleft'><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>";
                			
                			if(response[y].is_public == "t"){
                				html+= "<div class='fright'><img class='fleft' style='padding-top: 9px;margin-right: 5px;' src='application/views/img/ERO_icon_proyecto_publico.png'>" +
                    			"<div class='fleft size11' style='color:#0363aa;'>Proyecto público</div></div>";
                			}else{
                				html+= "<div class='fright'><img class='fleft' style='padding-top: 9px;margin-right: 5px;' src='application/views/img/ERO_icon_proyecto_privado.png'>" +
                    			"<div class='fleft size11'>Proyecto privado</div></div>";
                			}
                			
                			html+= "<div class='clear'></div>" + 
                		"</li>";
                		}

                	html += "</ul>"+
                	
                	"<div class='clear'></div>" + 
                	"</li>";
                	
                	
                	
                	$.ajax({
                        url: 'index.php/draw/getCategories', dataType: "json",
                        success: function(response) {
                        	
                        	
                        	for(var i=0; i<categories.length; i++){
                        		html += "<li class='close'>" + "" +
                        					"<ul class='family_header'>" +
                        						"<li class='ico_open_close'><img src='application/views/img/MED_icon_familia.png'></li>" +
                        						"<li class='ico'><img src='application/views/img/MED_icon_resul_wms.png'></li>" +
                        						"<li class='name'>" + categories[i].title + "</li>" +
                        						"<li class='n_elements'>(" + categories[i].layers.length + ")</li>" +
                        					"</ul>"+
                        					
                        					"<ul class='family_content'>" +
                        						"<li><p class='pt'>" +  categories[i].description + "</p></li> ";
                        						
                        						for(var y=0; y<categories[i].layers.length; y++){
                        						html += "<li style='border-top: 1px dotted #ccc;'>" + 
                        							"<img src='application/views/img/MED_icon_layer.png'>" +
                        							"<span>" + categories[i].layers[y].title + "</span>" + 
                        							"<a class='ml reducir' href='#'>Colapsar</a>" +
                        							"<p style='font-size:11px'>" + categories[i].layers[y].description + "</p>" +
                        							"<img style='margin-top:0px;' src='application/views/img/MED_icon_add_layer.png'>" +
                        							"<p class='fleft' style='font-size:11px; clear: none; margin-left: 0px;'>AÑADIR A CAPAS:</p>";
                        							
                        							if((categories[i].layers[y].wms) && (categories[i].layers[y].wms.server) && (categories[i].layers[y].wms.name)){
                        								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='wms' class='fleft'><span class='tiposCapas'>WMS</span></div>" +
                        								"<div idCapa='"+ categories[i].layers[y].id +"' tipo='wms' class='fleft'><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>";
                        							}
                        							
                        							if((categories[i].layers[y].wmts) && (categories[i].layers[y].wmts.server) && (categories[i].layers[y].wmts.name)){
                        								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='wmts' class='fleft ml'><span class='tiposCapas'>WMTS</span></div>" +
                        								"<div idCapa='"+ categories[i].layers[y].id +"' tipo='wmts' class='fleft'><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>";
                        							}
                        							
                        							if((categories[i].layers[y].tms) && (categories[i].layers[y].tms.server) && (categories[i].layers[y].tms.name)){
                        								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='tms' class='fleft ml'><span class='tiposCapas'>TILES</span></div>" +
                        								"<div idCapa='"+ categories[i].layers[y].id +"' tipo='tms' ><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>" ;
                        							}
                        							
                        							if(categories[i].layers[y].simbolo){
                        								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='simbolo' class='fleft ml'><span class='tiposCapas'>Símbolos proporcionales</span></div>" +
                        								"<div idCapa='"+ categories[i].layers[y].id +"' tipo='simbolo' ><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>" ;
                        							}
                        							
                        							html+= "<div class='clear'></div>" + 
                        						"</li>";
                        						}

                        					html += "</ul>"+
                        					
                        				"<div class='clear'></div>" + 
                        				"</li>";
                        	}
                        	
                        		html += "<li class='close'>" + "" +
                				"<ul class='family_header'>" +
                					"<li class='ico_open_close'><img src='application/views/img/MED_icon_familia.png'></li>" +
                					"<li class='ico'><img src='application/views/img/ERO_icon_user_cab.png'></li>" +
                					"<li class='name'>Contenido subido por los usuarios</li>" +
                					"<li class='n_elements'>(" + response.length + ")</li>" +
                				"</ul>"+
                				
                				"<ul class='family_content'>" +
                					"<li><p class='pt'>Listado de categorías</p></li> ";;
                					
                					for(var y=0; y<response.length; y++){
                					html += "<li style='border-top: 1px dotted #ccc;'>" + 
                						"<img src='application/views/img/MED_icon_layer.png'>" +
                						"<span>" + response[y].title + "</span>" + 
                						"<a class='ml reducir' href='#'>Colapsar</a>" +
                						"<p style='font-size:11px'></p>" +
                						"<img style='margin-top:0px;' src='application/views/img/MED_icon_add_layer.png'>" +
                						"<p class='fleft' style='font-size:11px; clear: none; margin-left: 0px;'>AÑADIR A CAPAS:</p>";
                					
                						html+= "<div idCapa='"+ response[y].id_category +"' tipo='vectorial' class='fleft'><span class='tiposCapas'>CAPA VECTORIAL</span></div>" +
                						"<div idCapa='"+ response[y].id_category +"' tipo='vectorial' class='fleft'><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>";
                						
                						html+= "<div class='clear'></div>" + 
                					"</li>";
                					}

                				html += "</ul>"+
                				
                				"<div class='clear'></div>" + 
                				"</li>";
                        		
                        	html += "</ul></div>";	
                        	
                        	$("#categories").html(html);
                        	
                        	$(".family_header").click(function(){
                        		for(var i=0; i<$(".name").length; i++){
                        			if(!$($(".name")[i]).is(":visible")){
                        				$($(".name")[i]).css({"font-weight":"normal"});
                        			}
                        		}
                        		
                        		if($(this).next().is(":visible")){
                        			$(this).find(".name").css({"font-weight":"normal"})
                        			$(this).next().fadeOut();
                        			$($(this).find("img")[0]).attr("src", "application/views/img/MED_icon_familia.png")
                        			$(this).parent().css({"background-color":"white"});
                        		}else if($(this).next().find("li").length > 1){
                        			$(this).find(".name").css({"font-weight":"bold"})
                        			$(this).next().fadeIn();
                        			$($(this).find("img")[0]).attr("src", "application/views/img/MED_icon_cerrar_capas.png")
                        			if($(this).attr('tipo') && $(this).attr('tipo') == 'project'){
                        				$(this).parent().css({"background-color":"#e5eff6"});
                        			}else{
                        				$(this).parent().css({"background-color":"#ecedef"});
                        			}
                        		}
                        	});
                        	
                        	$(".tiposCapas").click(function(){
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
                        	
                        	$("body").click(function(){
                        		$("#fancy_select_panel").hide(300);
                        	});
                        	
                        	$(".reducir").click(function(){
                        		$(this).closest("ul").parent().find(".family_header").trigger("click")
                        	});
                        }
                    });
                }
        	});
        	
        	
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
