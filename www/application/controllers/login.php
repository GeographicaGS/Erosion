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
      		$this->session->set_userdata("is_admin",$user->is_admin);
      		$this->session->set_userdata("logged_status",LOGGED_STATUS_IN);
      		
			$data["user"] = $this->session->userdata("name") . " " .  $this->session->userdata("surname");
			$data["id"] = $this->session->userdata("id_user");
			echo json_encode($data);
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
		if(is_logged()){
			$data["user"] = $this->session->userdata("name") . " " .  $this->session->userdata("surname");
			$data["id"] = $this->session->userdata("id_user");
			echo json_encode($data);
		}
	}
	
	function isAdmin(){
		if($this->session->userdata('is_admin') == "t"){
			echo true;
		}
		else{
			echo false;
		}
	}
	
} 
?>