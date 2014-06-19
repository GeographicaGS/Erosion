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
	
	this.setVisibility = function(visibility, map, z_index){
		
		this.visible = visibility;
		if(this.visible){
				var self = this;
				$.ajax({
//			        url: 'index.php/symbol/getSymbols/' + encodeURIComponent(this.title) + "/" + map.getBounds()._southWest.lat + "/" + map.getBounds()._northEast.lat + "/" +  map.getBounds()._southWest.lng + "/" + map.getBounds()._northEast.lng + "/" + self.radioMin + "/" + self.radioMax, 
					url: 'index.php/symbol/getSymbols/' + this.id + "/" + map.getBounds()._southWest.lat + "/" + map.getBounds()._northEast.lat + "/" +  map.getBounds()._southWest.lng + "/" + map.getBounds()._northEast.lng + "/" + self.radioMin + "/" + self.radioMax,
			        dataType: "json",
			       success: function(response) {
			       	var json = response.result;
			       	var markers = [];
			       	var contador = 0;
			       	for(var i=0; i<json.length; i++){

			       		if((i != 0) && (i % self.zoomGroup[map.getZoom()] == 0)){
			       			
			       			contador += Number(json[i].valor);
			       			var value = (contador / self.zoomGroup[map.getZoom()]);
			       			if(self.zoomGroup[map.getZoom()] != 1){
			       				value = value.toFixed(2);
			       			}
			       			

			       			var marker = new L.CircleMarker([json[i].lat,json[i].lng], {
						        radius: self.getRadius(value, response.minValue, response.maxValue),
						        fillColor: (self.umbral ? (value >= self.umbral ? self.colorUmbralPositivo:self.colorUmbralNegativo):self.colorUmbralPositivo),
						        color: (self.umbral ? (value >= self.umbral ? self.colorUmbralPositivo:self.colorUmbralNegativo):self.colorUmbralPositivo),
						        opacity: 1,
						        fillOpacity: 1,
						        weight: 1,
						        clickable: true,
						        value : value,
//						        onEachFeature : function (feature, layer) {
//					                alert("hola");
//					            }
						    });
			       			marker.on('click', function(e) {
//			       			    alert(e.target.options.value);
			       				e.target.bindPopup("<strong>" + e.target.options.value + "</strong>").openPopup();
			       			});
				       		markers.push(marker);
				       		
			       			contador = 0;
			       			
			       		}else if (((self.zoomGroup[map.getZoom()] -1) / 2) != i){
			       			contador += Number(json[i].valor);
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
	};
	
	this.getRadius = function(valor, min, max){
		var aux = ((this.radioMax - this.radioMin) * (Math.abs(valor) - min) ) / (((max - min) != 0) ? (max - min) : 1);
		return (aux <= this.radioMin ? this.radioMin:aux)
	};
	
}




//function onEachFeatureGeoJson() {
//	alert("Hola");
//	layer.on("click",function(e){
//		alert("Hola");
//	});
//}