Tools = {
	
	panoramiosLeft:null,
	panoramiosRight:null,

	initialize: function(){

		$(".tools .locationTool input[type=checkbox]").click(function(){
			var panel = $(this).attr("panel");
			if($(this).is(":checked")){
				if(panel == 1){
					$(".tools .locationTool input[panel=1]").prop('disabled', true);
					Split.__mapLeft.getMap().locate().on('locationfound', Tools.locationfoundLeft);
				}else{
					$(".tools .locationTool input[panel=2]").prop('disabled', true);
					Split.__mapRight.getMap().locate().on('locationfound', Tools.locationfoundRight);
				}	
			}else{
				if(panel == 1){
					Split.__mapLeft.getMap().locate().off('locationfound')
					Split.__mapLeft.getMap().removeLayer(markerLocationLeft);
				}else{
					Split.__mapRight.getMap().locate().off('locationfound')
					Split.__mapRight.getMap().removeLayer(markerLocationRight);
				}
			}
			
		});

		$(".tools .panoramioTool input[type=checkbox]").click(function(){
			var panel = $(this).attr("panel");
			if($(this).is(":checked")){
				Tools.drawPanoramio(panel);
			}else{
				if(panel == 1){
					Split.__mapLeft.getMap().off("dragend zoomend");
					Split.__mapLeft.getMap().removeLayer(Tools.panoramiosLeft);
				}else{
					Split.__mapRight.getMap().off("dragend zoomend");
					Split.__mapRight.getMap().removeLayer(Tools.panoramiosRight);
				}
			}
		});

		// $(".tools .streetTool input[type=checkbox]").click(function(){
		// 	var panel = $(this).attr("panel");
		// 	if(panel == 1){

		// 	}else{
				
		// 	}
		// });
	},

	locationfoundLeft: function(e){
		$(".tools .locationTool input[panel=1]").prop('disabled', false);
		markerLocationLeft = Tools.locationfound(e,markerLocationLeft,this);
	},

	locationfoundRight: function(e){
		$(".tools .locationTool input[panel=2]").prop('disabled', false);
		markerLocationRight = Tools.locationfound(e,markerLocationRight,this);
	},

	locationfound: function(e,marker,map){
		if(marker){
			map.removeLayer(marker);
		}
		marker = L.marker(e.latlng);
		marker.addTo(map).bindPopup("Esta es tu posición:</br>Latitud: " +  e.latlng.lat + "<br>Longitud: " + e.latlng.lng).closePopup();
		return marker;
	},

	drawPanoramio: function(panel){
		var map;
		var panoramios;
		if(panel == 1){
			$(".tools .panoramioTool input[panel=1]").prop('disabled', true);
			map = Split.__mapLeft.getMap();
		}else{
			$(".tools .panoramioTool input[panel=2]").prop('disabled', true);
			map = Split.__mapRight.getMap()
		}
		$.ajax({
			url : "application/views/proxy.php",
			data: { "url": "http://www.panoramio.com/map/get_panoramas.php?order=public&set=full&from=0&to=200&minx=" + map.getBounds()._southWest.lng + "&miny=" + map.getBounds()._southWest.lat + "&maxx=" + map.getBounds()._northEast.lng + "&maxy=" + map.getBounds()._northEast.lat + "&size=mini_square&mapfilter=true"},
			type: "POST",
			dataType: "json",
	        success: function(data) {
	        	map.off("dragend zoomend");
	        	if(panel == 1){
	        		panoramios = Tools.panoramiosLeft;
	        	}else{
	        		panoramios = Tools.panoramiosRight;
	        	}

	        	if(panoramios){
					map.removeLayer(panoramios);
				}
	   			panoramios = new L.MarkerClusterGroup();
	   			for(var i=0; i<data.photos.length; i++){

					var marker = L.marker([data.photos[i].latitude, data.photos[i].longitude], {icon: new L.icon({iconUrl: 'application/views/img/ERO_icon_map_panoramio.png', zIndexOffset:1000}),value : data.photos[i].photo_file_url, date:data.photos[i].upload_date});
	        		marker.on('click', function(){
	        			showInfoFancybox("<span style='position: absolute;right: 10px;bottom: 10px;color: white;'>" + this.options.date +"</span><img style='height:" + $("#panel_left").outerHeight() + "' src='" + this.options.value.replace("mini_square","large").replace("mw2.google.com/mw-panoramio","static.panoramio.com") + "'/>");
	        		});

	   				panoramios.addLayer(marker);
	   			}
	   			map.addLayer(panoramios);
	   			if(panel == 1){
	   				$(".tools .panoramioTool input[panel=1]").prop('disabled', false);
					Tools.panoramiosLeft = panoramios;
				}else{
					$(".tools .panoramioTool input[panel=2]").prop('disabled', false);
					Tools.panoramiosRight = panoramios;
				}
				map.on("dragend zoomend", function() {
					Tools.drawPanoramio(panel);
				});
	        },
            error: function(result) {
                $(".tools .panoramioTool input[panel=1]").prop('disabled', false);
                $(".tools .panoramioTool input[panel=2]").prop('disabled', false);
            }
   		});
	},
}