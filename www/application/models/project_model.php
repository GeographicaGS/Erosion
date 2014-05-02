<?php
class Project_model extends CI_Model{
	
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}
	
	public function getProject($titulo){
		$sql = "SELECT * FROM public.project where titulo=?";
		
		return $this->db->query($sql,array($titulo))->row();
	}
	
	public function createProject($data){
		$this->db->insert('public.project', $data); 
	}
	
	public function getPublicProjects(){
		$sql = "SELECT titulo, descripcion, name, surname FROM public.project p
				LEFT JOIN public.user u on p.id_user = p.id_user where is_public ORDER BY titulo";
		return $this->db->query($sql)->result();
	}
	
	public function getMyProjects($idUser){
		$sql = "SELECT titulo, descripcion, name, surname, is_public FROM public.project p
				LEFT JOIN public.user u on p.id_user = p.id_user where p.id_user=? ORDER BY p.titulo";
		return $this->db->query($sql,array($idUser))->result();
	}
	
	
	public function getLayersProject($idProject){
		$sql = "SELECT capas FROM public.project where titulo=?";
	
		return $this->db->query($sql,array($idProject))->row();
	}
	
	
	public function updateProject($titulo,$data)
	{
		$this->db->where('titulo', $titulo);
		$this->db->update('public.project', $data);
	}
	
	public function getInformationProject($idProject){
		$sql = "SELECT descripcion, is_public FROM public.project where titulo=?";
	
		return $this->db->query($sql,array($idProject))->row();
	}
	
	
}
?>