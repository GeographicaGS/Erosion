function GroupLayer(opts){
	/****************************************/
	/********** MEMBERS  ********************/
	/****************************************/
	this.map = opts.map;	
	this.father = opts.father;
	this.layers = null;
	this.__layerHistogram = null;
	this.__active = true;	
	
	//initialize context layers
	this.ctxLayers = [];
	var controlCtxLayers = {};
	for(x in opts.ctxLayers){
		var ctx = opts.ctxLayers[x];
		this.ctxLayers[x] = new L.tileLayer.wms(ctx.server, {
		    layers: ctx.layers,
		    format: 'image/png',
		    transparent: true	    
		});
		controlCtxLayers[ctx.title] = this.ctxLayers[x];
		
		// add the layer group to map
		if (ctx.visible){
			//this.map.addLayer(this.ctxLayers[x]);	
			this.ctxLayers[x].addTo(this.map);
		}			
	}
	
	// create a layer group with all the context layers
	this.ctxLayerGroup = new L.layerGroup(this.ctxLayers);
	
	var position = this.father == Split.LEFT ?  'topleft' : 'topright';
		
	L.control.layers(controlCtxLayers,null,{position:position}).addTo(this.map);
	
	
	//initializate layers
	this.layers = new Array();
	// set the closure variable
	var layers = this.layers;
	// we need a closure function in order to save layer properties (like priority, visibility...) inside the object layers array
	this.iniLayerClosure = function(caller,l){		
		// get json of the layer
		$.ajax({
			url: base_url + "erosion/points/"+l.id,
			dataType: "json",
			success:function(json){		
				var l2 = {						
					json: 	json,
					visible:l.visible,
					priority:l.priority,
					title:l.title,
					color: l.color,
					points: null
				};
				
				// store the layer in the closure GroupLayer.layers
				layers.push(l2);
				// draw the layer
				caller.drawLayer(l2);
			}
		});
	};
	// let's initialize all layers
	for(x in opts.layers){
		var l =  opts.layers[x];
		this.iniLayerClosure(this,l);
	}
			
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
			var limg = l.visible ? getImg("MED_icon_mapa_0.png") : getImg("MED_icon_mapa.png"); 
			
			html += "<li>" +
										
					"<a href='javascript:Split.toggleLayer("+x+","+this.father+")'>"+
					"	<img class='act_histogram' src='"+limg+"' />" +
					"</a>"+
					"<span>"+l.title+"</span>"+
					"</li>";			
		}
		return html;		
	};
	/* Toogle a given layer*/
	this.toogleLayer = function(id_layer){
		// get the layer
		var l =  this.layers[id_layer];
		l.visible = !l.visible;
		// draw this layer
		this.drawLayer(l);
	};
		
	this.setHistogram = function(id_layer){
		this.__layerHistogram = this.layers[id_layer];
	};
	
	/* Draw a given layer */
	this.drawLayer = function (l){		
		
		if (l.visible){
			// the layer is visible so let's draw it
			var markers = [];
			// create the proportional symbol for each point
			for (var i=0;i<l.json.length;i++){
				// get the info of the point to draw
				var p = l.json[i];
				var multFactor = 1;
				// calculate the size based on the value of the point and the mulFactor
				var size = p.value * multFactor;
				// create the point on leaflet
				var myIcon = L.divIcon({		
					className: 'symbol-marker',
					iconSize: new L.Point(size, size),
					html: '<div style="height:'+size+';width:'+size+';background-color:'+l.color+'"></div>'
				});
				markers.push(new L.marker([p.point.lat, p.point.lng],{icon: myIcon}));
			}
			/// assign all the point to a group layers to make easy the plugin and plugout.
			l.points = new L.layerGroup(markers);
			// draw the group layers
			l.points.addTo(this.map);			
		}
		else {
			if (l.points){
				// layer not visible, let's remove it from the map
				l.points.clearLayers();
			}
			
		}
	};
		
	this.redraw = function(){
		for(var i=0;i<this.layers.length;i++){
			this.drawLayer(this.layers[i]);
		}
	}
	
}