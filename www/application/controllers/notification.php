<?php
class Notification extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		
		$this->load->model("notification_model");
	}
	
	public function index()
	{
		

	}
	
	public function getNotifications()
	{
		$data["result"] = $this->notification_model->getNotifications();
	
		echo json_encode($data);
	}
} 
?>