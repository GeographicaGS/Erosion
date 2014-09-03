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
//		var html = "<li>Erosión en deltas mediterráneos</li>";
		var html = "";
		
		//Añado la capa de  Panoramio
		if(this.capaPanoramios){
			html += "<li class='panoramio disableSortable' style='cursor:pointer' title='Panoramio'><img class='remove' src='application/views/img/MED_icon_papelera_panel.png'/><input id_layer='panoramio' type='checkbox' "+ (this.getMap().getZoom()>=11? '' : 'disabled') + " " + (this.mostrarPanoramios && this.getMap().getZoom()>=11 ? 'checked':'') + " class='toogleLayer'/> <span class='ellipsis'>Panoramio (visble a partir de zoom 11)</span></li>";
		}
		
		if(this.project){
			html += "<li style='background: none; cursor: initial;' class='disableSortable'><img style='float:left; padding-right: 10px; padding-left: 0;' src='application/views/img/ERO_icon_proyecto.png'><strong class='ellipsis' title='" + this.project + "' style='display: block; padding-top: 5px;'>" + this.project + "</strong></li>";
		}
		html += "<ul>"
		for(x in this.layers){
			var l =  this.layers[x];
//			var lattr = l.visible ? "checked" : ""; 
//			var lstyle = l.visible ? "color:black" : "";
			var lattr = "checked"; 
			var lstyle = "color:black";
					
			html += "<li class='layerTree' title='" + l.title + "'>" +	
			
				"	<input type='checkbox' class='toogleLayer' " +
				"			id_layer="+x+" father="+this.father+ " " + (l.visible ? lattr :"") +" tipo=" + (l.tipo=="geoJson" ? "vectorial":l.tipo) + " + idCapa='" + l.id +"'>" +
				
					"<img class='remove' src='application/views/img/MED_icon_papelera_panel.png' title='Opacity 100 %' id_layer='" + x + "'>";
					
					if(l.tipo != "geoJson" && l.tipo != "simbolo"){
						html += "<img class='opacity' src='application/views/img/MED_icon_opacity.png' title='Opacity 100 %'>";
					}else{
						html += "<img class='opacity' style='margin-left: -11px;' src=''>";
					}
//					if(l.leyenda){
						html += "<img class='legend' src='application/views/img/MED_icon_leyenda.png' title='Leyenda' id_layer='" + x + "'>";
//					}
					html += "<span class='ellipsis'>"+l.title+"</span>";
					if(l.tipo != "geoJson" && l.tipo != "simbolo"){
						html += "<div class='opacity_panel' style='display: none;'>" +
						"<span class='opacity_label'>Opacity " + (l.layer.options.opacity * 100).toFixed(0) +" %</span>" +
						"<div class='slider' opacity='" + (l.layer.options.opacity * 100).toFixed(0) + "'></div>" +
					"</div>";
					}
				html += "</li>";
			
		}
		html += "</ul>"
		
		
