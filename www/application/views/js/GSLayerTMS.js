function GSLayerTMS(id,title, url, name, leyenda, isGoogle, alternativeTitle,description){
	this.id = id;
	this.title = title;
	this.alternativeTitle = alternativeTitle;
	this.url = url;
	this.name = name;
	this.visible = true;
	this.layer = null;
	this.tipo = "tms";
	this.leyenda = leyenda;
	this.isGoogle = isGoogle;
	this.description = description;
	this.minZoom = null;
	this.maxZoom = null;
}


GSLayerTMS.prototype.setVisibility = function(visibility, map, z_index){
	if(this.layer == null){
		this.layer =  L.tileLayer(this.url + this.name + '/{z}/{x}/{y}.png',{tms: this.isGoogle ? false:true});
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