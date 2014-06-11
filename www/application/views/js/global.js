var isLoged = false;
var isAdmin = false;
var sectionActual = 0;
var markerLocationLeft;
var markerLocationRight;

$.ajax({
    url: 'index.php/login/isLoged',
    success: function(response) {
    	if(response == 1){
    		$(".acceder").hide();
    		$("#closeSesion").show();
    		$(".loginDiv").fadeOut();
    		isLoged = true;
    		$.ajax({
    		    url: 'index.php/login/isAdmin',
    		    success: function(response) {
    		    	if(response == 1){
    		    		isAdmin = true;
    		    	}else{
    		    		isAdmin = false;
    		    	}
    		    }
    		});
    	}
    }
});

function getImg(s){
	return base_url + "application/views/img/" + s;
}


function resize(){
	$("#container,.sep").height($(window).height() - $("header").outerHeight(true) - $("footer").outerHeight(true));
	var mw = Math.floor($(window).width() /2)-1;
	$("#sep").css("left",mw-1);
	$("#panel_left").width(mw);
	$("#panel_right").width(mw);
	
}

function showInfoFancybox(text) {
	var html =  "<div>"+text+"</div>";
	$("#info_fancy_box_data").html(html);
	$("#info_fancybox").fancybox({
		"openEffect" : "elastic",
		'openSpeed' : 500
	}).trigger('click');
}

function showDevMsg(){
	showInfoFancybox("<br/><br/>Funcionalidad en desarrollo");
}

function onLocationFoundLeft(e) {
	if(markerLocationLeft){
		this.removeLayer(markerLocationLeft);
	}
	markerLocationLeft = L.marker(e.latlng);
	markerLocationLeft.addTo(this).bindPopup("Esta es tu posición:</br>Latitud: " +  e.latlng.lat + "<br>Longitud: " + e.latlng.lng).closePopup();
}

function onLocationFoundRight(e) {
	if(markerLocationRight){
		this.removeLayer(markerLocationRight);
	}
	markerLocationRight = L.marker(e.latlng);
	markerLocationRight.addTo(this).bindPopup("Esta es tu posición:</br>Latitud: " +  e.latlng.lat + "<br>Longitud: " + e.latlng.lng).closePopup();
}

function navigate(section) {
	var ancho = $("#container").width() + 100;

	
	if(section != sectionActual){
		if(sectionActual == 0){
			$("#tool_bar").hide();
//			$("#proyecto").css({"position": "relative"});
//			$("#proyecto").animate({"right": ancho},500);
			$("#proyecto").hide();
		}else if(sectionActual == 1){
//			$("#catalogo").slideUp(300)
			$("#catalogo").hide()
		}else{
			$("#actividad").hide()
		}
		
		sectionActual = section;
	
		if(section == 0){
			$("#tool_bar").show();
//			$("#proyecto").animate({"right":"0"},500,function(){
//				$("#proyecto").css({"position": "initial"});
//				$("#tool_bar").show();
//			});
			$("#proyecto").show();
		}else if(section == 1){
//			$("#catalogo").slideDown(400);
			$("#catalogo").show();
		}else{
			drawNotifications();
//			$("#actividad").slideDown(400);
			$("#actividad").show();
		}
	}
	 
}


function compareLayersCoordinates(cord1, cord2){
	
	if(cord1.length && cord2.length){
		
		if(cord1.length != cord2.length){
			return false;
		}
		for(var i=0; i< cord1.length; i++){
			if(cord1[i].lat != cord2[i].lat || cord1[i].lng != cord2[i].lng){
				return false;
			}
		}
		
	}else{
		if(cord1.lat != cord2.lat || cord1.lng != cord2.lng){
			return false;
		}
	}
	
	
	return true;
}

function createDrawLocal() {
	L.drawLocal = {
			draw: {
				toolbar: {
					actions: {
						title: 'Cancelar dibujado',
						text: 'Cancelar'
					},
					undo: {
						title: 'Borrar el último punto dibujado',
						text: 'Borrar el último punto'
					},
					buttons: {
						polyline: 'Dibujar una polilínea',
						polygon: 'Dibujar un polígono',
						rectangle: 'Dibujar un rectángulo',
						circle: 'Dibujar un círculo',
						marker: 'Dibujar un marcador'
					}
				},
				handlers: {
					circle: {
						tooltip: {
							start: 'Hacer clic y arrastrar para dibujar el círculo.'
						}
					},
					marker: {
						tooltip: {
							start: 'Hacer click en el mapa para colocar el marcador'
						}
					},
					polygon: {
						tooltip: {
							start: 'Hacer click para empezar el dibujar el polígono',
							cont: 'Hacer click para continuar dibujando el polígono',
							end: 'Hacer clic en el primer punto para cerrar esta forma.'
						}
					},
					polyline: {
						error: '<strong>Error:</strong> las líneas no pueden cruzarse',
						tooltip: {
							start: 'Hacer click para empezar a dibujar la línea',
							cont: 'Hacer click para continuar dibujando la línea.',
							end: 'Hacer click en el último punto para finalizar la línea.'
						}
					},
					rectangle: {
						tooltip: {
							start: 'Hacer click y arrastrar para dibujar el rectángulo.'
						}
					},
					simpleshape: {
						tooltip: {
							end: 'Suelte el ratón para terminar el dibujo.'
						}
					}
				}
			},
			edit: {
				toolbar: {
					actions: {
						save: {
							title: 'Guardar cambios.',
							text: 'Guardar'
						},
						cancel: {
							title: 'Cancelar edición, descartar todos los cambios.',
							text: 'Cancelar'
						}
					},
					buttons: {
						edit: 'Editar capa.',
						editDisabled: 'No hay capas para editar.',
						remove: 'Borrar capas.',
						removeDisabled: 'No hay capas para eliminar.'
					}
				},
				handlers: {
					edit: {
						tooltip: {
							text: 'Arrastra los puntos o los marcadores para editar las formas',
							subtext: 'Pulsar cancelar para deshacer los cambios.'
						}
					},
					remove: {
						tooltip: {
							text: 'Click on a feature to remove'
						}
					}
				}
			}
		};
}
