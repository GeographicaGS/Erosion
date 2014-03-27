<?php
class Draw_model extends CI_Model{
	
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}
	
	public function saveDraw($data){
		$sql = "INSERT INTO public.draw (tipo, titulo, comentario, id_category, fecha, id_user, geom) 
				VALUES('" . $data['tipo'] . "','" . $data['titulo'] . "','" .  $data['comentario'] . "','" . $data['id_category'] . "','"  . $data['fecha'] . "','" . $data['id_user'] . "',"  . $data['geom'] . ")";
		
		$this->db->query($sql);
	}
	
	public function getDrawsByCategory($id_category){
		$sql = "SELECT id_draw, titulo, comentario, id_category, fecha, id_user, tipo, ST_AsGeoJSON(ST_Transform(geom, 4326)) FROM public.draw where id_category=?";
		return $this->db->query($sql,array($id_category))->result();
	}
}
?>