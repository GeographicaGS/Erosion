function categoryPanelEvents(){
	
	$(".petaniaCatalogo").click(function(){
		if($(".cuerpoCatalogo").is(":visible")){
			var left;
			if($(".catalogo").outerWidth() > 311){
				left = "-30.1%";
			}else{
				left = "-311px";
			}
			$(".catalogo").animate({"left":left},function(){
				$(".cuerpoCatalogo").hide();
				$(".petaniaCatalogo").find("img").attr("src",$(".petaniaCatalogo").find("img").attr("src").replace("ERO_icon_pestana_catalogo.png","ERO_icon_pestana_catalogo_off.png"));
			});
			$(".cuerpoCatalogo").parent().css({'z-index':''});
			
		}else{
			$(".cuerpoCatalogo").show();
			$(".catalogo").animate({"left":""});
			$(".petaniaCatalogo").find("img").attr("src",$(".petaniaCatalogo").find("img").attr("src").replace("ERO_icon_pestana_catalogo_off.png","ERO_icon_pestana_catalogo.png"));
			$(".cuerpoCatalogo").parent().css({'z-index':'1003'});
		}
	});


	$(".catalogo .cuerpoCatalogo .cabecera .seccion").click(function(){
		$(".catalogo .cuerpoCatalogo .cabecera .seccion").removeClass("active");
		$(this).addClass("active");
		$(".catalogueSection").hide();
		$("div[idSection=" + $(this).attr("idSection") + "]").show();
	});

	$(".contenidoCatalogo #capasCatalogo").on( "mouseenter mouseleave", '.families .family_content li .botonAddImage' ,function(){
		var lista = $(this).siblings(".listaTipos");
		var aux;
		
		if($(lista).is(":visible")){
			aux = $(lista).parent().outerWidth() - $(this).outerWidth() - 40;
			$(this).siblings("p").css({"width":aux});
			lista.hide();
		}else{
			aux = $(lista).parent().outerWidth() - $(lista).siblings("p").outerWidth() - $(this).outerWidth()-40;
			if($(this).siblings("p").width() > aux){
				$(this).siblings("p").css({"width":$(this).siblings("p").outerWidth() + aux - lista.outerWidth()});
			}
			lista.show();
		}
	});
	
	$(".contenidoCatalogo #capasCatalogo").on( "mouseenter mouseleave", '.families .family_content li .listaTipos' ,function(){
		var aux;
		if($(this).is(":visible")){
			$(this).hide();
			aux = $(this).parent().outerWidth() - $(this).outerWidth() - 40;
			$(this).siblings("p").css({"width":aux});
		}else{
			aux = $(this).parent().outerWidth() - $(this).siblings("p").outerWidth() - $(this).parent().find(".botonAddImage").outerWidth()-40;
			if($(this).siblings("p").width() > aux){
				$(this).siblings("p").css({"width":$(this).siblings("p").outerWidth() + aux - $(this).outerWidth()});
			}
			$(this).show();
		}
	});

	$('.contenidoCatalogo #capasCatalogo').on('click', '.families .family_header', function(){

		if($(this).next().next().is(":visible")){

			$(this).next().next().slideUp();
			$($(this).find("img")[0]).attr("src", "application/views/img/MED_icon_familia.png")

		}else if($(this).next().next().find("li").length > 0){

			$(this).next().next().slideDown();
			$($(this).find("img")[0]).attr("src", "application/views/img/MED_icon_cerrar_capas.png")
		}
	});
}