<?php
class Category_model extends CI_Model{
	
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}
	
	public function getCategories($idProject){
		
		$sql = "SELECT * FROM public.category where title like ? order by title";
		
		return $this->db->query($sql,array($idProject . "###%"))->result();
	}

	public function getCategoriesWithData($idProject){
		
		$sql = "SELECT *, (SELECT count(*) FROM draw d WHERE c.id_category = d.id_category) as numDraws FROM public.category c 
				where c.title like ? order by c.title";
		
		return $this->db->query($sql,array($idProject . "###%"))->result();
	}
	
	public function getCategeryTitle($idCategory){
	
		$sql = "SELECT title FROM public.category where id_category=?";
	
		return $this->db->query($sql,array($idCategory))->row();
	}
}
?>