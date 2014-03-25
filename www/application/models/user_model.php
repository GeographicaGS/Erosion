<?php
class User_model extends CI_Model{
	
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}
	
	public function getUser($email){
		
		$sql = "SELECT * FROM public.user WHERE email=?";
		
		return $this->db->query($sql,array($email))->row();
	}
}
?>