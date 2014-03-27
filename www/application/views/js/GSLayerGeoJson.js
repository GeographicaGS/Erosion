var myStyle = {
    "color": "red",
    "weight": 3,
};

function GSLayerGeoJson(title, geoJson, leyenda){
	this.title = title;
	this.geoJson = geoJson;
	this.visible = true;
	this.layer = null;
	this.tipo = "geoJson";
	this.leyenda = leyenda;
	
	this.setVisibility = function(visibility, map, z_index){
		
		if(this.layer == null){
			this.layer =  L.geoJson(geoJson, {
			    					style: myStyle
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