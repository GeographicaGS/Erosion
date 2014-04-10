var myStyle = {
    "color": "red",
    "weight": 3,
};

function GSLayerGeoJson(title, geoJson, leyenda){
	this.title = title;
	this.geoJson = geoJson;
	this.visible = true;
	this.layer = null;
	this.tipo = "geoJson";
	this.leyenda = leyenda;
	
	this.setVisibility = function(visibility, map, z_index){
		
		if(this.layer == null){
			this.layer =  L.geoJson(geoJson, {
									onEachFeature: onEachFeatureGeoJson,
			    					style: myStyle
			    				});	
		}
		
		this.visible = visibility;
		if(this.visible){
			this.layer.addTo(map);
			if(z_index){
				this.layer.setZIndex(z_index);
			}
		}else{
			map.removeLayer(this.layer);
		}
	};
}




function onEachFeatureGeoJson(feature, layer) {
	layer.on("click",function(e){
		showFancyVectorInfo(feature, layer);
	});
}

function generateComboCategories(category){
	$.ajax({
		url: 'index.php/draw/getCategories',
        dataType: "json",
        success: function(response) {
        	$($(".vectorFancySelect")[1]).children().remove();
        	$($(".vectorFancySelect")[1]).append("<option value='-1'>Seleccione</option>");
        	for(var i=0; i<response.length; i++){
        		if(response[i].title != category){
        			$($(".vectorFancySelect")[1]).append("<option value='" + response[i].id_category + "'>" + response[i].title + "</option>");
        		}
	    	}
        }
	});
}

function showFancyVectorInfo(feature, layer){
	$.fancybox($("#fancy_vector_info").html(), {
		'width':'660',
		"height": "auto",
	    'autoDimensions':false,
	    'autoSize':false,
	    "visibility":"hidden",
	    'closeBtn' : false,
	    "openEffect" : "elastic",		   
//	    'scrolling'   : 'no',
	    helpers : {
	        overlay : {
	            	css : {
	            		'background' : 'none',
	            		'border-radius' : '0',
	            	}
	        }
	    },
	    afterShow: function () {
	    	var tipo;
	    	$(".idDrawFancyVector").val(feature.properties.id);
	    	if(feature.properties.tipo == "marker"){
	    		$($(".vectorFancy img")).attr("src", "application/views/img/ERO_icon_punto.png");
	    		tipo = "punto";
	    	}else if(feature.properties.tipo == "linea"){
	    		$($(".vectorFancy img")).attr("src", "application/views/img/ERO_icon_linea.png");
	    		tipo = "línea";
	    	}else{
	    		$($(".vectorFancy img")).attr("src", "application/views/img/ERO_icon_poligono.png");
	    		tipo = "polígono";
	    	}
	    	$($(".vectorFancy h1")).text(feature.properties.titulo + " (" + tipo + ")");
	    	$($(".vectorFancy .titleComent")).text(feature.properties.comentario);
	    	$($(".vectorFancy .spanNormal")).text(" " + feature.properties.category);
	    	
	    	//Recupero los comentarios
	    	$.ajax({
		        url: 'index.php/draw/getDrawsComents/' + $(".idDrawFancyVector").val(),
		        dataType: "json",
		        success: function(response) {
		        	for(var i=0; i<response.result.length; i++){
		        		$($(".vectorFancy .comentTable")[1]).append("<p class='size11'>" +
														"<span class='userComentTable'>" + response.result[i].name + " " + response.result[i].surname +"</span>" +
														"<span class='pl5' style='font-weight: normal;'>" + response.result[i].fecha + "</span>" +
														"</br>" +
														response.result[i].comentario +
													"</p>" +
													"<div style='border-top: 1px solid #cccccc;width: 100%;'></div>");
		        	}
		        	 $.fancybox.reposition()
		        }
			});
	    	
	    	//Recupero el combo de categorías
	    	generateComboCategories(feature.properties.category);
	    	
	    	
	    	
	    	
	    	$($(".vectorFancy input[type='button']")[1]).on("click",function(){
	    		if(isLoged){
	    			if($($(".vectorFancy .input_fancy_vector")[1]).val() != "Añadir comentario" && $($(".vectorFancy .input_fancy_vector")[1]).val() != ""){
//	    				$($(".vectorFancy .input_fancy_vector")[1]).css({"border": "1px solid #001232"});
		    			$.ajax({
	        		        url: 'index.php/draw/addComent/' + $(".idDrawFancyVector").val(),
	        		        data: { cometario: $($(".vectorFancy .input_fancy_vector")[1]).val()},
	        		        dataType: "json",
	        		        type: 'POST',
	        		        success: function(response) {
	        		        	$($(".vectorFancy .comentTable")[1]).append("<p class='size11'>" +
																	"<span class='userComentTable'>" + response.user +"</span>" +
																	"<span class='pl5' style='font-weight: normal;'>" + response.fecha + "</span>" +
																	"</br>" +
																	response.comentario +
																"</p>" +
																"<div style='border-top: 1px solid #cccccc;width: 100%;'></div>");
	        		        	
	        		        	 $($(".vectorFancy .input_fancy_vector")[1]).val("Añadir comentario");
	        		        	 $.fancybox.reposition()
	        		        	 $($(".vectorFancy .comentTable")[1]).scrollTop($(".vectorFancy .comentTable")[1].scrollHeight);
	        		        }
	        			});
	    			}
//	    			else{
//	    				$($(".vectorFancy .input_fancy_vector")[1]).css({"border": "1px solid red"});
//	    			}
	    			if($($(".vectorFancy input[type='checkbox']")[1]).is(":checked") && ($($(".vectorFancySelect")[1]).val() != -1)){
	    				$.ajax({
	    		    		url: 'index.php/draw/changeCategorie/'+ feature.properties.id + "/" + $($(".vectorFancySelect")[1]).val(),
	        		        success: function(response) {
	        		        	$($(".vectorFancy .spanNormal")).text(" " +  $(".vectorFancySelect option:selected").text());
	        		        	generateComboCategories($(".vectorFancySelect option:selected").text());
//	        		        	if($($(".vectorFancySelect")[1]).val() == feature.properties.id_category){
//	        		        		
//	        		        	}else{
//	        		        		
//	        		        	}
	        		        }
	        			});
	    			}
	    		}else{
	    			if(!$(".loginDiv").is(":visible")){
	    				$(".acceder").trigger("click")
	    			}
	    		}
	    	});
	    	
	    	$($(".vectorFancy .input_fancy_vector")[1]).on("click",function(){
	    		if($($(".vectorFancy .input_fancy_vector")[1]).val() == "Añadir comentario"){
	    			$($(".vectorFancy .input_fancy_vector")).val("");
	    		}
	    	});
	    	
	    	$(".vectorFancy input[type='checkbox']").on("click",function(){
	    		if($($(".vectorFancySelect")[1]).is(":visible")){
	    			$($(".vectorFancySelect")[1]).fadeOut();
	    		}else{
	    			$($(".vectorFancySelect")[1]).fadeIn();
	    		}
	    	});
	    }
	    
	});
}