Split = {
	layers: null,	
	iniLatLeft: 37.36455,
	iniLngLeft: -4.57645,	
	iniZoomLeft: 7,
	iniLatRight: 37.36455,
	iniLngRight: -4.57645,	
	iniZoomRight: 7,
	__mapLeft:null,
	__mapRight: null,
	__currentMasterMap: null,
	__mapIsMoving: false,
	LEFT: 0,
	RIGHT: 1,
	syncEnable : true,
	
	drawMakerLeft:null,
	drawMarkerRight:null,
	drawLineLeft:null,
	drawLineRight:null,
	drawPolygonLeft:null,
	drawPolygonRight:null,
	type:null,
	arrayLatlng:null,
	
	initialize: function(){
		
		//create the left map's leaflet instance
		var mapLeft = new L.Map('map_left', {
			  center: new L.LatLng(this.iniLatLeft, this.iniLngLeft),
			  zoom: this.iniZoomLeft,
			  fadeAnimation: false,
			//  crs: L.CRS.EPSG4326,
			  zoomControl: false,
			  attributionControl: false,
			  maxZoom:20
		});
		
		// add zoom control to map left
		var zoomControl = new L.Control.Zoom({
			position : 'bottomleft'
		});		
		zoomControl.addTo(mapLeft);

		L.control.scale({position:"bottomleft", "imperial":false}).addTo(mapLeft);

		var zoomDisplay = new L.Control.ZoomDisplay({
			position : 'bottomleft'
		});
        mapLeft.addControl(zoomDisplay);
		
		//let's create the GroupLayer object with the instance of mapLeft		
		var opts = {
				map: mapLeft,
				father:this.LEFT
		}		
		this.__mapLeft = new GroupLayer(opts);	
		
		mapLeft.on('moveend', function(e) {
		    Split.__mapLeft.refreshLayers();
		});
		
		// create the right map's leaflet instance
		var mapRight = new L.Map('map_right', {
			  center: new L.LatLng(this.iniLatRight, this.iniLngRight),
			  zoom: this.iniZoomRight,			  
			  fadeAnimation: false,
			  //crs: L.CRS.EPSG4326,
			  zoomControl: false,
			  attributionControl: false,
			  maxZoom:20
		});
		
		
		// add zoom control to left map
		zoomControl = new L.Control.Zoom({
			position : 'bottomright'
		});
		zoomControl.addTo(mapRight);

		zoomDisplay = new L.Control.ZoomDisplay({
			position : 'bottomright'
		});
        mapRight.addControl(zoomDisplay);

		L.control.scale({position:"bottomright", "imperial":false}).addTo(mapRight);	
		
		//let's create the GroupLayer object with the instance of mapRightt
		opts = {
				map: mapRight,
				father:this.RIGHT,
		}
		this.__mapRight = new GroupLayer(opts);
		
		mapRight.on('moveend', function(e) {
		    Split.__mapRight.refreshLayers();
		});
		
		if(Split.iniZoomLeft == Split.iniZoomRight){
			Split.__mapLeft.getMap().sync(Split.__mapRight.getMap());
			Split.__mapRight.getMap().sync(Split.__mapLeft.getMap());
		}else{
			$("#panel_left img.sync").attr("src","application/views/img/MED_icon_enlazar_KO_left.png");
			$("#panel_right img.sync").attr("src","application/views/img/MED_icon_enlazar_KO_right.png");
		}

		this.__mapRight.getMap().on('zoomanim', debounce(Split.__mapRight.getMap()._onZoomTransitionEnd, 250,false));
		this.__mapLeft.getMap().on('zoomanim', debounce(Split.__mapLeft.getMap()._onZoomTransitionEnd, 250,false));

		this.__currentMasterMap = this.__mapLeft;
		
		var self = this;
				
		drawCategories();
		categoryPanelEvents();
		infoPanelEvents();
		createDrawLocal();
		sectionEvent();

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
		    },
		    edit: {
		        featureGroup: editableLayers,
		    }
		};
		
		var optionsRight = options;
		optionsRight.edit.featureGroup = editableLayersRight;

		var drawControl = new L.Control.Draw(options);
		Split.__mapLeft.getMap().addControl(drawControl);
		
		var drawControlRight = new L.Control.Draw(optionsRight);
		Split.__mapRight.getMap().addControl(drawControlRight);
		
		Split.drawMakerLeft = new L.Draw.Marker(Split.__mapLeft.getMap());
		Split.drawMarkerRight = new L.Draw.Marker(Split.__mapRight.getMap());
		Split.drawLineLeft = new L.Draw.Polyline(Split.__mapLeft.getMap(), options.draw.polyline);
		Split.drawLineRight = new L.Draw.Polyline(Split.__mapRight.getMap(), optionsRight.draw.polyline);
		Split.drawPolygonLeft = new L.Draw.Polygon(Split.__mapLeft.getMap(), options.draw.polygon);
		Split.drawPolygonRight = new L.Draw.Polygon(Split.__mapRight.getMap(), optionsRight.draw.polygon);
		
		
		var editLeft = new L.EditToolbar.Edit(Split.__mapLeft.getMap(), {
            featureGroup: drawControl.options.edit.featureGroup,
            selectedPathOptions: drawControl.options.edit.selectedPathOptions
        });
		
		var  latlng ;
		var polyline;
		var poligono;
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
					if(Split.type == "linea"){
						polyline._latlngs[polyline._latlngs.length-1] = e.latlng;
						polyline.addTo(Split.__mapRight.getMap());
					}
				});
				if(Split.type =="poligono"){
					if(poligono){
						Split.__mapRight.getMap().removeLayer(poligono);
					}
					if(Split.arrayLatlng.length == 0){
						Split.arrayLatlng.push(latlng);
					}
					Split.arrayLatlng.push(e.latlng);
					poligono = L.polygon(Split.arrayLatlng, options.draw.polygon.shapeOptions).addTo(Split.__mapRight.getMap());
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
					if(Split.type == "linea"){
						polyline._latlngs[polyline._latlngs.length-1] = e.latlng;
						polyline.addTo(Split.__mapLeft	.getMap());
					}
				});
				if(Split.type =="poligono"){
					if(poligono){
						Split.__mapLeft.getMap().removeLayer(poligono);
					}
					if(Split.arrayLatlng.length == 0){
						Split.arrayLatlng.push(latlng);
					}
					Split.arrayLatlng.push(e.latlng);
					poligono = L.polygon(Split.arrayLatlng, optionsRight.draw.polygon.shapeOptions).addTo(Split.__mapLeft.getMap());
				}
			});
		});
		
		
		Split.__mapLeft.getMap().on('draw:created', function (e) {
			var aux = new Object();
			
		    if (Split.type == 'marker') {
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
			    	if(isLoged && ($("#usuariosCatalogo .noCategories").length == 0)){
				    	Split.showFancySaveDraw(aux, Split.type, e.originalEvent.clientX,e.originalEvent.clientY);
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
		    Split.disableAllDrawTools();
		    
		    
		    if(isLoged && ($("#usuariosCatalogo .noCategories").length == 0)){
		    	Split.showFancySaveDraw(e, Split.type, xClick,yClick);
		    	
		    }else{
		    	Split.showFancyDontSaveDraw(e,xClick,yClick);
		    }
		    
		    e.layer.off('click');
		    e.layer.on('click', function (event) {
		    	if(isLoged && ($("#usuariosCatalogo .noCategories").length == 0)){
			    	Split.showFancySaveDraw(e, Split.type, event.originalEvent.clientX,event.originalEvent.clientY);
			    }else{
			    	Split.showFancyDontSaveDraw(e,event.originalEvent.clientX,event.originalEvent.clientY);
			    }
			});
		    
		    
		    if(Split.type == "linea"){
		    	polyline._latlngs.pop();
			    polyline.redraw();
		    	polyline.off('click');
			    aux.layer = polyline;
			    polyline.on('click', function (e) {
			    	if(isLoged && ($("#usuariosCatalogo .noCategories").length == 0)){
				    	Split.showFancySaveDraw(aux, Split.type, e.originalEvent.clientX,e.originalEvent.clientY);
				    }else{
				    	Split.showFancyDontSaveDraw(aux,e.originalEvent.clientX,e.originalEvent.clientY);
				    }
				});
		    }else if(Split.type =="poligono"){
		    	poligono._latlngs = e.layer._latlngs;
		    	poligono.redraw();
		    	poligono.off('click');
		    	aux.layer = poligono;
		    	poligono.on('click', function (e) {
			    	if(isLoged && ($("#usuariosCatalogo .noCategories").length == 0)){
				    	Split.showFancySaveDraw(aux, Split.type, e.originalEvent.clientX,e.originalEvent.clientY);
				    }else{
				    	Split.showFancyDontSaveDraw(aux,e.originalEvent.clientX,e.originalEvent.clientY);
				    }
				});
		    }
		    
		    
		    
		});
		
		Split.__mapRight.getMap().on('draw:created', function (e) {
			var aux = new Object();
			
		    if (Split.type == 'marker') {
		    	xClick= Split.__mapRight.getMap().latLngToLayerPoint(e.layer.getLatLng()).x+$("#map_left").outerWidth(); 
		    	yClick= Split.__mapRight.getMap().latLngToLayerPoint(e.layer.getLatLng()).y+20;
		    	var markerAux = L.marker(e.layer._latlng).addTo(Split.__mapLeft.getMap());
		    	markerAux.off('click');
		    	aux.layer = markerAux;
		    	markerAux.on('click', function (e) {
			    	if(isLoged && ($("#usuariosCatalogo .noCategories").length == 0)){
				    	Split.showFancySaveDraw(aux, Split.type, e.originalEvent.clientX,e.originalEvent.clientY);
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
		    Split.disableAllDrawTools();
		  
		    if(isLoged && ($("#usuariosCatalogo .noCategories").length == 0)){
		    	Split.showFancySaveDraw(e, Split.type, xClick,yClick);
		    	
		    }else{
		    	Split.showFancyDontSaveDraw(e,xClick,yClick);
		    }
		    
		    e.layer.off('click');
		    e.layer.on('click', function (event) {
		    	if(isLoged && ($("#usuariosCatalogo .noCategories").length == 0)){
			    	Split.showFancySaveDraw(e, Split.type, event.originalEvent.clientX,event.originalEvent.clientY);
			    }else{
			    	Split.showFancyDontSaveDraw(e,event.originalEvent.clientX,event.originalEvent.clientY);
			    }
			});
		    
		    if(Split.type == "linea"){
		    	polyline._latlngs.pop();
			    polyline.redraw();
		    	polyline.off('click');
			    aux.layer = polyline;
			    polyline.on('click', function (e) {
			    	if(isLoged && ($("#usuariosCatalogo .noCategories").length == 0)){
				    	Split.showFancySaveDraw(aux, Split.type, e.originalEvent.clientX,e.originalEvent.clientY);
				    }else{
				    	Split.showFancyDontSaveDraw(aux,e.originalEvent.clientX,e.originalEvent.clientY);
				    }
				});
		    }else if(Split.type =="poligono"){
		    	poligono._latlngs = e.layer._latlngs;
		    	poligono.redraw();
		    	poligono.off('click');
		    	aux.layer = poligono;
		    	poligono.on('click', function (e) {
			    	if(isLoged && ($("#usuariosCatalogo .noCategories").length == 0)){
				    	Split.showFancySaveDraw(aux, Split.type,e.originalEvent.clientX,e.originalEvent.clientY);
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
				$("#capaLeft").css("border-top","2px solid #888");
				
				$panel.hide();
				$panel.slideDown(400);
				$panel.removeClass("close");
				this.__mapLeft.refreshLayerPanel($panel);
				$("#panel_left .layer_ctrl").addClass("open");
			}
			else{
				
				$("#capaLeft").animate({"width":'40px'});
				$("#capaLeft").css("border-top","1px solid #888");
				
				$panel.addClass("close");
				$panel.children().remove();
				$("#panel_left .layer_ctrl").removeClass("open");
			}
		}
		else if (el==this.RIGHT){
			var $panel = $("#panel_right .layer_panel");
			
			if ($panel.hasClass("close")){
				
				$("#capaRight").animate({"width":'319px'});
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
				$("#capaRight").css("border-top","1px solid #888");
				
				$panel.addClass("close");
				$panel.children().remove();
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

		if(visible == undefined){
			visible = true;
		}

		if(opacity == undefined){
			opacity = 1;
		}
		
		if(tipo == "wms"){
			gsLayerLeft = new GSLayerWMS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda, capa.alternativeTitle, capa.description);
			gsLayerRight = new GSLayerWMS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda, capa.alternativeTitle, capa.description);
			if(capa.wms.hasOwnProperty("simple_tile") && capa.wms.simple_tile){
				gsLayerLeft.simpleLayer = true;
				gsLayerRight.simpleLayer = true;
			}
			
		}else if(tipo == "wmts"){
			gsLayerLeft = new GSLayerWMTS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda, capa.alternativeTitle, capa.description);
			gsLayerRight = new GSLayerWMTS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda, capa.alternativeTitle, capa.description);
		
		}else if(tipo == "tms"){
			gsLayerLeft = new GSLayerTMS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda, capa.tms.google, capa.alternativeTitle, capa.description);
			gsLayerRight = new GSLayerTMS(capa.id,capa.title, capa[tipo].server, capa[tipo].name, leyenda, capa.tms.google, capa.alternativeTitle, capa.description);
		
		}else if(tipo == "simbolo"){
			
			gsLayerLeft = new GSLayerSimbolo(capa.id, capa.title, capa.simbolo.umbral, capa.simbolo.colorUmbralPositivo, capa.simbolo.colorUmbralNegativo, capa.simbolo.radioMin, capa.simbolo.radioMax, [43,41,39,37,35,33,31,29,27,25,23,21,19,17,15,13,11,9,7,5,3,1], capa.alternativeTitle);
			gsLayerRight = new GSLayerSimbolo(capa.id, capa.title, capa.simbolo.umbral, capa.simbolo.colorUmbralPositivo, capa.simbolo.colorUmbralNegativo, capa.simbolo.radioMin, capa.simbolo.radioMax, [43,41,39,37,35,33,31,29,27,25,23,21,19,17,15,13,11,9,7,5,3,1], capa.alternativeTitle);
		}
		
		else if(geoJson && geoJson.length > 0){
			
			gsLayerLeft = new GSLayerGeoJson(geoJson[0].properties.id_category, geoJson[0].properties.category, geoJson, null);
			gsLayerRight = new GSLayerGeoJson(geoJson[0].properties.id_category, geoJson[0].properties.category, geoJson, null);
		}
		else if(tipo == "panoramio"){
			if(panel == 1){
				Split.__mapRight.capaPanoramios = true;
				Split.__mapRight.mostrarPanoramios = true;
				this.__mapRight.refreshLayerPanel($("#panel_right .layer_panel"));
			}else if(panel == 2){
				Split.__mapLeft.capaPanoramios = true;
        		Split.__mapLeft.mostrarPanoramios = true;
        		this.__mapLeft.refreshLayerPanel($("#panel_left .layer_panel"));
			}else{
				Split.__mapRight.mostrarPanoramios = true;
				Split.__mapLeft.mostrarPanoramios = true;
				Split.__mapRight.capaPanoramios = true;
				Split.__mapLeft.capaPanoramios = true;
				this.__mapRight.refreshLayerPanel($("#panel_right .layer_panel"));
				this.__mapLeft.refreshLayerPanel($("#panel_left .layer_panel"));
        	}
    	  	Split.__mapLeft.drawPanoramio();
	    	Split.__mapRight.drawPanoramio();
	    	return null;

		}else{
			return null;
		}
		
		if((panel==1 || panel==3) && !this.__mapRight.containLayer(capa != null? capa.id : geoJson[0].properties.id_category ,tipo, capa != null ? capa.alternativeTitle:null)){
			this.__mapRight.addLayer(gsLayerRight);
			gsLayerRight.setVisibility(visible,Split.__mapRight.getMap(),null);
			(gsLayerRight.layer != null && gsLayerRight.layer.setOpacity != null) ? gsLayerRight.layer.setOpacity(opacity): "";

		}
		if((panel==2 || panel==3 ) && !this.__mapLeft.containLayer(capa != null ? capa.id : geoJson[0].properties.id_category ,tipo, capa != null ? capa.alternativeTitle:null)){
			this.__mapLeft.addLayer(gsLayerLeft);
			gsLayerLeft.setVisibility(visible,Split.__mapLeft.getMap(),null);
			(gsLayerLeft.layer != null && gsLayerLeft.layer.setOpacity != null) ? gsLayerLeft.layer.setOpacity(opacity):"";
		}

		if(!$("#panel_right .layer_panel").hasClass("close")){
			this.__mapRight.refreshLayerPanel($("#panel_right .layer_panel"));
		}
		if(!$("#panel_left .layer_panel").hasClass("close")){
			this.__mapLeft.refreshLayerPanel($("#panel_left .layer_panel"));
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
	
	disableAllDrawTools: function(){
		$("#ctrl_feature_info").removeClass("enable");
		$("#ctrl_marker_drawer").removeClass("enable");
	    $("#ctrl_line_drawer").removeClass("enable");
	    $("#ctrl_rectangle_drawer").removeClass("enable");
	    
	    Split.deActivateFeatureInfo()
	    Split.drawMakerLeft.disable();
	    Split.drawMarkerRight.disable();
	    Split.drawLineLeft.disable();
	    Split.drawLineRight.disable();
	    Split.drawPolygonLeft.disable();
	    Split.drawPolygonRight.disable();
	},
	
	showFancySaveDraw: function(e, type,xClick,yClick){
		$("#fancy_box_save_draw").css({"top":yClick, "left":xClick});
		$("#fancy_box_save_draw").show();
		$("#fancy_box_save_draw").animate({"width": 294},300);
		$($("#fancy_box_save_draw").find(".fancySave")).fadeIn(600);
		$($("#fancy_box_save_draw").find(".fancyKml")).fadeIn(600);
		$($("#fancy_box_save_draw").find(".fancyCancel")).fadeIn(600);
		$($("#fancy_box_save_draw").find("img")).fadeIn(600);
		
		var latlng;
		if(e.layer._latlng){
			latlng = e.layer._latlng;
		}else{
			latlng = e.layer._latlngs
		}

		var type = e.layerType
		
		$($("#fancy_box_save_draw").find(".fancySave")).off('click');
		$($("#fancy_box_save_draw").find(".fancySave")).on('click', function(e) {
			$(".extraLeyenda").find("div[idCapa]").attr("idCapa", "");
			$($("#fancy_box_save_draw").find(".fancyCancel")).trigger("click");
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
		});
		

		$($("#fancy_box_save_draw").find(".fancyKml")).off("click");
		$($("#fancy_box_save_draw").find(".fancyKml")).on('click', function(e) {
			$($("#fancy_box_save_draw").find(".fancyCancel")).trigger("click");
			downloadKml(type,latlng);
		});

		$($("#fancy_box_save_draw").find(".fancyCancel")).off("click");
		$($("#fancy_box_save_draw").find(".fancyCancel")).on('click', function(e) {
			$($("#fancy_box_save_draw").find(".fancySave")).fadeOut(200);
			$($("#fancy_box_save_draw").find(".fancyCancel")).fadeOut(200);
			$($("#fancy_box_save_draw").find("img")).fadeOut(200);
			$("#fancy_box_save_draw").animate({"width": 0},300);
			$("#fancy_box_save_draw").hide(400);
		});
		
		var layer = e.layer;
		$($("#fancy_box_save_draw").find("img")).off('click');
		$($("#fancy_box_save_draw").find("img")).on('click', function(e) {
			Split.__mapLeft.getMap().removeLayer(layer);
			Split.__mapRight.getMap().removeLayer(layer);
			$($("#fancy_box_save_draw").find(".fancySave")).fadeOut(200);
			$($("#fancy_box_save_draw").find(".fancyCancel")).fadeOut(200);
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
		$("#fancy_box_dont_save_draw").animate({"width": 148},300);
		$($("#fancy_box_dont_save_draw").find(".fancyOk")).fadeIn(600);
		$($("#fancy_box_dont_save_draw").find(".fancyKml")).fadeIn(600);
		// $($("#fancy_box_dont_save_draw").find("p")[1]).fadeIn(600);
		$($("#fancy_box_dont_save_draw").find("img")).fadeIn(600);
	
		
		$($("#fancy_box_dont_save_draw").find(".fancyOk")).off("click");
		$($("#fancy_box_dont_save_draw").find(".fancyOk")).on('click', function(e) {
			$($("#fancy_box_dont_save_draw").find(".fancyOk")).fadeOut(200);
			// $($("#fancy_box_dont_save_draw").find("p")[1]).fadeOut(200);
			$($("#fancy_box_dont_save_draw").find("img")).fadeOut(200);
			$("#fancy_box_dont_save_draw").animate({"width": 0},300);
			$("#fancy_box_dont_save_draw").hide(400);
		});
		
		var layer = e.layer;

		var latlng;
		if(e.layer._latlng){
			latlng = e.layer._latlng;
		}else{
			latlng = e.layer._latlngs
		}

		var type = e.layerType

		$($("#fancy_box_dont_save_draw").find(".fancyKml")).off("click");
		$($("#fancy_box_dont_save_draw").find(".fancyKml")).on('click', function(e) {
			$($("#fancy_box_dont_save_draw").find(".fancyOk")).trigger("click");
			downloadKml(type,latlng);
		});
		

		$($("#fancy_box_dont_save_draw").find("img")).off('click');
		$($("#fancy_box_dont_save_draw").find("img")).on('click', function(e) {
			Split.__mapLeft.getMap().removeLayer(layer);
			Split.__mapRight.getMap().removeLayer(layer);
			$($("#fancy_box_dont_save_draw").find(".fancyOk")).fadeOut(200);
			// $($("#fancy_box_dont_save_draw").find("p")[1]).fadeOut(200);
			$($("#fancy_box_dont_save_draw").find("img")).fadeOut(200);
			$("#fancy_box_dont_save_draw").animate({"width": 0},300);
			$("#fancy_box_dont_save_draw").hide(400);
		});
	},
}
