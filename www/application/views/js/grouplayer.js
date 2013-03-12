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
				// store the layer in the closure GroupLayer.layers
				layers.push({						
					json: 	json,
					visible:l.visible,
					priority:l.priority,
					title:l.title
				}); 
			}
		});
	};
	// let's initialize all layers
	for(x in opts.layers){
		var l =  opts.layers[x];
		this.iniLayerClosure(l)
		
		
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
		var html = "";
		for(x in this.layers){
			var l =  this.layers[x];
			var limg = l.visible ? getImg("MED_icon_mapa_0.png") : getImg("MED_icon_mapa.png"); 
			
			html += "<li>" +
					"<span>"+l.title+"</span>"+					
					"<a href='javascript:Split.toggleLayer("+x+","+this.father+")'>"+
					"	<img class='act_histogram' src='"+limg+"' /></a>"+			
					"</li>";
		}
		return html;		
	};
	
	this.toogleLayer = function(id_layer){
		var l =  this.layers[id_layer];
		l.visible = !l.visible;
		if (l.visible){
			this.map.addLayer(l.tile);
		}
		else{
			this.map.removeLayer(l.tile);
		}
	};
		
	this.setHistogram = function(id_layer){
		this.__layerHistogram = this.layers[id_layer];
	}
	
	
	
}