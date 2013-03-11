<?php

class Test_model extends Ci_Model
{
	public function test()
	{
		$sql = "SELECT version()";
		return $this->db->query($sql)->row();
	}
}