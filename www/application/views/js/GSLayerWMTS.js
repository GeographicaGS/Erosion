var matrixIds = new Array(26);
for (var i=0; i<26; ++i) {
	matrixIds[i]= {
			identifier    : "EPSG:900913:" + i,
			topLeftCorner : new L.LatLng(20037508,-20037508)
	};
		
}

function GSLayerWMTS(title, url, name, leyenda){
	this.title = title;
	this.url = url;
	this.name = name;
	this.visible = true;
	this.layer = null;
	this.tipo = "wmts";
	this.leyenda = leyenda;
	
	this.setVisibility = function(visibility, map, z_index){
		
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
			this.layer.addTo(map);
			if(z_index){
				this.layer.setZIndex(z_index);
			}
		}else{
			map.removeLayer(this.layer);
		}
	};
}