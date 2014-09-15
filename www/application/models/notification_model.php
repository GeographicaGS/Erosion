<?php
class Notification_model extends CI_Model{
	
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}
	
	
	public function getNotifications(){
		$sql = "SELECT n.titulo, n.texto, n.fecha, n.tipo, n.id_draw, d.titulo as geometriaTitle, u.name, u.surname, d.id_category FROM public.notification n
				LEFT JOIN public.draw d on d.id_draw = n.id_draw
				LEFT JOIN public.user u on u.id_user = n.id_user 
				ORDER BY n.fecha DESC";
		
		return $this->db->query($sql)->result();
	}
	
	public function createNotification($data){
		$sql = "INSERT INTO public.notification (titulo, texto, id_user, id_draw, fecha, tipo)
				VALUES('" . $data['titulo'] . "','" . $data['texto'] . "','" .  $data['id_user'] . "','" . $data['id_draw'] . "','"  . $data['fecha'] . "','" . $data['tipo'] . "')";
	
		$this->db->query($sql);
	}

	public function deleteNotificationByDraw($id_draw){
		$this->db->delete("notification", array('id_draw' => $id_draw));
	}

}
?>