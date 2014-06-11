/*var categories = [
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
            	           
            	           {
            	        	   id: 39,
            	        	   title: "Sombreado",
            	        	   description: "Sombreado modelo Mar de Alborán 40m",
            	        	   wms: {

       	        		   				server: "http://www.sandbox.geographica.gs/cgi-bin/movitra",
       	        		   				name: "sombreado"
            	        	   }
            	           },
            	           
            	           {
            	        	   id: 40,
            	        	   title: "Mapa fisiográfico del litoral Andaluz",
            	        	   description: "Mapa fisiográfico del litoral andaluz. Hoja 07-08. Escala 1:50.0000",
            	        	   wms: {

       	        		   				server: "http://www.sandbox.geographica.gs/cgi-bin/movitra",
       	        		   				name: "malaga"
            	        	   }
            	           },
            	           
            	           {
            	        	   id: 41,
            	        	   title: "Litología-Sustrato de las Ecocartografías del Litoral y Medio Marino",
            	        	   description: "Litología-Sustrato de las Ecocartografías del Litoral y Medio Marino. Escala: 1:50.000",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "medio_marino:morfologia_marina"
            	        	   }
            	           },
            	           
            	           {
            	        	   id: 42,
            	        	   title: "Arrecifes",
            	        	   description: " ",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral:Arrecifes"
            	        	   }
            	           },
            	           
            	           {
						    	id: 46,
						    	title: "Modelo digital del térreo con batimetría",
						    	description: " ",
						    	wms: {
						    		server: "http://www.sandbox.geographica.gs/cgi-bin/movitra",
						    		name: "mdt40fin4"
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
       	        		   				name: "medio_marino:batimetria_azul"
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
						    
						    {
						    	id: 43,
						    	title: "Curvas batimétricas de las Ecocartografías del Litoral y Medio Marino blanco",
						    	description: "Curvas batimétricas de las Ecocartografías del Litoral y Medio Marino (1m).Blanco. Escala:1:50.000.",
						    	wmts: {
						    		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
						    		name: "medio_marino:batimetria_blanco"
						    	}
						    },
						    
						    {
						    	id: 44,
						    	title: "Cero hidrográfico de las Ecocartografías del Litoral y Medio Marino azul",
						    	description: "Cero hidrográfico de las Ecocartografías del Litoral y el Medio Marino. Azul. Escala:1:50.000.",
						    	wmts: {
						    		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
						    		name: "medio_marino:linea_cero_azul"
						    	}
						    },
						    
						    {
						    	id: 45,
						    	title: "Cero hidrográfico de las Ecocartografías del Litoral y Medio Marino blanco",
						    	description: "Cero hidrográfico de las Ecocartografías del Litoral y el Medio Marino. blanco. Escala:1:50.000.",
						    	wmts: {
						    		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
						    		name: "medio_marino:linea_cero_blanco"
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
       	        		   				name: "litoral_urbano:poblacion_250_p0"
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
               },
               
               {
            	   title:"Tasas de erosión",
            	   description: "Tasas de erosión",
            	   layers:[
            	           {
            	        	   id: 47,
            	        	   title: "base de prueba",
            	        	   description: "bla bla bla",
            	        	   simbolo: {

       	        		   				umbral: "0",
       	        		   				colorUmbralPositivo: "#FF0000",
       	        		   				colorUmbralNegativo: "#01DF01"
            	        	   }
            	           },
            	           
            	           {
            	        	   id: 48,
            	        	   title: "Criterio estricto",
            	        	   description: "bla bla bla",
            	        	   simbolo: {

       	        		   				umbral: "0",
       	        		   				colorUmbralPositivo: "#FF0000",
       	        		   				colorUmbralNegativo: "#01DF01"
            	        	   }
            	           }
    	             ]
               },
			   		                   
              

];*/

