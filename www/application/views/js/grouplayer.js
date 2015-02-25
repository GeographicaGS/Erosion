function GroupLayer(opts){

			
	/****************************************/
	/********** METHODS  ********************/
	/****************************************/	
	this.getMap = function(){
		return this.map;
	};
	
	this.isActive = function(){
		return this.__active;
	}
	
	this.setActive = function(active){
		this.__active = active;
	}
	
	this.getHTMLLayersPanel = function(){
		var html = "";
		
		//Añado la capa de  Panoramio
		// if(this.capaPanoramios){
		// 	html += "<li class='panoramio disableSortable' style='cursor:pointer' title='Panoramio'><img class='remove' src='application/views/img/MED_icon_papelera_panel.png'/><input id_layer='panoramio' type='checkbox' "+ (this.getMap().getZoom()>=11? '' : 'disabled') + " " + (this.mostrarPanoramios && this.getMap().getZoom()>=11 ? 'checked':'') + " class='toogleLayer'/> <span class='ellipsis'>Panoramio (visble a partir de zoom 11)</span></li>";
		// }

		if(this.project){
			html += "<li style='background: none; cursor: initial;' class='disableSortable'><img style='float:left; padding-right: 10px; padding-left: 0;' src='application/views/img/ERO_icon_proyecto.png'><strong class='ellipsis' title='" + this.project + "' style='display: block; padding-top: 5px;'>" + this.project + "</strong></li>";
		}
		html += "<ul>"
		for(x in this.layers){
			var l =  this.layers[x];

			var lattr = "checked"; 
			var lstyle = "color:black";
					
			html += "<li class='layerTree' title='" + l.title + "'>" +	
			
				"	<input type='checkbox' class='toogleLayer' " +
				"			id_layer="+x+" father="+this.father+ " " + (l.visible ? lattr :"") +" tipo=" + (l.tipo=="geoJson" ? "vectorial":l.tipo) + " + idCapa='" + l.id +"'>" +
				
					"<img class='remove' src='application/views/img/MED_icon_papelera_panel.png' title='Opacity 100 %' id_layer='" + x + "'>";
					
					if(l.tipo != "geoJson" && l.tipo != "simbolo"){
						html += "<img class='opacity' src='application/views/img/MED_icon_opacity.png' title='Opacity 100 %'>";
					}else{
						html += "<img class='opacity' style='margin-left: -9px; visibility:hidden' src=''>";
					}
//					if(l.leyenda){
						html += "<img class='legend' src='application/views/img/MED_icon_leyenda.png' title='Leyenda' id_layer='" + x + "'>";
//					}
					html += "<span contenteditable='false' class='ellipsis'>"+ (l.alternativeTitle ? l.alternativeTitle:l.title) +"</span>";
					if(l.tipo != "geoJson" && l.tipo != "simbolo"){
						html += "<div class='opacity_panel' style='display: none;'>" +
						"<span class='opacity_label'>Opacity " + (l.layer.options.opacity * 100).toFixed(0) +" %</span>" +
						"<div class='slider' opacity='" + (l.layer.options.opacity * 100).toFixed(0) + "'></div>" +
					"</div>";
					}
				html += "</li>";
			
		}
		html += "</ul>"

		html += "<li style='background: none; cursor: initial;' class='disableSortable' ><a class='add_layer' href='#'>+ Añadir capas de un servicio externo</a></li>"; 
		return html;		
	};
	
	this.refreshLayerPanel = function($panel){
		$panel.html(this.getHTMLLayersPanel());
		var self = this;
		
		$panel.find(".slider").slider({
			max: 100,
			min: 0,
			value: 100,
			create: function(event, ui){
				$(this).slider("value",$(this).attr("opacity"))
			},
			stop: function( event, ui ){
				$(ui.handle).closest(".opacity_panel").find(".opacity_label").html("Opacity "+ ui.value + " %");
				var id_layer = $(ui.handle).closest(".opacity_panel").siblings("input").attr("id_layer");
				$(ui.handle).closest(".opacity_panel").siblings("img").attr("title","Opacity " + ui.value +" %");
				var l = self.layers[id_layer];
				l.layer.setOpacity(ui.value/100);
			}
		}).draggable();
		
		$panel.find("ul").sortable({

			start: function( event, ui ) {
				$(ui.item).css("background-color","#f2f7fb");
			},
			stop: function( event, ui ) {
				// $(ui.item).css("background-color","#fff");
				var id_layer = $(ui.item).find("input").attr("id_layer");
				var l = self.layers[id_layer];
				self.layers.splice(id_layer,1);
				var new_idx = $(ui.item).index();
				self.layers.splice(new_idx,0,l);
				
				//change priority of all layer with bigger priority
				for(var i=0;i<self.layers.length;i++){
					self.layers[i].layer.setZIndex(self.layers.length-i);
				}
				var checks = $(ui.item).parent().find(".layerTree").find("input[type='checkbox']");
				for(var i=0; i<checks.length; i++){
					$(checks[i]).attr("id_layer",i);
				}
			}
		});

		$panel.find(".layerTree span").click(function(){
			$(self.getMap()._container).removeClass("cursor_info");
			self.getMap().off("click");
			var layer = $(this).closest(".layerTree");
			if(layer.hasClass("active")){
				layer.removeClass("active");

			}else{

				$(this).closest(".layer_panel").find(".layerTree").each(function() {
					$(this).removeClass("active");
				});	
				layer.addClass("active");
				$(self.getMap()._container).addClass("cursor_info");
				var id_layer = $(this).parent().find("input").attr("id_layer");
				self.getMap().on("click",function(e){
					showInfoFancybox("<div id='container_feature_info'>" + "Cargando..." + "</div>");
					self.featureInfo(e,id_layer)
				});
			}
			// self.featureInfo(e,id_capa);
		});

		$panel.find(".layerTree span").dblclick(function(){
			if($(this).siblings("input").attr("tipo") != "vectorial"){
				$(this).attr('contentEditable',true);
				this.focus();
			}
		}).blur(
	        function() {
	            if($(this).siblings("input").attr("tipo") != "vectorial"){
	            	$(this).attr('contentEditable', false);
	            	self.layers[$(this).siblings("input").attr("id_layer")].alternativeTitle = $(this).text();
	            }
	        });

		$panel.disableSelection();
		$panel.sortable({ cancel: '.disableSortable' });
		
		$panel.find("li > img.opacity").click(function(){
			var $opacity_panel = $(this).siblings(".opacity_panel");
			if(navigator.userAgent.match(/iPad/i) == null){
				var $li = $(this).parent(); 
				if ($opacity_panel.is(":visible")){
					$li.animate({"height": $li.height() - $opacity_panel.outerHeight()});
					$opacity_panel.slideUp();
					$li.css("border-bottom","1px solid #ccc");
				}
				else{
					$li.animate({"height": $li.height() + $opacity_panel.outerHeight()});
					$opacity_panel.slideDown();
					$li.css("border-bottom","none");
				}
			}else{
				if ($opacity_panel.is(":visible")){
					$opacity_panel.hide();
					$opacity_panel.find(".opacity_label").show();
				}else{
					$(".opacity_panel").hide();
					$opacity_panel.find(".opacity_label").hide();
					$opacity_panel.show();
					$opacity_panel.addClass('prueba');
					$opacity_panel.find(".slider").height(50);
					$opacity_panel.find(".slider").width(150);
				}
			}
			
		});
		
		$panel.find("li > img.legend").click(function(){
			
			var id_layer = $(this).parent().find("input").attr("id_layer");
			var id_capa = $(this).parent().find("input").attr("idCapa");
			var tipo = $(this).parent().find("input").attr("tipo");
			
			if(!$(".infoCatalogo .cuerpoInfoCatalogo").is(":visible") || $(".cuerpoInfoCatalogo").find(".id").text() == id_layer){
				$(".infoCatalogo .petaniaInfoCatalogo").trigger("click");
			}
			//Si la capa viene de un servicio externo
			if(id_capa == -1){
				self._drawInfoFromService(self.layers[id_layer]);
			}else{
				$(".contenidoCatalogo div[idCapa='" + id_capa + "'][tipo='" + tipo +"']").trigger("click");	
			}
			
		});
		
		$panel.find("li > img.remove").click(function(){
			var id_layer = $(this).parent().find("input[type='checkbox']").attr("id_layer");
			if(id_layer == "panoramio"){
				self.__panoramios? self.getMap().removeLayer(self.__panoramios):null;
				self.capaPanoramios = false;
				self.mostrarPanoramios = false;
			}else{
				self.layers[id_layer].setVisibility(false, self.map, null);
				self.layers.splice(id_layer,1);
				
				for(var i=0;i<self.layers.length;i++){
					self.layers[i].layer.setZIndex(self.layers.length-i);
				}
				
				if($(this).closest(".layerTree").hasClass("active")){
					$(self.getMap()._container).removeClass("cursor_info");
					self.getMap().off("click");
				}
			}

			$(this).parent().animate({"width":'0px'}, function(){
				var checks = $(this).parent();
				$(this).remove();
				var checks = checks.find("input[type='checkbox']");
				for(var i=0; i<checks.length; i++){
					$(checks[i]).attr("id_layer",i);
				}
			});
			
			event.stopPropagation();
		});

		$panel.find(".toogleLayer").click(function(){
			Split.toggleLayer($(this).attr("id_layer"),$(this).attr("father"),$(this).is(":checked"));
		});
		
		//Fancybox de servicios
		$panel.find(".add_layer").click(function(){
			$.fancybox($("#service_fancy_box_data"), {
				'width':'660',
				"height": "auto",
			    'autoDimensions':false,
			    'autoSize':false,
			    "visibility":"hidden",
			    'closeBtn' : false,
			    "openEffect" : "fade",		   
			    'scrolling'   : 'no',
			    helpers : {
			        overlay : {
			            	css : {
			            		'background' : 'none',
			            		'border-radius' : '0',
			            	}
			        }
			    },
			    // afterShow: function () {
			    	
			    // }
			});
		});

		$("#service_fancy_box_data select").unbind().change(function(){
    		if($(this).val() == "WMS" || $(this).val() == "WMTS"){
    			if($(this).parent().find(".tabla_fancy_service").children().length > 0){
    				$(this).parent().find(".info_fancy_service").slideUp();
    				$(this).parent().find(".tabla_fancy_service").slideDown();
    			}else{
    				$(this).parent().find(".info_fancy_service").slideDown()
    			}
    			
    			$(this).parent().find(".input_fancy").hide();
    			$(this).parent().find("input[type='button']").val("Explorar servicio");
    		}else{
    			$(this).parent().find(".info_fancy_service").slideDown()
    			$(this).parent().find(".input_fancy").fadeIn(700);
    			$(this).parent().find(".tabla_fancy_service").slideUp();
    			$(this).parent().find("input[type='button']").val("Añadir directamente al panel de capas");
    		}
    	});

    	$("#service_fancy_box_data h2").unbind().click(function(){
    		$.fancybox.close();
    	});

    	$("#service_fancy_box_data input[type='button']").unbind().click(function(){
    		var select = $(this).parent().find("select").val()
    		var server = $($(this).parent().find("input[type='text']")[0]).val();
    		var serverWms = ((server.lastIndexOf("/") == server.length-1)? server.slice(0,-1):server) + "?REQUEST=GetCapabilities&SERVICE=" + select;
    		var name = $($(this).parent().find("input[type='text']")[1]).val();
    		var selfBoton = this;
    		
    		$(".urlServicioWms").val(serverWms);
    		
    		if((select == "WMS" || select == "WMTS") && server != "" && server != "url"){
    			$(this).val("Cargando...");
	    		$(this).addClass("cargadoServicio");
    			url = serverWms
    			$.ajax({
    				url : "application/views/proxy.php",
    				data: { "url": url},
    				dataType: 'xml',
    				type: "POST",			
    		        success: function(xml) {
    		        	var sistemasErroneos = false;
    		        	if(xml){
	    		        	var html = '<ul class="families" style="padding-top:0px;">' +
				    						'<li class="close" style="background-color: rgb(236, 237, 239);">';
				    		
	    		        	var layerPadre = $(xml).find("Layer")[0];
	    		        	var version = $($(xml).find("*")[0]).attr("version");
				    		// $(xml).find("Layer").slice(1).each(function(){
				    		$(xml).find("Layer").each(function(){
				    			if($($(this).find("SRS")).text().indexOf("900913") > 0 || $($(this).find("SRS")).text().indexOf("3857")>0 || $(layerPadre).find("SRS").text().indexOf("900913") > 0 || $(layerPadre).find("SRS").text().indexOf("3857")){
				    				var keyLayerName;
				    				if(select == "WMS"){
				    					keyLayerName = "Name"
				    				}else{
				    					keyLayerName = "Identifier"
				    				}
				    				if($($(this).find(keyLayerName)[0]).text().length > 0){
						    				html +='<ul class="family_content" style="display: block;">' +
			    							'<li>' +
			    								'<p class="fleft mb ellipsis">' + $(this).find("Title").text() + '</p>' +
			    								'<div nombreCapa="' + $($(this).find(keyLayerName)[0]).text() + '" class="ml fleft mt">' +
			    									'<span class="tiposCapas">' + select +'</span>' +
			    								'</div>' +
			    								'<div class="clear"></div>'+
			    								'<span class="description">' + (($(this).find("Abstract").text() != "null") ? $(this).find("Abstract").text() : 'Sin descripción') + '</span>' +
			    								'<div class="clear"></div>' +
			    							'</li>' +
										'</ul>';
									}
				    				
				    			}else{
				    				sistemasErroneos = true;
				    			}
	    		        	});
				    		html +=	'</li></ul>';
				    		$(selfBoton).parent().find(".tabla_fancy_service").html(html);
				    		$(selfBoton).parent().find(".info_fancy_service").hide();						    		
		    				$(selfBoton).parent().find(".tabla_fancy_service").slideDown(function(){
		    				$.fancybox.update();
		    				if(sistemasErroneos){
		    					$(selfBoton).val("El servicio contiene capas con un sistema de referencia no soportado");
		    				}else{
		    					$(selfBoton).val("Explorar servicio");
		    				}
		    				});
		    				
		    				
		    				$(selfBoton).parent().find(".tiposCapas").click(function(){
		    					var title = $(this).parent().parent().find("p").text();
		    					var url = $(".urlServicioWms").val().replace("?REQUEST=GetCapabilities&SERVICE=" + select, "");
		    					var layer = $(this).parent().attr("nombreCapa");
		    					var leyenda = url.replace("/gwc/service", "");
		    					var description = $(this).parent().parent().find(".description").text();
		    					var wLayer = ";"
		    					if(select == "WMS"){
		    						wLayer = new GSLayerWMS(-1,title, url, layer, leyenda, null, description);
		    						wLayer.version = version;
		    						wLayer.simpleLayer = true;
		    						self.addLayer(wLayer);
		    					}else{
		    						wLayer = new GSLayerWMTS(-1,title, url, layer, leyenda, null, description);
		    						self.addLayer(wLayer);
		    					}
		    					
		    					
		    					// $.fancybox.close();
			    				if(!$("#panel_right .layer_panel").hasClass("close")){
			    					Split.toggleLayersInterface(Split.RIGHT);
			    				}
			    				if(!$("#panel_left .layer_panel").hasClass("close")){
			    					Split.toggleLayersInterface(Split.LEFT);
			    				}
			    				
			    				//Relleno el panel de la leyenda
			    				self._drawInfoFromService(wLayer);

		    				});
    		        	}else{
    		        		$(selfBoton).val("Servicio no encontrado");
    		        	}
    		        	$(selfBoton).removeClass("cargadoServicio");
    		        },
    		        error: function(){
    		        	$(selfBoton).removeClass("cargadoServicio");
    		        	$(selfBoton).val("Servicio no encontrado");
    		        }
    		    });
    			
    		}else{
    			if(server != "" && server != "url" && name != "" && name != "Título de la capa"){
    				// if(select == "WMTS"){
    				// 	self.addLayer(new GSLayerWMTS(-1,name, (server.lastIndexOf("/") == server.length-1)? server:(server+"/"), name, null));
    				// }else{
    				// 	self.addLayer(new GSLayerTMS(-1,name, (server.lastIndexOf("/") == server.length-1)? server:(server+"/"), name, null));
    				// }
    				var layerTMS = new GSLayerTMS(-1,name, (server.lastIndexOf("/") == server.length-1)? server:(server+"/"), name, null,null);
    				self.addLayer(layerTMS);
    				$.fancybox.close();
    				if(!$("#panel_right .layer_panel").hasClass("close")){
    					Split.toggleLayersInterface(Split.RIGHT);
    				}
    				if(!$("#panel_left .layer_panel").hasClass("close")){
    					Split.toggleLayersInterface(Split.LEFT);
    				}
    				
    				//Relleno el panel de la leyenda
    				self._drawInfoFromService(layerTMS);
    				
    			}
    		}
    	});

		//Fin fancybox de servicios
		
		$panel.find(".panoramio").unbind().click(function(){
			if($(this).find("input[type='checkbox']").is(":checked")){
				self.mostrarPanoramios = true;
				self.drawPanoramio();
			}else{
				self.mostrarPanoramios = false;
				if(self.__panoramios){
					self.getMap().removeLayer(self.__panoramios);
				}
			}
			 
			 
		});
		
	};

	this.refreshPanoramioCheck = function(check){
			if(this.getMap().getZoom() >= 11){
				$(check).find("input[type='checkbox']").prop("disabled",false);
				
			}else{
				$(check).find("input[type='checkbox']").prop("disabled",true);
				$(check).find("input[type='checkbox']").prop("checked",false)
				this.mostrarPanoramios = false;
			}
	};
	
	this.drawPanoramio = function(){
		var self = this;
		if(this.getMap().getZoom() >= 11 && self.mostrarPanoramios){
			$.ajax({
				url : "application/views/proxy.php",
				data: { "url": "http://www.panoramio.com/map/get_panoramas.php?order=public&set=full&from=0&to=200&minx=" + this.getMap().getBounds()._southWest.lng + "&miny=" + this.getMap().getBounds()._southWest.lat + "&maxx=" + this.getMap().getBounds()._northEast.lng + "&maxy=" + this.getMap().getBounds()._northEast.lat + "&size=mini_square&mapfilter=true"},
				type: "POST",
				dataType: "json",
		        success: function(data) {
		   
		   			if(self.__panoramios){
						self.getMap().removeLayer(self.__panoramios);
					}
		   			self.__panoramios = new L.MarkerClusterGroup();
		   			for(var i=0; i<data.photos.length; i++){

						var marker = L.marker([data.photos[i].latitude, data.photos[i].longitude], {icon: new L.icon({iconUrl: 'application/views/img/ERO_icon_map_panoramio.png', zIndexOffset:1000}),value : data.photos[i].photo_file_url, date:data.photos[i].upload_date});
		        		marker.on('click', function(){
		        			showInfoFancybox("<span style='position: absolute;right: 10px;bottom: 10px;color: white;'>" + this.options.date +"</span><img style='height:" + $("#panel_left").outerHeight() + "' src='" + this.options.value.replace("mini_square","large").replace("mw2.google.com/mw-panoramio","static.panoramio.com") + "'/>");
		        		});

		   				self.__panoramios.addLayer(marker);
		   			}
		   			self.getMap().addLayer(self.__panoramios);
		        }
		    });
		}else{
			if(self.__panoramios){
				self.getMap().removeLayer(self.__panoramios);
				self.mostrarPanoramios = false;
			}
		}
	};
	
	/* Toogle a given layer*/
	this.toogleLayer = function(id_layer,checked){
		// get the layer
		var l =  this.layers[id_layer];
		l.visible = checked;
		this.__refreshLayer(l);
	};
		
	this.setHistogram = function(id_layer){
		this.__layerHistogram = this.layers[id_layer];
	};
	
	/* Draw a given layer */
	this.__drawLayer = function (l){		
		// the layer is visible so let's draw it
		var markers = [];
		// create the proportional symbol for each point
		for (var i=0;i<l.json.length;i++){
			// get the info of the point to draw
			var p = l.json[i];
			// calculate the size based on the value of the point and the mulFactor
			var size = Math.abs(p.value) * l.valueFactor;
			// create the point on leaflet
			if(l.type==0) color = l.color1;
			if(l.type==1)
			{
				if(p.value>=0)
				{
					var color = l.color1;
				}
				else
				{
					var color = l.color2;
				}
			}

			var myIcon = L.divIcon({		
				className: 'symbol-marker',
				iconSize: new L.Point(size, size),
				html: '<div style="height:'+size+';width:'+size+';background-color:'+color+'"></div>'
			});

			markers.push(new L.marker([p.point.lat, p.point.lng],{icon: myIcon}));

		}
		if (l.points){
			// layer not visible, let's remove it from the map
			l.points.clearLayers();
		}
		/// assign all the point to a group layers to make easy the plugin and plugout.
		l.points = new L.layerGroup(markers);
		// draw the group layers
		l.points.addTo(this.map);
	};
		
	this.__refreshLayerClosure = function (caller,l,bbox){
		$.ajax({
			url: base_url + "erosion/points/"+l.source+"/"+caller.bbox+"/"+l.baseRetriever,
			dataType: "json",
			success:function(json){
				// store the layer in the closure GroupLayer.layers
				l.json = json;				
				caller.__drawLayer(l);
			}
		});
	};
	
	this.refreshLayers = function(){		
		for(var i=0;i<this.layers.length;i++){
			var l = this.layers[i];
			this.__refreshLayer(this.layers[i]);						
		}
	};
	
	this.__refreshLayer = function(l){
		// refresh BBOX
		this.__refreshBBOX();
			
		if (l.visible){
			l.setVisibility(true, this.map);
		}else{
			l.setVisibility(false, this.map);
		}
	};
	
	this.__refreshBBOX = function(){
		this.bbox = this.map.getBounds().getSouthWest().lng + "/" + this.map.getBounds().getSouthWest().lat + "/"
					+ this.map.getBounds().getNorthEast().lng + "/" + this.map.getBounds().getNorthEast().lat;
	};

	this.containLayer = function(id, type, alternativeTitle){
		if(type == "vectorial"){
			type = "geoJson";
		}
		for(i=0; i<this.layers.length; i++){
			if(this.layers[i].id == id && this.layers[i].tipo == type){
				if(this.layers[i].alternativeTitle == alternativeTitle){
					return true;
				}
			}
		}
		return false;
	};
	/****************************************/
	/********** MEMBERS  ********************/
	/****************************************/
	this.map = opts.map;	
	this.father = opts.father;
	this.layers = null;
	this.project = null;
	this.__layerHistogram = null;
	this.__active = true;
	this.__panoramios = null;
	this.mostrarPanoramios = false;
	this.capaPanoramios = false;
	this.callejero = new L.GoogleStreet();
	this.layers = new Array();
	
	var gSatellite = new L.Google('SATELLITE'),
		noMap = new L.Google('SATELLITE'),
		gTerrain = new L.Google('TERRAIN'),
		gRoad = new L.Google('ROADMAP'),
		bingSatellite =  new L.BingLayer("Ah02iHhuuQ1AQK_EQt_vc513bIwSVYgCQiZnSdlyux_G7o5LDPGHhLK30tZRvFn5", {type: "AerialWithLabels", maxZoom:20}),
		bingRoad =  new L.BingLayer("Ah02iHhuuQ1AQK_EQt_vc513bIwSVYgCQiZnSdlyux_G7o5LDPGHhLK30tZRvFn5", {type: "Road", maxZoom:20},
		openStreetMap =  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
		);
	
	noMap.options.opacity = 0
	noMap.options.mapOptions.backgroundColor = "black";
	
	this.map.addLayer(gSatellite);

	var position = this.father == Split.LEFT ?  'topleft' : 'topright';
	
	L.control.layers(
					 {
						 'Google satélite':gSatellite,
						 'Google relieve': gTerrain,
						 'Google callejero' : gRoad,
						 'Bing satélite' : bingSatellite,
						 'Bing callejero' : bingRoad,
						 'Sin mapa base':noMap,
						 // 'OpenStreetMap' : openStreetMap
					 },null,{position: position}).addTo(this.map);

	this.refreshLayers();
	
	
	this.addLayer = function(gsLayer){
		
		this.layers.unshift(gsLayer);
		gsLayer.setVisibility(true, this.map, this.layers.length);
		
	};
	
	this.removeLayer = function(title, tipo){
		for(var i=0; i<this.layers.length; i++){
			if(this.layers[i].title == title && this.layers[i].tipo == tipo){
				this.layers[i].setVisibility(false, this.map, null);
				this.layers.splice(i,1);
				break;
			}
		}
	};
	
	this.__getLegendContainer = function(){
		return $("<div class='flotable_legend ui-widget ui-widget-content' >"
							+	"<h4>" 
							+		"<img src='application/views/img/MED_icon_leyenda.png' />"
							+		"<p class='title'></p>"
							+		"<img class='close' src='application/views/img/MED_icon_delete.png' />"
							+	"</h4>"
							+	"<div class='co_legend'>"							
							+	"</div>"			
							+	"</div>");
					
					
	};
	
	this.__addLegendDOM= function($container,$el){
		$container.prepend($el);
	
		$el.css("left",($container.width() / 2 ) - $el.width());
		$el.css("top",($container.height() / 2 ) - ($el.height() / 2));
					
		$el.find(".close").click(function(){
			$el.fadeOut(function () {
				$(this).remove();
			});
		});
		
		$el.draggable();
	};

	this._drawInfoFromService = function(layer){
		//Relleno el panel de la leyenda
		$(".deleteProyect").hide();
		$(".defaultProject").hide();
		$("#commentsVector").hide();
		$("#geometryVector").hide();
		$("#addHistoryForm").hide();
		
		$(".infoCatalogo .petaniaInfoCatalogo").show();
		if(!$(".infoCatalogo .cuerpoInfoCatalogo").is(":visible")){
			$(".infoCatalogo .petaniaInfoCatalogo").trigger("click");
		}
		$(".cuerpoInfoCatalogo").find(".title1").text(layer.title);
		$(".cuerpoInfoCatalogo").find(".title1").prop('title', layer.title);
		//Necesario por si la capa no trae descripción
		$(".cuerpoInfoCatalogo").find(".title2").text("");

		$(".cuerpoInfoCatalogo").find(".title2").text(layer.description);
		$(".cuerpoInfoCatalogo").find(".listaTiposLeyenda").html("");
		var leyenda = layer.url.replace("/gwc/service", "");
		var legendUrl = leyenda.replace("/gwc/service", "") + "?TRANSPARENT=true&SERVICE=WMS&VERSION=" + layer.version + "&REQUEST=GetLegendGraphic&"
		+"EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + layer.name;
		$(".cuerpoInfoCatalogo").find(".divLeyenda").html("<img src='" + legendUrl +"'/>");
		$(".cuerpoInfoCatalogo").find(".divLeyenda").css({"height": "auto"});
		
		$(".extraLeyenda").show();
		$(".botonAddImageLeyenda").hide();
	}
	
	this.featureInfo = function(e,id){
		
		if(!id){
			id = 0;
		}
		
		var map = this.getMap();
		var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';
		    
		// var BBOX = map.getBounds().toBBoxString();
		var aux = L.CRS.EPSG3857.project(map.getBounds()._southWest)
		var BBOX = aux.x + "," + aux.y + ","
		aux = L.CRS.EPSG3857.project(map.getBounds()._northEast)
		BBOX += aux.x + "," + aux.y
		var WIDTH = map.getSize().x;
		var HEIGHT = map.getSize().y;
		var X = map.layerPointToContainerPoint(e.layerPoint).x;
		var Y = map.layerPointToContainerPoint(e.layerPoint).y;
		    
		var layers = null;   
		var server = null;
		var requestIdx = null;
		
		// for (var i=id;i<this.layers.length;i++){
		// 	var l = this.layers[i];
		// 	if (l.visible && l.layer.options.opacity>0){
		// 		server = l.url;
		// 		layers = l.name;
		// 		requestIdx = i;
		// 		break;
		// 	}
		// }

		var l = this.layers[id];
		if (l.visible && l.layer.options.opacity>0){
			server = l.url;
			layers = l.name;
			requestIdx = i;
		}
		
		if (layers==null || server==null || requestIdx==null)
		{
			$("#container_feature_info").html("No hay información sobre este punto");
			
			return;
		}
		
		var request = server + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=' +layers+'&QUERY_LAYERS='+layers+'&STYLES=&BBOX='+BBOX+'&FEATURE_COUNT=5&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&FORMAT=image%2Fpng&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A3857&X='+X+'&Y='+Y;
		request = request.replace("wmts","wms");
	    
		var obj = this;
	    $.ajax({
			url : "application/views/proxy.php",
			data: { "url": request},	       
			type: "POST",			
	        success: function(data) {
	        	try {
		        	if (!data || data.indexOf("LayerNotQueryable")!=-1){
		        		// obj.featureInfo(e,requestIdx+1);
		        	}
		        	else{
		        		if(data.substring(data.indexOf('<body>') + 6,data.indexOf('</body>')).trim().length > 0){
		        			$("#container_feature_info").html(data);
		        		}else{
		        			// if(requestIdx < obj.layers.length){
		        			// 	// obj.featureInfo(e,requestIdx+1);
		        			// }else{
		        			// 	$("#container_feature_info").html("No hay información sobre este punto");
		        			// }
		        			$("#container_feature_info").html("No hay información sobre este punto");
		        		}
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
		
	};
}
