<?php

class Test_model extends CI_Model
{
	public function test()
	{
		$sql = "SELECT version()";
		return $this->db->query($sql)->row();
	}
}
