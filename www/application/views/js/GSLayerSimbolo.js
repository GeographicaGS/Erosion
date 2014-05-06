function GSLayerSimbolo(id, title, umbral, colorUmbralPositivo, colorUmbralNegativo, radioMin, radioMax){
	this.id = id;
	this.title = title;
	this.visible = true;
	this.tipo = "simbolo";
	this.layer = null;
	this.umbral = umbral;
	this.colorUmbralPositivo = colorUmbralPositivo;
	this.colorUmbralNegativo = colorUmbralNegativo;
	this.radioMin = radioMin;
	this.radioMax = radioMax;
	
	this.setVisibility = function(visibility, map, z_index){
		
		this.visible = visibility;
		if(this.visible){
				var self = this;
				$.ajax({
			        url: 'index.php/symbol/getSymbols/' + encodeURIComponent(this.title) + "/" + map.getBounds()._southWest.lat + "/" + map.getBounds()._northEast.lat + "/" +  map.getBounds()._southWest.lng + "/" + map.getBounds()._northEast.lng + "/" + self.radioMin + "/" + self.radioMax, 
			        dataType: "json",
			       success: function(response) {
			       	var json = response.result;
			       	var markers = [];
//			       	var bound = map.getBounds();
			       	for(var i=0; i<json.length; i++){
			       		
//			       		if(json[i].lat >= bound._southWest.lat && json[i].lat <= map.getBounds()._northEast.lat && json[i].lng >= bound._southWest.lng && json[i].lng <= map.getBounds()._northEast.lng){
			       			
			       			var marker = new L.CircleMarker([json[i].lat,json[i].lng], {
						        radius: json[i].radius,
						        fillColor: (self.umbral ? (json[i].valor >= self.umbral ? self.colorUmbralPositivo:self.colorUmbralNegativo):self.colorUmbralPositivo),
						        color: (self.umbral ? (json[i].valor >= self.umbral ? self.colorUmbralPositivo:self.colorUmbralNegativo):self.colorUmbralPositivo),
						        opacity: 1,
						        fillOpacity: 1,
						        weight: 1,
						    });			       		
				       		markers.push(marker);
//			       		}
			       		
			       	}
			       	
			       	if(self.layer != null){
						map.removeLayer(self.layer);
					}
			       	self.layer = new L.layerGroup(markers);
			       	self.layer.addTo(map);
			       	if(z_index){
			       		self.layer.setZIndex(z_index);
					}
			       	
			       }
			});

		}else{
			map.removeLayer(this.layer);			
		}
	};
}