<html>
<head>
<title></title>
<meta charset="UTF-8" >
<meta name="Author" content="Geographica.gs">
<meta name="keywords" content="Geographica" />
<meta name="description" content="" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

<link rel="stylesheet" type="text/css" href="<?= get_css("reset.css")?>" />

<link rel="stylesheet" href="<?= get_js("lib/leaflet-0.5/leaflet.css")?>" />
<link rel="stylesheet" href="<?= get_js("lib/leaflet.draw/leaflet.draw.css")?>" />

<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/fancybox/jquery.fancybox.css")?>"/>
<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/fancybox/helpers/jquery.fancybox-buttons.css")?>"/>
<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/fancybox/helpers/jquery.fancybox-thumbs.css")?>"/>


<link rel="stylesheet" type="text/css" media="screen" href="<?= get_js("lib/ui-lightness/jquery-ui-1.10.3.custom.min.css")?>"/>
		
<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBv2LS8Lqu53wYmtgxztWVBTEpLdMWIzHQ&sensor=false"></script>

<link rel="stylesheet" type="text/css" href="<?= get_css("layout.css")?>" />
<link rel="stylesheet" type="text/css" href="<?= get_css("styles.css")?>?v1.0" />

<link rel="stylesheet" type="text/css" href="<?= get_css("MarkerCluster.css")?>?v1.0" />
<link rel="stylesheet" type="text/css" href="<?= get_css("MarkerCluster.Default.css")?>?v1.0" />


<script type="text/javascript" src="<?= get_js("lib/jquery-2.1.3.min.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/leaflet-0.5/leaflet.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/leaflet.markercluster.js")?>"></script>


<script type="text/javascript" src="<?= get_js("lib/leaflet.draw/leaflet.draw.js")?>"></script>



<script type="text/javascript" src="<?= get_js("lib/Google.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/GoogleStreet.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/Bing.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/leaflet-wmts.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/jquery-ui-1.10.3.custom.min.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/leaflet.Sync.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/singleTile.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/L.Control.ZoomDisplay.js")?>"></script>

<script type="text/javascript" src="<?= get_js("global.js")?>"></script>
<script type="text/javascript" src="<?= get_js("grouplayer.js")?>"></script>
<script type="text/javascript" src="<?= get_js("split.js")?>"></script>
<script type="text/javascript" src="<?= get_js("access.js")?>"></script>
<script type="text/javascript" src="<?= get_js("GSLayerWMS.js")?>"></script>
<script type="text/javascript" src="<?= get_js("GSLayerWMTS.js")?>"></script>
<script type="text/javascript" src="<?= get_js("GSLayerTMS.js")?>"></script>
<script type="text/javascript" src="<?= get_js("GSLayerGeoJson.js")?>"></script>
<script type="text/javascript" src="<?= get_js("GSLayerSimbolo.js")?>"></script>
<script type="text/javascript" src="<?= get_js("categories.js")?>"></script>
<script type="text/javascript" src="<?= get_js("drawCategoryPanel.js")?>"></script>
<script type="text/javascript" src="<?= get_js("categoryPanel.js")?>"></script>
<script type="text/javascript" src="<?= get_js("infoPanel.js")?>"></script>
<script type="text/javascript" src="<?= get_js("toolbar.js")?>"></script>
<script type="text/javascript" src="<?= get_js("notification.js")?>"></script>

<script type="text/javascript" src="<?= get_js("lib/fancybox/jquery.fancybox.pack.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/fancybox/helpers/jquery.fancybox-buttons.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/fancybox/helpers/jquery.fancybox-media.js")?>"></script>
<script type="text/javascript" src="<?= get_js("lib/fancybox/helpers/jquery.fancybox-thumbs.js")?>"></script>

<script type="text/javascript" src="<?= get_js("lib/jquery.ui.touch-punch.min.js")?>"></script>

