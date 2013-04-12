<?
class Erosion extends MY_Controller 
{
	
	public function points($id_layer, $bbox='')
	{
		$points = $this->retrieveLayerPoints($id_layer);
		
		header('Content-type: application/json');
		echo json_encode($points);
	}
	
	private function retrieveLayerPoints($id_layer, $bbox=null)
	{
		$this->load->model("test_model");

		$results = $this->test_model->retrieveLayerPoints("layer__anchura_tasa_disp_07");
		$points = array();

		foreach($results as $p)
			{
				$np["point"] = (object) array("lat"=>$p->y, "lng"=>$p->x);
				$np["value"] = $p->value*.5;
				array_push($points, (object) $np);
			}

		// This is a control point for datum shifting error control
		// It is right in the center of the fountain in Virgen de los Reyes square, Sevilla
		/* $np["point"] = (object) array("lat"=>37.38608963055555, "lng"=>-5.992110363888889); */
		/* $np["value"] = 10; */
		/* array_push($points, (object) $np); */
		

		/* $p["point"] = (object) array("lat"=>37.16846466064453,"lng"=>-6.9632720947265625); */
		/* $p["value"] = ceil(rand(10,100)); */
		/* $points[0] = (object) $p ; */
		
		/* $p["point"] = (object) array("lat"=>37.16194152832031,"lng"=>-6.952972412109375); */
		/* $p["value"] = ceil(rand(10,100)); */
		/* $points[1] = (object) $p ; */
		
		/* $p["point"] = (object) array("lat"=> 37.15679168701172,"lng"=>-6.943016052246094); */
		/* $p["value"] = ceil(rand(10,100)); */
		/* $points[2] = (object) $p ; */

		/* $p["point"] = (object) array("lat"=>0, "lng"=>0); */
		/* $p["value"] = $this->test_model->test(); */
		/* $points[3] = (object) $p; */
		
		return $points;
	}
	
}
?>