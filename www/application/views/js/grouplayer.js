function GroupLayer(opts){

			
	/****************************************/
	/********** METHODS  ********************/
	/****************************************/	
	this.getMap = function(){
		return this.map;
	};
	
	this.isActive = function(){
		return this.__active;
	}
	
	this.setActive = function(active){
		this.__active = active;
	}
	
	this.getHTMLLayersPanel = function(){
//		var html = "<li>Erosión en deltas mediterráneos</li>";
		var html = "";
		
		for(x in this.layers){
			var l =  this.layers[x];
			var lattr = l.visible ? "checked" : ""; 
			var lstyle = l.visible ? "color:black" : "";
					
			html += "<li title='" + l.title + "'>" +	
			
				"	<input type='checkbox' class='toogleLayer' " +
				"			id_layer="+x+" father="+this.father+ " " + lattr +">" +
				
					"<img class='remove' src='application/views/img/MED_icon_papelera_panel.png' title='Opacity 100 %' id_layer='" + x + "'>"+
					"<img class='opacity' src='application/views/img/MED_icon_opacity.png' title='Opacity 100 %'>"+
					"<img class='legend' src='application/views/img/MED_icon_leyenda.png' title='Opacity 100 %' id_layer='" + x + "'>"+
					"<span>"+l.title+"</span>"+
					"<div class='opacity_panel' style='display: none;'>" +
						"<span class='opacity_label'>Opacity 100 %</span>" +
						"<div class='slider'></div>"
					"</div>"
				"</li>";
			
		}
		html += "<li style='background: none;'><a class='add_layer' href='javascript:catalog()'>+ Add layers from <strong>Medina Catalogue</strong></a></li>"; 
		return html;		
	};
	
	this.refreshLayerPanel = function($panel){
		$panel.html(this.getHTMLLayersPanel());
		var self = this;
		
		$panel.find(".slider").slider({
			max: 100,
			min: 0,
			value: 100,
			stop: function( event, ui ){
				$(ui.handle).closest(".opacity_panel").find(".opacity_label").html("Opacity "+ ui.value + " %");
				var id_layer = $(ui.handle).closest(".opacity_panel").siblings("input").attr("id_layer");
				$(ui.handle).closest(".opacity_panel").siblings("img").attr("title","Opacity " + ui.value +" %");
				var l = self.layers[id_layer];
				l.layer.setOpacity(ui.value/100);
			}
		});
		
		$panel.sortable({
//			out: function(event, ui) {
//				var leftGap = 70;					
//				if ((ui.position.left + leftGap) < 0 ){
//					var id_layer = $(ui.item).find("input").attr("id_layer");
//					obj.removeLayer(id_layer);
//				}
//			},
			start: function( event, ui ) {
				$(ui.item).css("background-color","#f2f7fb");
			},
			stop: function( event, ui ) {
				$(ui.item).css("background-color","#fff");
				var id_layer = $(ui.item).find("input").attr("id_layer");
//				var idx = obj.findLayerIdxById(id_layer);
				var l = self.layers[id_layer];
				self.layers.splice(id_layer,1);
				var new_idx = $(ui.item).index();
				self.layers.splice(new_idx,0,l);
				
				//change priority of all layer with bigger priority
				for(var i=0;i<self.layers.length;i++){
					self.layers[i].layer.setZIndex(self.layers.length-i);
				}
				var checks = $(ui.item).parent().find("input[type='checkbox']");
				for(var i=0; i<checks.length; i++){
					$(checks[i]).attr("id_layer",i);
				}
			}
		});
		
		$panel.find("li > img.opacity").click(function(){
			var $opacity_panel = $(this).siblings(".opacity_panel");
			var $li = $(this).parent(); 
			if ($opacity_panel.is(":visible")){
				$li.height($li.height() - $opacity_panel.outerHeight());
				$opacity_panel.hide();
				$li.css("border-bottom","1px solid #ccc");
			}
			else{
				$li.height($li.height() + $opacity_panel.outerHeight());
				$opacity_panel.show();
				$li.css("border-bottom","none");
			}
			
		});
		
		$panel.find("li > img.legend").click(function(){
			var id_layer = $(this).parent().find("input[type='checkbox']").attr("id_layer");
			var $container = $(self.map.getContainer()).parent();
			var $el = self.__getLegendContainer();
			
			var legendUrl = self.layers[id_layer].url + "?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&"
			+"EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + self.layers[id_layer].name;


			$el.find(".co_legend").html("<img src='" + legendUrl +"'/>");
			
			self.__addLegendDOM($container,$el);
		});
		
		$panel.find("li > img.remove").click(function(){
			var id_layer = $(this).parent().find("input[type='checkbox']").attr("id_layer");
			self.layers[id_layer].setVisibility(false, self.map, null);
			self.layers.splice(id_layer,1);
			
			for(var i=0;i<self.layers.length;i++){
				self.layers[i].layer.setZIndex(self.layers.length-i);
			}
			
			var checks = $(this).parent().parent();
			$(this).parent().remove();
			var checks = checks.find("input[type='checkbox']");
			for(var i=0; i<checks.length; i++){
				$(checks[i]).attr("id_layer",i);
			}
			
		});
		
	};
	
	/* Toogle a given layer*/
	this.toogleLayer = function(id_layer){
		// get the layer
		var l =  this.layers[id_layer];
		l.visible = !l.visible;
		this.__refreshLayer(l);
	};
		
	this.setHistogram = function(id_layer){
		this.__layerHistogram = this.layers[id_layer];
	};
	
	/* Draw a given layer */
	this.__drawLayer = function (l){		
		// the layer is visible so let's draw it
		var markers = [];
		// create the proportional symbol for each point
		for (var i=0;i<l.json.length;i++){
			// get the info of the point to draw
			var p = l.json[i];
			// calculate the size based on the value of the point and the mulFactor
			var size = Math.abs(p.value) * l.valueFactor;
			// create the point on leaflet
			if(l.type==0) color = l.color1;
			if(l.type==1)
			{
				if(p.value>=0)
				{
					var color = l.color1;
				}
				else
				{
					var color = l.color2;
				}
			}

			var myIcon = L.divIcon({		
				className: 'symbol-marker',
				iconSize: new L.Point(size, size),
				html: '<div style="height:'+size+';width:'+size+';background-color:'+color+'"></div>'
			});

			markers.push(new L.marker([p.point.lat, p.point.lng],{icon: myIcon}));

		}
		if (l.points){
			// layer not visible, let's remove it from the map
			l.points.clearLayers();
		}
		/// assign all the point to a group layers to make easy the plugin and plugout.
		l.points = new L.layerGroup(markers);
		// draw the group layers
		l.points.addTo(this.map);
	};
		
	this.__refreshLayerClosure = function (caller,l,bbox){
		$.ajax({
			url: base_url + "erosion/points/"+l.source+"/"+caller.bbox+"/"+l.baseRetriever,
			dataType: "json",
			success:function(json){
				// store the layer in the closure GroupLayer.layers
				l.json = json;				
				caller.__drawLayer(l);
			}
		});
	};
	
	this.refreshLayers = function(){		
		for(var i=0;i<this.layers.length;i++){
			var l = this.layers[i];
			this.__refreshLayer(this.layers[i]);						
		}
	};
	
	this.__refreshLayer = function(l){
		// refresh BBOX
		this.__refreshBBOX();
		
//		if (l.visible){
//			this.__refreshLayerClosure(this,l);
//		}
//		else{
//			if (l.points){
//				// layer not visible, let's remove it from the map
//				l.points.clearLayers();
//			}
//		}	
		if (l.visible){
			l.setVisibility(true, this.map);
		}else{
			l.setVisibility(false, this.map);
		}
	};
	
	this.__refreshBBOX = function(){
		this.bbox = this.map.getBounds().getSouthWest().lng + "/" + this.map.getBounds().getSouthWest().lat + "/"
					+ this.map.getBounds().getNorthEast().lng + "/" + this.map.getBounds().getNorthEast().lat;
	};
	/****************************************/
	/********** MEMBERS  ********************/
	/****************************************/
	this.map = opts.map;	
	this.father = opts.father;
	this.layers = null;
	this.__layerHistogram = null;
	this.__active = true;	
	
	//initialize context layers
	//this.ctxLayers = [];
	//var controlCtxLayers = {};
	//for(x in opts.ctxLayers){
	//	var ctx = opts.ctxLayers[x];
	//	this.ctxLayers[x] = new L.tileLayer.wms(ctx.server, {
	//	    layers: ctx.layers,
	//	    format: 'image/png',
	//	    transparent: true	    
	//	});
	//	controlCtxLayers[ctx.title] = this.ctxLayers[x];
	//	
	//	// add the layer group to map
	//	if (ctx.visible){
	//		//this.map.addLayer(this.ctxLayers[x]);	
	//		this.ctxLayers[x].addTo(this.map);
	//	}			
	//}
	//
	//// create a layer group with all the context layers
	//this.ctxLayerGroup = new L.layerGroup(this.ctxLayers);
	//
	
	
	var gSatellite = new L.Google('SATELLITE'),
		gTerrain = new L.Google('TERRAIN')
		gRoad = new L.Google('ROADMAP');
	this.map.addLayer(gSatellite);
	
	var orto56 = L.tileLayer('http://www.erosion.geographica.gs/tileado/00-orto56-result/{z}/{x}/{y}.png',{tms: true});
	var position = this.father == Split.LEFT ?  'topleft' : 'topright';
	
	var din_linea09 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'linea_09',
		format: 'image/png',
		transparent: true,
	});
	
	var din_linea77 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'linea_77',
		format: 'image/png',
		transparent: true,
	});
	
	var din_linea56 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'linea_56',
		format: 'image/png',
		transparent: true,
	});
	
	var din_tasa56_77 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'Tasas_1956_1977',
		format: 'image/png',
		transparent: true,
	});
	
	var din_tasa77_09 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'Tasas_1977_2009',
		format: 'image/png',
		transparent: true,
	});
	
	var din_tasa56_09 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'Tasas_1956_2009',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi1 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_CoastalVulnerabilityIndex',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi2 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_geomorfologia',
		format: 'image/png',
		transparent: true,
	});
	
	
	var cvi3 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_topografia',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi4 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_nivel_mar',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi5 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_oleaje_significante',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi6 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_rango_mareal',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi7 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_erosion',
		format: 'image/png',
		transparent: true,
	});
	
	
	var ufis = L.tileLayer.wms("http://193.147.172.37/cgi-bin/unidades_fisiograficas", {
		layers: 'unidades_fisiograficas_nv5',
		format: 'image/png',
		transparent: true,
	});
	
	var ufis2 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/unidades_fisiograficas", {
		layers: 'unidades_fisiograficas_nv5',
		format: 'image/png',
		transparent: true,
		opacity : 0.5
	});
	
	var matrixIds3857= new Array(22);
    for (var i= 0; i<22; i++) {
        matrixIds3857[i]= {
            identifier    : "" + i,
            topLeftCorner : new L.LatLng(20037508,-20037508)
        };
    }


	//var wmts = new L.TileLayer.WMTS("http://wxs.ign.fr/6081235680374936929/geoportail/wmts",           {
	//	layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
	//	style: 'normal',
	//	tilematrixSet: "PM",
	//	matrixIds: matrixIds3857,
	//	format: 'image/jpeg'
	//});
	
	var matrixIds = new Array(26);
    for (var i=0; i<26; ++i) {
        //matrixIds[i] = "EPSG:900913:" + i;
		matrixIds[i]= {
            identifier    : "EPSG:900913:" + i,
            topLeftCorner : new L.LatLng(20037508,-20037508)
        };
		
    }

