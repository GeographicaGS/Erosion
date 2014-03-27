//var categories = [
//               {
//            	   title:"Cuartiles",
//            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
//            	   layers:[
//            	           {
//            	        	   id:1,
//            	        	   title: "CVI_wmts",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   wms: {
//            	        		   			
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:CVI_wmts",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//            	        		   		
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:CVI_wmts"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:21,
//            	        	   title: "mta10v_2007",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/wms?",
//            	        		   		name: "mta10v_2007",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "",
//       	        		   				name: ""
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:22,
//            	        	   title: "litoral:Andalucia",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "",
//            	        		   		name: "",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts?",
//       	        		   				name: "litoral:Andalucia"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:23,
//            	        	   title: "MTN",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "",
//            	        		   		name: "",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://www.ign.es/wmts/mapa-raster?",
//       	        		   				name: "MTN"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	   ]
//               },
//               
//               {
//            	   title:"Unidades fisiograficas",
//            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
//            	   layers:[
//            	           {
//            	        	   id:2,
//            	        	   title: "Unidades fisiográficas nivel 1Q",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//          	        		   			
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:unidades_fisiograficas_nv1Q",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:unidades_fisiograficas_nv1Q"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:3,
//            	        	   title: "Unidades fisiográficas nivel 5Q",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:unidades_fisiograficas_nv5Q",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:unidades_fisiograficas_nv5Q"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           
//            	   ]
//               },
//               
//               {
//            	   title:"Lineas",
//            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
//            	   layers:[
//            	           {
//            	        	   id:4,
//            	        	   title: "Línea 56",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:linea_56",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:linea_56"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:5,
//            	        	   title: "Línea 77",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:linea_77",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:linea_77"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:6,
//            	        	   title: "Línea 07",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:linea_07",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:linea_07"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:7,
//            	        	   title: "Línea 09",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:linea_09",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:linea_09"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:8,
//            	        	   title: "Líneam 09",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:lineam_09",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:lineam_09"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:9,
//            	        	   title: "Líneam 11",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:lineam_11",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:lineam_11"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:10,
//            	        	   title: "Alteraciones",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:unidades_fisiograficas_alteracionesQ",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:unidades_fisiograficas_alteracionesQ"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           }
//            	   ]
//               },
//               
//               {
//            	   title:"Poblaciones",
//            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
//            	   layers:[
//            	           {
//            	        	   id:11,
//            	        	   title: "Población 250",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_urbano:poblacion_250",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_urbano:poblacion_250"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:12,
//            	        	   title: "Población total",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_urbano:Poblacion_total_p",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_urbano:Poblacion_total_p"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:13,
//            	        	   title: "Población 250 P1",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_urbano:poblacion_250_p1",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_urbano:poblacion_250_p1"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:14,
//            	        	   title: "Población 250 P2",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_urbano:poblacion_250_p2",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_urbano:poblacion_250_p2"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:15,
//            	        	   title: "Población 250 P3",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_urbano:poblacion_250_p3",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_urbano:poblacion_250_p3"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:16,
//            	        	   title: "Población manzana",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_urbano:Pob_manzana",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_urbano:Pob_manzana"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           }
//            	   ]
//               },
//               
//               {
//            	   title:"Dunas",
//            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
//            	   layers:[
//            	           {
//            	        	   
//            	        	   id:17,
//            	        	   title: "Dunas 25/01/2014",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:dunas_250114",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:dunas_250114"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           },
//            	           {
//            	        	   id:18,
//            	        	   title: "Dunas Miguel",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wms",
//            	        		   		name: "litoral_geo:duna_miguel",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
//       	        		   				name: "litoral_geo:duna_miguel"
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "",
//            	        		   name: ""
//            	        	   }
//            	           }
//            	   ]
//               },
//              
//               {
//            	   title:"Ortofotos",
//            	   description: "Curabitur sed enim varius, facilisis lectus eu, accumsan odio. Maecenas mollis orci ipsum, a rutrum justo interdum vel. Vivamus vulputate massa quis ullamcorper pharetra. Nam sodales mauris id elit lacinia, ac faucibus libero mattis. Fusce ut lectus quis urna rutrum tristique.",
//            	   layers:[
//            	           {
//            	        	   
//            	        	   id:19,
//            	        	   title: "Ortofoto 79",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "",
//            	        		   		name: "",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "",
//       	        		   				name: ""
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "http://olivia.geographica.gs/",
//            	        		   name: "05-result-79-level17"
//            	        	   }
//            	           },
//            	           {
//            	        	   id:20,
//            	        	   title: "Ortofoto 56",
//            	        	   description: "Ultrices aliquam vitae erat dolor commodo ut, sociis faucibus vivamus orci varius, orci habitasse massa vel pede mauris, erat tempor in purus in, at amet aliquam turpis.",
//            	        	   wms: {
//     	        		   				
//            	        		   		server: "",
//            	        		   		name: "",
//            	        		   		
//            	        	   },
//            	        	   wmts: {
//     	        		   				
//       	        		   				server: "",
//       	        		   				name: ""
//            	        	   },
//            	        	   tms: {
//            	        		   
//            	        		   server: "http://www.erosion.geographica.gs/tileado/",
//            	        		   name: "00-orto56-result"
//            	        	   }
//            	           }
//            	   ]
//               }
//];


