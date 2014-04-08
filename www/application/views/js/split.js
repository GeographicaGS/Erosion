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
			  attributionControl: false
		});
		
		
		
		
		// add zoom control to map left
		var zoomControl = new L.Control.Zoom({
			position : 'bottomleft'
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
			  attributionControl: false
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
		
		/* Splits event controls */
		this.__mapLeft.getMap().on("drag", function() {			
			Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
		});

		this.__mapRight.getMap().on("drag", function() {
			Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
		});

		this.__mapLeft.getMap().on("zoomend", function() {
			Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
		});

		this.__mapRight.getMap().on("zoomend", function() {
			Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
		});
		
		this.__currentMasterMap = this.__mapLeft;
		
		this.__mapLeft.getMap().locate({setView: false, maxZoom: 7});
		this.__mapLeft.getMap().on('locationfound', onLocationFound);
		this.__mapRight.getMap().locate({setView: false, maxZoom: 7});
		this.__mapRight.getMap().on('locationfound', onLocationFound);
		
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
		
		var  latlng ;
		var polyline;
		var poligono;
		var type;
		var arrayLatlng;
			
		
		Split.__mapLeft.getMap().on('draw:drawstart', function (e) {
			
			$("#fancy_box_save_draw").fadeOut();
			$("#fancy_box_save_draw").width(0)
			$($("#fancy_box_save_draw").find("p")[0]).hide();
			$($("#fancy_box_save_draw").find("p")[1]).hide();
			
			Split.__mapLeft.getMap().on('click', function(e) {
				latlng = e.latlng;
				polyline = null;
				Split.__mapLeft.getMap().on('mousemove', function(e) {
					if(polyline){
						Split.__mapRight.getMap().removeLayer(polyline);
					}
					if(type == "linea"){
						polyline = L.polyline([latlng,e.latlng], options.draw.polyline.shapeOptions).addTo(Split.__mapRight.getMap());
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
			
			Split.__mapRight.getMap().on('click', function(e) {
				latlng = e.latlng;
				polyline = null;
				Split.__mapRight.getMap().on('mousemove', function(e) {
					if(polyline){
						Split.__mapLeft.getMap().removeLayer(polyline);
					}
					if(type == "linea"){
						polyline = L.polyline([latlng,e.latlng], optionsRight.draw.polyline.shapeOptions).addTo(Split.__mapLeft.getMap());
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

		    if (type == 'marker') {
		    	L.marker(e.layer._latlng).addTo(Split.__mapRight.getMap());
		    }		    
		    editableLayers.addLayer(e.layer);
		    Split.__mapLeft.getMap().off("click");
		    Split.__mapLeft.getMap().off("mousemove");
		    Split.disableAllDrawTools(drawMakerLeft,drawMarkerRight,drawLineLeft,drawLineRight,drawPolygonLeft,drawPolygonRight);
		    Split.showFancySaveDraw(e, type);
		});
		
		Split.__mapRight.getMap().on('draw:created', function (e) {

		    if (type == 'marker') {
		    	L.marker(e.layer._latlng).addTo(Split.__mapLeft.getMap());
		    }		    
		    editableLayersRight.addLayer(e.layer);
		    Split.__mapRight.getMap().off("click");
		    Split.__mapRight.getMap().off("mousemove");
		    Split.disableAllDrawTools(drawMakerLeft,drawMarkerRight,drawLineLeft,drawLineRight,drawPolygonLeft,drawPolygonRight);
		    Split.showFancySaveDraw(e, type);
		});

		Split.__mapLeft.getMap().on('draw:edited', function () {
		    // Update db to save latest changes.
		});

		Split.__mapLeft.getMap().on('draw:deleted', function () {
		    // Update db to save latest changes.
		});
		
		
		
		$("#ctrl_feature_info").click(function(){
			
			Split.disableAllDrawTools(drawMakerLeft,drawMarkerRight,drawLineLeft,drawLineRight,drawPolygonLeft,drawPolygonRight);
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				Split.deActivateFeatureInfo()
			}
			else{
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
		
		
		
		$(".acceder").click(function(){
			if($(".loginDiv").is(":visible")){
				$(".loginDiv").fadeOut();
				$($(".loginDiv").find("input[type='text']")).val("Correo electrónico");
				$($(".loginDiv").find("input[type='text']")).removeClass("errorBorder");
				$($(".loginDiv").find("input[type='password']")).val("Contraseña");
				$($(".loginDiv").find("input[type='password']")).removeClass("errorBorder");
				$("#errorLogin").hide();
			}else{
				$(".loginDiv").fadeIn();
				$(".loginDiv").find("input[type='text'],input[type='password']").bind( "click", function(){
					$(this).val("");
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
					        	}else{
					        		$(".acceder").hide();
					        		$("#closeSesion").show();
					        		$(".loginDiv").fadeOut();
					        	}
					        }
					    });
					}
				});
				
			}
		});
		
		$("#closeSesion").bind( "click", function(){
			$("#closeSesion").hide();
			$(".acceder").show();
		});
		
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

		b.panTo(a.getCenter());
		
		if (newZoom !== otherZoom){
		    b.setZoom(newZoom);
		}
	
		Split.__mapIsMoving = false;
	},
	/* Toogle an Split panel*/
	togglePanel:function (el){
		var totalWidth = Math.floor(($(window).width()-2) /2);
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
		var rurl = Split.syncEnabletoggleLayer ? "MED_icon_enlazar_OK_right.png" : "MED_icon_enlazar_KO_right.png";
		$("#panel_left img.sync").attr("src","img/"+lurl);
		$("#panel_right img.sync").attr("src","img/"+rurl);
		
		if (Split.syncEnable){
			$("img.sync").attr("title","Desynchronize maps");
			if (Split.__currentMasterMap == Split.__mapLeft){
				Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
			}
			else{
				Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
			}
		}
		else{
			$("img.sync").attr("title","Synchronize maps");
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
				$("#capaLeft").css("border-top-left-radius","0px");
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
				$("#capaLeft").css("border-top-left-radius","5px");
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
				$("#capaRight").css("border-top-left-radius","0px");
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
				$("#capaRight").css("border-top-left-radius","5px");
				$("#capaRight").css("border-top","1px solid #888");
				
				$panel.addClass("close");
				$panel.html("");
				$("#panel_right .layer_ctrl").removeClass("open");
			}
		}
		
		
		
		$panel.find(".toogleLayer").click(function(){
			Split.toggleLayer($(this).attr("id_layer"),$(this).attr("father"));
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
			Split.toggleLayer($(this).attr("id_layer"),$(this).attr("father"));

		})
		
	},
	/* Toogle a layer of one map */
	toggleLayer: function(id_layer,el){
		if (el==this.LEFT){
			this.__mapLeft.toogleLayer(id_layer);			
		}
		else if (el==this.RIGHT){
			this.__mapRight.toogleLayer(id_layer);			
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
	
	
	
	addLayer: function(capa, tipo, leyenda) {
		var gsLayerLeft;
		var gsLayerRight;
		
		if(tipo == "wms"){
			gsLayerLeft = new GSLayerWMS(capa.title, capa[tipo].server, capa[tipo].name, leyenda);
			gsLayerRight = new GSLayerWMS(capa.title, capa[tipo].server, capa[tipo].name, leyenda);
			
		}else if(tipo == "wmts"){
			gsLayerLeft = new GSLayerWMTS(capa.title, capa[tipo].server, capa[tipo].name, leyenda);
			gsLayerRight = new GSLayerWMTS(capa.title, capa[tipo].server, capa[tipo].name, leyenda);
		
		}else if(tipo == "tms"){
			gsLayerLeft = new GSLayerTMS(capa.title, capa[tipo].server, capa[tipo].name, leyenda);
			gsLayerRight = new GSLayerTMS(capa.title, capa[tipo].server, capa[tipo].name, leyenda);
		}
		else{
//			$.ajax({
//		        url: 'index.php/draw/getDraws/' + capa.id, 
//		        dataType: "json",
//		        success: function(response) {
//		        	
//		        }
//			});
			return null;
		}
		
		this.__mapLeft.addLayer(gsLayerLeft);
		this.__mapRight.addLayer(gsLayerRight);
		
		if(!$("#panel_right .layer_panel").hasClass("close")){
			this.toggleLayersInterface(this.RIGHT);
		}
		if(!$("#panel_left .layer_panel").hasClass("close")){
			this.toggleLayersInterface(this.LEFT);
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
		$("#ctrl_marker_drawer").removeClass("enable");
	    $("#ctrl_line_drawer").removeClass("enable");
	    $("#ctrl_rectangle_drawer").removeClass("enable");
	    
	    drawMakerLeft.disable();
	    drawMarkerRight.disable();
	    drawLineLeft.disable();
	    drawLineRight.disable();
	    drawPolygonLeft.disable();
	    drawPolygonRight.disable();
	},
	
	showFancySaveDraw: function(e, type){
		$("#fancy_box_save_draw").css({"top":event.y, "left":event.x});
		$("#fancy_box_save_draw").show();
		$("#fancy_box_save_draw").animate({"width": 150},300);
		$($("#fancy_box_save_draw").find("p")[0]).fadeIn(600);
		$($("#fancy_box_save_draw").find("p")[1]).fadeIn(600);
		
		var latlng;
		if(type == "marker"){
			latlng = e.layer._latlng;
		}else{
			latlng = e.layer._latlngs
		}
		
		
		$($("#fancy_box_save_draw").find("p")[0]).on('click', function(e) {
			$.ajax({
		        url: 'index.php/draw/getCategories', dataType: "json",
		        success: function(response) {
		        	for(var i=0; i<response.length; i++){
			    		$("#fancy_box_form_save_draw").find("select").append("<option value='" + response[i].id_category + "'>" + response[i].title + "</option>");
			    	}
		        	
		        	$.fancybox($("#fancy_box_form_save_draw").html(), {
						'width':'638',
						"height": "190",
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
					    	
					    	var titulo = $(".fancybox-inner").find("input[type='text']")[0];
					    	var comentario = $(".fancybox-inner").find("input[type='text']")[1];
					    	var categoria = $($(".fancybox-inner").find("select")).val();
					    	
					    	
					    	$("h2").on("click",function(){
					    		$.fancybox.close();
					    	});
					    	
					    	$(".fancybox-inner").find("input[type='text']").on("click",function(){
					    		$(this).val("");
					    	});
					    	
					    	$("input[type='button']").on("click",function(){
					    		var enviar = true;
					    		
					    		if($(titulo).val() == "" || $(titulo).val() == "Título"){
					    			enviar = false;
					    			$(titulo).addClass("errorBorder");
					    		}
					    		if($(comentario).val() == "" || $(comentario).val() == "Comentario"){
					    			enviar = false;
					    			$(comentario).addClass("errorBorder");
					    		}
					    		if(enviar){
					    			$.ajax({
								        url: 'index.php/draw/saveDraw',
								        data: "puntos=" + JSON.stringify(latlng) + "&type=" + type + "&" + "&titulo=" + $(titulo).val() + "&comentario=" + $(comentario).val() + "&categoria=" + categoria,
								        type: "POST",
								        success: function(response) {
								        	$.fancybox.close();
								        	$($("#fancy_box_save_draw").find("p")[1]).trigger( "click" );
								        }
						    		});
					    		}
					    	});
					    }
					});
		        }
		    });

		});
		
		
		$($("#fancy_box_save_draw").find("p")[1]).on('click', function(e) {
			$($("#fancy_box_save_draw").find("p")[0]).fadeOut(200);
			$($("#fancy_box_save_draw").find("p")[1]).fadeOut(200);
			$("#fancy_box_save_draw").animate({"width": 0},300);
			$("#fancy_box_save_draw").hide(400);
		});
	}
	
	
}
