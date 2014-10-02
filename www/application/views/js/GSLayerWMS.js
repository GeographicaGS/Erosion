function GSLayerWMS(id,title, url, name, leyenda){
	this.id = id;
	this.title = title;
	this.url = url;
	this.name = name;
	this.visible = true;
	this.layer = null;
	this.tipo = "wms";
	this.leyenda = leyenda;
	this.version = "1.1.1";
	
	this.setVisibility = function(visibility, map, z_index){
		
		if(this.layer == null){
			this.layer =  L.tileLayer.wms(this.url, {
								layers: this.name,
								format: 'image/png',
								transparent: true,
								version: this.version,
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