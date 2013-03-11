<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends MY_Controller 
{
	public function index()
	{		
		header("Content-Type: text/html; charset=".$this->config->item("encoding"));
		$this->load->model("test_model");
		$data["test"] = $this->test_model->test();
		$this->load->view("template",$data);
	}	
}

