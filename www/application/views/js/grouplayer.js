function GroupLayer(opts){
	/****************************************/
	/********** MEMBERS  ********************/
	/****************************************/
	this.map = opts.map;	
	this.father = opts.father;
	this.layers = null;
	this.__layerHistogram = null;
	this.__active = true;
	
	this.layers = new Array();
	// set the closure variable
	var layers = this.layers;
	
	this.iniLayerClosure = function(l){
		
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
				// GroupLayer.drawLayer(l2);
			}
		});
	};
	
	//initialize context layers
	this.ctxLayers = [];	
	for(x in opts.ctxLayers){
		var ctx = opts.ctxLayers[x];
		this.ctxLayers[0] = new L.tileLayer.wms(ctx.server, {
		    layers: ctx.layers,
		    format: 'image/png',
		    transparent: true	    
		});
	}
	
	// create a layer group with all the context layers
	this.ctxLayerGroup = new L.layerGroup(this.ctxLayers);
	// add the layer group to map
	this.map.addLayer(this.ctxLayerGroup);	
	
	// let's initialize all layers
	for(x in opts.layers){
		var l =  opts.layers[x];
		this.iniLayerClosure(l);
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
	
	this.toogleLayer = function(id_layer){
		var l =  this.layers[id_layer];
		l.visible = !l.visible;
		this.drawLayer(l);
	};
		
	this.setHistogram = function(id_layer){
		this.__layerHistogram = this.layers[id_layer];
	};
	
	this.drawLayer = function (l){		
		
		if (l.visible){
			var markers = [];
			for (var i=0;i<l.json.length;i++){
				var p = l.json[i];		
				var size = p.value;
				
				var myIcon = L.divIcon({		
					className: 'symbol-marker',
					iconSize: new L.Point(size, size),
					html: '<div style="height:'+size+';width:'+size+';background-color:'+l.color+'"></div>'
				});
				markers.push(new L.marker([p.point.lat, p.point.lng],{icon: myIcon}));
			}
			l.points = new L.layerGroup(markers);
			l.points.addTo(this.map);
			
		}
		else{
			l.points.clearLayers();
		}
	};
	
	
	this.redraw = function(){
		for(var i=0;i<this.layers.length;i++){
			this.drawLayer(this.layers[i]);
		}
	}
	
}