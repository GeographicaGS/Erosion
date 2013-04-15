<?php
class Test_model extends CI_Model
{
	public function test()
	{
		$sql = "SELECT version()";
		return $this->db->query($sql)->row();
	}
	
	public function retrieveLayerPoints($layer, $minx, $miny, $maxx, $maxy, $baseRetriever)
	{	
		error_log('BBOX: '.$minx.','.$miny.','.$maxx.','.$maxy);
		$scale = (abs($minx-$maxx))/10.546875;
		$factor = intval(round($baseRetriever*$scale));
		if($factor<1) {	$factor=1; };
		error_log('Scale: '.$scale.' Factor: '.$factor);

		$sql = "SELECT * FROM aux_tables.".$layer." WHERE gid%".$factor."=0 and ".
			"(x between ".$minx." and ".$maxx." and y between ".$miny." and ".$maxy.");";

		error_log($sql);

		return $this->db->query($sql)->result();
	}
}
?>
