<html>
<head>
<title>Erosión</title>
<meta charset="UTF-8" >
<meta name="Author" content="Geographica.gs">
<meta name="keywords" content="Geographica" />
<meta name="description" content="" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

<link rel="stylesheet" type="text/css" href="<?= get_css("reset.css")?>" />

<link rel="stylesheet" href="<?= get_js("lib/leaflet-0.5/leaflet.css")?>" />
<link rel="stylesheet" href="<?= get_js("lib/leaflet.draw/leaflet.draw.css")?>" />

<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/fancybox/jquery.fancybox.css?v=2.1.3")?>"/>
<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/fancybox/helpers/jquery.fancybox-buttons.css?v=1.0.5")?>"/>
<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/fancybox/helpers/jquery.fancybox-thumbs.css?v=1.0.7")?>"/>
<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/ui-lightness/jquery-ui-1.10.3.custom.min.css")?>"/>
		
<script src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script>

<link rel="stylesheet" type="text/css" href="<?= get_css("layout.css")?>" />
<link rel="stylesheet" type="text/css" href="<?= get_css("styles.css")?>?v1.0" />

<script type="text/javascript" src="<?= get_js("lib/jquery-1.8.2.min.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/leaflet-0.5/leaflet.js")?>"></script>


<script type="text/javascript" src="<?= get_js("lib/leaflet.draw/leaflet.draw.js")?>"></script>



<script type="text/javascript" src="<?= get_js("lib/Google.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/leaflet-wmts.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/jquery-ui-1.10.3.custom.min.js")?>"></script>

<!--[if lt IE 9]>
<script src="<?= get_js("lib/html5shiv.js")?>"></script>
<![endif]-->

<script type="text/javascript" src="<?= get_js("grouplayer.js")?>"></script>
<script type="text/javascript" src="<?= get_js("split.js")?>"></script>
<script type="text/javascript" src="<?= get_js("layers.js")?>"></script>
<script type="text/javascript" src="<?= get_js("GSLayerWMS.js")?>"></script>
<script type="text/javascript" src="<?= get_js("GSLayerWMTS.js")?>"></script>
<script type="text/javascript" src="<?= get_js("GSLayerTMS.js")?>"></script>
<script type="text/javascript" src="<?= get_js("categories.js")?>"></script>
<script type="text/javascript" src="<?= get_js("global.js")?>"></script>

<script type="text/javascript" src="<?= get_js("lib/fancybox/jquery.fancybox.pack.js?v=2.1.3")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/fancybox/helpers/jquery.fancybox-buttons.js?v=1.0.5")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/fancybox/helpers/jquery.fancybox-media.js?v=1.0.5")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/fancybox/helpers/jquery.fancybox-thumbs.js?v=1.0.7")?>"></script>

<script type="text/javascript">	

	$(window).ready(function(){
		
		
		$("a#info_fancybox").fancybox({
			"hideOnContentClick" : true,
			"overlayColor" : "#150e09",
			"overlayOpacity" : 0.5
		});
		
		$("#search").keypress(function(e) {
		    if(e.which == 13) {
		    	showDevMsg();
		    }
		});

		$("#search").focus(function(){
			if ($(this).val()=="buscar..."){
				$(this).val("");
			}
		});
		
		resize();
		$("img.sync").click(Split.sync);
		Split.initialize();
		setTimeout(function(){
			resize();
		},300);
		
    });
	
	$(window).resize(function(){
		resize();
		Split.__mapLeft.getMap().invalidateSize();		
		Split.__mapRight.getMap().invalidateSize();		
	})
	var base_url = "<?= base_url("/")?>";
</script>
</head>

<body>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-9148278-40']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>	

<header>
	<div class="fleft left">
		
		<input class="fleft" type="text" id="search" value="buscar..."/>
		<div class="clear"></div>
	</div>	
	<nav class="fleft">
		<a href="javascript:navigate()" target="_blank">
			EL PROYECTO
		</a>
		<a href="javascript:navigate()">
			CATÁLOGO
		</a>
	</nav>
	<p class="fright size10 credits">
		<span class="bold">Proyecto de I+D+i</span><br/>
		Espacialización y difusión web de variables demográficas, <br/>
		turísticas y ambientales para la evaluación de la vulnerabilidad<br/>
		asociada a la erosión de playas en la costa andaluza.
	</p>
	
	<div class="clear"></div>
</header>

