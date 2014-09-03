function drawNotifications() {
	$.ajax({
        url: 'index.php/notification/getNotifications',
        dataType: "json",
        success: function(response) {
        	$(".tablaActividad .comentTable").children().remove();
        	for(var i=0; i<response.result.length; i++){
        		
        		var img = "";
        		if(response.result[i].tipo == 0){
        			if(response.result[i].titulo.indexOf("punto") > 0){
        				img = "<img src='application/views/img/ERO_icon_punto.png'";
        			}
        			else if(response.result[i].titulo.indexOf("línea") > 0){
        				img = "<img src='application/views/img/ERO_icon_linea.png'";
        			}else{
        				img = "<img src='application/views/img/ERO_icon_poligono.png'";
        			}
        		}else if(response.result[i].tipo == 1){
        			img = "<img src='application/views/img/ERO_icon_cambiar.png'";
        		}else{
        			img = "<img src='application/views/img/ERO_icon_comentario.png'";
        		}
        		
        		$(".tablaActividad .comentTable").append("<div class='fila'>" +
														img +
														"<span class='bold'>" + response.result[i].name + " " + response.result[i].surname + "</span><span> " + response.result[i].titulo + "</span><span idDraw='" + response.result[i].id_draw + "' idCategory='" + response.result[i].id_category + "' class='drawNotification'> " + response.result[i].geometriatitle + " </span>" +
														"<p class='size11' style='margin-left: 28px;'>" +
															response.result[i].texto +
															"</br>" +
															"<span style='color:#666666;'>" + response.result[i].fecha + " </span>" +
														"</p>" +
													"</div>" +
													"<div style='border-top: 1px solid #cccccc;width: 100%;'></div>");
        	}
        	
        	$(".drawNotification").unbind("click").on("click",function(event){
//        		$.ajax({
//    		        url: 'index.php/draw/getDraw/' + $(this).attr("idCategory"), 
//    		        dataType: "json",
//    		        success: function(response) {
////    		        	var gSLayerGeoJson = new GSLayerGeoJson(response.properties.titulo, response, null);
////    		        	Split.__mapLeft.addLayer(gSLayerGeoJson);
////    		        	navigate(0);
//    		        }
//    			});
        		
        		var id_draw = $(this).attr("idDraw");
        		
        		$.ajax({
    		        url: 'index.php/draw/getDraws/' + $(this).attr("idCategory"), 
    		        dataType: "json",
    		        success: function(response) {
    		        	for(var i=0; i<response.length; i++){
    		        		if(response[i].properties.id == id_draw){
    		        			// showFancyVectorInfo(response[i], null);
    		        			// break;
                                var idCategory = response[i].properties.id_category;
                                $(".family_content li").find("div[idCapa='" + idCategory + "'][tipo='vectorial']").closest("li").trigger('click')
                                if(!Split.__mapLeft.containLayer(response[i].properties.id_category,"vectorial") || Split.__mapRight.containLayer(id_draw,"vectorial")){
                                    $("#fancy_select_panel").css({"top":event.pageY, "left":event.pageX});
                                    $("#fancy_select_panel").show(300);
                                    $(".panelSelect").unbind().bind( "click", function(){                                    
                                        $("#geometryVectorList").find("p[idDraw='" + id_draw + "']").trigger("click");
                                        var panel = $(this).attr("panel");
                                        Split.addLayer(null,"vectorial", null, response,panel);
                                        navigate(0);  
                                    });
                                }else{
                                    // while($.active != 0){
                                       var time = setTimeout(
                                          function() 
                                          {
                                            if($.active == 0){
                                                $("#geometryVectorList").find("p[idDraw='" + id_draw + "']").trigger("click");
                                                navigate(0);
                                                clearInterval(time);
                                            }
                                          }, 100);
                                    // }
                                }
    		        		}
    		        	}
    		        	// navigate(0);
                    }
    			});
        		
        	});
        }
	});
};



