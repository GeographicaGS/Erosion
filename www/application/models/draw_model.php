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
		$sql = "SELECT d.id_draw, d.titulo, d.comentario, d.id_category, d.fecha, d.id_user, d.tipo, c.title, ST_AsGeoJSON(ST_Transform(geom, 4326)) FROM public.draw d
				LEFT JOIN public.category c on d.id_category = c.id_category  
				where d.id_category=?";
		return $this->db->query($sql,array($id_category))->result();
	}
}
?>