var categories = [
               {
            	   title:"Cuartiles",
            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
            	   layers:[
            	           {
            	        	   id:1,
            	        	   title: "CVI_wmts",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   wms: {
            	        		   		visible:false,	
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:CVI_wmts",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
            	        		   		visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:CVI_wmts"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           }
            	   ]
               },
               
               {
            	   title:"Unidades fisiograficas",
            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
            	   layers:[
            	           {
            	        	   id:2,
            	        	   title: "Unidades fisiográficas nivel 1Q",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
          	        		   			visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:unidades_fisiograficas_nv1Q",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:unidades_fisiograficas_nv1Q"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:3,
            	        	   title: "Unidades fisiográficas nivel 5Q",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:unidades_fisiograficas_nv5Q",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:unidades_fisiograficas_nv5Q"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           
            	   ]
               },
               
               {
            	   title:"Lineas",
            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
            	   layers:[
            	           {
            	        	   id:4,
            	        	   title: "Línea 56",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:linea_56",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:linea_56"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:5,
            	        	   title: "Línea 77",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:linea_77",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:linea_77"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:6,
            	        	   title: "Línea 07",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:linea_07",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:linea_07"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:7,
            	        	   title: "Línea 09",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:linea_09",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:linea_09"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:8,
            	        	   title: "Líneam 09",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:lineam_09",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:lineam_09"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:9,
            	        	   title: "Líneam 11",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:lineam_11",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:lineam_11"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:10,
            	        	   title: "Alteraciones",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:unidades_fisiograficas_alteracionesQ",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:unidades_fisiograficas_alteracionesQ"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           }
            	   ]
               },
               
               {
            	   title:"Poblaciones",
            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
            	   layers:[
            	           {
            	        	   id:11,
            	        	   title: "Población 250",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_urbano:poblacion_250",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:poblacion_250"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:12,
            	        	   title: "Población total",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_urbano:Poblacion_total_p",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:Poblacion_total_p"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:13,
            	        	   title: "Población 250 P1",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_urbano:poblacion_250_p1",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:poblacion_250_p1"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:14,
            	        	   title: "Población 250 P2",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_urbano:poblacion_250_p2",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:poblacion_250_p2"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:15,
            	        	   title: "Población 250 P3",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_urbano:poblacion_250_p3",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:poblacion_250_p3"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:16,
            	        	   title: "Población manzana",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_urbano:Pob_manzana",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:Pob_manzana"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           }
            	   ]
               },
               
               {
            	   title:"Dunas",
            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
            	   layers:[
            	           {
            	        	   
            	        	   id:17,
            	        	   title: "Dunas 25/01/2014",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:dunas_250114",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:dunas_250114"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           },
            	           {
            	        	   id:18,
            	        	   title: "Dunas Miguel",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
            	        		   		name: "litoral_geo:duna_miguel",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:duna_miguel"
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "",
            	        		   name: ""
            	        	   }
            	           }
            	   ]
               },
              
               {
            	   title:"Ortofotos",
            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
            	   layers:[
            	           {
            	        	   
            	        	   id:19,
            	        	   title: "Ortofoto 56",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "",
            	        		   		name: "",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "",
       	        		   				name: ""
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "http://olivia.geographica.gs/",
            	        		   name: "05-result-79-level17"
            	        	   }
            	           },
            	           {
            	        	   id:20,
            	        	   title: "Ortofoto 79",
            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
            	        	   wms: {
     	        		   				visible:false,
            	        		   		server: "",
            	        		   		name: "",
            	        		   		layer: null
            	        	   },
            	        	   wmts: {
     	        		   				visible:false,
       	        		   				server: "",
       	        		   				name: ""
            	        	   },
            	        	   tms: {
            	        		   visible:false,
            	        		   server: "http://www.erosion.geographica.gs/tileado/",
            	        		   name: "00-orto56-result"
            	        	   }
            	           }
            	   ]
               }
];

function drawCategories() {
	var html = "<div class='co_families'><ul class='families'>";
	
	for(var i=0; i<categories.length; i++){
		html += "<li class='close'>" + "" +
					"<ul class='family_header'>" +
						"<li class='ico_open_close'><img src='application/views/img/MED_icon_familia.png'></li>" +
						"<li class='ico'><img src='application/views/img/MED_icon_resul_wms.png'></li>" +
						"<li class='name'>" + categories[i].title + "</li>" +
						"<li class='n_elements'>(" + categories[i].layers.length + ")</li>" +
					"</ul>"+
					
					"<ul class='family_content'>" +
						"<li><p class='pt'>" +  categories[i].description + "</p></li> ";
						
						for(var y=0; y<categories[i].layers.length; y++){
						html += "<li style='border-top: 1px dotted #ccc;'>" + 
							"<img src='application/views/img/MED_icon_layer.png'>" +
							"<span>" + categories[i].layers[y].title + "</span>" + 
							"<a class='ml' href=''>Reducir</a>" +
							"<p style='font-size:11px'>" + categories[i].layers[y].description + "</p>" +
							"<img style='margin-top:0px;' src='application/views/img/MED_icon_add_layer.png'>" +
							"<p class='fleft' style='font-size:11px; clear: none; margin-left: 0px;'>AÑADIR A CAPAS:</p>";
							
							if((categories[i].layers[y].wms) && (categories[i].layers[y].wms.server) && (categories[i].layers[y].wms.name)){
								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='wms' class='fleft'><span class='tiposCapas'>WMS</span></div>" +
								"<div idCapa='"+ categories[i].layers[y].id +"' tipo='wms' class='fleft'><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>";
							}
							
							if((categories[i].layers[y].wmts) && (categories[i].layers[y].wmts.server) && (categories[i].layers[y].wmts.name)){
								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='wmts' class='fleft ml'><span class='tiposCapas'>WMTS</span></div>" +
								"<div idCapa='"+ categories[i].layers[y].id +"' tipo='wmts' class='fleft'><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>";
							}
							
							if((categories[i].layers[y].tms) && (categories[i].layers[y].tms.server) && (categories[i].layers[y].tms.name)){
								html+= "<div idCapa='"+ categories[i].layers[y].id +"' tipo='tms' class='fleft ml'><span class='tiposCapas'>TMS</span></div>" +
								"<div idCapa='"+ categories[i].layers[y].id +"' tipo='tms' ><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>" ;
							}
							
							html+= "<div class='clear'></div>" + 
						"</li>";
						}

					html += "</ul>"+
					
				"<div class='clear'></div>" + 
				"</li>";
		
	}
	
		
	html += "</ul></div>";	
	
	$("#categories").html(html);
	
	$(".family_header").click(function(){
		for(var i=0; i<$(".name").length; i++){
			if(!$($(".name")[i]).is(":visible")){
				$($(".name")[i]).css({"font-weight":"normal"});
			}
		}
		
		if($(this).next().is(":visible")){
			$(this).find(".name").css({"font-weight":"normal"})
			$(this).next().fadeOut();
			$(this).parent().css({"background-color":"white"});
		}else{
			$(this).find(".name").css({"font-weight":"bold"})
			$(this).next().fadeIn();
			$(this).parent().css({"background-color":"#ecedef"});
		}
	});
	
	$(".tiposCapas").click(function(){
		capa = buscarCapa($(this).parent().attr("idCapa"));
		tipo = $(this).parent().attr("tipo");
		
//		if(capa[tipo].visible){
//			desColoreaEtiquetas(this);
//			capa[tipo].visible = false;
//			Split.removeLayer(capa.title, tipo);
		
//		}else{
//			coloreaEtiquetas(this);
//			capa[tipo].visible = true;
			Split.addLayer(capa,tipo);			
//		}
		
//		$("#proyecto").show();
//        $("#catalogo").hide();
		navigate();
		
	});
	
//	$(".tiposCapas").mouseover(function(){
//		coloreaEtiquetas(this);
//	});
//	
//	$(".tiposCapas").mouseleave(function(){
//		desColoreaEtiquetas(this);
//	});
	
};

function coloreaEtiquetas(e){
	if($(e).is("img")){
		$(e).parent().prev().find("span").css({"cssText":"color:white !important"});
		$(e).parent().prev().find("span").css({"background-color":"#ff6600"});
		$(e).attr("src", "application/views/img/ERO_icon_link_gris.png");
		$(e).css({"background-color":"#ff6600", "border-left":"1px solid white"});
		
	}else{
		$(e).css({"cssText":"color:white !important", "background-color":"#ff6600"});
		$(e).parent().next().find("img").css({"background-color":"#ff6600", "border-left":"1px solid white"});
		$(e).parent().next().find("img").attr("src", "application/views/img/ERO_icon_link_gris.png");
	}
}

function desColoreaEtiquetas(e){
	if($(e).is("img")){
		$(e).parent().prev().find("span").css({"cssText":"color:#ff6600 !important"});
		$(e).parent().prev().find("span").css({"background-color":"white"});
		$(e).attr("src", "application/views/img/ERO_icon_link_naranja.png");
		$(e).css({"background-color":"white", "border-left":"1px solid #ff6600"});
		
	}else{
		$(e).css({"cssText":"color:#ff6600 !important", "background-color":"white"});
		$(e).parent().next().find("img").css({"background-color":"white", "border-left":"1px solid #ff6600"});
		$(e).parent().next().find("img").attr("src", "application/views/img/ERO_icon_link_naranja.png");
	}
}
	
function buscarCapa(id){
	for(var i=0; i<categories.length; i++){
		for(var y=0; y<categories[i].layers.length; y++){
			if(categories[i].layers[y].id==id){
				return categories[i].layers[y];
			}
		}
	}
}
