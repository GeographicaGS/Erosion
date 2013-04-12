<?
class Erosion extends MY_Controller 
{
	
	public function points($id_layer,$bbox)
	{
		
		$points = $this->simulate_points($id_layer);
		
		header('Content-type: application/json');
		echo json_encode($points);		
	}
	
	private function simulate_points($id_layer)
	{
		$p["point"] = (object) array("lat"=>37.16846466064453,"lng"=>-6.9632720947265625);
		$p["value"] = ceil(rand(10,100));
		$points[0] = (object) $p ;
		
		$p["point"] = (object) array("lat"=>37.16194152832031,"lng"=>-6.952972412109375);
		$p["value"] = ceil(rand(10,100));
		$points[1] = (object) $p ;
		
		$p["point"] = (object) array("lat"=> 37.15679168701172,"lng"=>-6.943016052246094);
		$p["value"] = ceil(rand(10,100));
		$points[2] = (object) $p ;
		
		return $points;
	}
	
}
?>