function getImg(s){
	return base_url + "application/views/img/" + s;
}


function resize(){
	$("#container,.sep").height($(window).height() - $("header").outerHeight(true) - $("footer").outerHeight(true));
	var mw = Math.floor($(window).width() /2);
	$("#sep").css("left",mw-1);
	$("#panel_left").width(mw);
	$("#panel_right").width(mw);
	
}

function showInfoFancybox(text) {
	var html =  "<div>"+text+"</div>";
	$("#info_fancy_box_data").html(html);
	$("#info_fancybox").fancybox().trigger('click');
}

function showDevMsg(){
	showInfoFancybox("<br/><br/>Funcionalidad en desarrollo");
}

function onLocationFound(e) {
    L.marker(e.latlng).addTo(this).bindPopup("Esta es tu posición:</br>Latitud: " +  e.latlng.lat + "<br>Longitud: " + e.latlng.lng).openPopup();
}

function navigate() {
    if ($("#catalogo").is(":visible")) {
        $("#proyecto").show();
        $("#catalogo").hide();
    	
        
//        $("#proyecto").css({"opacity":"1"});
//    	$("#catalogo").css({"opacity":"0"});
    }
    else{
        $("#proyecto").hide();
        $("#catalogo").show();   
        
//        $("#proyecto").animate({opacity: "0"}, 300)
//        $("#catalogo").animate({opacity: "1"}, 500)
    }    
}