<div id="container" style="overflow: auto;">

	<div class="loginDiv">
		<h1>Acceso de usuarios</h1>
		<input type="text" value="Correo electrónico" />
		<input type="text" value="Contraseña" />
		<input type="button" valie="Acceder"/>	
	</div>

	<div id="proyecto">
		<div id="panel_left" class="panel">
		
			<div id="map_left"></div>
		
			<div id="histogram_left" style="display:none"></div>
			
			<div class="split_ctrl">			
				<img class="sync" src="<?= get_img("MED_icon_enlazar_OK_left.png")?>" width=15px height=16px title="Desincronizar mapas" />						
				<a href="javascript:Split.togglePanel(Split.LEFT)">
					<img class="toggle" src="<?= get_img("MED_icon_split_left.png")?>" width=28px height=29px title="Ocultar mapa de la izquierda"/>
				</a>
			</div>
		
			<a id="capaLeft" href="javascript:Split.toggleLayersInterface(Split.LEFT)" class="layer_ctrl">Capas</a>
			
			<ul class="layer_panel close"></ul>
		
		</div>
		
		<div id="sep" class="sep" ></div>
		
		
		<div id="tool_bar">
			<div id="ctrl_rectangle_drawer"></div>
			<div id="ctrl_feature_info"></div>
		</div>
		
		
		<div id="panel_right" class="panel">
		
			<div id="map_right"></div>
		
			<div id="histogram_right" style="display:none"></div>
		
			<div class="split_ctrl">			
				<img class="sync" src="<?= get_img("MED_icon_enlazar_OK_right.png")?>" width=15px height=16px title="Desincronizar mapas"/>			
				<a href="javascript:Split.togglePanel(Split.RIGHT)">
					<img class="toggle" src="<?= get_img("MED_icon_split_right.png")?>" width=28px height=29px title="Ocultar mapa de la derecha"/>
				</a>
			</div>
		
			<a id="capaRight" href="javascript:Split.toggleLayersInterface(Split.RIGHT)" class="layer_ctrl">Capas</a>
			
			<ul class="layer_panel close"></ul>
		
		</div>
	</div>
	<div id="catalogo" style="display: none;">
		<div class="fleft mr20">
			<div class="catalogo size18">Catálogo</div>
			<p class="mt">Lorem ipsum dolor sit amet, 
				consectetur adipiscing elit. 
				Nam faucibus velit iaculis 
				faucibus placerat. Morbi et 
				porttitor lorem, id rutrum est. 
				Morbi sed dolor ac nunc 
				euismod tempus.
			</p>
			<div class="mt20"><a class="catalogo size13"  style="text-decoration: underline;" href="javascript:navigate()">Volver al mapa</a></div>
		</div>
		<div id="categories"></div>
	</div>
	<div class="clear"></div>
</div>

<div style="display: none">
	<a id="info_fancybox" href="#info_fancy_box_data">Fancybox hidden_link</a>
	<div id="info_fancy_box_data"></div>
</div>

<div style="display: none" id="service_fancy_box_data">
	<div class="serviceFancy">
		<h1>Añadir servicio externo</h1>
		<h2>Cerrar</h2>
		<div class="clear"></div>
		<select>
			<option>WMS</option>
			<option>TMS</option>
		</select>
		<input type="text" value="url"/>
		<input class="input_fancy" style="display: none;" type="text" value="Título de la capa" />
		<div class="clear"></div>
		<input type="button" value="Explorar servicio" />
		<div class="clear"></div>
		
		<div class="info_fancy_service">Seleccione un tipo de servicio y especifique la url de descarga</div>
		
		<div class="ml mr tabla_fancy_service"></div>
		<div class="urlServicioWms" style="display: none"></div>
		
	</div>
</div>

<footer>
	<div class="uni">
		<a href="http://www.us.es" target="_blank">
			<img src="<?= get_img("ERO_logo_uni_sevilla.png")?>" />
		</a>
		<p>
			Departamento de Geografía Física y Análisis Geográfico Regional
		</p>
	</div>
	<div class="geo" >		
		<a href="http://www.geographica.gs" target="_blank">
			<img src="<?= get_img("GEO_W12_icon_bygeographica.png")?>" />
			<span class="italic ml5 grey2 size10 mr3">D+D by</span>
			<span class="bold size10 grey"> Geographica</span>
		</a>		
	</div>
	<div class="fright">
		<p class="fleft fund">
			<span class="bold">Proyecto cofinanciado<br/> por los Fondos FEDER</span><br/>
			Ref. del Proyecto:<br/>
			CS02010-15807
		</p>
		<div class="fleft mt20">	
			<a href="http://europa.eu/legislation_summaries/agriculture/general_framework/g24234_es.htm" target="_blank" class="fleft" >
				<img src="<?= get_img("ERO_logo_EU.png")?>" />
			</a>
			<a href="http://www.mineco.gob.es/" target="_blank" class="fleft" >
				<img src="<?= get_img("ERO_logo_MEC.png")?>" />
			</a>
			<a href="http://www.idi.mineco.gob.es/" target="_blank" class="fleft mr20" >
				<img src="<?= get_img("ERO_logo_MCI.png")?>" />
			</a>
		</div>
		
	</div>
	
</footer>
</body>
</html>