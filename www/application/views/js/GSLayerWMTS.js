var matrixIds = new Array(26);
for (var i=0; i<26; ++i) {
	matrixIds[i]= {
			identifier    : "EPSG:900913:" + i,
			topLeftCorner : new L.LatLng(20037508,-20037508)
	};
		
}

function GSLayerWMTS(id,title, url, name, leyenda, alternativeTitle, description){
	this.id = id;
	this.title = title;
	this.alternativeTitle = alternativeTitle;
	this.url = url;
	this.name = name;
	this.visible = true;
	this.layer = null;
	this.tipo = "wmts";
	this.leyenda = leyenda;
	this.description = description;
	this.minZoom = null;
	this.maxZoom = null;
}

GSLayerWMTS.prototype.setVisibility = function(visibility, map, z_index){
	if(this.layer == null){
		this.layer =  L.tileLayer.wmts(this.url,{
						layer: this.name,
						style: 'default',
						tilematrixSet: "EPSG:900913",
						matrixIds: matrixIds,
						format: 'image/png'
					});	
	}

	this.visible = visibility;
	if(this.visible){
		if(this.minZoom && map.getZoom() < this.minZoom){
			map.removeLayer(this.layer);
		}else if(this.maxZoom && map.getZoom() > this.maxZoom){
			map.removeLayer(this.layer);
		}else{
			this.layer.addTo(map);
		}
		if(z_index){
			this.layer.setZIndex(z_index);
		}
	}else{
		map.removeLayer(this.layer);
	}
}