var isLoged = false;

$.ajax({
    url: 'index.php/login/isLoged',
    success: function(response) {
    	if(response == 1){
    		$(".acceder").hide();
    		$("#closeSesion").show();
    		$(".loginDiv").fadeOut();
    		isLoged = true;
    	}
    }
});

function getImg(s){
	return base_url + "application/views/img/" + s;
}


function resize(){
	$("#container,.sep").height($(window).height() - $("header").outerHeight(true) - $("footer").outerHeight(true));
	var mw = Math.floor($(window).width() /2) - 7.5;
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

function onLocationFound(e) {
    L.marker(e.latlng).addTo(this).bindPopup("Esta es tu posición:</br>Latitud: " +  e.latlng.lat + "<br>Longitud: " + e.latlng.lng).closePopup();
}

function navigate() {
    if ($("#catalogo").is(":visible")) {
    	$("#catalogo").slideToggle(500);
        $("#proyecto").slideToggle(600);
    }
    else{
        $("#proyecto").slideToggle(500);
        $("#catalogo").slideToggle(600);   
        
        $($("#fancy_box_save_draw").find("p")[0]).fadeOut(200);
		$($("#fancy_box_save_draw").find("p")[1]).fadeOut(200);
		$("#fancy_box_save_draw").animate({"width": 0},300);
		$("#fancy_box_save_draw").hide(400);
    }    
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
