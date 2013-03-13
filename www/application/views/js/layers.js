/* Configure symbol layers here */
var layers = [
	{
		id: 1,
		title: 'Tasas de erosión 1956 - 2009',	
		priority: 1,
		visible: true,	
		color: '#ff0000'
	},
	{
		id: 2,
		title: 'Tasas de erosión 1956 - 1979',	
		priority: 2,
		visible: false,
		color: '#00ff00'
	},
	{
		id: 3,
		title: 'Tasas de erosión 1979-1984',	
		priority: 3,
		visible: false,
		color: '#0000ff'
	},
	{
		id: 4,
		title: 'Tasas de erosión 1984-2001',	
		priority: 4,
		visible: false,
		color: '#ffff00'
	},
	{
		id: 5,
		title: 'Tasas de erosión 2001-2009',	
		priority: 5,
		visible: false,	
		color: '#00ffff'
	}
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
    }
];