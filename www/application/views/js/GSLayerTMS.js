function GSLayerTMS(title, url, name, leyenda){
	this.title = title;
	this.server = url;
	this.name = name;
	this.visible = true;
	this.layer = null;
	this.tipo = "tms";
	this.leyenda = leyenda;
	
	this.setVisibility = function(visibility, map, z_index){
		
		if(this.layer == null){
			this.layer =  L.tileLayer(this.server + this.name + '/{z}/{x}/{y}.png',{tms: true});
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