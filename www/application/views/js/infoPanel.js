function infoPanelEvents(){
	
	$(".petaniaInfoCatalogo").click(function(e){
		if($(".cuerpoInfoCatalogo").is(":visible")){
			$(".infoCatalogo").animate({"right": "-" + $(".infoCatalogo").outerWidth() + "px"},function(){
				$(".cuerpoInfoCatalogo").hide();
				$(".petaniaInfoCatalogo").find("img").attr("src",$(".petaniaInfoCatalogo").find("img").attr("src").replace("ERO_icon_pestana_info.png","ERO_icon_pestana_info_off.png"));
			});
			$(".cuerpoInfoCatalogo").parent().css({'z-index':''});
			
		}else{
			$(".cuerpoInfoCatalogo").show();
			$(".infoCatalogo").animate({"right":""});
			$(".petaniaInfoCatalogo").find("img").attr("src",$(".petaniaInfoCatalogo").find("img").attr("src").replace("ERO_icon_pestana_info_off.png","ERO_icon_pestana_info.png"));			
			$(".cuerpoInfoCatalogo").parent().css({'z-index':'1003'});
		}
		e.stopPropagation();
	});

	$(".cuerpoInfoCatalogo").mousedown(function(e) {
		e.stopPropagation();
	}).mouseup(function(e) {
		e.stopPropagation();
	});
	
	$(".petaniaInfoCatalogo").mousedown(function(e) {
		e.stopPropagation();
	}).mouseup(function(e) {
		e.stopPropagation();
	});

	$(".infoCatalogo").mousedown(function() {
		$(".cuerpoInfoCatalogo, #container").css({"cursor":"col-resize"});
		$(".cuerpoInfoCatalogo, #container").mousemove(function(e) {
			$(".infoCatalogo").outerWidth($("#proyecto").outerWidth() - e.originalEvent.clientX);
		});
	});

	$("#container, .cuerpoInfoCatalogo, header, footer").mouseup(function(e) {
		$(".cuerpoInfoCatalogo, #container").css({"cursor":""});
		$(".cuerpoInfoCatalogo, #container").off("mousemove");
		if($(this).hasClass("cuerpoInfoCatalogo")){
			$("#fancy_select_panel").hide(300);
			e.stopPropagation();
		}
	});

	$(".addHistoryButton").click(function(event, latlng) {
		$("#geometryVector").hide();
		$("#addHistoryForm input[type='text']").val("");
		$(".addCommentHistory").val("");
		$("#addHistoryForm").show();
		$("#addHistoryForm input[type='text']").removeClass("errorBorder");
		$(".addCommentHistory").removeClass("errorBorder");
		$("#typeHistory").val("Historia");
		$("#addHistoryForm").find(".goBack").show();

		// Cargo las categorias
		$("#addHistoryForm select").html("");
		$.ajax({
		        url: 'index.php/draw/getCategories', dataType: "json",
		        success: function(response) {
		        	$("#fancy_box_form_save_draw").find("select").children().remove();
		        	for(var i=0; i<response.length; i++){
			    		$("#addHistoryForm select").append("<option value='" + response[i].id_category + "' " + ($(".extraLeyenda").find("div[idCapa]").attr("idCapa") == response[i].id_category ?  'selected' : '') + ">" + response[i].title + "</option>");
			    	}
			    }
		});

		$(".saveHistoryButton").click(function() {
			$("#addHistoryForm input[type='text']").removeClass("errorBorder");
			$(".addCommentHistory").removeClass("errorBorder");
			var guardar = true;
			if($("#addHistoryForm input[type='text']").val() == ""){
				$("#addHistoryForm input[type='text']").addClass("errorBorder");
				guardar = false;
			}
			if($(".addCommentHistory").val() == ""){
				$(".addCommentHistory").addClass("errorBorder");
				guardar = false;
			}
			if(guardar){
				$.ajax({
					url: 'index.php/draw/saveDraw',
					data: "puntos=" + (latlng != null ? JSON.stringify(latlng): "") + "&type=" + $("#typeHistory").val() + "&" + "&titulo=" + $("#addHistoryForm input[type='text']").val() + "&comentario=" + $(".addCommentHistory").val() + "&categoria=" + $("#addHistoryForm select").val(),
					type: "POST",
					success: function(response) {
						var htmlCategory = $(".contenidoCatalogo").find("div[idCapa='" + $("#addHistoryForm select").val() + "'][tipo='vectorial']").parent();
						htmlCategory.show();
						htmlCategory.trigger("click");

						if(latlng != null){
							//Borro la geomatría y refresco la categoría
							$.each(Split.__mapLeft.getMap()._layers, function(key){
								if((Split.__mapLeft.getMap()._layers[key]._latlng && compareLayersCoordinates(Split.__mapLeft.getMap()._layers[key]._latlng, latlng)) || (Split.__mapLeft.getMap()._layers[key]._latlngs && compareLayersCoordinates(Split.__mapLeft.getMap()._layers[key]._latlngs, latlng))){
									Split.__mapLeft.getMap().removeLayer(Split.__mapLeft.getMap()._layers[key]);
									return true;
								}
							});
									        	
							$.each(Split.__mapRight.getMap()._layers, function(key){
								if((Split.__mapRight.getMap()._layers[key]._latlng && compareLayersCoordinates(Split.__mapRight.getMap()._layers[key]._latlng, latlng)) || (Split.__mapRight.getMap()._layers[key]._latlngs && compareLayersCoordinates(Split.__mapRight.getMap()._layers[key]._latlngs, latlng))){
									Split.__mapRight.getMap().removeLayer(Split.__mapRight.getMap()._layers[key]);
									return true;
								}
							});

							// REFRESCAR CATEGORIA EN EL MAPA, TENGO QUE BORRARLA SI ESTÁ CARGADA Y VOLVERLA A CARGAR
							Split.__mapLeft.removeLayer($("#addHistoryForm select option:selected").text(), "geoJson");
							Split.__mapRight.removeLayer($("#addHistoryForm select option:selected").text(), "geoJson");
							$.ajax({
								url: 'index.php/draw/getDraws/' + $("#addHistoryForm select").val(), 
								dataType: "json",
								success: function(response) {
									Split.addLayer(null,"vectorial", null, response,3);  
								}
							});
						}

					}
				});
			}
		});

	});

	$(".goBack").click(function() {
		$("#commentsVector").hide();
		$("#addHistoryForm").hide();
		$("#geometryVector").show()
	});

	$(".deleteProyect").click(function(event){
		var project = $(".extraLeyenda").find("div[idproject]").attr("idProject");
		showConfirmDialog(function(){
			$.ajax({
				url: 'index.php/project/deleteProyect/' + encodeURIComponent(project), 
					success: function(response) {
						Split.removeAllLayers();
						drawCategories();
						$(".infoCatalogo .petaniaInfoCatalogo").trigger("click")
						$(".infoCatalogo .petaniaInfoCatalogo").hide()
					}
			});           
		},"¿Desea borrar el proyecto seleccionado?");
	});

	$(".defaultProject").click(function(event){
		var self = $(this);
		if($(this).hasClass('active')){
			$.ajax({
				url: 'index.php/project/removeDefaultProyect', 
				success: function(response) {
					self.removeClass('active');
					$(".defaultProject").prop("title", "Establecer por defecto");
					defaultProject = null;
				}
			});

		}else{
			var project = $(".extraLeyenda").find("div[idproject]").attr("idProject");
			$.ajax({
				url: 'index.php/project/defaultProyect/' + encodeURIComponent(project), 
					success: function(response) {
						drawCategories(true);
						self.addClass('active');
						$(".defaultProject").prop("title", "Establecido por defecto");
						defaultProject = project;
					}
			});
		}
		return false;
	});
}

function deleteCommentEvent(){
	$(".deleteComment").unbind().bind("click", function() {
		var idComment = $(this).attr("idComment");
		var comment = $(this).parent();
		showConfirmDialog(function(){
		$.ajax({
        	url: 'index.php/draw/deteleComent/' + idComment,
	        success: function(response) {
	        	comment.next().remove();
				comment.remove();
	        }
        });           
	    },"¿Desea borrar el comentario seleccionado?");
	});
}