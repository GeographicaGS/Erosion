Toolbar ={

	initialize: function(){
		$("#ctrl_feature_info").click(function(){
			
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				Split.deActivateFeatureInfo()
			}
			else{
				Split.disableAllDrawTools();
				$(this).addClass("enable");				
				Split.activateFeatureInfo()
			}
		});
		
		$("#ctrl_marker_drawer").click(function(){
			
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				Split.drawMakerLeft.disable();
				Split.drawMarkerRight.disable();
				
			}
			else{
				Split.disableAllDrawTools();
				$(this).addClass("enable");
				type = "marker";
				Split.drawMakerLeft.enable();
				Split.drawMarkerRight.enable();
			}
		});
		
		$("#ctrl_line_drawer").click(function(){
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				Split.drawLineLeft.disable();
				Split.drawLineRight.disable();
			}
			else{
				Split.disableAllDrawTools();
				$(this).addClass("enable");
				Split.drawLineLeft.enable();
				Split.drawLineRight.enable();
				type = "linea";
			}
		});
		
		$("#ctrl_rectangle_drawer").click(function(){
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				Split.drawPolygonLeft.disable();
				Split.drawPolygonRight.disable();
			}
			else{
				Split.disableAllDrawTools();
				$(this).addClass("enable");				
				Split.drawPolygonLeft.enable();
				Split.drawPolygonRight.enable();
				type = "poligono";
				arrayLatlng = new Array();
			}
		});
		
		
		$("#ctrl_location").click(function(){
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				Split.__mapLeft.getMap().removeLayer(markerLocationLeft);
				Split.__mapRight.getMap().removeLayer(markerLocationRight);
			}
			else{
				$(this).addClass("enable");
				markerLocationLeft.addTo(Split.__mapLeft.getMap());
				markerLocationRight.addTo(Split.__mapRight.getMap())
			}
		});
		
		
		$("#ctrl_add_project").click(function(){
			if(isLoged){
				if ($(this).hasClass("enable")) { 
					$(this).removeClass("enable");
					
				}
				else{
					$(this).addClass("enable");
					$.fancybox($("#project_fancy"), {
						'width':'660',
						"height": "auto",
					    'autoDimensions':false,
					    'autoSize':false,
					    "visibility":"hidden",
					    'closeBtn' : false,
					    "openEffect" : "fade",		   
					    'scrolling'   : 'no',
					    helpers : {
					        overlay : {
					            	css : {
					            		'background' : 'none',
					            		'border-radius' : '0',
					            	}
					        }
					    },
					    beforeShow: function () {
					    	$("input[name='tituloProyecto']").val("");
					    	$("input[name='descripcionProyecto']").val("");
					    	$("input[name='isPublic']").attr('checked', false);
					    	$("#ctrl_add_project").removeClass("enable");
				        	$("#errorNoCapas").hide();
				        	$("#divIsPublic").hide();

					    	if(isAdmin){
					    		$("#divIsPublic").show();
					    	}else{
					    		$("input[name='isPublic']").attr('checked', false);
					    		$("#divIsPublic").hide();
					    	}
					    	// $("input[name='tituloProyecto']").click(function(){
					    	// 	if($(this).val() == "Título"){
					    	// 		$(this).val("");
					    	// 	}
					    	// });
					    	
					    	// $("input[name='descripcionProyecto']").click(function(){
					    	// 	if($(this).val() == "Descripción"){
					    	// 		$(this).val("");
					    	// 	}
					    	// });					    	
					    },
					    
					    // afterClose:function () {
					    	
					    // },
					    
					});
					
				}
			}else{
				if(!$(".loginDiv").is(":visible")){
    				$(".acceder").trigger("click")
    			}
			}
		});

		var to;
    	$("input[name='tituloProyecto']").keyup(function(){
    		clearTimeout(to);
    	       to = setTimeout(function(){
    	    	   $.ajax({
				        url: 'index.php/project/getInformationProject/' + encodeURIComponent($("input[name='tituloProyecto']").val()),
				        dataType: "json",
				        success: function(response) {
				        	
				        	if(response.length != 0){
				        		$("input[name='descripcionProyecto']").val(response.descripcion);
				        		if(response.is_public == "t"){
				        			$("input[name='isPublic']").attr('checked', true);
				        		}else{
				        			$("input[name='isPublic']").attr('checked', false);
				        		}
				        	}
				        }
    	    	   });
    	       }, 500);
    	});

		$("input[name='saveProject']").click(function(){
    		var enviar = true;
    		$("input[name='tituloProyecto']").css({"border":"1px solid #001232"});
    		$("input[name='descripcionProyecto']").css({"border":"1px solid #001232"});
    		$("#errorNoCapas").hide();
    		if($("input[name='tituloProyecto']").val() == "" || $("input[name='tituloProyecto']").val() == "Título"){
    			
    			$("input[name='tituloProyecto']").css({"border":"1px solid red"});
    			enviar = false;
    		} 
    		if($("input[name='descripcionProyecto']").val() == '' || $("input[name='descripcionProyecto']").val() == 'Descripción'){
    			$("input[name='descripcionProyecto']").css({"border":"1px solid red"});
    			enviar = false;
    		}
    		
    		if(Split.__mapRight.layers.length == 0 && Split.__mapLeft.layers.length == 0){
    			$("#errorNoCapas").show();
    			enviar = false;
    		}
    		
    		if(enviar){
    			var panels = {};
    			var leftState = {"lat":Split.__mapLeft.map.getCenter().lat, "lng":Split.__mapLeft.map.getCenter().lng, "zoom":Split.__mapLeft.map.getZoom()};
    			var rightState = {"lat":Split.__mapRight.map.getCenter().lat, "lng":Split.__mapRight.map.getCenter().lng, "zoom":Split.__mapRight.map.getZoom()};
    			var leftPanel = (Toolbar._createJsonFromLayer(Split.__mapLeft.layers));
    			var rightPanel = (Toolbar._createJsonFromLayer(Split.__mapRight.layers))  
    			panels = { 'left':JSON.stringify(leftPanel),'right':JSON.stringify(rightPanel), 'leftState':leftState, 'rightState':rightState};
    			
    			$.ajax({
			        url: 'index.php/project/projectExist/' + encodeURIComponent($("input[name='tituloProyecto']").val()),
			        success: function(response) {
			        	if(response ==  "true"){
			        		$("input[name='saveProject']").hide();
			        		$("#errorProjectOwner").hide();
			        		$("#projectExist").show();
			        		
			        		
			        		$("#aceptSaveProject").click(function(){
			        			$.ajax({
							        url: 'index.php/project/updateProject',
							        data: "titulo=" +  $("input[name='tituloProyecto']").val() + "&descripcion=" + $("input[name='descripcionProyecto']").val() + "&" + "&public=" + ($("input[name='isPublic']").is(":checked") ? "1":"0") + "&panels=" + JSON.stringify(panels),
							        type: "POST",
							        success: function(response) {
							        	if(response == "0"){
							        		$( "#cancelSaveProject" ).trigger( "click" );
							        		$("#errorProjectOwner").show();
							        	}else{
							        		$("#projectExist").hide();
						        			$("input[name='saveProject']").show();
								        	$.fancybox.close();
								        	drawCategories();
							        	}
							        }
					    		});
			        		});
			        		
			        		$("#cancelSaveProject").click(function(){
			        			$("#projectExist").hide();
			        			$("#errorProjectOwner").hide();
			        			$("input[name='saveProject']").show();
			        		});
			        		
			        	}else{
			    			$.ajax({
						        url: 'index.php/project/createProject',
						        data: "titulo=" +  $("input[name='tituloProyecto']").val() + "&descripcion=" + $("input[name='descripcionProyecto']").val() + "&" + "&public=" + ($("input[name='isPublic']").is(":checked") ? "1":"0") + "&panels=" + JSON.stringify(panels),
						        type: "POST",
						        success: function(response) {
						        	drawCategories();
						        	$.fancybox.close();
						        }
				    		});
			        	}
			        }
	    		});
    			
    			
    		}
    	
    	});

		$("#project_fancy h2").click(function(){
			$.fancybox.close();
		});

		
		$(".streetButtonLeft,.streetButtonRight").click(function() {
			var map;
			var mapHtml;
			var capaHtml;
			var panelHtml;
			var closeStreet;

			if($(this).hasClass("streetButtonLeft")){
				map = Split.__mapLeft;
				mapHtml = $("#map_left");
				capaHtml = $("#capaLeft");
				panelHtml = $("#panel_left");
				closeStreet = $(".closeStreetLeft");
			}else{
				map = Split.__mapRight;
				mapHtml = $("#map_right");
				capaHtml = $("#capaRight");
				panelHtml = $("#panel_right");
				closeStreet = $(".closeStreetRight");
			}
			
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				map.getMap().removeLayer(map.callejero);
				mapHtml.css({"cursor":"-webkit-grab"});
			}else{
				$(this).addClass("active");
				map.getMap().addLayer(map.callejero);
				mapHtml.css({"cursor":"pointer"});

			var self = $(this);
			map.getMap().on('click', function(e) {
				var service = new google.maps.StreetViewService();			
				service.getPanoramaByLocation(e.latlng, (map.getMap().getZoom()>11? 50:2000), function(result, status) {
				    if (status == google.maps.StreetViewStatus.OK) {
				    	mapHtml.hide();
				    	$(".catalogo").hide();
				    	capaHtml.hide();
				    	self.hide();
				    	self.trigger("click");
				    	closeStreet.show();
						panelHtml.append("<object width='100%' height='100%' data='https://maps.google.es/maps/sv?cbll=" + result.location.latLng.lat() + "," + result.location.latLng.lng() + "'></object>");
					}		
				 });
			});




			}
		});

		$(".closeStreetLeft,.closeStreetRight").click(function() {
			var map;
			var mapHtml;
			var capaHtml;
			var panelHtml;
			var street;


			if($(this).hasClass("closeStreetLeft")){
				map = Split.__mapLeft;
				mapHtml = $("#map_left");
				capaHtml = $("#capaLeft");
				panelHtml = $("#panel_left");
				street = $(".streetButtonLeft");
			}else{
				map = Split.__mapRight;
				mapHtml = $("#map_right");
				capaHtml = $("#capaRight");
				panelHtml = $("#panel_right");
				street = $(".streetButtonRight");
			}
			map.getMap().off("click");
			mapHtml.show();
			$(".catalogo").show();
			capaHtml.show();
			street.show();
			$(this).hide();
			panelHtml.find("object").remove();

		});
	},

	_createJsonFromLayer: function(layers){
		var panel = Array();
		for(var i=layers.length-1; i>=0; i--){
			capas = {};
			capas["id"] = layers[i].id;
			capas["tipo"] = layers[i].tipo;
			capas["visible"] = layers[i].visible;
			capas["opacity"] = layers[i].layer.options.opacity;
			if(capas["id"] == -1){
				capas["url"] = layers[i].url;
				capas["title"] = layers[i].title
				capas["name"] = layers[i].name 
			}
			panel.push(capas); 
		}
		return panel;
	}
}