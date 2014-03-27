<?php
class Login extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		
		$this->load->model("user_model");
	}
	
	public function index()
	{
		print_r($this->user_model->getUsers()->id_user);

	}
	
	public function getUser()
	{
		$email = $this->input->post("email");
		$password = $this->input->post("password");
		$user = $this->user_model->getUser($email);
		
		if($user && (md5($password) == $user->password))
      	{
      		$this->session->set_userdata("id_user",$user->id_user);
      		$this->session->set_userdata("name",$user->name);
      		$this->session->set_userdata("surname",$user->surname);
      		$this->session->set_userdata("email",$user->email);
      		$this->session->set_userdata("logged_status",LOGGED_STATUS_IN);
      		
			echo "true";
		}
		else{
			$this->session->sess_destroy();
			$this->session->set_userdata("badlogin",true);
			
			echo "false";
		} 
	}
	
	function logout()
	{
		$this->session->sess_destroy();
	}
	
	function isLoged(){
		echo is_logged();
	}
	
} 
?>