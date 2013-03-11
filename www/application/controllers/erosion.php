<?
class Erosion extends MY_Controller 
{
	public function points()
	{
		$p["point"] = (object) array("x"=>0,"y"=>0);
		$p["value"] = ceil(rand(10,100));
		$points[0] = (object) $p ;
		
		$p["point"] = (object) array("x"=>0,"y"=>0);
		$p["value"] = ceil(rand(10,100));
		$points[1] = (object) $p ;
		
		echo json_encode($points);
		
	}
	
	
	
}
?>