var categories = [
               {
            	   title: "BASE CARTOGRÁFICA de España",
            	   description: "Base cartográfica de España.",
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
						    ]
							},
			   {
            	   title: "BASE CARTOGRÁFICA de Andalucía",
            	   description: "Base cartográfica de Andalucía.",
            	   layers: [
						    
						   {
            	        	   id: 3,
            	        	   title: "Fondo hipso-batimétrico de Andalucía",
            	        	   description: "Fondo altimétrico y batimétrico de Andalucía construido a partir de la integración de modelos digitales de elevaciones y batimetrías a 40 metros de resolución espacial",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral:Andalucia"
            	        	   }
            	           },
						    {
            	        	   id: 39,
            	        	   title: "Sombreado de Andalucía",
            	        	   description: "Sombreado de Andalucía de 40m",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:sombra1"
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
            	        	   id: 41,
            	        	   title: "Morfología de la zona infra-litoral de Andalucía",
            	        	   description: "Morfología-Sustrato de las Ecocartografías del Litoral y Medio Marino. Escala: 1:5000",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "medio_marino:morfologia_marina"
            	        	   }
            	           },
						   ]
			},
			   {  
			       title: "BASE CARTOGRÁFICA de Andalucía: Otros",
            	   description: "Otra Base cartográfica.",
            	   layers: [
						   
            	           {
            	        	   id: 60,
            	        	   title: "Fondo hipso-batimétrico de Cádiz",
            	        	   description: "Fondo altimétrico y batimétrico de la provincia de Cádiz con sombreado",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral:BAT_cadiz"
            	        	   }
            	           },

            	             ]
               },

               {
            	   title:"BATIMETRÍAS de Andalucía",
            	   description: "Batimetrías de Andalucía.",
            	   layers:[
            	            {
							    id: 6,
            	        	    title: "Modelo batimétrico del litoral andaluz",
            	        	    description: "Modelo batimétrico del litoral andaluz procedente del Instituto Hidrográfico de la Marina. Resolución 20x20. Año 2008.",
            	        	    wms: {

            	        		   		server: "http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_modelo_batimetrico_50000_litoral_andaluz?",
            	        		   		name: "REDIAM"

            	        	   }
						    },
							{
            	        	   id: 4,
            	        	   title: "Cotas batimétricas del Modelo batimétrico del litoral andaluz",
            	        	   description: "Cotas batimétricas del litoral andaluz procedente del Instituto Hidrográfico de la Marina. Resolución 20x20. Año 2008",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "medio_marino:cota_50"
            	        	   }
            	           },	
						   {
            	        	   id: 63,
            	        	   title: "Curvas batimétricas del Modelo batimétrico del litoral andaluz",
            	        	   description: "Curvas batimétricas del litoral andaluz procedente del Instituto Hidrográfico de la Marina. Resolución 20x20. Año 2008",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "medio_marino:isobata_50"
            	        	   }
            	           },

						   {
            	        	   id: 5,
            	        	   title: "Curvas batimétricas las Ecocartografías del Litoral y Medio Marino de Andalucía (1m) azul",
            	        	   description: "Curvas batimétricas de las Ecocartografías del Litoral y Medio Marino (1m).Azul.Años 2005-2012. Escala: 1:5000.",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "medio_marino:batimetria_azul"
            	        	   }
            	            },
							{
						    	id: 43,
						    	title: "Curvas batimétricas de las Ecocartografías del Litoral y Medio Marino de Andalucía (1m) blanco",
						    	description: "Curvas batimétricas de las Ecocartografías del Litoral y Medio Marino (1m).Blanco. Escala:1:5000.",
						    	wmts: {
						    		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
						    		name: "medio_marino:batimetria_blanco"
						    	}
						    }, 
							{
						    	id: 44,
						    	title: "Cero hidrográfico de las Ecocartografías del Litoral y Medio Marino azul",
						    	description: "Cero hidrográfico de las Ecocartografías del Litoral y el Medio Marino. Años 2005-2012. Azul. Escala:1:5000.",
						    	wmts: {
						    		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
						    		name: "medio_marino:linea_cero_azul"
						    	}
						    },
						    
						    {
						    	id: 45,
						    	title: "Cero hidrográfico de las Ecocartografías del Litoral y Medio Marino blanco",
						    	description: "Cero hidrográfico de las Ecocartografías del Litoral y el Medio Marino. Años 2005-2012. Blanco. Escala:1:5000.",
						    	wmts: {
						    		server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
						    		name: "medio_marino:linea_cero_blanco"
						    	}
						    },

            	          		    
						  
    	                 ]
               },

            	{  
			       title: "BATIMETRÍAS de Andalucía: Otros",
            	   description: "Otras Batimetrías de Andalucía.",
            	   layers: [
						    {
            	        	   id: 61,
            	        	   title: "Modelo batimétrico del litoral de la provincia de Cádiz",
            	        	   description: "Modelo batimétrico del litoral de la provincia de Cádiz con sombreado",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral:BAT_MAP"
            	        	   }
							},
							
            	            {      	   id: 62,
            	        	   title: "Modelo batimétrico del litoral de Rota",
            	        	   description: "Modelo batimétrico del litoral de Rota con sombreado",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral:grid10b_Sail"
            	        	   }
							},
							 ]
               },
						    

			   {
            	   title:"ORTOFOTOGRAFÍAS de Andalucía",
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
            	   title:"FISIOGRAFÍA DEL LITORAL de Andalucía",
            	   description: "Fisiografía del litoral andaluz.",
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
						   {
            	        	   id: 40,
            	        	   title: "Mapa fisiográfico del litoral andaluz 1:50.000",
            	        	   description: "Mapa fisiográfico del litoral andaluz. Escala 1:50.000",
            	        	   wmts: {

       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral:fisio_grupo"
            	        	   }
            	           },
            	      ]
               },
               
               {
            	   title:"LÍNEA DE COSTA DE ANDALUCÍA, 2011",
            	   description: "Modelo de línea de costa de Andalucía 2011. Escala 1:2.500",
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
						     ]
               },
			  
			   {
            	   title:"LÍNEA DE COSTA DE ANDALUCÍA, 2011. Caracterización jerárquica",
            	   description: "Caracterización Jerárquica de la línea de costa de Andalucía 2011. Escala 1:2.500",
            	   layers:[
            	           {
            	        	   id: 17,
            	        	   title: "Línea fisiográfica 2011 nivel 1.",
            	        	   description: "Representación del nivel jerárquico 1 de la línea fisiográfica 2011",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:nivel_1_largaQ"
            	        	   }
            	           },
						   			]
               },
			  
			  		 
				 
				{		  
            	   title:"LÍNEA DE COSTA DE ANDALUCÍA, 2011. Caracterización temática",
            	   description: "Caracterización Jerárquica de la línea de costa de Andalucía 2011. Escala 1:2.500",
            	   layers:[ 
            	           {
            	        	   id: 18,
            	        	   title: "Playas",
            	        	   description: "Representación de las playas para la línea fisiográfica 2011.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:playas_larga"
            	        	   }
            	           },
						   
            	           {
            	        	   id: 19,
            	        	   title: "Acantilados",
            	        	   description: "Representación de los acantilados para la línea fisiográfica 2011.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:acantilados_erosion"
            	        	   }
            	           },
						   
            	           {
            	        	   id: 20,
            	        	   title: "Dunas_A",
            	        	   description: "Primera representación de las dunas para la línea fisiográfica 2011.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:dunas_erosion"
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
       	        		   				name: "litoral_geo:linea_costa_Infraestructuras"
            	        	   }
            	           },
            	                      	                     	           
            	           {
            	        	   id: 23,
            	        	   title: "Márgenes y estuarios",
            	        	   description: "Representación de los márgenes y estuarios para la línea fisiográfica.",
            	        	   
            	        	   wmts: {
     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_geo:margenes_estuarios_canyos_larga"
            	        	   }
            	           }
            	      ]
               },
               
			   {
            	   title:"EROSION. Líneas",
            	   description: "Líneas de erosión para el litoral andaluz",
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
						   	             	           
            	      ]
               },
						   
						   
			   {
            	   title:"EROSION. Tasas",
            	   description: "Tasas de erosión para el litoral andaluz",
            	   layers:[
            	           
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
            	   title:"EROSIÓN. Tasas_2",
            	   description: "Tasas de erosión para el litoral andaluz_2",
            	   layers:[
            	           {
            	        	   id: 47,
            	        	   title: "Tasas de erosión 1956-09_2",
            	        	   description: "",
            	        	   simbolo: {

       	        		   				umbral: "0",
       	        		   				colorUmbralPositivo: "#0000FF",
       	        		   				colorUmbralNegativo: "#FF0000",
       	        		   				radioMin : 1,
            	           				radioMax : 30
            	        	   }
            	           },
            	           
            	           {
            	        	   id: 48,
            	        	   title: "Tasas de erosión 1956-77_2",
            	        	   description: "",
            	        	   simbolo: {

       	        		   				umbral: "0",
       	        		   				colorUmbralPositivo: "#0000FF",
       	        		   				colorUmbralNegativo: "#FF0000",
       	        		   				radioMin : 1,
            	           				radioMax : 30
            	        	   }
            	           },
            	           {
            	        	   id: 49,
            	        	   title: "Tasas de erosión 1977-09_2",
            	        	   description: "",
            	        	   simbolo: {

       	        		   				umbral: "0",
       	        		   				colorUmbralPositivo: "#0000FF",
       	        		   				colorUmbralNegativo: "#FF0000",
       	        		   				radioMin : 1,
            	           				radioMax : 30
            	        	   }
            	           },
            	           {
            	        	   id: 50,
            	        	   title: "Tasas de erosión 2007-09_2", 
            	        	   description: "",
            	        	   simbolo: {

       	        		   				umbral: "0",
       	        		   				colorUmbralPositivo: "#0000FF",
       	        		   				colorUmbralNegativo: "#FF0000",
       	        		   				radioMin : 1,
            	           				radioMax : 30
            	        	   }
            	           },
            	           {
            	        	   id: 51,
            	        	   title: "Tasas de erosión criterio estricto 1956-09_2",
            	        	   description: "",
            	        	   simbolo: {

       	        		   				umbral: "0",
       	        		   				colorUmbralPositivo: "#0000FF",
       	        		   				colorUmbralNegativo: "#FF0000",
       	        		   				radioMin : 1,
            	           				radioMax : 30
            	        	   }
            	           },
            	           {
            	        	   id: 52,
            	        	   title: "Tasas de erosión criterio estricto 1956-77_2",
            	        	   description: "",
            	        	   simbolo: {

       	        		   				umbral: "0",
       	        		   				colorUmbralPositivo: "#0000FF",
       	        		   				colorUmbralNegativo: "#FF0000",
       	        		   				radioMin : 1,
            	           				radioMax : 30
            	        	   }
            	           },
            	           {
            	        	   id: 53,
            	        	   title: "Tasas de erosión criterio estricto 1977-09_2",
            	        	   description: "",
            	        	   simbolo: {

       	        		   				umbral: "0",
       	        		   				colorUmbralPositivo: "#0000FF",
       	        		   				colorUmbralNegativo: "#FF0000",
       	        		   				radioMin : 1,
            	           				radioMax : 30
            	        	   }
            	           },
            	           {
            	        	   id: 54,
            	        	   title: "Tasas de erosión criterio estricto 2007-09_2", 
            	        	   description: "",
            	        	   simbolo: {

       	        		   				umbral: "0",
       	        		   				colorUmbralPositivo: "#0000FF",
       	        		   				colorUmbralNegativo: "#FF0000",
       	        		   				radioMin : 1,
            	           				radioMax : 30
            	        	   }
            	           }
    	             ]
               },
			   		                    	  
			   
               {
            	   title:"POBLACIÓN de Andalucía",
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
       	        		   				name: "litoral_urbano:poblacion_250_p0"
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
            	           },
						   						   						   
            	      ]
				},	  
				{
            	   title:"TURISMO",
            	   description: "",
            	   layers:[
            	        	   {
            	        	   id: 64,
            	        	   title: "Plazas turísticas regladas en el litoral andaluz",
            	        	   description: "Número de plazas turísticas regladas en el litoral andaluz para el año 2013 georreferenciada a nivel de portal.",
            	        	   wmts: {     	        		   				
       	        		   				server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
       	        		   				name: "litoral_urbano:Pob_manzana"
            	        	   }
						   },
					]
			   },
				{
            	   title:"URBANO. Evolución",
            	   description: "Evolución de los usos urbanos del litoral andaluz",
            	   layers:[
            	           {
            	        	   id: 82,
            	        	   title: "Usos urbanos 1956",
            	        	   description: "Usos urbanos del litoral andaluz. 1956",
							    wmts: {   server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
             		   				      name: "litoral_urbano:urbano_1956"
            	        	   }
            	        	   
                           },
			                {
            	            	id: 83,
            	        	   title: "Usos urbanos 1984",
            	        	   description: "Usos urbanos del litoral andaluz. 1984",
							    wmts: {   server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
             		   				      name: "litoral_urbano:urbano_1984"
            	        	   }
            	        	   
                           },
			                {
            	            	id: 84,
            	        	   title: "Usos urbanos 1998",
            	        	   description: "Usos urbanos del litoral andaluz. 1998",
							    wmts: {   server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
             		   				      name: "litoral_urbano:urbano_1998"
            	        	   }
            	        	   
                           },
			                 {
            	            	id: 85,
            	        	   title: "Usos urbanos 2001",
            	        	   description: "Usos urbanos del litoral andaluz. 2001",
							    wmts: {   server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
             		   				      name: "litoral_urbano:urbano_2001"
            	        	   }
            	        	   
                           },
			              {
            	            	id: 86,
            	        	   title: "Usos urbanos 2004",
            	        	   description: "Usos urbanos del litoral andaluz. 2004",
							    wmts: {   server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
             		   				      name: "litoral_urbano:urbano_2007"
            	        	   }
            	        	   
                           },
			              {
            	            	id: 87,
            	        	   title: "Usos urbanos 2007",
            	        	   description: "Usos urbanos del litoral andaluz. 2007",
							    wmts: {   server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
             		   				      name: "litoral_urbano:urbano_2007"
            	        	   }
            	        	   
                           },
			              {
            	            	id: 88,
            	        	   title: "Usos urbanos 2011",
            	        	   description: "Usos urbanos del litoral andaluz. 2011",
							    wmts: {   server: "http://zidane.fgh.us.es:8080/geoserver/gwc/service/wmts",
             		   				      name: "litoral_urbano:urbano_2011"
            	        	   }
            	        	   
                           },
                     ]
			   },	  
				{
					title:"INDICADORES. LINEA",
            	   description: "Indicadores costeros derivados de los datos de línea de costa",
            	   layers:[
            	           {
            	        	   id: 66,
            	        	   title: "Anchura de la playa disponible 2007",
            	        	   description: "Anchura (m) de la playa disponible 2007",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },
            	          {
            	        	   id: 67,
            	        	   title: "Anchura de la playa disponible 2009",
            	        	   description: "Anchura (m) de la playa disponible 2009",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },  
						    {
            	        	   id: 68,
            	        	   title: "Anchura de la playa disponible 2011",
            	        	   description: "Anchura (m) de la playa disponible 2011",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },  
                           {
            	        	   id: 69,
            	        	   title: "Longitud de dunas, 2011",
            	        	   description: "Longitud de dunas (m) 2011",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   }, 
                     ]
			    },	  
				{
					title:"INDICADORES. LINEA municipal",
            	   description: "Indicadores costeros derivados de los datos de línea de costa",
            	   layers:[
            	           {
            	        	   id: 70,
            	        	   title: "Porcentaje municipal de playas con dunas costeras",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },
                          {
            	        	   id: 71,
            	        	   title: "Porcentaje municipal de costa antropizada",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },							   
						   ]
				},	
					 
				{
					title:"INDICADORES. CVI",
            	   description: "Indice de vulnerabilidad costera",
            	   layers:[				  
        				   {
            	        	   id: 72,
            	        	   title: "Indice de vulnerabilidad costera",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },	
                           {                     
            	        	   id: 73,
            	        	   title: "Topografía",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },
                           {                     
            	        	   id: 74,
            	        	   title: "Morfología",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },	
                           {                     
            	        	   id: 75,
            	        	   title: "Erosión",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },
                          {                     
            	        	   id: 76,
            	        	   title: "Pendiente costera",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },	
                          {                     
            	        	   id: 77,
            	        	   title: "Rango mareal medio",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },	
                          {                     
            	        	   id: 78,
            	        	   title: "Tasa de cambio del nivel relativo del mar",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },
                      ]
				},
                {
					title:"INDICADORES. ACCESIBILIDAD",
            	   description: "",
            	   layers:[				  
        				   {
            	        	   id: 79,
            	        	   title: "",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },	
                           {                     
            	        	   id: 80,
            	        	   title: "",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },
                           {                     
            	        	   id: 81,
            	        	   title: "",
            	        	   description: "",
							   wmts: {
     	        		   				
       	        		   				server: "",
       	        		   				name: ""
            	        	   }
						   },	
                                 	        		   				
                          ]
			    }			
];