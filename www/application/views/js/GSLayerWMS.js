function GSLayerWMS(id,title, url, name, leyenda, alternativeTitle, description){
	this.id = id;
	this.title = title;
	this.alternativeTitle = alternativeTitle;
	this.url = url;
	this.name = name;
	this.visible = true;
	this.layer = null;
	this.tipo = "wms";
	this.leyenda = leyenda;
	this.version = "1.1.1";
	this.simpleLayer = false;
	this.description = description;
}

GSLayerWMS.prototype.setVisibility = function(visibility, map, z_index){
	if(this.layer == null){
		if(!this.simpleLayer){
			this.layer =  L.tileLayer.wms(this.url, {
							layers: this.name,
							format: 'image/png',
							transparent: true,
							version: this.version,
			});
		}
		else{
			this.layer =  new L.SingleTileWMSLayer(this.url, {
							layers: this.name,
							format: 'image/png',
							transparent: true,
							version: this.version,
							zIndex:z_index,
						});
		}
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