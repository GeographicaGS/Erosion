<?php
class Test_model extends CI_Model
{
	public function test()
	{
		$sql = "SELECT version()";
		return $this->db->query($sql)->row();
	}
	
	public function retrieveLayerPoints($layer, $bbox=null)
	{	
		$sql = "SELECT * FROM aux_tables.".$layer." WHERE gid%128=0;";
		return $this->db->query($sql)->result();
	}
}
?>
