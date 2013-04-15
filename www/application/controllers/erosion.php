<?php
class Erosion extends MY_Controller 
{
	public function points($id_layer, $minx, $miny, $maxx, $maxy, $baseRetriever)
	{
		$points = $this->retrieveLayerPoints($id_layer, $minx, $miny, $maxx, $maxy, $baseRetriever);

		header('Content-type: application/json');
		echo json_encode($points);
	}
	
	private function retrieveLayerPoints($id_layer, $minx, $miny, $maxx, $maxy, $baseRetriever)
	{
		$this->load->model("test_model");

		$results = $this->test_model->retrieveLayerPoints($id_layer,
														  $minx, $miny, $maxx, $maxy, $baseRetriever);
		$points = array();

		error_log('Points retrieved: '.count($results));

		foreach($results as $p)
			{
				$np["point"] = (object) array("lat"=>$p->y, "lng"=>$p->x);
				$np["value"] = $p->value;
				array_push($points, (object) $np);
			}

		// This is a control point for datum shifting error control
		// It is right in the center of the fountain in Virgen de los Reyes square, Sevilla
		/* $np["point"] = (object) array("lat"=>37.38608963055555, "lng"=>-5.992110363888889); */
		/* $np["value"] = 10; */
		/* array_push($points, (object) $np); */
		
		return $points;
	}
	
}
?>