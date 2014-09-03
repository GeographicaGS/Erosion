Split = {
	layers: null,	
	iniLat: 37.36455,
	iniLng: -4.57645,	
	iniZoom: 7,
	__mapLeft:null,
	__mapRight: null,
	__currentMasterMap: null,
	__mapIsMoving: false,
	LEFT: 0,
	RIGHT: 1,
	syncEnable : true,
	initialize: function(){
		
		// center the map
		var startingCenter = new L.LatLng(this.iniLat, this.iniLng);		
		
		//create the left map's leaflet instance
		var mapLeft = new L.Map('map_left', {
			  center: startingCenter,
			  zoom: this.iniZoom,
			  fadeAnimation: false,
			//  crs: L.CRS.EPSG4326,
			  zoomControl: false,
			  attributionControl: false,
			  maxZoom:20
		});
		
		
		
		
		// add zoom control to map left
		var zoomControl = new L.Control.Zoom({
			position : 'bottomright'
		});		
		zoomControl.addTo(mapLeft);
		
		//let's create the GroupLayer object with the instance of mapLeft		
		var opts = {
				map: mapLeft,
				layers: layers,
				father:this.LEFT,
				ctxLayers: ctxLayers
		}		
		this.__mapLeft = new GroupLayer(opts);	
		
		mapLeft.on('moveend', function(e) {
		    Split.__mapLeft.refreshLayers();
		});
		
		/* Only for debug purpose
		mapLeft.on('click', function(e) {
		    console.log(e.latlng);
		});*/
		
		// create the right map's leaflet instance
		var mapRight = new L.Map('map_right', {
			  center: startingCenter,
			  zoom: this.iniZoom,			  
			  fadeAnimation: false,
			  //crs: L.CRS.EPSG4326,
			  zoomControl: false,
			  attributionControl: false,
			  maxZoom:20
		});
		
		
		// add zoom control to left map
		zoomControl = new L.Control.Zoom({
			position : 'bottomleft'
		});
		zoomControl.addTo(mapRight);		
		
		//let's create the GroupLayer object with the instance of mapRightt
		opts = {
				map: mapRight,
				layers: layers,
				father:this.RIGHT,
				ctxLayers: ctxLayers
		}
		this.__mapRight = new GroupLayer(opts);
		
		mapRight.on('moveend', function(e) {
		    Split.__mapRight.refreshLayers();
		});
		
		Split.__mapLeft.getMap().sync(Split.__mapRight.getMap());
		Split.__mapRight.getMap().sync(Split.__mapLeft.getMap());

		/* Splits event controls */
		// this.__mapLeft.getMap().on("drag", function() {			
		// 	Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
		// });

		this.__mapLeft.getMap().on("dragend", function() {
			Split.__mapLeft.refreshPanoramioCheck($("#panel_left").find(".panoramio"));
			Split.__mapLeft.drawPanoramio();
			Split.__mapRight.refreshPanoramioCheck($("#panel_right").find(".panoramio"));
			Split.__mapRight.drawPanoramio();
		});
		
		// this.__mapRight.getMap().on("drag", function() {
		// 	Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
		// });
		
		this.__mapRight.getMap().on("dragend", function() {
			Split.__mapLeft.refreshPanoramioCheck($("#panel_left").find(".panoramio"));
			Split.__mapLeft.drawPanoramio();
			Split.__mapRight.refreshPanoramioCheck($("#panel_right").find(".panoramio"));
			Split.__mapRight.drawPanoramio();
		});

		this.__mapLeft.getMap().on("zoomend", function() {
			// Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
			Split.__mapLeft.refreshPanoramioCheck($("#panel_left").find(".panoramio"));
			Split.__mapLeft.drawPanoramio();
		});

		this.__mapRight.getMap().on("zoomend", function() {
			// Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
			Split.__mapRight.refreshPanoramioCheck($("#panel_right").find(".panoramio"));
			Split.__mapRight.drawPanoramio();
		});
		
		this.__currentMasterMap = this.__mapLeft;
		
		var self = this;
		this.__mapLeft.getMap().locate({setView: false, maxZoom: 7});
		this.__mapLeft.getMap().on('locationfound', onLocationFoundLeft);
		this.__mapRight.getMap().locate({setView: false, maxZoom: 7});
		this.__mapRight.getMap().on('locationfound', onLocationFoundRight);
		
		// setInterval(function() {
		// 	self.__mapLeft.getMap().locate({setView: false, maxZoom: 7});
		// 	self.__mapRight.getMap().locate({setView: false, maxZoom: 7});
		// }, 10000);
		
		
		
		drawCategories();
		createDrawLocal();
		
		var editableLayers = new L.FeatureGroup();
		Split.__mapLeft.getMap().addLayer(editableLayers);
		var editableLayersRight = new L.FeatureGroup();
		Split.__mapRight.getMap().addLayer(editableLayersRight);
		
		var options = {
		    position: 'bottomleft',
		    draw: {
		        polyline: {
		            shapeOptions: {
		    			color: 'red',
		    			weight: 2,
		    			opacity: 0.8,
		
		            },
//		            showLength: true
		        },
		        polygon: {
		            allowIntersection: false,
		            drawError: {
		                color: '#e1e100',
		                message: '<strong>Oh snap!<strong> you can\'t draw that!'
		            },
		            shapeOptions: {
		                color: 'red',
		                fill: "red"
		            }
		        },
		        circle: false,
		        rectangle:false,
//		        rectangle: {
//		            shapeOptions: {
//		                clickable: false
//		            }
//		        },
//		        marker: {
//		            icon: new MyCustomMarker()
//		        }
		    },
		    edit: {
		        featureGroup: editableLayers,
//		        remove: false
		    }
		};
		
		var optionsRight = options;
		optionsRight.edit.featureGroup = editableLayersRight;

		var drawControl = new L.Control.Draw(options);
		Split.__mapLeft.getMap().addControl(drawControl);
		
		var drawControlRight = new L.Control.Draw(optionsRight);
		Split.__mapRight.getMap().addControl(drawControlRight);
		
		var drawMakerLeft = new L.Draw.Marker(Split.__mapLeft.getMap());
		var drawMarkerRight = new L.Draw.Marker(Split.__mapRight.getMap());
		var drawLineLeft = new L.Draw.Polyline(Split.__mapLeft.getMap(), options.draw.polyline);
		var drawLineRight = new L.Draw.Polyline(Split.__mapRight.getMap(), optionsRight.draw.polyline);
		var drawPolygonLeft = new L.Draw.Polygon(Split.__mapLeft.getMap(), options.draw.polygon);
		var drawPolygonRight = new L.Draw.Polygon(Split.__mapRight.getMap(), optionsRight.draw.polygon);
		
		
		var editLeft = new L.EditToolbar.Edit(Split.__mapLeft.getMap(), {
            featureGroup: drawControl.options.edit.featureGroup,
            selectedPathOptions: drawControl.options.edit.selectedPathOptions
        });
		
		var  latlng ;
		var polyline;
		var poligono;
		var type;
		var arrayLatlng;
		var xClick;
		var yClick;
			
		
		Split.__mapLeft.getMap().on('draw:drawstart', function (e) {
			
			$("#fancy_box_save_draw").fadeOut();
			$("#fancy_box_save_draw").width(0)
			$($("#fancy_box_save_draw").find("p")[0]).hide();
			$($("#fancy_box_save_draw").find("p")[1]).hide();
			
			polyline = null;
			poligono = null;
			
			Split.__mapLeft.getMap().on('click', function(e) {
				xClick = e.originalEvent.clientX	
				yClick = e.originalEvent.clientY
				latlng = e.latlng;
				if(polyline == null){
					polyline = L.polyline([latlng,latlng], options.draw.polyline.shapeOptions)
				}else{
					polyline._latlngs.push(latlng);
				}
				Split.__mapLeft.getMap().on('mousemove', function(e) {
					if(polyline){
						Split.__mapRight.getMap().removeLayer(polyline);
					}
					if(type == "linea"){
						polyline._latlngs[polyline._latlngs.length-1] = e.latlng;
						polyline.addTo(Split.__mapRight.getMap());
					}
				});
				if(type =="poligono"){
					if(poligono){
						Split.__mapRight.getMap().removeLayer(poligono);
					}
					if(arrayLatlng.length == 0){
						arrayLatlng.push(latlng);
					}
					arrayLatlng.push(e.latlng);
					poligono = L.polygon(arrayLatlng, options.draw.polygon.shapeOptions).addTo(Split.__mapRight.getMap());
				}
			});
		});
		
		Split.__mapRight.getMap().on('draw:drawstart', function (e) {
			
			$("#fancy_box_save_draw").fadeOut();
			$("#fancy_box_save_draw").width(0)
			$($("#fancy_box_save_draw").find("p")[0]).hide();
			$($("#fancy_box_save_draw").find("p")[1]).hide();
			
			polyline = null;
			poligono = null;
			
			Split.__mapRight.getMap().on('click', function(e) {
				xClick = e.originalEvent.clientX	
				yClick = e.originalEvent.clientY
				latlng = e.latlng;
				if(polyline == null){
					polyline = L.polyline([latlng,latlng], options.draw.polyline.shapeOptions)
				}else{
					polyline._latlngs.push(latlng);
				}
				Split.__mapRight.getMap().on('mousemove', function(e) {
					if(polyline){
						Split.__mapLeft.getMap().removeLayer(polyline);
					}
					if(type == "linea"){
						polyline._latlngs[polyline._latlngs.length-1] = e.latlng;
						polyline.addTo(Split.__mapLeft	.getMap());
					}
				});
				if(type =="poligono"){
					if(poligono){
						Split.__mapLeft.getMap().removeLayer(poligono);
					}
					if(arrayLatlng.length == 0){
						arrayLatlng.push(latlng);
					}
					arrayLatlng.push(e.latlng);
					poligono = L.polygon(arrayLatlng, optionsRight.draw.polygon.shapeOptions).addTo(Split.__mapLeft.getMap());
				}
			});
		});
		
		
		Split.__mapLeft.getMap().on('draw:created', function (e) {
			var aux = new Object();
			
		    if (type == 'marker') {
		    	var layerAux = e.layer;
		    	try{
		    		xClick= event.x; 
		    		yClick= event.y;
		    	}catch(e) {
		    		xClick= Split.__mapLeft.getMap().latLngToLayerPoint(layerAux.getLatLng()).x; 
		    		yClick= Split.__mapLeft.getMap().latLngToLayerPoint(layerAux.getLatLng()).y +20;
		    	}
		    	
		    	var markerAux = L.marker(e.layer._latlng).addTo(Split.__mapRight.getMap());
		    	markerAux.off('click');
		    	 aux.layer = markerAux;
		    	markerAux.on('click', function (e) {
			    	if(isLoged){
				    	Split.showFancySaveDraw(aux, type, e.originalEvent.clientX,e.originalEvent.clientY);
				    }else{
				    	Split.showFancyDontSaveDraw(aux,e.originalEvent.clientX,e.originalEvent.clientY);
				    }
				});
		    }		    
		    editableLayers.addLayer(e.layer);
		    Split.__mapLeft.getMap().off("click");
		    Split.__mapLeft.getMap().off("mousemove");
		    Split.__mapRight.getMap().off("click");
		    Split.__mapRight.getMap().off("mousemove");
		    Split.disableAllDrawTools(drawMakerLeft,drawMarkerRight,drawLineLeft,drawLineRight,drawPolygonLeft,drawPolygonRight);
		    
		    
		    if(isLoged){
		    	Split.showFancySaveDraw(e, type, xClick,yClick);
		    	
		    }else{
		    	Split.showFancyDontSaveDraw(e,xClick,yClick);
		    }
		    
		    e.layer.off('click');
		    e.layer.on('click', function (event) {
		    	if(isLoged){
			    	Split.showFancySaveDraw(e, type, event.originalEvent.clientX,event.originalEvent.clientY);
			    }else{
			    	Split.showFancyDontSaveDraw(e,event.originalEvent.clientX,event.originalEvent.clientY);
			    }
			});
		    
		    
		    if(type == "linea"){
		    	polyline._latlngs.pop();
			    polyline.redraw();
		    	polyline.off('click');
			    aux.layer = polyline;
			    polyline.on('click', function (e) {
			    	if(isLoged){
				    	Split.showFancySaveDraw(aux, type, e.originalEvent.clientX,e.originalEvent.clientY);
				    }else{
				    	Split.showFancyDontSaveDraw(aux,e.originalEvent.clientX,e.originalEvent.clientY);
				    }
				});
		    }else if(type =="poligono"){
		    	poligono._latlngs = e.layer._latlngs;
		    	poligono.redraw();
		    	poligono.off('click');
		    	aux.layer = poligono;
		    	poligono.on('click', function (e) {
			    	if(isLoged){
				    	Split.showFancySaveDraw(aux, type, e.originalEvent.clientX,e.originalEvent.clientY);
				    }else{
				    	Split.showFancyDontSaveDraw(aux,e.originalEvent.clientX,e.originalEvent.clientY);
				    }
				});
		    }
		    
		    
		    
		});
		
		Split.__mapRight.getMap().on('draw:created', function (e) {
			var aux = new Object();
			
		    if (type == 'marker') {
		    	xClick= Split.__mapRight.getMap().latLngToLayerPoint(e.layer.getLatLng()).x+$("#map_left").outerWidth(); 
		    	yClick= Split.__mapRight.getMap().latLngToLayerPoint(e.layer.getLatLng()).y+20;
		    	var markerAux = L.marker(e.layer._latlng).addTo(Split.__mapLeft.getMap());
		    	markerAux.off('click');
		    	aux.layer = markerAux;
		    	markerAux.on('click', function (e) {
			    	if(isLoged){
				    	Split.showFancySaveDraw(aux, type, e.originalEvent.clientX,e.originalEvent.clientY);
				    }else{
				    	Split.showFancyDontSaveDraw(aux,e.originalEvent.clientX,e.originalEvent.clientY);
				    }
				});
		    }		    
		    editableLayersRight.addLayer(e.layer);
		    Split.__mapRight.getMap().off("click");
		    Split.__mapRight.getMap().off("mousemove");
		    Split.__mapLeft.getMap().off("click");
		    Split.__mapLeft.getMap().off("mousemove");
		    Split.disableAllDrawTools(drawMakerLeft,drawMarkerRight,drawLineLeft,drawLineRight,drawPolygonLeft,drawPolygonRight);
		  
		    if(isLoged){
		    	Split.showFancySaveDraw(e, type, xClick,yClick);
		    	
		    }else{
		    	Split.showFancyDontSaveDraw(e,xClick,yClick);
		    }
		    
		    e.layer.off('click');
		    e.layer.on('click', function (event) {
		    	if(isLoged){
			    	Split.showFancySaveDraw(e, type, event.originalEvent.clientX,event.originalEvent.clientY);
			    }else{
			    	Split.showFancyDontSaveDraw(e,event.originalEvent.clientX,event.originalEvent.clientY);
			    }
			});
		    
		    if(type == "linea"){
		    	polyline._latlngs.pop();
			    polyline.redraw();
		    	polyline.off('click');
			    aux.layer = polyline;
			    polyline.on('click', function (e) {
			    	if(isLoged){
				    	Split.showFancySaveDraw(aux, type, e.originalEvent.clientX,e.originalEvent.clientY);
				    }else{
				    	Split.showFancyDontSaveDraw(aux,e.originalEvent.clientX,e.originalEvent.clientY);
				    }
				});
		    }else if(type =="poligono"){
		    	poligono._latlngs = e.layer._latlngs;
		    	poligono.redraw();
		    	poligono.off('click');
		    	aux.layer = poligono;
		    	poligono.on('click', function (e) {
			    	if(isLoged){
				    	Split.showFancySaveDraw(aux, type,e.originalEvent.clientX,e.originalEvent.clientY);
				    }else{
				    	Split.showFancyDontSaveDraw(aux,e.originalEvent.clientX,e.originalEvent.clientY);
				    }
				});
		    }
		    
		});

		Split.__mapLeft.getMap().on('draw:edited', function () {
		});

		Split.__mapLeft.getMap().on('draw:deleted', function () {
		    // Update db to save latest changes.
		});
		
		
		
		$("#ctrl_feature_info").click(function(){
			
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				Split.deActivateFeatureInfo()
			}
			else{
				Split.disableAllDrawTools(drawMakerLeft,drawMarkerRight,drawLineLeft,drawLineRight,drawPolygonLeft,drawPolygonRight);
				$(this).addClass("enable");				
				Split.activateFeatureInfo()
			}
		});
		
		$("#ctrl_marker_drawer").click(function(){
			
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				drawMakerLeft.disable();
				drawMarkerRight.disable();
				
			}
			else{
				Split.disableAllDrawTools(drawMakerLeft,drawMarkerRight,drawLineLeft,drawLineRight,drawPolygonLeft,drawPolygonRight);
				$(this).addClass("enable");
				type = "marker";
				drawMakerLeft.enable();
				drawMarkerRight.enable();
			}
		});
		
		$("#ctrl_line_drawer").click(function(){
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				drawLineLeft.disable();
				drawLineRight.disable();
			}
			else{
				Split.disableAllDrawTools(drawMakerLeft,drawMarkerRight,drawLineLeft,drawLineRight,drawPolygonLeft,drawPolygonRight);
				$(this).addClass("enable");
				drawLineLeft.enable();
				drawLineRight.enable();
				type = "linea";
			}
		});
		
		$("#ctrl_rectangle_drawer").click(function(){
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				drawPolygonLeft.disable();
				drawPolygonRight.disable();
			}
			else{
				Split.disableAllDrawTools(drawMakerLeft,drawMarkerRight,drawLineLeft,drawLineRight,drawPolygonLeft,drawPolygonRight);
				$(this).addClass("enable");				
				drawPolygonLeft.enable();
				drawPolygonRight.enable();
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
					    "openEffect" : "elastic",		   
					    'scrolling'   : 'no',
					    helpers : {
					        overlay : {
					            	css : {
					            		'background' : 'none',
					            		'border-radius' : '0',
					            	}
					        }
					    },
					    afterShow: function () {
					    	if(isAdmin){
					    		$("#divIsPublic").show();
					    	}else{
					    		$("input[name='isPublic']").attr('checked', false);
					    		$("#divIsPublic").hide();
					    	}
					    	$("input[name='tituloProyecto']").click(function(){
					    		if($(this).val() == "Título"){
					    			$(this).val("");
					    		}
					    	});
					    	
					    	$("input[name='descripcionProyecto']").click(function(){
					    		if($(this).val() == "Descripción"){
					    			$(this).val("");
					    		}
					    	});
					    	
					    	$("h2").on("click",function(){
					    		$.fancybox.close();
					    	});
					    	
					    	var to;
					    	$("input[name='tituloProyecto']").on("keyup",function(){
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
					    	
					    	
					    	$("input[name='saveProject']").on("click",function(){
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
					    			var leftPanel = Array();
					    			var rightPanel = Array();
					    			for(var i=Split.__mapLeft.layers.length-1; i>=0; i--){
					    				capas = {};
					    				capas["id"] = Split.__mapLeft.layers[i].id;
					    				capas["tipo"] = Split.__mapLeft.layers[i].tipo;
					    				capas["visible"] = Split.__mapLeft.layers[i].visible;
					    				capas["opacity"] = Split.__mapLeft.layers[i].layer.options.opacity;
					    				leftPanel.push(capas); 
					    			}
					    			for(var i=Split.__mapRight.layers.length-1; i>=0; i--){
					    				capas = {};
					    				capas["id"] = Split.__mapRight.layers[i].id;
					    				capas["tipo"] = Split.__mapRight.layers[i].tipo;
					    				capas["visible"] = Split.__mapRight.layers[i].visible;
					    				capas["opacity"] = Split.__mapRight.layers[i].layer.options.opacity;
					    				rightPanel.push(capas); 
					    			}
					    			panels = { 'left':JSON.stringify(leftPanel),'right':JSON.stringify(rightPanel)};
					    			
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
					    	
					    },
					    
					    afterClose:function () {
					    	$("#ctrl_add_project").removeClass("enable");
					    	$("input[name='tituloProyecto']").val("Título");
				        	$("input[name='descripcionProyecto']").val("Descripción");
				        	$("#errorNoCapas").hide();
				        	$("input[name='isPublic']").attr('checked', false);
				        	$("#divIsPublic").hide();
					    },
					    
					});
					
				}
			}else{
				if(!$(".loginDiv").is(":visible")){
    				$(".acceder").trigger("click")
    			}
			}
		});
		
		
		
		$(".acceder").click(function(){
			if($(".loginDiv").is(":visible")){
				$(".loginDiv").fadeOut();
//				$($(".loginDiv").find("input[type='text']")).val("Correo electrónico");
				$($(".loginDiv").find("input[type='text']")).removeClass("errorBorder");
//				$($(".loginDiv").find("input[type='password']")).val("Contraseña");
				$($(".loginDiv").find("input[type='password']")).removeClass("errorBorder");
				$(".loginDiv").find("input[type='text'],input[type='password']").css({"color":""});
				$("#errorLogin").hide();
				
			}else{
				$(".loginDiv").fadeIn();
				$(".loginDiv").find("input[type='text']").focus();
				$(".loginDiv").find("input[type='text'],input[type='password']").bind( "click", function(){
//					if($(".loginDiv").find("input[type='text']").val() == "Correo electrónico"){
//						$(".loginDiv").find("input[type='text'],input[type='password']").val("");
//						$(".loginDiv").find("input[type='text'],input[type='password']").css({"color":"black"});
//					}
				});
				
				$(document).unbind().bind("keypress", function(e) {
				    if($(".loginDiv").is(":visible") && e.which == 13) {
				    	$(".loginDiv").find("input[type='button']").trigger("click");
				    }
				});
				
				$(".loginDiv").find("input[type='button']").bind( "click", function(){
					var email = $(".loginDiv").find("input[type='text']");
					var password = $(".loginDiv").find("input[type='password']");
					var post = true;
					if($(email).val() == "" || $(email).val() == "Correo electrónico"){
						post = false;
						$(email).addClass("errorBorder");
					}
					if($(password).val() == ""){
						post = false;
						$(password).addClass("errorBorder");
					}
					
					if(post){
						$.ajax({
					        url: 'index.php/login/getUser',
					        type: 'post',
					        data: $('form#form_login').serialize(),
					        success: function(response) {
					        	if(response ==  "false"){
					        		$("#errorLogin").fadeIn();
					        		isLoged = false;
					        		isAdmin = false;
					        		
					        	}else{
					        		$(".acceder").hide();
					        		$("#closeSesion").show();
					        		$(".loginDiv").fadeOut();
					        		isLoged = true;
					        		$("#closeSesion").text(response);
					        		$.ajax({
					        		    url: 'index.php/login/isAdmin',
					        		    success: function(response) {
					        		    	if(response == 1){
					        		    		isAdmin = true;
					        		    	}else{
					        		    		isAdmin = false;
					        		    	}
					        		    }
					        		});
					        		
					        	}
					        	drawCategories();
					        }
					    });
					}
				});
				
			}
		});

		$(".closeLogin").bind( "click", function(){
			$(".acceder").trigger("click");
		});
		
		$("#closeSesion").bind( "click", function(){
			$.ajax({
		        url: 'index.php/login/logout',
		        type: 'post',
		        data: $('form#form_login').serialize(),
		        success: function(response) {
		        	$("#closeSesion").hide();
					$(".acceder").show();
					$(".loginDiv").find("input[type='text']").val("");
					$(".loginDiv").find("input[type='password']").val("");
					drawCategories();
					isLoged = false;
					isAdmin = false;
		        }
		    });
		});
		
	
		$(".streetButtonLeft,.streetButtonRight").on('click', function() {
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

		$(".closeStreetLeft,.closeStreetRight").on('click', function() {
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
		
		this.__mapLeft.getMap().touchZoom.disable();
		this.__mapRight.getMap().touchZoom.disable();
	},
	/* Split handler*/
	mapMover: function(a,b) {		  
		var bActive;
		if (Split.__mapLeft.getMap() == a){
			Split.__currentMasterMap = Split.__mapLeft;
			bActive =  Split.__mapRight.isActive();
		}
		else{
			Split.__currentMasterMap = Split.__mapRight;
			bActive =  Split.__mapLeft.isActive();
		}
		
		if (Split.__mapIsMoving || !Split.syncEnable || !bActive){ 
			return; 
		}
	
		Split.__mapIsMoving = true;

		var lng, newZoom = a.getZoom(),otherZoom = b.getZoom();		     

		// if (newZoom !== otherZoom){
		//     b.setZoom(newZoom);
		// }

		// b.panTo(a.getCenter());
		b.setView(a.getCenter(),newZoom);
	
		Split.__mapIsMoving = false;
	},
	/* Toogle an Split panel*/
	togglePanel:function (el){
		var totalWidth = Math.floor(($(window).width()) /2);
		if (el==this.LEFT){
			//Left panel
			if ($("#panel_left").is(":visible") && $("#panel_right").is(":visible")){	
				// hide panel left
				$("#sep").hide();
				$('#panel_left').hide();
				$('#panel_right').width(totalWidth*2);					
				Split.__mapRight.getMap().invalidateSize();	
				Split.__mapLeft.setActive(false);				
			}
			else{
				$("#sep").show();				
				$('#panel_right').show();
				$('#panel_left').width(totalWidth);					
				Split.__mapLeft.getMap().invalidateSize();	
				Split.__mapRight.setActive(true);
			}			
			
			
		}
		else if (el==this.RIGHT)
		{
			//Right paneltoggleLayers
			if ($("#panel_left").is(":visible") && $("#panel_right").is(":visible")){	
				// hide panel right
				$("#sep").hide();
				$('#panel_right').hide();
				$('#panel_left').width(totalWidth*2);					
				Split.__mapLeft.getMap().invalidateSize();
				Split.__mapRight.setActive(false);
			}
			else{
				$("#sep").show();				
				$('#panel_left').show();
				$('#panel_right').width(totalWidth);					
				Split.__mapRight.getMap().invalidateSize();
				Split.__mapLeft.setActive(true);
			}
		}
		if (Split.__currentMasterMap == Split.__mapLeft){
			Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
		}
		else{
			Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
		}
	},
	/* Syncronized and desyncronized maps*/
	sync: function(){
		Split.syncEnable = !Split.syncEnable;
		var lurl = Split.syncEnable ? "MED_icon_enlazar_OK_left.png" : "MED_icon_enlazar_KO_left.png";
//		var rurl = Split.syncEnabletoggleLayer ? "MED_icon_enlazar_OK_right.png" : "MED_icon_enlazar_KO_right.png";
		var rurl = Split.syncEnable ? "MED_icon_enlazar_OK_right.png" : "MED_icon_enlazar_KO_right.png";
		$("#panel_left img.sync").attr("src","application/views/img/"+lurl);
		$("#panel_right img.sync").attr("src","application/views/img/"+rurl);
		
		if (Split.syncEnable){
			$("img.sync").attr("title","Desynchronize maps");
			Split.__mapLeft.getMap().sync(Split.__mapRight.getMap());
			Split.__mapRight.getMap().sync(Split.__mapLeft.getMap());
			// $("img.sync").attr("title","Desynchronize maps");
			// if (Split.__currentMasterMap == Split.__mapLeft){
			// 	Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
			// }
			// else{
			// 	Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
			// }
		}
		else{
			$("img.sync").attr("title","Synchronize maps");
			Split.__mapLeft.getMap().unsync(Split.__mapRight.getMap());
			Split.__mapRight.getMap().unsync(Split.__mapLeft.getMap());
		}
	},
	/* show/hide layer interface*/
	toggleLayersInterface: function(el){
		if (el==this.LEFT){
			var $panel = $("#panel_right .layer_panel");
			var $panel = $("#panel_left .layer_panel");
			if ($panel.hasClass("close")){
				
				$("#capaLeft").animate({"width":'319px'});
//				$("#capaLeft").css("width","319px");
//				$("#capaLeft").css("border-top-left-radius","0px");
				$("#capaLeft").css("border-top","2px solid #888");
				
				$panel.hide();
				$panel.slideDown(400);
				$panel.removeClass("close");
				this.__mapLeft.refreshLayerPanel($panel);
				$("#panel_left .layer_ctrl").addClass("open");
			}
			else{
				
				$("#capaLeft").animate({"width":'40px'});
//				$("#capaLeft").css("width","Auto");
//				$("#capaLeft").css("border-top-left-radius","5px");
				$("#capaLeft").css("border-top","1px solid #888");
				
				$panel.addClass("close");
				$panel.html("");
				$("#panel_left .layer_ctrl").removeClass("open");
			}
		}
		else if (el==this.RIGHT){
			var $panel = $("#panel_right .layer_panel");
			
			if ($panel.hasClass("close")){
				
				$("#capaRight").animate({"width":'319px'});
//				$("#capaRight").css("width","319px");
//				$("#capaRight").css("border-top-left-radius","0px");
				$("#capaRight").css("border-top","2px solid #888");
				
				$panel.hide();
				$panel.slideDown(400);
				$panel.removeClass("close");
				this.__mapRight.refreshLayerPanel($panel);
				$("#panel_right .layer_ctrl").addClass("open");
			}
			else{
				
				$("#capaRight").animate({"width":'40px'});
				$("#capaRight").css("width","Auto");
//				$("#capaRight").css("border-top-left-radius","5px");
				$("#capaRight").css("border-top","1px solid #888");
				
				$panel.addClass("close");
				$panel.html("");
				$("#panel_right .layer_ctrl").removeClass("open");
			}
		}
		
		
		
		$panel.find(".toogleLayer").click(function(){
			Split.toggleLayer($(this).attr("id_layer"),$(this).attr("father"),$(this).is(":checked"));
		});
		
	},
	__drawLayerInterface: function(el){		
		if (el==this.LEFT){
			var $panel = $("#panel_left .layer_panel");
//			$panel.html( this.__mapLeft.getHTMLLayersPanel());
			this.__mapLeft.refreshLayerPanel($panel);
		}
		else if (el==this.RIGHT){
			var $panel = $("#panel_right .layer_panel");
//			$panel.html( this.__mapRight.getHTMLLayersPanel());
			this.__mapRight.refreshLayerPanel($panel);
		}
		
		$panel.find(".toogleLayer").click(function(){
			Split.toggleLayer($(this).attr("id_layer"),$(this).attr("father"),$(this).is(":checked"));

		})
		
	},
	/* Toogle a layer of one map */
	toggleLayer: function(id_layer,el,checked){
		if (el==this.LEFT){
			this.__mapLeft.toogleLayer(id_layer,checked);			
		}
		else if (el==this.RIGHT){
			this.__mapRight.toogleLayer(id_layer,checked);			
		}
//		this.__drawLayerInterface(el);
	},
	setHistogram: function(id_layer,el){
		if (el==this.LEFT){
			this.__mapLeft.setHistogram(id_layer);			
		}
		else if (el==this.RIGHT){
			this.__mapRight.setHistogram(id_layer);
		}
		this.__drawLayerInterface(el);
	},
	
	
	
	addLayer: function(capa, tipo, leyenda, geoJson, panel, visible, opacity) {
		var gsLayerLeft;
		var gsLayerRight;

		if(!$("#panel_right .layer_panel").hasClass("close")){
			this.toggleLayersInterface(this.RIGHT);
		}
		if(!$("#panel_left .layer_panel").hasClass("close")){
			this.toggleLayersInterface(this.LEFT);
		}

		if(visible == undefined){
			visible = true;
		}

		if(opacity == undefined){
			opacity = 1;
		}
		
		if(tipo == "wms"){
			gsLayerLeft = new GSLayerWMS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda);
			gsLayerRight = new GSLayerWMS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda);
			
		}else if(tipo == "wmts"){
			gsLayerLeft = new GSLayerWMTS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda);
			gsLayerRight = new GSLayerWMTS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda);
		
		}else if(tipo == "tms"){
			gsLayerLeft = new GSLayerTMS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda, capa.tms.google);
			gsLayerRight = new GSLayerTMS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda, capa.tms.google);
		
		}else if(tipo == "simbolo"){
			
			gsLayerLeft = new GSLayerSimbolo(capa.id, capa.title, capa.simbolo.umbral, capa.simbolo.colorUmbralPositivo, capa.simbolo.colorUmbralNegativo, capa.simbolo.radioMin, capa.simbolo.radioMax, [43,41,39,37,35,33,31,29,27,25,23,21,19,17,15,13,11,9,7,5,3,1]);
			gsLayerRight = new GSLayerSimbolo(capa.id, capa.title, capa.simbolo.umbral, capa.simbolo.colorUmbralPositivo, capa.simbolo.colorUmbralNegativo, capa.simbolo.radioMin, capa.simbolo.radioMax, [43,41,39,37,35,33,31,29,27,25,23,21,19,17,15,13,11,9,7,5,3,1]);
		}
		
		else if(geoJson && geoJson.length > 0){
			
			gsLayerLeft = new GSLayerGeoJson(geoJson[0].properties.id_category, geoJson[0].properties.category, geoJson, null);
			gsLayerRight = new GSLayerGeoJson(geoJson[0].properties.id_category, geoJson[0].properties.category, geoJson, null);
		}
		else if(tipo == "panoramio"){
			if(panel == 1){
				Split.__mapRight.capaPanoramios = true;
				Split.__mapRight.mostrarPanoramios = true;
			}else if(panel == 2){
				Split.__mapLeft.capaPanoramios = true;
        		Split.__mapLeft.mostrarPanoramios = true;
			}else{
				Split.__mapRight.mostrarPanoramios = true;
				Split.__mapLeft.mostrarPanoramios = true;
				Split.__mapRight.capaPanoramios = true;
				Split.__mapLeft.capaPanoramios = true;
        	}
    	  	Split.__mapLeft.drawPanoramio();
	    	Split.__mapRight.drawPanoramio();
	    	return null;

		}else{
			return null;
		}
		
		if((panel==1 || panel==3) && !this.__mapRight.containLayer(capa != null? capa.id : geoJson[0].properties.id_category ,tipo)){
			this.__mapRight.addLayer(gsLayerRight);
			gsLayerRight.setVisibility(visible,Split.__mapRight.getMap(),null)
			gsLayerRight.layer.setOpacity != null ? gsLayerRight.layer.setOpacity(opacity): "";

		}
		if((panel==2 || panel==3 ) && !this.__mapLeft.containLayer(capa != null? capa.id : geoJson[0].properties.id_category ,tipo)){
			this.__mapLeft.addLayer(gsLayerLeft);
			gsLayerLeft.setVisibility(visible,Split.__mapLeft.getMap(),null)
			gsLayerLeft.layer.setOpacity != null ? gsLayerLeft.layer.setOpacity(opacity):"";
		}

	},
	
	removeLayer: function(title, tipo) {
		this.__mapLeft.removeLayer(title,tipo);
		this.__mapRight.removeLayer(title,tipo);
		
		if(!$("#panel_right .layer_panel").hasClass("close")){
			this.toggleLayersInterface(this.RIGHT);
		}
		if(!$("#panel_left .layer_panel").hasClass("close")){
			this.toggleLayersInterface(this.LEFT);
		}
	},
	
	removeAllLayers: function() {
		
		var layers = this.__mapLeft.layers.slice();
		for(var i=0; i<layers.length; i++){
			this.removeLayer(layers[i].title, layers[i].tipo)
		}
		
		layers = this.__mapRight.layers.slice();
		for(var i=0; i<layers.length; i++){
			this.__mapRight.removeLayer(layers[i].title, layers[i].tipo)
		}
	},
	
	activateFeatureInfo: function(){
		var obj = this;
		var msg = "Cargando"
			
		this.__mapLeft.getMap().on("click",function(e){
			showInfoFancybox("<div id='container_feature_info'>" + msg + "</div>");
			Split.__mapLeft.featureInfo(e);
		});
		
		this.__mapRight.getMap().on("click",function(e){			
			showInfoFancybox("<div id='container_feature_info'>" + msg + "</div>");
			Split.__mapRight.featureInfo(e);
		});
		$("#map_left,#map_right").addClass("cursor_info");
	},
	deActivateFeatureInfo: function(){
		this.__mapLeft.getMap().off("click");
		this.__mapRight.getMap().off("click");
		$("#map_left,#map_right").removeClass("cursor_info");
	},
	
	disableAllDrawTools: function(drawMakerLeft,drawMarkerRight,drawLineLeft,drawLineRight,drawPolygonLeft,drawPolygonRight){
		$("#ctrl_feature_info").removeClass("enable");
		$("#ctrl_marker_drawer").removeClass("enable");
	    $("#ctrl_line_drawer").removeClass("enable");
	    $("#ctrl_rectangle_drawer").removeClass("enable");
	    
	    Split.deActivateFeatureInfo()
	    drawMakerLeft.disable();
	    drawMarkerRight.disable();
	    drawLineLeft.disable();
	    drawLineRight.disable();
	    drawPolygonLeft.disable();
	    drawPolygonRight.disable();
	},
	
	showFancySaveDraw: function(e, type,xClick,yClick){
		$("#fancy_box_save_draw").css({"top":yClick, "left":xClick});
		$("#fancy_box_save_draw").show();
		$("#fancy_box_save_draw").animate({"width": 198},300);
		$($("#fancy_box_save_draw").find("p")[0]).fadeIn(600);
		$($("#fancy_box_save_draw").find("p")[1]).fadeIn(600);
		$($("#fancy_box_save_draw").find("img")).fadeIn(600);
		
		var latlng;
		if(e.layer._latlng){
			latlng = e.layer._latlng;
		}else{
			latlng = e.layer._latlngs
		}
		
		$($("#fancy_box_save_draw").find("p")[0]).off('click');
		$($("#fancy_box_save_draw").find("p")[0]).on('click', function(e) {
			$(".extraLeyenda").find("div[idCapa]").attr("idCapa", "");
			$($("#fancy_box_save_draw").find("p")[1]).trigger("click");
			$(".petaniaInfoCatalogo").show();
			if($(".infoCatalogo").css('right').indexOf("-") == 0){
				$(".petaniaInfoCatalogo").trigger("click");
			}
			
			$(".extraLeyenda").hide();
			$(".cuerpoInfoCatalogo").find(".title1").hide();
			$(".cuerpoInfoCatalogo").find(".title2").hide();
			$(".addHistoryButton").trigger("click", [latlng]);
			$("#addHistoryForm").find(".goBack").hide();
			$("#typeHistory").val(type);

			
			// $.ajax({
		 //        url: 'index.php/draw/getCategories', dataType: "json",
		 //        success: function(response) {
		 //        	$("#fancy_box_form_save_draw").find("select").children().remove();
		 //        	for(var i=0; i<response.length; i++){
			//     		$("#fancy_box_form_save_draw").find("select").append("<option value='" + response[i].id_category + "'>" + response[i].title + "</option>");
			//     	}
		        	
		 //        	$.fancybox($("#fancy_box_form_save_draw").html(), {
			// 			'width':'638',
			// 			"height": "190",
			// 		    'autoDimensions':false,
			// 		    'autoSize':false,
			// 		    "visibility":"hidden",
			// 		    'closeBtn' : false,
			// 		    "openEffect" : "elastic",		   
			// 		    'scrolling'   : 'no',
			// 		    helpers : {
			// 		        overlay : {
			// 		            	css : {
			// 		            		'background' : 'none',
			// 		            		'border-radius' : '0',
			// 		            	}
			// 		        }
			// 		    },
			// 		    afterShow: function () {
			// 		    	$("h2").on("click",function(){
			// 		    		$.fancybox.close();
			// 		    	});
					    	
			// 		    	$(".fancybox-inner").find("input[type='text']").on("click",function(){
			// 		    		$(this).val("");
			// 		    	});
					    	
			// 		    	$("input[type='button']").off('click');
			// 		    	$("input[type='button']").on("click",function(){
					    		
			// 		    		var titulo = $(".fancybox-inner").find("input[type='text']")[0];
			// 			    	var comentario = $(".fancybox-inner").find("input[type='text']")[1];
			// 			    	var categoria = $($(".fancybox-inner").find("select")).val();
			// 			    	var nombreCategoria = $($(".fancybox-inner").find("select option:selected")).text();
			// 		    		var enviar = true;
					    		
			// 		    		if($(titulo).val() == "" || $(titulo).val() == "Título"){
			// 		    			enviar = false;
			// 		    			$(titulo).addClass("errorBorder");
			// 		    		}
			// 		    		if($(comentario).val() == "" || $(comentario).val() == "Comentario"){
			// 		    			enviar = false;
			// 		    			$(comentario).addClass("errorBorder");
			// 		    		}
			// 		    		if(enviar){
			// 		    			$.ajax({
			// 					        url: 'index.php/draw/saveDraw',
			// 					        data: "puntos=" + JSON.stringify(latlng) + "&type=" + type + "&" + "&titulo=" + $(titulo).val() + "&comentario=" + $(comentario).val() + "&categoria=" + categoria,
			// 					        type: "POST",
			// 					        success: function(response) {
			// 					        	$.fancybox.close();
			// 					        	$($("#fancy_box_save_draw").find("p")[1]).trigger( "click" );
								        	
			// 					        	$.each(Split.__mapLeft.getMap()._layers, function(key){
			// 					        	    if((Split.__mapLeft.getMap()._layers[key]._latlng && compareLayersCoordinates(Split.__mapLeft.getMap()._layers[key]._latlng, latlng)) || (Split.__mapLeft.getMap()._layers[key]._latlngs && compareLayersCoordinates(Split.__mapLeft.getMap()._layers[key]._latlngs, latlng))){
			// 					        	    	Split.__mapLeft.getMap().removeLayer(Split.__mapLeft.getMap()._layers[key]);
			// 					        	    	return true;
			// 					        	    }
			// 					        	});
								        	
			// 					        	$.each(Split.__mapRight.getMap()._layers, function(key){
			// 					        	    if((Split.__mapRight.getMap()._layers[key]._latlng && compareLayersCoordinates(Split.__mapRight.getMap()._layers[key]._latlng, latlng)) || (Split.__mapRight.getMap()._layers[key]._latlngs && compareLayersCoordinates(Split.__mapRight.getMap()._layers[key]._latlngs, latlng))){
			// 					        	    	Split.__mapRight.getMap().removeLayer(Split.__mapRight.getMap()._layers[key]);
			// 					        	    	return true;
			// 					        	    }
			// 					        	});
								        	
			// 					        	$.ajax({
			// 			        		        url: 'index.php/draw/getDraws/' + categoria, 
			// 			        		        dataType: "json",
			// 			        		        success: function(response) {
			// 			        		        	for(var i=0; i<Split.__mapLeft.layers.length; i++){
			// 			        		        		if(Split.__mapLeft.layers[i].title == nombreCategoria){
			// 			        		        			Split.__mapLeft.removeLayer(Split.__mapLeft.layers[i].title, "geoJson");
			// 			        		        		}
			// 			        		        	}
			// 			        		        	for(var i=0; i<Split.__mapRight.layers.length; i++){
			// 			        		        		if(Split.__mapRight.layers[i].title == nombreCategoria){
			// 			        		        			Split.__mapRight.removeLayer(Split.__mapRight.layers[i].title, "geoJson");
			// 			        		        		}
			// 			        		        	}
			// 			        		        	Split.addLayer(null,"vectorial", null, response,3);  
			// 			        		        }
			// 			        			});
								        	
			// 					        }
			// 			    		});
			// 		    		}
			// 		    	});
			// 		    }
			// 		});
		 //        }
		 //    });

		});
		
		$($("#fancy_box_save_draw").find("p")[1]).off("click");
		$($("#fancy_box_save_draw").find("p")[1]).on('click', function(e) {
			$($("#fancy_box_save_draw").find("p")[0]).fadeOut(200);
			$($("#fancy_box_save_draw").find("p")[1]).fadeOut(200);
			$($("#fancy_box_save_draw").find("img")).fadeOut(200);
			$("#fancy_box_save_draw").animate({"width": 0},300);
			$("#fancy_box_save_draw").hide(400);
		});
		
		var layer = e.layer;
		$($("#fancy_box_save_draw").find("img")).off('click');
		$($("#fancy_box_save_draw").find("img")).on('click', function(e) {
			Split.__mapLeft.getMap().removeLayer(layer);
			Split.__mapRight.getMap().removeLayer(layer);
			$($("#fancy_box_save_draw").find("p")[0]).fadeOut(200);
			$($("#fancy_box_save_draw").find("p")[1]).fadeOut(200);
			$($("#fancy_box_save_draw").find("img")).fadeOut(200);
			$("#fancy_box_save_draw").animate({"width": 0},300);
			$("#fancy_box_save_draw").hide(400);

			if($(".infoCatalogo").css('right').indexOf("-") != 0 && $("#addHistoryForm").is(":visible")){
				$(".petaniaInfoCatalogo").trigger("click");
				$(".petaniaInfoCatalogo").hide();
			}
		});
	},
	
	
	showFancyDontSaveDraw: function(e,xClick,yClick){
		$("#fancy_box_dont_save_draw").css({"top":yClick, "left":xClick});
		$("#fancy_box_dont_save_draw").show();
		$("#fancy_box_dont_save_draw").animate({"width": 52},300);
		$($("#fancy_box_dont_save_draw").find("p")[0]).fadeIn(600);
		$($("#fancy_box_dont_save_draw").find("p")[1]).fadeIn(600);
		$($("#fancy_box_dont_save_draw").find("img")).fadeIn(600);
	
		
		$($("#fancy_box_dont_save_draw").find("p")).off("click");
		$($("#fancy_box_dont_save_draw").find("p")).on('click', function(e) {
			$($("#fancy_box_dont_save_draw").find("p")[0]).fadeOut(200);
			$($("#fancy_box_dont_save_draw").find("p")[1]).fadeOut(200);
			$($("#fancy_box_dont_save_draw").find("img")).fadeOut(200);
			$("#fancy_box_dont_save_draw").animate({"width": 0},300);
			$("#fancy_box_dont_save_draw").hide(400);
		});
		
		var layer = e.layer;
		$($("#fancy_box_dont_save_draw").find("img")).off('click');
		$($("#fancy_box_dont_save_draw").find("img")).on('click', function(e) {
			Split.__mapLeft.getMap().removeLayer(layer);
			Split.__mapRight.getMap().removeLayer(layer);
			$($("#fancy_box_dont_save_draw").find("p")[0]).fadeOut(200);
			$($("#fancy_box_dont_save_draw").find("p")[1]).fadeOut(200);
			$($("#fancy_box_dont_save_draw").find("img")).fadeOut(200);
			$("#fancy_box_dont_save_draw").animate({"width": 0},300);
			$("#fancy_box_dont_save_draw").hide(400);
		});
	}
	
}
