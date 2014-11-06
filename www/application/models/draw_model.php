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
		return $this->db->insert_id();
	}
	
	
	public function getDraw($id_draw){
		$sql = "SELECT d.id_draw, d.titulo, d.comentario, d.id_category, d.fecha, d.id_user, d.tipo, c.title, ST_AsGeoJSON(ST_Transform(geom, 4326)) FROM public.draw d
				LEFT JOIN public.category c on d.id_category = c.id_category
				where d.id_draw=?";
		return $this->db->query($sql,array($id_draw))->row();
	}

	public function deleteDraw($id_draw){
		$this->db->delete("draw", array('id_draw' => $id_draw));
	}

	public function deleteGeom($id_draw){
		$sql = "UPDATE draw SET geom = null WHERE id_draw = ?";
		
		$this->db->query($sql,array($id_draw));
	}
	
	public function getDrawsByCategory($id_category){
		$sql = "SELECT d.id_draw, d.titulo, d.comentario, d.id_category, d.fecha, d.id_user, d.tipo, c.title, ST_AsGeoJSON(ST_Transform(geom, 4326)) FROM public.draw d
				LEFT JOIN public.category c on d.id_category = c.id_category  
				where d.id_category=?";
		return $this->db->query($sql,array($id_category))->result();
	}
	
	public function saveComent($data){
		$sql = "INSERT INTO public.draw_coment (id_draw, comentario, fecha, id_user)
				VALUES('" . $data['id_draw'] . "','" . $data['comentario'] . "','" .  $data['fecha'] . "','" . $data['id_user'] . "')";
		
		$this->db->query($sql);
		return $this->db->insert_id();
	}

	public function getComentById($id_comment){
		$sql = "SELECT * from draw_coment where id_coment=?";

		return $this->db->query($sql,array($id_comment))->row();
	}

	public function deleteComment($id_comment){
		$this->db->delete("draw_coment", array('id_coment' => $id_comment));
	}
	
	public function getComents($id_draw){
		$sql = "SELECT regexp_replace(dc.comentario, '\n|\r', '<br>', 'g') as comentario, dc.fecha, u.name, u.surname, dc.id_user, dc.id_coment FROM public.draw_coment dc
				LEFT JOIN public.user u on u.id_user = dc.id_user
				where dc.id_draw=? ORDER BY dc.id_coment";
		
		return $this->db->query($sql,array($id_draw))->result();
	}

	public function deleteCommentByDraw($id_draw){
		$this->db->delete("draw_coment", array('id_draw' => $id_draw));
	}
	
	public function updateCategory($id_draw, $id_category){
		$sql = "UPDATE public.draw
				SET id_category=?
				WHERE id_draw=?";
		
		return $this->db->query($sql,array($id_category,$id_draw));
	}
	
	public function getCategeryTitleByDraw($id_draw){
		$sql = "SELECT c.title FROM public.draw d
				LEFT JOIN public.category c on d.id_category = c.id_category
				where d.id_draw=?";
		
		return $this->db->query($sql,array($id_draw))->row();
	}

	public function getDrawListByCategory($id_category){
		$sql = "SELECT id_draw, titulo, tipo, regexp_replace(comentario, '\n|\r', '<br>', 'g') as comentario, id_user FROM public.draw
				where id_category=? ORDER BY fecha DESC";
		
		return $this->db->query($sql,array($id_category))->result();
	}

	public function getBoundingBox($id_draw){
		$sql = "select st_ymin(st_transform(geom, 4326)) as latMin, st_ymax(st_transform(geom, 4326)) as latMax, 
				st_xmin(st_transform(geom, 4326)) as lngMin, st_xmax(st_transform(geom, 4326)) as lngMax  
				FROM public.draw
				where id_draw=?";
		
		return $this->db->query($sql,array($id_draw))->row();
	}

	public function getKml($id_draw){
		$sql = "select titulo, ST_AsKML(geom) as kml
				FROM public.draw
				where id_draw=?";

		return $this->db->query($sql,array($id_draw))->row();
	}

	public function getAllKml($id_category){
		$sql = "SELECT titulo, title, ST_AsKML(geom) as kml FROM public.draw d
				LEFT JOIN public.category c on d.id_category = c.id_category  
				where d.id_category=? and geom is not null";

		return $this->db->query($sql,array($id_category))->result();
	}
}
?>