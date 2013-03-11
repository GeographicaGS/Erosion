<html lang="es">
<head>
	<meta http-equiv="Content-Type"	content="text/html; charset=UTF-8">
	<meta name="language" content="es-ES">
	<title>Erosión</title>
	
	<link rel="icon" href="<?=get_img("favicon.ico") ?>">
	<link rel="stylesheet" type="text/css" href="<?= get_css("reset.css")?>" />
	<link rel="stylesheet" type="text/css" href="<?= get_css("erosion.css")?>" />
	<link rel="stylesheet" type="text/css" href="<?= get_css("layout.css")?>" />
	<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("fancybox/jquery.fancybox.css?v=2.1.3")?>"/>
	<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("fancybox/helpers/jquery.fancybox-buttons.css?v=1.0.5")?>"/>
	<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("fancybox/helpers/jquery.fancybox-thumbs.css?v=1.0.7")?>"/>
		
	<script type="text/javascript" src="<?= get_js("jquery-1.8.2.min.js") ?>"></script>
	<script type="text/javascript" src="<?= get_js("jquery.mousewheel-3.0.6.pack.js")?>"></script>
	
	<script type="text/javascript" src="<?= get_js("fancybox/jquery.fancybox.pack.js?v=2.1.3")?>"></script>
	<script type="text/javascript" src="<?= get_js("fancybox/helpers/jquery.fancybox-buttons.js?v=1.0.5")?>"></script>
	<script type="text/javascript" src="<?= get_js("fancybox/helpers/jquery.fancybox-media.js?v=1.0.5")?>"></script>
	<script type="text/javascript" src="<?= get_js("fancybox/helpers/jquery.fancybox-thumbs.js?v=1.0.7")?>"></script>
	
	<script type="text/javascript">
    	$(document).ready(function(){
			readyApp();
        });    	   
    </script>
     
	
</head>
<body>

	<div style="display: none">
		<a id="info_fancybox" href="#info_fancy_box_data">Fancybox hidden_link</a>
		<div id="info_fancy_box_data"></div>
	</div>
	
	<header id="header">
		
	</header>
	Hello World erosión
	
	<?= print_r($test) ?>
	
	<footer id="footer">
			   
	</footer>
	
</body>
</html>
