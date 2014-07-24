<?php
class Category_model extends CI_Model{
	
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}
	
	public function getCategories(){
		
		$sql = "SELECT * FROM public.category";
		
		return $this->db->query($sql)->result();
	}

	public function getCategoriesWithData(){
		
		$sql = "SELECT * FROM public.category c WHERE EXISTS(SELECT d.id_category FROM draw d WHERE c.id_category = d.id_category);";
		
		return $this->db->query($sql)->result();
	}
	
	public function getCategeryTitle($idCategory){
	
		$sql = "SELECT title FROM public.category where id_category=?";
	
		return $this->db->query($sql,array($idCategory))->row();
	}
}
?>