var categories = [
               {
            	   title: "Base cartográfica",
            	   description: "Base cartográfica de Andalucía.",
            	   layers: [
            	           {
            	        	   id: 1,
            	        	   title: "Base cartográfica del Instituto Geográfico Nacional",
            	        	   description: "Cartografía Base del Instituto Geográfico Nacional",
            	        	   wmts: {

       	        		   				server: "http://www.ign.es/wmts/ign-base",
       	        		   				name: "IGNBaseTodo"
            	        	   }
            	           },

						    {
            	        	   id: 2,
            	        	   title: "Mapa topográfico de Andalucía 2007",
            	        	   description: "Mapa Topográfico de Andalucía 1:10.000, 2007",
            	        	   wms: {

            	        		   		server: "http://www.ideandalucia.es/wms/mta10v_2007?",
            	        		   		name: "mta10v_2007"

            	        	   }
            	           },

						   {
            	        	   id: 3,
            	        	   title: "Fondo altimétrico de Andalucía",
            	        	   description: "Fondo altimétrico de Andalucía con sombreado, construido a partir de la integración de modelos digitales de elevaciones y batimetrías a 40 metros de resolución espacial",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral:Andalucia"
            	        	   }
            	           },


						  ]
               },

               {
            	   title:"Batimetrías",
            	   description: "Batimetrías de Andalucía.",
            	   layers:[
            	           {
            	        	   id: 4,
            	        	   title: "Cotas batimétricas de las Ecocartografías del Litoral y Medio Marino",
            	        	   description: "Cotas batimétricas de las Ecocartografías del Litoral y Medio Marino 1:50.000.",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "medio_marino:cota_50"
            	        	   }
            	           },

						   {
            	        	   id: 5,
            	        	   title: "Curvas batimétricas de las Ecocartografías del Litoral y Medio Marino",
            	        	   description: "Curvas batimétricas de las Ecocartografías del Litoral y Medio Marino (1m). Escala: 1:50.000.",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "medio_marino:batimetria"
            	        	   }
            	            },

            	            {
							    id: 6,
            	        	    title: "Modelo batimétrico del litoral andaluz",
            	        	    description: "Modelo batimétrico del litoral andaluz. Resolución 20x20. Año 2008. Escala:1:50.000.",
            	        	    wms: {

            	        		   		server: "http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_modelo_batimetrico_50000_litoral_andaluz?",
            	        		   		name: "REDIAM"

            	        	   }
						    },  

    	             ]
               },


			   {
            	   title:"Ortofografías Andalucía",
            	   description: "Series de Ortofotografías aéreas de Andalucía.",
            	   layers:[
            	           {
            	        	   id: 7,
            	        	   title: "Ortofotografía 1956",
            	        	   description: " Ortofotografía de Andalucía 1956-1957.",
            	        	   tms: {

            	        		   server: "http://www.erosion.geographica.gs/tileado/",
            	        		   name: "00-orto56-result"
            	        	   }
            	           },
            	           {
            	        	   id: 8,
            	        	   title: "Ortofotografía 1979",
            	        	   description: "Ortofotografía de Andalucía 1979",
            	        	   tms: {

            	        		   server: "http://olivia.geographica.gs/",
            	        		   name: "05-result-79-level17"

							   }
            	           },

						   {

            	        	   id: 9,
            	        	   title: "Ortofotografía 2001",
            	        	   description: " Ortofotografía Digital Pancromática de Andalucía 2001.",
            	        	   wms: {

            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/wms?",
            	        		   		name: "ORTO_2001"

            	        	   }
						   },

						   {

            	        	   id: 10,
            	        	   title: "Ortofotografía 2009",
            	        	   description: " Ortofotografía de Andalucía 2008-2009.",
            	        	   wms: {

            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/wms?",
            	        		   		name: "OCA10_2009"

								}				   					   
						   },
						   {
            	        	   
            	        	   id: 11,
            	        	   title: "Ortofotografía 2010",
            	        	   description: " Ortofotografía rigurosa en color de Andalucía 2010-2011.",
            	        	   wms: {
     	        		   				
            	        		   		server: "http://zidane.fgh.us.es:8080/geoserver/wms?",
            	        		   		name: "OCA10_2010"
            	        		   		
            	        	   }		
						  
						   },			   
						   {
            	        	   
            	        	   id: 12,
            	        	   title: "PNOA maxima actualidad",
            	        	   description: "Ortofotografía Andalucía 2010-2011.",
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://www.ign.es/wmts/pnoa-ma",
       	        		   				name: "OI.OrthoimageCoverage"
            	        	   }		
						   },
					  ]
               },
               
               {
            	   title:"Unidades fisiográficas del litoral de Andalucía",
            	   description: "Mapa de Unidades fisiográficas del litoral andaluz.",
            	   layers:[
            	           {
            	        	   id: 13,
            	        	   title: "Unidades fisiográficas nivel 1Q",
            	        	   description: "Unidades fisiográficas del litoral andaluz nivel básico.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:unidades_fisiograficas_nv1Q"
            	        	   }
            	           },
            	           {
            	        	   id: 14,
            	        	   title: "Unidades fisiográficas nivel 5Q",
            	        	   description: "Unidades fisiográficas del litoral andaluz nivel de detalle",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:unidades_fisiograficas_nv5Q"
            	        	   }
            	           },
            	           {
            	        	   id: 15,
            	        	   title: "Alteraciones", 
            	        	   description: "Alteraciones de las unidades fisiográficas del litoral andaluz",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:unidades_fisiograficas_alteracionesQ"
            	        	   }
            	           },
            	      ]
               },
               
               {
            	   title:"Caracterización de la línea de costa de Andalucía, 2011",
            	   description: "Caracterización jerárquica y temática de la línea de costa de Andalucía 2011. Escala 1:2.500",
            	   layers:[
            	           {
            	        	   id: 16,
            	        	   title: "Modelo de línea de costa 2011",
            	        	   description: "Línea de costa mutifuncional o multipropósito. Representación de tres conceptos de línea de costa: erosión, fisigráfica y frente costero.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:lineam_11"
            	        	   }
            	           },
						   
            	           {
            	        	   id: 17,
            	        	   title: "Línea fisiográfica 2011 nivel 1.",
            	        	   description: "Representación del nivel jerárquico 1 de la línea fisiográfica 2011",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:nivel_1_largaQ"
            	        	   }
            	           },
						   
            	           {
            	        	   id: 18,
            	        	   title: "Playas",
            	        	   description: "Representación de las playas para la línea fisiográfica 2011.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:playas_largaQ"
            	        	   }
            	           },
						   
            	           {
            	        	   id: 19,
            	        	   title: "Acantilados",
            	        	   description: "Representación de los acantilados para la línea fisiográfica 2011.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:acantilados_largaQ"
            	        	   }
            	           },
						   
            	           {
            	        	   id: 20,
            	        	   title: "Dunas_A",
            	        	   description: "Primera representación de las dunas para la línea fisiográfica 2011.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:dunas_largaQ"
            	        	   }
            	           },
						   
						   {
            	        	   id: 21,
            	        	   title: "Dunas_B",
            	        	   description: "Segunda representación de las dunas para la línea fisiográfica 2011.",
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:duna_miguel"
            	        	   }
						   },
						   
            	           {
            	        	   id: 22,
            	        	   title: "Infraestructuras",
            	        	   description: "Representación de las infraestructuras para la línea fisiográfica 2011.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:infraestructuras_largaQ"
            	        	   }
            	           },
            	                      	                     	           
            	           {
            	        	   id: 23,
            	        	   title: "Márgenes y estuarios",
            	        	   description: "Representación de los márgenes y estuarios para la línea fisiográfica.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:margenes_estuarios_canyos_largaQ"
            	        	   }
            	           }
            	      ]
               },
               
			   {
            	   title:"Dinámica litoral",
            	   description: "Líneas y tasas de erosión para el litoral andaluz",
            	   layers:[
            	           {
            	        	   id: 24,
            	        	   title: "Línea de erosión 1956 criterio estricto",
            	        	   description: "Línea de erosión levantada con criterio estricto para 1956. Escala 1:2.500.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:linea_56_crit"
            	        	   }
            	           },
						   
            	           {
            	        	   id: 25,
            	        	   title: "Línea de erosión 1977 criterio estricto.",
            	        	   description: "Línea de erosión levantada con criterio estricto para 1977. Escala:1:2.500",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:linea_77_crit"
            	        	   }
            	           },
						   
            	           {
            	        	   id: 26,
            	        	   title: "Línea de erosión 2007 criterio estricto",
            	        	   description: "Línea de erosión levantada con criterio estricto para 2007. Escala 1:2.500.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:linea_07_crit"
            	        	   }
            	           },
						   
            	           {
            	        	   id: 27,
            	        	   title: "Línea de erosión 2009 criterio estricto",
            	        	   description: "Línea de erosión levantada con criterio estricto para 2009. Escala 1:2.500.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:linea_09_crit"
            	        	   }
            	           },
						   
            	           {
            	        	   id: 28,
            	        	   title: "Tasas de erosión 2007-2009",
            	        	   description: "Tasas de erosión estrictas 2007-2009.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:puntos500_0709"
            	        	   }
            	           },
						   
						   {
            	        	   id: 29,
            	        	   title: "Tasas de erosión 1956-2009",
            	        	   description: "Tasas de erosión estrictas 1956-2009.",
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:puntos500b_5609"
            	        	   }
						   },
						   
            	           {
            	        	   id: 30,
            	        	   title: "Tasas de erosión 1956-2007",
            	        	   description: "Tasas de erosión estrictas 1956-2007.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:puntos500b_5677"
            	        	   }
            	           },
            	                      	                     	           
            	           {
            	        	   id: 31,
            	        	   title: "Tasas de erosión 1977-2009",
            	        	   description: "Tasas de erosióne estrictas 1977-2009.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:puntos500b_7709"
            	        	   }
            	           }
            	      ]
               },
               	   	  
			   
               {
            	   title:"Población",
            	   description: "Representación de la población andaluza.",
            	   layers:[
            	           
						   {
            	        	   id: 32,
            	        	   title: "Población total poligonal",
            	        	   description: "Distribución espacial de la población andaluza para el año 2013 georreferenciada a nivel de portal y agregada en una rejilla de 250 metros de resolución espacial. Representada en los polígonos correspondientes a las celdillas.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:poblacion_250"
            	        	   }
            	           },
            	           {
            	        	   id: 33,
            	        	   title: "Población total puntual",
            	        	   description: "Distribución espacial de la población andaluza para el año 2013 georreferenciada a nivel de portal y agregada en una rejilla de 250 metros de resolución espacial. Representada Representación en los centroides de las celdillas a diferentes escalas mediante un grupo de capas.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:Poblacion_total_p"
            	        	   }
            	           },
						   {
            	        	   id: 34,
            	        	   title: "Población total cluster",
            	        	   description: "Distribución espacial de la población andaluza para el año 2013 georreferenciada a nivel de portal y agregada en una rejilla de 250 metros de resolución espacial. Agregada en clusters a través de WPS.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:litoral_urbano:poblacion_250_p0"
            	        	   }
            	           },
						   {
            	        	   id: 35,
            	        	   title: "Población menores de 16 años puntual",
            	        	   description: "Distribución espacial de la población andaluza menor de 16 años para el año 2013 georreferenciada a nivel de portal y agregada en una rejilla de 250 metros de resolución espacial. Representación en los centroides de las celdillas.",
            	        	   
            	        	   wmts: {
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:poblacion_250_p1"
            	        	   }
            	           },
            	           {
            	        	   id: 36,
            	        	   title: "Población entre 16 y 64 años puntual",
            	        	   description: "Distribución espacial de la población andaluza entre 16 y 64 años para el año 2013 georreferenciada a nivel de portal y agregada en una rejilla de 250 metros de resolución espacial. Representación en los centroides de las celdillas.",
            	        	   
            	        	   wmts: {
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:poblacion_250_p2"
            	        	   }
            	           },
            	           {
            	        	   id: 37,
            	        	   title: "Población mayor de 64 años puntual",
            	        	   description: "Distribución espacial de la población andaluza mayor de 64 años para el año 2013 georreferenciada a nivel de portal y agregada en una rejilla de 250 metros de resolución espacial. Representación en los centroides de las celdillas.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:poblacion_250_p3"
            	        	   }
            	           },
            	           {
            	        	   id: 38,
            	        	   title: "Población manzana",
            	        	   description: "Distribución espacial de la población total andaluza para el año 2013 georreferenciada a nivel de portal y agregada en manzanas. Representación poligonal.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:Pob_manzana"
            	        	   }
            	           }
            	      ]
               }
			   		                   
              

];