//    var MTNbase = new OpenLayers.Layer.WMTS({
//        name: "Mapa base de Espa&#241a",
//        url: "http://www.ign.es/wmts/ign-base",
//		layer: "IGNBaseTodo",
//        matrixSet: "EPSG:900913",
//        matrixIds: matrixIds,
//        style: "default",	
//        format: "image/png",
//        opacity: 1,
//        isBaseLayer: true,
//		visibility: false
//    });
	
	var wmts = new L.TileLayer.WMTS("http://www.ign.es/wmts/ign-base",           {
		layer: 'IGNBaseTodo',
		style: 'default',
		tilematrixSet: "EPSG:900913",
		matrixIds: matrixIds,
		format: 'image/png'
	});
	
	var wmts2 = new L.TileLayer.WMTS("http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",           {
		layer: 'litoral:CVI_wmts',
		style: 'default',
		tilematrixSet: "EPSG:900913",
		matrixIds: matrixIds,
		format: 'image/png'
	});
	
	
	
//	   var wmts = new OpenLayers.Layer.WMTS({
//        name: "Medford Buildings",
//        url: "http://v2.suite.opengeo.org/geoserver/gwc/service/wmts/",
//        layer: "medford:buildings",
//        matrixSet: "EPSG:900913",
//        matrixIds: matrixIds,
//        format: "image/png",
//        style: "_null",
//        opacity: 0.7,
//        isBaseLayer: false
//    });