<script type="text/javascript">	

	$(window).ready(function(){
		
		$("title").text(TITLE)
		
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
		$.ajax({
        	url: 'index.php/project/getDefaultProject',
        	dataType: 'json',
	        success: function(response) {
	        	if(response.length != 0){
		        	var capas = JSON.parse(response.capas);
		        	defaultProject = response.titulo;
		        	if(capas.hasOwnProperty('leftState')){
		        		Split.iniLatLeft = capas.leftState.lat
		        		Split.iniLngLeft = capas.leftState.lng
		        		Split.iniZoomLeft = capas.leftState.zoom
			        }
			        if(capas.hasOwnProperty('rightState')){
			        	Split.iniLatRight = capas.rightState.lat
		        		Split.iniLngRight = capas.rightState.lng
		        		Split.iniZoomRight = capas.rightState.zoom
			       	}
		        }
	        	Split.initialize();
	        }
        });

		Access.initialize();
		Toolbar.initialize();

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
	<div class="fleft left" style="display: none;">
		
		<input class="fleft" type="text" id="search" value="buscar..."/>
		<div class="clear"></div>
	</div>	
	<nav class="fleft">
		<a href="javascript:navigate(0)">
			EL PROYECTO
		</a>
<!-- 		<a href="javascript:navigate(1)"> -->
<!-- 			CATÁLOGO -->
<!-- 		</a> -->
		<!-- <a href="javascript:navigate(2)">
			ACTIVIDAD
		</a> -->
	</nav>
	
	<div class="fright">
		<p class="size10 credits fleft">
			<span class="bold">Proyecto de I+D+i</span><br/>
			<?
				if(strpos($_SERVER["HTTP_HOST"],"excelencia.gis-and-coast")){
					
					echo "Espacialización y difusión web de datos de urbanización, y fitodiversidad, <br/>
							para el análisis de vulnerabilidad ante los procesos de inundación asociados<br/>
							a la subida del nivel del mar en la costa andaluza.";
				
				}else if(strpos($_SERVER["HTTP_HOST"],"visor.gis-and-coast")){
					
					echo "CLIENTES Y VISORES WEB<br/>
							Información espacial del<br/>
							medio litoral y marino.";

				}else if(strpos($_SERVER["HTTP_HOST"],"vivienda.gis-and-coast.org")){
					
					echo "GEORREFERENCIACIÓN<br/>
							CARACTERIZACIÓN ESTADÍSTICA Y<br/>
							ESTRATEGIAS DE DIFUSIÓN DEL ESPACIO RESIDENCIAL.";

				}else if(strpos($_SERVER["HTTP_HOST"],"gestioncosteraymarina.gis-and-coast.org")){
					
					echo "Curso de experto universitario en herramientas SIG e Internet<br/>
							para la gestión integrada de áreas costeras, planificación espacial marina<br/>
							y participación pública.";
				}
				else{
					echo "Espacialización y difusión web de variables demográficas, <br/>
							turísticas y ambientales para la evaluación de la vulnerabilidad<br/>
							asociada a la erosión de playas en la costa andaluza.";
				}
			?>
		</p>
		<?if(strpos($_SERVER["HTTP_HOST"],"excelencia.gis-and-coast")){?>
			<a href="http://www.andaluciasemueveconeuropa.com/" target="_blank"><img style="width: 90px;" class="fleft mt mr" src="<?= get_img("ERO_Andalucia-se-mueve-UE.png")?>" /></a>
		<?}?>
		
		<div class="acceder">
			<img class="mb5" src="<?= get_img("ERO_icon_user_cab.png")?>" title="Acceder"/>
			<div class="clear"></div>
			Acceder
		</div>
		<p id="closeSesion" class="credits fleft">
			
		</p>
	</div>
	
	<div class="clear"></div>
</header>

<div id="container" style="overflow: hidden;">

	<form id="form_login" action="index.php/login/getUser" method="POST">
		<div class="loginDiv">
			<h1>Acceso de usuarios</h1>
			<img class="closeLogin" src="<?= get_img("MED_icon_delete.png")?>" title="Cerrar" />						
			<input name="email" placeholder="Correo electrónico" type="text" value=""/>
			<input name="password" placeholder="Contraseña" type="password" value="" />
			<input type="button" value="Acceder"/>
			<p id="errorLogin">Usuario y contraseña incorrectos</p>	
		</div>
	</form>

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
		
			<a id="capaLeft" href="javascript:Split.toggleLayersInterface(Split.LEFT)" class="layer_ctrl" style="right:0">Capas</a>
			
			<ul class="layer_panel close" style="right: 0"></ul>

			<img class="streetButtonLeft" title="Activar Google Street" src="<?= get_img("POR_button_360_OFF.png")?>" >
			<input class="closeStreetLeft" type="button" value="Cerrar Street View"/>
		
		</div>
		
		<div id="sep" class="sep" ></div>
		
		
		<div id="tool_bar">
			<div title="Dibujar marcador" id="ctrl_marker_drawer"></div>
			<div title="Dibujar línea" id="ctrl_line_drawer"></div>
			<div title="Dibujar polígono" id="ctrl_rectangle_drawer"></div>
			<div title="Obtener información" id="ctrl_feature_info"></div>
			<div title="Guardar proyecto" id="ctrl_add_project"></div>
			<div title="Mostrar mi ubicación" id="ctrl_location" class="enable"></div>
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

			<input class="closeStreetRight" type="button" value="Cerrar Street View"/>
			<img class="streetButtonRight" title="Activar Google Street" src="<?= get_img("POR_button_360_OFF.png")?>" >

		</div>
	</div>
	
	<div class="catalogo">
		<div class="cuerpoCatalogo">
			<div class="cabecera">
				<div idSection="1" class="seccion active">Catálogo</div>
				<div idSection="2" title="Proyectos" class="seccion"><img src="<?= get_img("ERO_icon_proyecto.png")?>"/></div>
				<div idSection="3" title="Contenido subido por los usuarios" class="seccion"><img src="<?= get_img("ERO_icon_contenido_usuario.png")?>"/></div>
				<div idSection="4" title="Proyectos personales" class="seccion" style="display:none"><img src="<?= get_img("ERO_icon_proyectos_personales.png")?>"/></div>
				<div class="clear"></div>
				<div class="contenidoCatalogo">
					<div idSection="1" id="capasCatalogo" class="catalogueSection"></div>
					<div idSection="2" id="publicProyectCatalogo" class="catalogueSection" style="display:none;"></div>
					<div idSection="3" id="usuariosCatalogo" class="catalogueSection" style="display:none;"></div>
					<div idSection="4" id="myProyectCatalogo" class="catalogueSection" style="display:none;"></div>
				</div>
				
			</div>
		</div>
		<div class="petaniaCatalogo"><img class="" src="<?= get_img("ERO_icon_pestana_catalogo_off.png")?>"/></div>
	</div>

	<div class="infoCatalogo">
		<div class="cuerpoInfoCatalogo">
			<p class="id" style="display:none;" title=""></p>
			<p class='deleteProyect'>Eliminar</p>
			<div class="head">
				<p class="title1" title=""></p>
				<a href="" target="_blank" class="moreInfo">Más información</a>
			</div>
			<div class="clear"></div>
			<p class="title2"></p>
			<div class="extraLeyenda">
				<img title="Añadir capa" class="botonAddImageLeyenda" src="application/views/img/ERO_icon_anadir_capa.png">
				<div class="listaTiposLeyenda"></div>
				<a title="Establecer por defecto" href="" class="defaultProject"></a>
				<div class="clear"></div>
				<div class="separador"></div>
				<p class="title3">LEYENDA</p>
				<div class="divLeyenda">
					<div class="diagonal1"></div>
					<div class="diagonal2"></div>
				</div>

				<div id="geometryVector">
					<input class="addHistoryButton genericButton" type="button" value="Añadir historia">
					<p class="title3 mt5">HISTORIAS</p>
					<div id="geometryVectorList"></div>
					<div class="separador" style="margin-top: 0px !important;"></div>
				</div>

				<div id="commentsVector" idDraw='' style="display:none">
					<img src=""/>
					<h1></h1>
					<p class="goBack">Volver</p>
					<div class="clear"></div>
					<h2></h2>
					<div id="deleteGeometry"></div>
					<div class="clear"></div>
					<p class="title3">COMENTARIOS</p>
					<div id="commentsVectorVectorList" class="comentTable"></div>
					<div style="position: absolute; right: 10px; left: 10px;">
						<textarea class="addCommentInput" type="text" placeholder="Añadir comentario"></textarea>
						<input class="addComentButton genericButton" type="button" value="Añadir">
					</div>
				</div>
			</div>

			<div id="addHistoryForm">
				<div id="typeHistory" style="display:none"></div>
				<h1>Nueva historia</h1>
				<p class="goBack">Volver</p>
				<div class="clear"></div>
				<div class="ml mr">
					<input class="fleft" type="text" placeholder="Título"/>
					<select></select>
				</div>
				<div style="margin: 10px;">
					<textarea class="addCommentHistory" type="text" placeholder="Añadir comentario"></textarea>
				</div>
				<input class="saveHistoryButton genericButton" type="button" value="Guardar historia">
			</div>

		</div>
		<div class="petaniaInfoCatalogo"><img class="" src="<?= get_img("ERO_icon_pestana_info_off.png")?>"/></div>
	</div>
	
	<div id="catalogo" style="display: none;">
		<div class="fleft mr20">
			<div class="catalogo size18">Catálogo</div>
			<p class="mt"></p>
			<div class="mt20"><a class="catalogo size13"  style="text-decoration: underline;" href="javascript:navigate(0)">Volver al mapa</a></div>
		</div>
		<div id="categories"></div>
	</div>
	
	<!-- <div id="actividad" style="display: none;" >
		<div class="tablaActividad">
			<h1>Actividad reciente</h1>
			
			<div class="comentTable" style="max-height: none;background-color: white;"></div>
		
		</div>
	</div> -->
	
	<div class="clear"></div>
</div>

<div style="display: none">
	<a id="info_fancybox" href="#info_fancy_box_data">Fancybox hidden_link</a>
	<div id="info_fancy_box_data"></div>
	
	<div id="fancy_box_form_save_draw">
		<div class="serviceFancy">
			<h1>Nuevo elemento</h1>
			<h2>Cerrar</h2>
			<div class="clear"></div>
			<input class="fleft" style="width: 390px; background: #ecedef;" type="text" value="Título">
			<select style="width: 220px; background-position: 195 13;">
				
			</select>
			<input style="width: 620px; background: #ecedef;" type="text" value="Comentario">
			<input class="mt20" style="width: 620px;" type="button" value="Guardar geometría">
		</div>
	</div>
</div>

<div id="fancy_box_save_draw" class="miniFancy">
		<p class="fleft fancySave">Guardar geometría</p>
		<p class="fleft fancyKml">Exportar a KML</p>
		<p class="fancyCancel">Cancelar</p>
		<img title="borrar" src="<?= get_img("MED_icon_papelera_panel.png")?>" >
</div>

<div id="fancy_box_dont_save_draw" class="miniFancy">
		<p class="fleft fancyOk">ok</p>
		<p class="fleft fancyKml">Exportar a KML</p>
		<img title="borrar" src="<?= get_img("MED_icon_papelera_panel.png")?>" >
</div>


<div id="project_fancy">
	<div class="serviceFancy">
		<h1>Proyecto</h1>
		<h2>Cerrar</h2>
		<div class="clear"></div>
		<input name='tituloProyecto'  class="fleft" style="width: 545px; background: #ecedef;" type="text" value="" placeholder="Título">
		<div id="divIsPublic" class="fright" style="display:none; margin-top: 28px; font-size: 14px;color: #666666; margin-right: 30px;">
			<input name="isPublic" type="checkbox" /><label>Público</label>
		</div>
		<input name='descripcionProyecto' style="width: 620px; background: #ecedef;" type="text" value="" placeholder="Descripción">
		<p id="errorNoCapas" style="display:none; text-align: center; margin-top: 15px; color: red;">No ha cargado ninguna capa en ninguno de los mapas</p>
		<p id="errorProjectOwner" style="display:none; text-align: center; margin-top: 15px; color: red;">Usted no es propietario de este proyecto y no puede sobreescribirlo</p>
		<input name="saveProject" class="mt20" style="width: 620px;" type="button" value="Guardar proyecto">
		
		<div id="projectExist" style="display: none;">
			<p style="text-align: center; margin-top: 15px; color: red;">Este proyecto ya existe ¿Desea sobreescribirlo?</p>
			<input id="aceptSaveProject" class="mt20" style="width: 310px;" type="button" value="Aceptar">
			<input id="cancelSaveProject" class="mt20" style="width: 310px;" type="button" value="Cancelar">
		</div>
		
	</div>
</div>

<div style="display: none" id="service_fancy_box_data">
	<div class="serviceFancy">
		<h1>Añadir servicio externo</h1>
		<h2>Cerrar</h2>
		<div class="clear"></div>
		<select>
			<option>WMS</option>
			<option>WMTS</option>
			<option>TMS</option>
		</select>
		<input type="text" placeholder="url"/>
		<input class="input_fancy" style="display: none;" type="text" value="Título de la capa" />
		<div class="clear"></div>
		<input type="button" value="Explorar servicio" />
		<div class="clear"></div>
		
		<div class="info_fancy_service">Seleccione un tipo de servicio y especifique la url de descarga</div>
		
		<div class="ml mr tabla_fancy_service"></div>
		<div class="urlServicioWms" style="display: none"></div>
		
	</div>
</div>

<div id="fancy_vector_info" style="position: absolute; background-color: white;top:10%; left: 50%;">
	<div class="serviceFancy vectorFancy">
		<div class="idDrawFancyVector" style="display: none"></div>
		
		<img class="imageType" src="" />
		<h1></h1>
		<div class="clear"></div>
		<p class="titleComent"></p>
		<div style="margin-left: 40px; margin-top: 25px;">
			<span class="spanMini">CAPA:<span class="spanNormal"> Categoría 1</span></span>
		</div>
		<div class="clear"></div>
		<div class="comentTable"></div>
		<div class="addComent">
			<input class="input_fancy input_fancy_vector" type="text" value="Añadir comentario">
			<div class="clear"></div>
			<input type="checkbox" /><label>Cambiar categoría</label>
			<select class="fleft vectorFancySelect"></select>
			<input type="button" value="Añadir">
		</div>
	</div>
</div>


<div id="fancy_select_panel">
	<div idCapa="" tipo= "" style="display:none"></div>
	<div class="divSelectPanel">
		<div class="panelSelect" panel="2">
			<div class="fright">
				<p>Al panel izquierdo</p>
				<img src="<?= get_img("ERO_icon_panel_izquierdo.png")?>" />
			</div>
		</div>
		<div class="clear"></div>
		<div class="panelSelect" panel="1">
			<div class="fright">
				<p>Al panel derecho</p>
				<img src="<?= get_img("ERO_icon_panel_derecho.png")?>" />
			</div>
		</div>
		<div class="clear"></div>
		<div class="panelSelect" panel="3">
			<div class="fright">
				<p>A ambos paneles</p>
				<img src="<?= get_img("ERO_icon_panel_ambos.png")?>" />
			</div>
		</div>
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
		<?if(strpos($_SERVER["HTTP_HOST"],"nacional.gis-and-coast") || strpos($_SERVER["HTTP_HOST"],"excelencia.gis-and-coast")){?>
			<div class="clear"></div>
			<img class="logoGis" src="<?= get_img("ERO_logo.png")?>" />	
			<p class="logoGisText">Research Group</p>	
		<?}?>
		
	</div>
	<div class="fright">
		<p class="fleft fund">
		<? if(strpos($_SERVER["HTTP_HOST"],"excelencia.gis-and-coast")){?>
					
			<span class="bold">Proyecto cofinanciado<br/> por los Fondos FEDER</span><br/>
			Ref. del Proyecto:<br/>
			P10-RNM-6207H		
				
		<?}else if(strpos($_SERVER["HTTP_HOST"],"visor.gis-and-coast")){?>
			
			<span class="bold">GRUPO INVESTIGACIÓN <br/>(RNM177):</span><br/>
			Ordenación del Litoral y Tecnologías<br/>
			de Información Territorial			
					
		<?}else{?>
			<span class="bold">Proyecto cofinanciado<br/> por los Fondos FEDER</span><br/>
			Ref. del Proyecto:<br/>
			CS02010-15807		
		<?}?>
		
			
		</p>
		
		<? if(strpos($_SERVER["HTTP_HOST"],"excelencia.gis-and-coast")){?>
			
			<div class="fleft mt ml mr">
				<a href="http://europa.eu/legislation_summaries/agriculture/general_framework/g24234_es.htm" target="_blank" class="fleft" >
					<img style="width: 70px;" src="<?= get_img("ERO_Fondos-FEDER.png")?>" />
				</a>
				<a href="http://www.juntadeandalucia.es/organismos/economiainnovacioncienciayempleo.html" target="_blank" class="fleft" >
					<img style="width: 160px; margin-left: 45px; margin-right: 30px;" src="<?= get_img("ERO_JA-Consejeria-EICE.png")?>" />
				</a>
			</div>		
			
		<?}else if(strpos($_SERVER["HTTP_HOST"],"visor.gis-and-coast")){?>
			
			<div class="fleft mt20">
				<img style="width: 150px;" class="fleft" src="<?= get_img("ERO_logo.png")?>" />	
				<p class="logoGisText fleft mr20">Research Group</p>	
			</div>			
				
		<?}else if(strpos($_SERVER["HTTP_HOST"],"vivienda.gis-and-coast.org")){?>
			<div class="fleft mt20">
				<a href="http://europa.eu/legislation_summaries/agriculture/general_framework/g24234_es.htm" target="_blank" class="fleft" > 
					<img src="<?= get_img("ERO_logo_EU.png")?>" />
				</a>

				<a href="http://www.juntadeandalucia.es/fomentoyvivienda" target="_blank" class="fleft" > 
					<img style="margin-left: 20px;margin-right: 10px;margin-top: -8px;" src="<?= get_img("ERO_logo_JA-Vivienda.png")?>" />
				</a>

				<a href="http://www.gis-and-coast.org/index.php" target="_blank" class="fleft" > 
					<img style="width: 150px;" src="<?= get_img("ERO_logo.png")?>" />
				</a>

			</div>

			

		<?}else if(strpos($_SERVER["HTTP_HOST"],"gestioncosteraymarina.gis-and-coast.org")){?>
			<div class="fleft mt20">¡
				<a href="http://www.mineco.gob.es/" target="_blank" class="fleft" >
					<img style="height: 55px;" src="<?= get_img("unia_logo.png")?>" />
				</a>
				<a href="http://www.gis-and-coast.org/index.php" target="_blank" class="fleft" > 
					<img style="width: 150px;" src="<?= get_img("ERO_logo.png")?>" />
				</a>
			</div>

		<?}else{?>
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
		<?}?>
		
			
		
		
	</div>
</footer>
</body>
</html>