//		html += "<li style='background: none; cursor: initial;' class='disableSortable' onclick='navigate(1)'><a class='addCatalog' href='#'>+ Añadir capas del <strong>Catálogo</strong></a></li>";
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
//			out: function(event, ui) {
//				var leftGap = 70;					
//				if ((ui.position.left + leftGap) < 0 ){
//					var id_layer = $(ui.item).find("input").attr("id_layer");
//					obj.removeLayer(id_layer);
//				}
//			},
			start: function( event, ui ) {
				$(ui.item).css("background-color","#f2f7fb");
			},
			stop: function( event, ui ) {
				$(ui.item).css("background-color","#fff");
				var id_layer = $(ui.item).find("input").attr("id_layer");
//				var idx = obj.findLayerIdxById(id_layer);
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
			// var id_layer = $(this).parent().find("input[type='checkbox']").attr("id_layer");
			// var $container = $(self.map.getContainer()).parent();
			// var $el = self.__getLegendContainer();
			// $el.hide(); //Para que aparezca de forma animada
			// var dibjuarLeyenda = true;
			
			// $el.find("h4").find("p").text($(this).parent().attr("title"))
			
			// var legendUrl = self.layers[id_layer].leyenda.replace("/gwc/service", "") + "?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&"
			// +"EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + self.layers[id_layer].name;
			
			// $el.find(".co_legend").html("<img src='" + legendUrl +"'/>");
			
			// //Si esta leyenda ya se esta mostrando la elimino
			// var leyendas = $container.find(".flotable_legend");
			// for(var i=0; i<leyendas.length; i++){
			// 	if($(leyendas[i]).find("h4").find("p").text() == $el.find("h4").find("p").text()){
					
			// 		$(leyendas[i]).fadeOut(function () {
			// 			$(this).remove();
			// 		});
			// 		dibjuarLeyenda = false;
			// 		break;
			// 	}	
			// }
			// if(dibjuarLeyenda){
			// 	self.__addLegendDOM($container,$el);
			// 	$el.fadeIn(); //Para que aparezca de forma animada
			// }
			
			var id_layer = $(this).parent().find("input").attr("id_layer");
			var id_capa = $(this).parent().find("input").attr("idCapa");
			var tipo = $(this).parent().find("input").attr("tipo");
			
			if(!$(".infoCatalogo .cuerpoInfoCatalogo").is(":visible") || $(".cuerpoInfoCatalogo").find(".id").text() == id_layer){
				$(".infoCatalogo .petaniaInfoCatalogo").trigger("click");
			}

			$("div[idCapa='" + id_capa + "'][tipo='" + tipo +"']").trigger("click");


			// $(".cuerpoInfoCatalogo").find(".id").text(id_layer);
			// $(".cuerpoInfoCatalogo").find(".title1").text(self.layers[id_layer].title);
			// $(".cuerpoInfoCatalogo").find(".title1").prop('title', self.layers[id_layer].title);
			// $(".cuerpoInfoCatalogo").find(".title2").text("");
			// $(".extraLeyenda").show();
			// $(".botonAddImageLeyenda").hide();
			// $(".cuerpoInfoCatalogo").find(".listaTiposLeyenda").html("");
			// $(".cuerpoInfoCatalogo").find(".divLeyenda").html("<div class='diagonal1'></div><div class='diagonal2'></div>");
			// $(".cuerpoInfoCatalogo").find(".divLeyenda").css({"height": ""});
			// if(self.layers[id_layer].tipo == "wms"){
			// 	var legendUrl = self.layers[id_layer].url.replace("/gwc/service", "") + "?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&"
			// 	+"EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + self.layers[id_layer].name;
			// 	$(".cuerpoInfoCatalogo").find(".divLeyenda").html("<img src='" + legendUrl +"'/>");
			// 	$(".cuerpoInfoCatalogo").find(".divLeyenda").css({"height": "auto"});
			// }
			
			
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
		
		$panel.find(".add_layer").click(function(){
			$.fancybox($("#service_fancy_box_data").html(), {
				'width':'660',
				"height": "auto",
			    'autoDimensions':false,
			    'autoSize':false,
			    "visibility":"hidden",
			    'closeBtn' : false,
			    "openEffect" : "elastic",		   
//			    'openSpeed' : 500,
//			    'closeEffect' : "elastic",
//			    'closeSpeed' : 500,
			    'scrolling'   : 'no',
			    helpers : {
			        overlay : {
			            	css : {
			            		'background' : 'none',
			            		'border-radius' : '0',
			            	}
			        }
			    },
			    afterShow: function () {
			    	$("select").on("change",function(){
			    		if($(this).val() == "WMS"){
			    			if($(this).parent().find(".tabla_fancy_service").children().length > 0){
			    				$(this).parent().find(".info_fancy_service").slideUp();
			    				$(this).parent().find(".tabla_fancy_service").slideDown();
			    			}else{
//			    				$(this).parent().find(".info_fancy_service").show();
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
			    	$("h2").on("click",function(){
			    		$.fancybox.close();
			    	});
			    	$("input[type='button']").on("click",function(){
			    		var select = $(this).parent().find("select").val()
			    		var server = $($(this).parent().find("input[type='text']")[0]).val();
			    		var serverWms = ((server.lastIndexOf("/") == server.length-1)? server.slice(0,-1):server) + "?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS";
			    		var name = $($(this).parent().find("input[type='text']")[1]).val();
			    		var selfBoton = this;
			    		
			    		$(".urlServicioWms").val(serverWms);
			    		
			    		if(select == "WMS" && server != "" && server != "url"){
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
							    		$(xml).find("Layer").slice(1).each(function(){
							    			if($($(this).find("SRS")).text().indexOf("900913") > 0 || $($(this).find("SRS")).text().indexOf("3857")>0 || $(layerPadre).find("SRS").text().indexOf("900913") > 0 || $(layerPadre).find("SRS").text().indexOf("3857")){
							    				html +='<ul class="family_content" style="display: block;">' +
				    							'<li style="border-top: 1px dotted #ccc; height:auto;">' +
//				    								'<img style="margin-left: 0px" src="application/views/img/MED_icon_layer.png">' +
				    								'<p class="fleft mb">' + $(this).find("Title").text() + '</p>' +
//				    								'<img style="margin-top:0px;" src="application/views/img/MED_icon_add_layer.png">' +
//				    								'<p class="fleft" style="font-size:11px; clear: none; margin-left: 0px;">AÑADIR A CAPAS:</p>' +
				    								'<div nombreCapa="' + $($(this).find("Name")[0]).text() + '" class="ml fleft mt">' +
				    									'<span class="tiposCapas">WMS</span>' +
				    								'</div>' +
				    								'<div class="clear"></div>'+
				    								'<span style="font-size:11px; margin-left:40px; display:flex; line-height:36px;">' + (($(this).find("Abstract").text() != "null") ? $(this).find("Abstract").text() : 'Sin descripción') + '</span>' +
//				    								'<div nombreCapa="' + $($(this).find("Name")[0]).text() + '">' +
//				    									'<img class="tiposCapas" src="application/views/img/ERO_icon_link_naranja.png">' +
//				    								'</div>' +
				    								'<div class="clear"></div>' +
				    							'</li>' +
		    								'</ul>';
							    				
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
					    				
					    				
					    				$(selfBoton).parent().find(".tiposCapas").on("click",function(){
					    					var title = $($(this).parent().parent().find("span")[0]).text();
					    					var url = $(".urlServicioWms").val().replace("?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS", "");
					    					var layer = $(this).parent().attr("nombreCapa");
					    					var leyenda = url.replace("/gwc/service", "");
					    					self.addLayer(new GSLayerWMS(-1,title, url, layer, leyenda));
					    					
					    					$.fancybox.close();
						    				if(!$("#panel_right .layer_panel").hasClass("close")){
						    					Split.toggleLayersInterface(Split.RIGHT);
						    				}
						    				if(!$("#panel_left .layer_panel").hasClass("close")){
						    					Split.toggleLayersInterface(Split.LEFT);
						    				}
						    				
						    				
						    				//Relleno el panel de la leyenda
						    				$(".infoCatalogo .petaniaInfoCatalogo").show();
						    				if(!$(".infoCatalogo .cuerpoInfoCatalogo").is(":visible")){
						    					$(".infoCatalogo .petaniaInfoCatalogo").trigger("click");
						    				}
						    				$(".cuerpoInfoCatalogo").find(".title1").text(title);
						    				$(".cuerpoInfoCatalogo").find(".title1").prop('title', title);
						    				$(".cuerpoInfoCatalogo").find(".title2").text("");
						    				$(".cuerpoInfoCatalogo").find(".listaTiposLeyenda").html("");
						    				var legendUrl = leyenda.replace("/gwc/service", "") + "?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&"
						    				+"EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + layer;
						    				$(".cuerpoInfoCatalogo").find(".divLeyenda").html("<img src='" + legendUrl +"'/>");
						    				$(".cuerpoInfoCatalogo").find(".divLeyenda").css({"height": "auto"});
						    				
						    				$(".extraLeyenda").show();
						    				$(".botonAddImageLeyenda").hide();
						    				
						    				
						    				
						    				
						    				
						    				
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
			    				if(select == "WMTS"){
			    					self.addLayer(new GSLayerWMTS(-1,name, (server.lastIndexOf("/") == server.length-1)? server:(server+"/"), name, null));
			    				}else{
			    					self.addLayer(new GSLayerTMS(-1,name, (server.lastIndexOf("/") == server.length-1)? server:(server+"/"), name, null));
			    				}
			    				$.fancybox.close();
			    				if(!$("#panel_right .layer_panel").hasClass("close")){
			    					Split.toggleLayersInterface(Split.RIGHT);
			    				}
			    				if(!$("#panel_left .layer_panel").hasClass("close")){
			    					Split.toggleLayersInterface(Split.LEFT);
			    				}
			    				
			    				//Relleno el panel de la leyenda
			    				$(".infoCatalogo .petaniaInfoCatalogo").show();
			    				if(!$(".infoCatalogo .cuerpoInfoCatalogo").is(":visible")){
			    					$(".infoCatalogo .petaniaInfoCatalogo").trigger("click");
			    				}
			    				$(".cuerpoInfoCatalogo").find(".title1").text(name);
			    				$(".cuerpoInfoCatalogo").find(".title1").prop('title', name);
			    				$(".cuerpoInfoCatalogo").find(".title2").text("");
			    				$(".cuerpoInfoCatalogo").find(".divLeyenda").html("<div class='diagonal1'></div><div class='diagonal2'></div>");
			    				$(".cuerpoInfoCatalogo").find(".divLeyenda").css({"height": ""});
			    				$(".cuerpoInfoCatalogo").find(".listaTiposLeyenda").html("");
			    				$(".extraLeyenda").hide();
			    				
			    			}
			    		}
			    	});
			    	
			    	$("input[type='text']").on("click",function(){
//			    		if($(this).val() == "url" || $(this).val() == "Título de la capa"){
			    			$(this).val("");
//			    		}
			    	});
			    }
			});
		});
		
		// $(".layerTree").unbind().on("click",function(){
		// 	var id_layer = $(this).find("input").attr("id_layer");
		// 	if(self.layers[id_layer].id != -1){
		// 		$(".family_content").find("li[idCapa=" + self.layers[id_layer].id + "]").trigger("click");
		// 	}else{
		// 		$(".infoCatalogo .petaniaInfoCatalogo").show();
		// 		if(!$(".infoCatalogo .cuerpoInfoCatalogo").is(":visible")){
		// 			$(".infoCatalogo .petaniaInfoCatalogo").trigger("click");
		// 		}
		// 		$(".cuerpoInfoCatalogo").find(".title1").text(self.layers[id_layer].title);
		// 		$(".cuerpoInfoCatalogo").find(".title1").prop('title', self.layers[id_layer].title);
		// 		$(".cuerpoInfoCatalogo").find(".title2").text("");
		// 		$(".extraLeyenda").show();
		// 		$(".botonAddImageLeyenda").hide();
		// 		$(".cuerpoInfoCatalogo").find(".listaTiposLeyenda").html("");
		// 		$(".cuerpoInfoCatalogo").find(".divLeyenda").html("<div class='diagonal1'></div><div class='diagonal2'></div>");
		// 		$(".cuerpoInfoCatalogo").find(".divLeyenda").css({"height": ""});
		// 		if(self.layers[id_layer].tipo == "wms"){
		// 			var legendUrl = self.layers[id_layer].url.replace("/gwc/service", "") + "?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&"
		// 			+"EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + self.layers[id_layer].name;
		// 			$(".cuerpoInfoCatalogo").find(".divLeyenda").html("<img src='" + legendUrl +"'/>");
		// 			$(".cuerpoInfoCatalogo").find(".divLeyenda").css({"height": "auto"});
		// 		}
		// 	}
		// });
		
		$panel.find(".panoramio").unbind().on("click",function(){
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
		
		// if(this.getMap().getZoom() >= 11){
		// 	$panel.find(".panoramio").find("input[type='checkbox']").prop("disabled",false);
		// 	if(self.mostrarPanoramios){
		// 		$panel.find(".panoramio").find("input[type='checkbox']").prop("checked",true);
		// 	}
		// }else{
		// 	$panel.find(".panoramio").find("input[type='checkbox']").prop("disabled",true);
		// 	$panel.find(".panoramio").find("input[type='checkbox']").prop("checked",false);
		// }

	};

	this.refreshPanoramioCheck = function(check){
		// if($(check).length > 0){
			if(this.getMap().getZoom() >= 11){
				$(check).find("input[type='checkbox']").prop("disabled",false);
				
			}else{
				$(check).find("input[type='checkbox']").prop("disabled",true);
				$(check).find("input[type='checkbox']").prop("checked",false)
				this.mostrarPanoramios = false;
			}
		// }
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
		   //      	var markers = Array();
		   //      	for(var i=0; i<data.photos.length; i++){
		   //      		var greenIcon = L.icon({
		   //      		    iconUrl: data.photos[i].photo_file_url,
		   //      		});
		       //  		var marker = new L.CircleMarker([data.photos[i].latitude, data.photos[i].longitude], {
					    //     radius: 5,
					    //     fillColor: '#FF6600',
					    //     color: '#FF6600',
					    //     opacity: 1,
					    //     fillOpacity: 1,
					    //     weight: 1,
					    //     clickable: true,
					    //     value : data.photos[i].photo_file_url,
					    // });
		       //  		marker.on('click', function(){
		       //  			showInfoFancybox("<img id='prueba' src='" + this.options.value.replace("mini_square","large").replace("mw2.google.com/mw-panoramio","static.panoramio.com") + "'/>");
		       //  		});
		        		
		   //      		markers.push(marker);
		   //      	}
		   //      	if(self.__panoramios){
					// 	self.getMap().removeLayer(self.__panoramios);
					// }
		   //      	self.__panoramios = L.layerGroup(markers);
		   //      	self.__panoramios.addTo(self.getMap());

		   			if(self.__panoramios){
						self.getMap().removeLayer(self.__panoramios);
					}
		   			self.__panoramios = new L.MarkerClusterGroup();
		   			for(var i=0; i<data.photos.length; i++){

		   				// var marker = new L.CircleMarker([data.photos[i].latitude, data.photos[i].longitude], {
					    //     radius: 5,
					    //     fillColor: '#FF6600',
					    //     color: '#FF6600',
					    //     opacity: 1,
					    //     fillOpacity: 1,
					    //     weight: 1,
					    //     clickable: true,
					    //     value : data.photos[i].photo_file_url,
					    // });

						var marker = L.marker([data.photos[i].latitude, data.photos[i].longitude], {icon: new L.icon({iconUrl: 'application/views/img/ERO_icon_map_panoramio.png'}),value : data.photos[i].photo_file_url});
		        		marker.on('click', function(){
		        			showInfoFancybox("<img style='height:" + $("#panel_left").outerHeight() + "' src='" + this.options.value.replace("mini_square","large").replace("mw2.google.com/mw-panoramio","static.panoramio.com") + "'/>");
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
	
	// this.refreshPanoramioStatus = function(check){
	// 	if($(check).length > 0){
	// 		if(this.getMap().getZoom() >= 11){
	// 			$(check).find("input[type='checkbox']").prop("disabled",false);
				
	// 		}else{
	// 			$(check).find("input[type='checkbox']").prop("disabled",true);
	// 			$(check).find("input[type='checkbox']").prop("checked",false)
	// 			this.mostrarPanoramios = false;
	// 		}
	// 	}
	// };
	
	
	
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
		
//		if (l.visible){
//			this.__refreshLayerClosure(this,l);
//		}
//		else{
//			if (l.points){
//				// layer not visible, let's remove it from the map
//				l.points.clearLayers();
//			}
//		}	
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
	
	//initialize context layers
	//this.ctxLayers = [];
	//var controlCtxLayers = {};
	//for(x in opts.ctxLayers){
	//	var ctx = opts.ctxLayers[x];
	//	this.ctxLayers[x] = new L.tileLayer.wms(ctx.server, {
	//	    layers: ctx.layers,
	//	    format: 'image/png',
	//	    transparent: true	    
	//	});
	//	controlCtxLayers[ctx.title] = this.ctxLayers[x];
	//	
	//	// add the layer group to map
	//	if (ctx.visible){
	//		//this.map.addLayer(this.ctxLayers[x]);	
	//		this.ctxLayers[x].addTo(this.map);
	//	}			
	//}
	//
	//// create a layer group with all the context layers
	//this.ctxLayerGroup = new L.layerGroup(this.ctxLayers);
	//
	
	
	var gSatellite = new L.Google('SATELLITE'),
		gTerrain = new L.Google('TERRAIN'),
		gRoad = new L.Google('ROADMAP'),
		bingSatellite =  new L.BingLayer("Ah02iHhuuQ1AQK_EQt_vc513bIwSVYgCQiZnSdlyux_G7o5LDPGHhLK30tZRvFn5", {type: "AerialWithLabels", maxZoom:20}),
		bingRoad =  new L.BingLayer("Ah02iHhuuQ1AQK_EQt_vc513bIwSVYgCQiZnSdlyux_G7o5LDPGHhLK30tZRvFn5", {type: "Road", maxZoom:20},
		openStreetMap =  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
		);
	
	// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	// }).addTo(map);
	
	this.map.addLayer(gSatellite);
	
	var orto56 = L.tileLayer('http://www.erosion.geographica.gs/tileado/00-orto56-result/{z}/{x}/{y}.png',{tms: true});
	var position = this.father == Split.LEFT ?  'topleft' : 'topright';
	
	var din_linea09 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'linea_09',
		format: 'image/png',
		transparent: true,
	});
	
	var din_linea77 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'linea_77',
		format: 'image/png',
		transparent: true,
	});
	
	var din_linea56 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'linea_56',
		format: 'image/png',
		transparent: true,
	});
	
	var din_tasa56_77 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'Tasas_1956_1977',
		format: 'image/png',
		transparent: true,
	});
	
	var din_tasa77_09 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'Tasas_1977_2009',
		format: 'image/png',
		transparent: true,
	});
	
	var din_tasa56_09 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/dinamica_litoral", {
		layers: 'Tasas_1956_2009',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi1 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_CoastalVulnerabilityIndex',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi2 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_geomorfologia',
		format: 'image/png',
		transparent: true,
	});
	
	
	var cvi3 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_topografia',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi4 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_nivel_mar',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi5 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_oleaje_significante',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi6 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_rango_mareal',
		format: 'image/png',
		transparent: true,
	});
	
	var cvi7 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/cvi", {
		layers: 'CVI_erosion',
		format: 'image/png',
		transparent: true,
	});
	
	
	var ufis = L.tileLayer.wms("http://193.147.172.37/cgi-bin/unidades_fisiograficas", {
		layers: 'unidades_fisiograficas_nv5',
		format: 'image/png',
		transparent: true,
	});
	
	var ufis2 = L.tileLayer.wms("http://193.147.172.37/cgi-bin/unidades_fisiograficas", {
		layers: 'unidades_fisiograficas_nv5',
		format: 'image/png',
		transparent: true,
		opacity : 0.5
	});
	
	var matrixIds3857= new Array(22);
    for (var i= 0; i<22; i++) {
        matrixIds3857[i]= {
            identifier    : "" + i,
            topLeftCorner : new L.LatLng(20037508,-20037508)
        };
    }


	//var wmts = new L.TileLayer.WMTS("http://wxs.ign.fr/6081235680374936929/geoportail/wmts",           {
	//	layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
	//	style: 'normal',
	//	tilematrixSet: "PM",
	//	matrixIds: matrixIds3857,
	//	format: 'image/jpeg'
	//});
	
	var matrixIds = new Array(26);
    for (var i=0; i<26; ++i) {
        //matrixIds[i] = "EPSG:900913:" + i;
		matrixIds[i]= {
            identifier    : "EPSG:900913:" + i,
            topLeftCorner : new L.LatLng(20037508,-20037508)
        };
		
    }

