function GSLayerSimbolo(id, title, umbral, colorUmbralPositivo, colorUmbralNegativo, radioMin, radioMax, zoomGroup){
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
	this.zoomGroup = zoomGroup;
}

GSLayerSimbolo.prototype.getRadius = function(valor, min, max){
	var aux = ((this.radioMax - this.radioMin) * (Math.abs(valor) - min) ) / (((max - min) != 0) ? (max - min) : 1);
	return (aux <= this.radioMin ? this.radioMin:aux)
}

GSLayerSimbolo.prototype.setVisibility = function(visibility, map, z_index){
	this.visible = visibility;
	if(this.visible){
			var self = this;
			$.ajax({
				url: 'index.php/symbol/getSymbols/' + this.id + "/" + map.getBounds()._southWest.lat + "/" + map.getBounds()._northEast.lat + "/" +  map.getBounds()._southWest.lng + "/" + map.getBounds()._northEast.lng + "/" + this.radioMin + "/" + this.radioMax,
		        dataType: "json",
		       success: function(response) {
		       	var json = response.result;
		       	var markers = [];
		       	var contador = 0;

		     	for(var i=0; i<json.length-self.zoomGroup[map.getZoom()]; i++){
		     		if(json[i].id % self.zoomGroup[map.getZoom()] == 0){
			     		var value = 0;
			     		if(i==0){
			     			value = Number(json[i].valor);
			     		}else{
			     			for(var y=i-self.zoomGroup[map.getZoom()]+1; y<i+self.zoomGroup[map.getZoom()]-1; y++){
			     				if(i != y){
			     					value += Number(json[y].valor);
			     				}
			     			}
			     			value /= (self.zoomGroup[map.getZoom()]-2);
			     		}
			     		
			     		value = value.toFixed(2);
			       		
			       		var marker = new L.CircleMarker([json[i].lat,json[i].lng], {
						       radius: self.getRadius(value, response.minValue, response.maxValue),
						       fillColor: (self.umbral ? (value >= self.umbral ? self.colorUmbralPositivo:self.colorUmbralNegativo):self.colorUmbralPositivo),
						       color: (self.umbral ? (value >= self.umbral ? self.colorUmbralPositivo:self.colorUmbralNegativo):self.colorUmbralPositivo),
						       opacity: 1,
						       fillOpacity: 1,
						       weight: 1,
						       clickable: true,
						       value : value,
						   });
			       		marker.on('click', function(e) {
			       			e.target.bindPopup("<strong>" + e.target.options.value + "</strong>").openPopup();
			       		});
				       	markers.push(marker);
			     	}
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
}

