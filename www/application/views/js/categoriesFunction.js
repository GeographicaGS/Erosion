function drawCategories() {
	
	$.ajax({
        url: 'index.php/draw/getCategories', dataType: "json",
        success: function(response) {
        	var html = "<div class='co_families'><ul class='families'>";
        	
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
        							"<a class='ml' href=''>Reducir</a>" +
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
        								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='tms' class='fleft ml'><span class='tiposCapas'>TMS</span></div>" +
        								"<div idCapa='"+ categories[i].layers[y].id +"' tipo='tms' ><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>" ;
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
						"<a class='ml' href=''>Reducir</a>" +
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
        			$(this).parent().css({"background-color":"white"});
        		}else{
        			$(this).find(".name").css({"font-weight":"bold"})
        			$(this).next().fadeIn();
        			$(this).parent().css({"background-color":"#ecedef"});
        		}
        	});
        	
        	$(".tiposCapas").click(function(){
        		
        		tipo = $(this).parent().attr("tipo");
        		if(tipo == "vectorial"){
        			$.ajax({
        		        url: 'index.php/draw/getDraws/' + $(this).parent().attr("idCapa"), 
        		        dataType: "json",
        		        success: function(response) {
        		        	Split.addLayer(null,tipo, null, response);  
        		        	navigate(0);}
        			});
        		}
        		else{
        			capa = buscarCapa($(this).parent().attr("idCapa"));
        			leyenda = null;
        			if(capa.wms){
        				leyenda = capa.wms.server;
        			}
        			Split.addLayer(capa,tipo, leyenda, null);
        			navigate(0);
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