//    var MTNbase = new OpenLayers.Layer.WMTS({
//        name: "Mapa base de Espa&#241a",
//        url: "http://www.ign.es/wmts/ign-base",
//		layer: "IGNBaseTodo",
//        matrixSet: "EPSG:900913",
//        matrixIds: matrixIds,
//        style: "default",	
//        format: "image/png",
//        opacity: 1,
//        isBaseLayer: true,
//		visibility: false
//    });
	
	var wmts = new L.TileLayer.WMTS("http://www.ign.es/wmts/ign-base",           {
		layer: 'IGNBaseTodo',
		style: 'default',
		tilematrixSet: "EPSG:900913",
		matrixIds: matrixIds,
		format: 'image/png'
	});
	
	var wmts2 = new L.TileLayer.WMTS("http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",           {
		layer: 'litoral:CVI_wmts',
		style: 'default',
		tilematrixSet: "EPSG:900913",
		matrixIds: matrixIds,
		format: 'image/png'
	});
	
	L.control.layers(
					 {
						 'Google satélite':gSatellite,
						 'Google relieve': gTerrain,
						 'Google callejero' : gRoad,
						 'Bing satélite' : bingSatellite,
						 'Bing callejero' : bingRoad,
						 // 'OpenStreetMap' : openStreetMap
					 },null,{position: position}).addTo(this.map);
	
	//this.map.addControl(new L.Control.Layers( {'Google Satellite':gSatellite, 'Google Terrain': gTerrain}, {}));
	
	//initializate layers
	this.layers = new Array();
	
	// let's initialize all layers
	for(x in opts.layers){
	
		var l =  opts.layers[x];
		
		this.layers.push({
			id: l.id,
			json: 	null,
			visible: l.visible,
			priority: l.priority,
			type: l.type,
			baseRetriever: l.baseRetriever,
			valueFactor: l.valueFactor,
			title: l.title,
			source: l.source,
			color1: l.color1,
			color2: l.color2,
			points: null
		});
	}
	
	this.refreshLayers();
	
	
	this.addLayer = function(gsLayer){
		var add = true;
		
		for(var i=0; i<this.layers.length; i++){
			if(this.layers[i].title == gsLayer.title){
				add = false;
			}
		}
		if(add){
			this.layers.unshift(gsLayer);
			gsLayer.setVisibility(true, this.map, this.layers.length);
		}
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
//		$el.css("top",$container.height() - $el.height() - 10 - (($(".flotable_legend").length - 1)  * $el.height() + 10));
					
		$el.find(".close").click(function(){
			$el.fadeOut(function () {
				$(this).remove();
			});
		});
		
		$el.draggable();
	};
	
	this.featureInfo = function(e,id){
		
		if(!id){
			id = 0;
		}
		
		var map = this.getMap();
		var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';
		    
		var BBOX = map.getBounds().toBBoxString();
		var WIDTH = map.getSize().x;
		var HEIGHT = map.getSize().y;
		var X = map.layerPointToContainerPoint(e.layerPoint).x;
		var Y = map.layerPointToContainerPoint(e.layerPoint).y;
		    
		var layers = null;   
		var server = null;
		var requestIdx = null;
		
		for (var i=id;i<this.layers.length;i++){
			var l = this.layers[i];
			if (l.visible && l.layer.options.opacity>0){
				server = l.url;
				layers = l.name;
				requestIdx = i;
				break;
			}
		}
		
		if (layers==null || server==null || requestIdx==null)
		{
			$("#container_feature_info").html("No hay información sobre este punto");
			
			return;
		}
		
		var request = server + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=' +layers+'&QUERY_LAYERS='+layers+'&STYLES=&BBOX='+BBOX+'&FEATURE_COUNT=5&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&FORMAT=image%2Fpng&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A4326&X='+X+'&Y='+Y;
		request = request.replace("wmts","wms");
	    
		var obj = this;
	    $.ajax({
			url : "application/views/proxy.php",
			data: { "url": request},	       
			type: "POST",			
	        success: function(data) {
	        	try {
		        	if (!data || data.indexOf("LayerNotQueryable")!=-1){
		        		obj.featureInfo(e,requestIdx+1);
		        	}
		        	else{
		        		if($.trim($($.parseXML(data)).find("body").html()).length != 0){
		        			$("#container_feature_info").html(data);
		        		}else{
		        			$("#container_feature_info").html("No hay información sobre este punto");
//		        			$.fancybox.close();
		        		}
		        	}
	        	}catch (ex){
	        		$("#container_feature_info").html("No hay información sobre este punto");
//	        		$.fancybox.cclose();
	        	}
	        	$.fancybox.update();	
	        },
	        error: function(){	        	
	        	obj.featureInfo(e,requestIdx+1);
	        }
	    });
		
	};
}

function onClick(data) {
   var a = 9;
}
