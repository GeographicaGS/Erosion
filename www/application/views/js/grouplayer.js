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
		var html = "<li>Erosión en deltas mediterráneos</li>";
		
		for(x in this.layers){
			var l =  this.layers[x];
			var lattr = l.visible ? "checked" : ""; 
			var lstyle = l.visible ? "color:black" : "";
					
			html += "<li>" +	
			
				"	<input type='checkbox' class='toogleLayer' " +
				"			id_layer="+x+" father="+this.father+ " " + lattr +">" +
			
				"<span style='"+lstyle +"'>"+l.title+"</span>"+
				"</li>";
			
		}
		return html;		
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
		
		if (l.visible){
			this.__refreshLayerClosure(this,l);
		}
		else{
			if (l.points){
				// layer not visible, let's remove it from the map
				l.points.clearLayers();
			}
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
		layers: 'linea_77',
		format: 'image/png',
		transparent: true,
	});
	
	L.control.layers(
					 {'Google satélite':gSatellite,
					 'Google relieve': gTerrain,
					 'Google callejero' : gRoad,
					 'Orto 56': orto56
					 
					 }
					 ,{
						"Línea de costa en 2009": din_linea09,
						"Línea de costa en 1977": din_linea77,
						"Línea de costa en 1956": din_linea56
						
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
	
	
}
