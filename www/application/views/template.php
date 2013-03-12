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

<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/fancybox/jquery.fancybox.css?v=2.1.3")?>"/>
<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/fancybox/helpers/jquery.fancybox-buttons.css?v=1.0.5")?>"/>
<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/fancybox/helpers/jquery.fancybox-thumbs.css?v=1.0.7")?>"/>
		
		
<link rel="stylesheet" type="text/css" href="<?= get_css("layout.css")?>" />
<link rel="stylesheet" type="text/css" href="<?= get_css("styles.css")?>" />

<script type="text/javascript" src="<?= get_js("lib/jquery-1.8.2.min.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/leaflet-0.5/leaflet.js")?>"></script>
<!--[if lt IE 9]>
<script src="<?= get_js("lib/html5shiv.js")?>"></script>
<![endif]-->

<script type="text/javascript" src="<?= get_js("grouplayer.js")?>"></script>
<script type="text/javascript" src="<?= get_js("split.js")?>"></script>
<script type="text/javascript" src="<?= get_js("layers.js")?>"></script>
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
		
		
    });
	
	$(window).resize(function(){
		resize();
		Split.__mapLeft.getMap().invalidateSize();		
		Split.__mapRight.getMap().invalidateSize();		
	})
	var base_url = "<?= base_url()?>";
</script>
</head>

<body>
	

<header>
	<div class="fleft left">
		
		<input class="fleft" type="text" id="search" value="buscar..."/>
		<div class="clear"></div>
	</div>	
	<nav class="fleft">
		<a href="" target="_blank">
			EL PROYECTO
		</a>
		<a href="javascript:showDevMsg()">
			CATÁLOGO
		</a>
	</nav>
	<p class="fright size10 credits">
		<span class="bold">Proyecto de I+D+I</span><br/>
		Espacialización y difusión web de variables demográficas, turísticas y ambientales para<br/>
		la evaluación de la vulnerabilidad asociada a la erosión de playas en la costa andaluza
	</p>
	
	<div class="clear"></div>
</header>

<div id="container" >
	
	<div id="panel_left" class="panel">
	
		<div id="map_left"></div>
	
		<div id="histogram_left" style="display:none"></div>
		
		<div class="split_ctrl">			
			<img class="sync" src="<?= get_img("MED_icon_enlazar_OK_left.png")?>" width=15px height=16px title="Desynchronized maps" />						
			<a href="javascript:Split.togglePanel(Split.LEFT)">
				<img class="toggle" src="<?= get_img("MED_icon_split_left.png")?>" width=28px height=29px title="Hide left map"/>
			</a>
		</div>
	
		<a href="javascript:Split.toggleLayersInterface(Split.LEFT)" class="layer_ctrl">Layers</a>
		
		<ul class="layer_panel close"></ul>
	
	</div>
	
	<div id="sep" class="sep" ></div>
	
	<div id="panel_right" class="panel">
	
		<div id="map_right"></div>
	
		<div id="histogram_right" style="display:none"></div>
	
		<div class="split_ctrl">			
			<img class="sync" src="<?= get_img("MED_icon_enlazar_OK_right")?>" width=15px height=16px title="Desynchronized maps"/>			
			<a href="javascript:Split.togglePanel(Split.RIGHT)">
				<img class="toggle" src="<?= get_img("MED_icon_split_right.png")?>" width=28px height=29px title="Hide right map"/>
			</a>
		</div>
	
		<a href="javascript:Split.toggleLayersInterface(Split.RIGHT)" class="layer_ctrl">Layers</a>
		
		<ul class="layer_panel close"></ul>
	
	</div>
	<div class="clear"></div>
</div>

<div style="display: none">
	<a id="info_fancybox" href="#info_fancy_box_data">Fancybox hidden_link</a>
	<div id="info_fancy_box_data"></div>
</div>

<footer>
	<div class="uni">
		<img src="<?= get_img("ERO_logo_uni_sevilla.png")?>" />
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
			<img class="fleft" src="<?= get_img("ERO_logo_EU.png")?>" />
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