function drawCategories() {
	
	$.ajax({
        url: 'index.php/draw/getCategories', dataType: "json",
        success: function(response) {
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
        	
        		html += "<li class='close'>" + "" +
				"<ul class='family_header'>" +
					"<li class='ico_open_close'><img src='application/views/img/MED_icon_familia.png'></li>" +
					"<li class='ico'><img src='application/views/img/ERO_icon_user_cab.png'></li>" +
					"<li class='name'>Contenido subido por los usuarios</li>" +
					"<li class='n_elements'>(" + response.length + ")</li>" +
				"</ul>"+
				
				"<ul class='family_content'>" +
					"<li><p class='pt'>Listado de categorías</p></li> ";;
					
					for(var y=0; y<response.length; y++){
					html += "<li style='border-top: 1px dotted #ccc;'>" + 
						"<img src='application/views/img/MED_icon_layer.png'>" +
						"<span>" + response[y].title + "</span>" + 
						"<a class='ml' href=''>Reducir</a>" +
						"<p style='font-size:11px'></p>" +
						"<img style='margin-top:0px;' src='application/views/img/MED_icon_add_layer.png'>" +
						"<p class='fleft' style='font-size:11px; clear: none; margin-left: 0px;'>AÑADIR A CAPAS:</p>";
					
						html+= "<div idCapa='"+ response[y].id_category +"' tipo='vectorial' class='fleft'><span class='tiposCapas'>CAPA VECTORIAL</span></div>" +
						"<div idCapa='"+ response[y].id_category +"' tipo='vectorial' class='fleft'><img class='tiposCapas' src='application/views/img/ERO_icon_link_naranja.png'></div>";
						
						html+= "<div class='clear'></div>" + 
					"</li>";
					}

				html += "</ul>"+
				
				"<div class='clear'></div>" + 
				"</li>";
        		
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
        		
        		tipo = $(this).parent().attr("tipo");
        		if(tipo == "vectorial"){
        			$.ajax({
        		        url: 'index.php/draw/getDraws/' + $(this).parent().attr("idCapa"), 
        		        dataType: "json",
        		        success: function(response) {
        		        	Split.addLayer(null,tipo, null, response);  
        		        	navigate();}
        			});
        		}
        		else{
        			capa = buscarCapa($(this).parent().attr("idCapa"));
        			leyenda = null;
        			if(capa.wms){
        				leyenda = capa.wms.server;
        			}
        			Split.addLayer(capa,tipo, leyenda, null);
        			navigate();
        		}			
        	});	
        }
    });
	
	
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
