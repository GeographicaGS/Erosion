<?php
class Symbol extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		
		$this->load->model("symbol_model");
	}
	
	public function index()
	{
		

	}
	
	public function getSymbols($id, $southWestLat, $northEastLat, $southWestLng, $northEastLng, $radioMin, $radioMax)
	{
		$aux;
		$bolas = array();
		
		
// 		$minMax = $this->symbol_model->getMinMax(urldecode($tipo));
		$minMax = $this->symbol_model->getMinMax($id);
		$minValue = $minMax->min;
		$maxValue = $minMax->max;
// 		$simbolos = $this->symbol_model->getSymbols(urldecode($tipo),$southWestLat, $northEastLat, $southWestLng, $northEastLng);
		$simbolos = $this->symbol_model->getSymbols($id,$southWestLat, $northEastLat, $southWestLng, $northEastLng);
		
		/*foreach ($simbolos as $simbolo) {
			
			
			if(!isset($maxValue) || abs($simbolo->valor) > $maxValue){
				$maxValue = abs($simbolo->valor);
			}
			
			
			if(!isset($minValue) || abs($simbolo->valor) < $minValue){
				$minValue = abs($simbolo->valor);
			}
			
		}*/
		
		foreach ($simbolos as $simbolo) {
			
// 			$aux = (($radioMax - $radioMin) * (abs($simbolo->valor) - $minValue) ) / ((($maxValue - $minValue) != 0) ? ($maxValue - $minValue) : 1);
// 			array_push($bolas,array('lat' => $simbolo->lat, 'lng' => $simbolo->lng , 'radius' => ($aux <= $radioMin ? ($radioMin+0):$aux) , 'valor' => $simbolo->valor));
			array_push($bolas,array('lat' => $simbolo->lat, 'lng' => $simbolo->lng , 'valor' => $simbolo->valor));
		}
	
		echo json_encode(array('result' => $bolas, 'minValue' => $minValue, 'maxValue' => $maxValue));
	}
	
} 
?>