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

<script type="text/javascript" src="<?= get_js("lib/fancybox/jquery.fancybox.pack.js?v=2.1.3")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/fancybox/helpers/jquery.fancybox-buttons.js?v=1.0.5")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/fancybox/helpers/jquery.fancybox-media.js?v=1.0.5")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/fancybox/helpers/jquery.fancybox-thumbs.js?v=1.0.7")?>"></script>

<script type="text/javascript">	

	function resize(){
		$("#container").height($(window).height() - $("header").outerHeight(true));
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
		showInfoFancybox("<br/><br/>Functionality under development");
	}
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
		
		resize();
		$("img.sync").click(Split.sync);
		Split.initialize();
		
    });
	
	$(window).resize(function(){
		resize();
		Split.__mapLeft.getMap().invalidateSize();		
		Split.__mapRight.getMap().invalidateSize();		
	})
</script>
</head>

<body>
	

<header>
	<div class="fleft left">
		<img class="fleft" id="logo" src="<?= get_img("MED_logo_cab.png")?>" width=112px height=51px/>
		<input class="fleft" type="text" id="search" />
		<div class="clear"></div>
	</div>	
	<nav class="fleft">
		<a href="http://www.medinaproject.eu/" target="_blank">
			The project
		</a>
		<a href="javascript:showDevMsg()">
			SDI Overview
		</a>
		<a href="javascript:showDevMsg()">
			Catalog
		</a>
	</nav>
	<p class="fright size9 credits">
		<span class="bold">Medina</span><br/>
		Marine Ecosystem Dynamics and<br/>
		Indicators for North Africa<br/>
		[ENV.2011.4.1.4-2], Grant agreement no: 282977<br/>
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


</body>
</html>