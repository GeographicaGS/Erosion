var isLoged = false;
var isAdmin = false;
var idUser = -1;
var sectionActual = 0;
var markerLocationLeft;
var markerLocationRight;
var defaultProject = null;

$.ajax({
    url: 'index.php/login/isLoged',
    dataType: "json",
    success: function(response) {
    	if(response != "Access forbidden"){
    		$(".acceder").hide();
    		$("#closeSesion").show();
    		$(".loginDiv").fadeOut();
    		$("#closeSesion").text(response.user);
    		isLoged = true;
    		idUser = response.id;
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

//Esta función elimina o añade links de borrado en la distintas secciones 
function updatedState(){
	if(isAdmin){
		$(".deleteComment").show();
		$(".deleteGeometry").show();
		$(".deleteHistory").show();
		$(".addHistoryButton").show();
		if($(".extraLeyenda").find("div[tipo='proyecto']").length > 0){
			$(".defaultProject").show();
		}
	}else{
		$(".deleteComment").hide();
		$(".deleteGeometry").hide();
		$(".deleteHistory").hide();
		$(".addHistoryButton").hide();
		$(".defaultProject").hide();
		if(isLoged){
			$(".deleteComment[idUser ='" + idUser + "']").show();
			$(".deleteGeometry[idUser ='" + idUser + "']").show();
			$(".deleteHistory[idUser ='" + idUser + "']").show();
			$(".addHistoryButton").show();
		}
	}

}

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
		'width':'auto',
		"height": "auto",
		'autoDimensions':true,
	    'autoSize':true,
		"openEffect" : "elastic",
		'openSpeed' : 500,
		'helpers' : {
		  overlay : {
		    css : { 'overflow' : 'auto' }
		  }
		},
		afterShow: function () {
			if($('#container_feature_info').text() == "No hay información sobre este punto"){
				$('.fancybox-outer').height("15");
			}
			$.fancybox.update();
        },
  //       onUpdate: function () {
  //       	$.fancybox.update();
  //       }
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
			$("#proyecto").hide();
		}else if(sectionActual == 1){
			$("#catalogo").hide()
		}else{
			$("#actividad").hide()
		}
		
		sectionActual = section;
	
		if(section == 0){
			$("#tool_bar").show();
			$("#proyecto").show();
		}else if(section == 1){
			$("#catalogo").show();
		}else{
			drawNotifications();
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


function showConfirmDialog(accept,text)
{
	fnConfirm = function()
	{
		$.fancybox.close();
		accept();
	}

	fnCancel = function()
	{
		$.fancybox.close();
	}

	var html = "<div>" +
				"<p align='center' style='font-size: 14px; color: #013e88; margin-bottom: 40px;'>" + text + "</p>" +
				"<input class='genericButton fright' type='button' value='Cancelar' onclick='fnCancel()''>" +
				"<input class='genericButton fright' type='button' value='Confirmar' onclick='fnConfirm()''>" +
				"</div>";

	$.fancybox($(html),{
		'width':'400',
		'height': 'auto',
		 'autoDimensions':false,
		 'autoSize':false,
	});
}

function downloadKml(type,latlng){
	var coordinates = "";

	if(type == "marker"){
		coordinates += latlng.lng + "," + latlng.lat + " ";

	}else{
		for(var i=0; i<latlng.length; i++){
			coordinates += latlng[i].lng + "," + latlng[i].lat + " ";
		}

		if(type=="polygon"){
			coordinates += latlng[0].lng + "," + latlng[0].lat + " ";
		}
	}

	window.location.href = 'index.php/draw/createKml/' + type.charAt(0).toUpperCase() + type.slice(1) + "/" + encodeURIComponent(coordinates)
}