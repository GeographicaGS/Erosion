/* Configure symbol layers here */
var layers = [
	{
		id: 1,
		title: 'Tasa disponible anchura 2007',
		source: 'layer__anchura_tasa_disp_07',
		priority: 1,
		type: 0,                       // normal, single symbol layer
		baseRetriever: 64,             // must be a power of 2
		valueFactor: 0.5,
		visible: false,	
		color1: '#ff0000',
		color2: null
	},
	{
		id: 2,
		title: 'Erosión deltas 1956-1979',
		source: 'layer__erosion_deltas_56_79',
		priority: 2,
		type: 1,                       // +/- symbol layer
		baseRetriever: 32,
		valueFactor: 1.5,
		visible: false,	
		color1: '#ff0000',
		color2: '#00ff00'
	},
	{
		id: 3,
		title: 'Erosión deltas 1956-2009',
		source: 'layer__erosion_deltas_56_09',
		priority: 2,
		type: 1,                       // +/- symbol layer
		baseRetriever: 32,
		valueFactor: 1.5,
		visible: false,	
		color1: '#ff0000',
		color2: '#00ff00'
	},
	{
		id: 4,
		title: 'Erosión deltas 1979-1984',
		source: 'layer__erosion_deltas_79_84',
		priority: 2,
		type: 1,                       // +/- symbol layer
		baseRetriever: 32,
		valueFactor: 1.5,
		visible: false,	
		color1: '#ff0000',
		color2: '#00ff00'
	},
	{
		id: 5,
		title: 'Erosión deltas 1984-2001',
		source: 'layer__erosion_deltas_84_01',
		priority: 2,
		type: 1,                       // +/- symbol layer
		baseRetriever: 32,
		valueFactor: 1.5,
		visible: false,	
		color1: '#ff0000',
		color2: '#00ff00'
	},
	{
		id: 6,
		title: 'Erosión deltas 2001-2009',
		source: 'layer__erosion_deltas_01_09',
		priority: 2,
		type: 1,                       // +/- symbol layer
		baseRetriever: 32,
		valueFactor: 1.5,
		visible: false,	
		color1: '#ff0000',
		color2: '#00ff00'
	}
	// {
	// 	id: 2,
	// 	title: 'Tasas de erosión 1956 - 1979',	
	// 	priority: 2,
	// 	visible: false,
	// 	color: '#00ff00'
	// },
	// {
	// 	id: 3,
	// 	title: 'Tasas de erosión 1979-1984',	
	// 	priority: 3,
	// 	visible: false,
	// 	color: '#0000ff'
	// },
	// {
	// 	id: 4,
	// 	title: 'Tasas de erosión 1984-2001',	
	// 	priority: 4,
	// 	visible: false,
	// 	color: '#ffff00'
	// },
	// {
	// 	id: 5,
	// 	title: 'Tasas de erosión 2001-2009',	
	// 	priority: 5,
	// 	visible: false,	
	// 	color: '#00ffff'
	// }
];

/* Configure context layers here, it should be a WMS service */
var ctxLayers = [
    {
    	id: 1,
    	title: 'PNOA', 
    	server: 'http://www.idee.es/wms/PNOA/PNOA',
    	layers: 'PNOA',
    	visible: true,
    	priority: 1
    },
    {
    	id: 2,
    	title: 'MTN', 
    	server: 'http://www.idee.es/wms/MTN-Raster/MTN-Raster?',
    	layers: 'mtn_rasterizado',
    	visible: false,
    	priority: 2
    },
    {
    	id: 3,
    	title: 'OSM', 
    	server: 'http://129.206.228.72/cached/osm?',
    	layers: 'osm_auto:all',
    	visible: false,
    	priority: 3
    }
];