//var ign = new L.TileLayer.WMTS(gGEOPORTALRIGHTSMANAGEMENT[gGEOPORTALRIGHTSMANAGEMENT.apiKey].resources['GEOGRAPHICALGRIDSYSTEMS.MAPS:WMTS'].url,
//                {
//                    layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
//                    style: 'normal',
//                    tilematrixSet: "PM",
//                    matrixIds: matrixIds3857,
//                    format: 'image/jpeg',
//                    attribution: "&copy; <a href='http://www.ign.fr'>IGN</a>"
//                }
//    );
	L.control.layers(
					 {
//					 'Google satélite':gSatellite,
//					 'Google relieve': gTerrain,
//					 'Google callejero' : gRoad,
//					 'Orto 56': orto56,
//					 'WMTS IGN': wmts,
					 
					 
					 }
					 ,{
						 'Google satélite':gSatellite,
						 'Google relieve': gTerrain,
						 'Google callejero' : gRoad,
//						"Línea de costa en 2009": din_linea09,
//						"Línea de costa en 1977": din_linea77,
//						"Línea de costa en 1956": din_linea56,
//							"Tasa 56 - 77": din_tasa56_77,
//						"Tasa 77 - 09": din_tasa77_09,
//						"Tasa 56 - 09": din_tasa56_09,
//						"CVI":cvi1,
//						"Geomorfología":cvi2,
//						"Topografía":cvi3,
//						"Erosión":cvi7,
//						"Nivel del mal":cvi4,
//						"Oleaje":cvi5,
//						"Marea":cvi6,
//						"Unidades fisiográficas": ufis,
//						"Unidades fisiográficas (Transparencia 50%)": ufis2,
//						'WMTS IGN': wmts,
//						'CVI WMTS' : wmts2
					 },{position:position}).addTo(this.map);
	
	//this.map.addControl(new L.Control.Layers( {'Google Satellite':gSatellite, 'Google Terrain': gTerrain}, {}));
	
	//initializate layers
	this.layers = new Array();
	
	// let's initialize all layers
	for(x in opts.layers){
	
		var l =  opts.layers[x];
		
		this.layers.push({
			id: l.id,
			json: 	null,
			visible: l.visible,
			priority: l.priority,
			type: l.type,
			baseRetriever: l.baseRetriever,
			valueFactor: l.valueFactor,
			title: l.title,
			source: l.source,
			color1: l.color1,
			color2: l.color2,
			points: null
		});
	}
	
	this.refreshLayers();
	
	
	this.addLayer = function(gsLayer){
		this.layers.unshift(gsLayer);
		gsLayer.setVisibility(true, this.map, this.layers.length);
	};
	
	this.removeLayer = function(title, tipo){
		for(var i=0; i<this.layers.length; i++){
			if(this.layers[i].title == title && this.layers[i].tipo == tipo){
				this.layers[i].setVisibility(false, this.map, null);
				this.layers.splice(i,1);
				break;
			}
		}
	};
	
	this.__getLegendContainer = function(){
		return $("<div class='flotable_legend ui-widget ui-widget-content' >"
							+	"<h4>" 
							+		"<img src='application/views/img/MED_icon_leyenda.png' />"
							+		"<p class='title'></p>"
							+		"<img class='close' src='application/views/img/MED_icon_delete.png' />"
							+	"</h4>"
							+	"<div class='co_legend'>"							
							+	"</div>"			
							+	"</div>");
					
					
	};
	
	this.__addLegendDOM= function($container,$el){
		$container.prepend($el);
	
		$el.css("left",($container.width() / 2 ) - $el.width());
		$el.css("top",($container.height() / 2 ) - ($el.height() / 2));
					
		$el.find(".close").click(function(){
			$el.remove();
		});
		
		$el.draggable();
	};
	
}
