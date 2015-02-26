function funfeatureInfosEvent(){
	var self = this;
	if(features.length > 0){
		$("#ctrl_feature_info").show();
		var html = "<ul>";
		for(var i=0; i<features.length; i++){
			html += "<li name=" + features[i].name + " url=" + features[i].url + ">" + features[i].title + "</li>"
		}
		html += "</ul>";
		$("#ctrl_feature_info").append(html);

		var to;
		$("#ctrl_feature_info").mouseenter(function(){
			clearTimeout(to);
    	       to = setTimeout(function(){
    	    	   $("#ctrl_feature_info ul").fadeIn();
	       	}, 150);
		});
		
		$("#ctrl_feature_info").mouseleave(function(){
			clearTimeout(to);
    	       to = setTimeout(function(){
    	    	   $("#ctrl_feature_info ul").fadeOut();
	       	}, 150);
		});

		$("#ctrl_feature_info ul li").click(function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				Split.__mapLeft.getMap().off("click");
				Split.__mapRight.getMap().off("click");
				$("#map_left,#map_right").removeClass("cursor_info");
			}else{
				$(".layerTree").removeClass("active");
				Split.__mapLeft.getMap().off("click");
				Split.__mapRight.getMap().off("click");
				$("#ctrl_feature_info ul li").removeClass("active");
				$(this).addClass("active");
				var name = $(this).attr("name");
				var url = $(this).attr("url");
				Split.__mapLeft.getMap().on("click", function(e) {
					showInfoFancybox("<div id='container_feature_info'>Cargando</div>");
					self.activateFeauture(Split.__mapLeft.getMap(),name, url,e)
				});

				Split.__mapRight.getMap().on("click", function(e) {
					showInfoFancybox("<div id='container_feature_info'>Cargando</div>");
					self.activateFeauture(Split.__mapRight.getMap(),name, url,e)
				});
				$("#map_left,#map_right").addClass("cursor_info");
			}
		});
	}

	this.activateFeauture = function(map,name,url,e){
		var aux = L.CRS.EPSG3857.project(map.getBounds()._southWest)
		var BBOX = aux.x + "," + aux.y + ","
		aux = L.CRS.EPSG3857.project(map.getBounds()._northEast)
		BBOX += aux.x + "," + aux.y
		var WIDTH = map.getSize().x;
		var HEIGHT = map.getSize().y;
		var X = map.layerPointToContainerPoint(e.layerPoint).x;
		var Y = map.layerPointToContainerPoint(e.layerPoint).y;
		var request = url + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=' +name+'&QUERY_LAYERS='+name+'&STYLES=&BBOX='+BBOX+'&FEATURE_COUNT=5&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&FORMAT=image%2Fpng&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A3857&X='+X+'&Y='+Y;
		request = request.replace("wmts","wms");
		$.ajax({
			url : "application/views/proxy.php",
			data: { "url": request},	       
			type: "POST",			
	        success: function(data) {
	        	try {
		        	if(data.substring(data.indexOf('<body>') + 6,data.indexOf('</body>')).trim().length > 0){
		        			$("#container_feature_info").html(data);
		        		}else{
		        			$("#container_feature_info").html("No hay información sobre este punto");
		        		}
	        	}catch (ex){
	        		$("#container_feature_info").html("No hay información sobre este punto");
	        	}
	        	$.fancybox.update();	
	        },
	        error: function(){	        	
	        	// obj.featureInfo(e,requestIdx+1);
	        }
	    });
	}
}