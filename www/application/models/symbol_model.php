<?php
class Symbol_model extends CI_Model{
	
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}
	
	public function getSymbols($tipo, $southWestLat, $northEastLat, $southWestLng, $northEastLng){
		
// 		$limit = 200;
// 		$sql = "SELECT count(*) FROM public.simbolo where tipo=? and lat>=? and lat<=? and lng>=? and lng<=?";
		
// 		$numElements = $this->db->query($sql,array($tipo,$southWestLat,$northEastLat,$southWestLng,$northEastLng))->row()->count;
		
// 		if($numElements > $limit)
// 		{
// 			$escala = floor($numElements/$limit);
// 			$sql = "select * from (select *, mod(row_number() OVER (order by lng)," . $escala . ") as mod  from public.simbolo) a where tipo=? and lat>=? and lat<=? and lng>=? and lng<=? and mod=0";
// 		}
// 		else
// 		{
// 			$sql = "SELECT * FROM public.simbolo where tipo=? and lat>=? and lat<=? and lng>=? and lng<=?";
// 		}
		$sql = "SELECT * FROM public.simbolo where tipo=? and lat>=? and lat<=? and lng>=? and lng<=?";
		
		return $this->db->query($sql,array($tipo,$southWestLat,$northEastLat,$southWestLng,$northEastLng))->result();
	}
	
	
	public function getMinMax($tipo){
	
		$sql = "select min(abs(valor)) as min, max(abs(valor)) as max from public.simbolo where tipo=?";
		
		return $this->db->query($sql,array($tipo))->row();
	}
	
}
?>