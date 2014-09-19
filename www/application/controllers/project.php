<?php
class Project extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		
		$this->load->model("project_model");
	}
	
	public function index()
	{
		

	}
	
	public function projectExist($titulo){
		is_logged();
		
		$project = $this->project_model->getProject(urldecode($titulo));
		
		if(count($project) > 0){
			echo "true";
		}
		else{
			echo "false";
		}
		
	}
	
	public function createProject(){
		is_logged();
		
		$data["titulo"] = $this->input->post("titulo");
		$data["descripcion"] = $this->input->post("descripcion");
		$data["capas"] = $this->input->post("panels");
		if($this->session->userdata('is_admin') == "t"){
			$data["is_public"] = $this->input->post("public");
		}else{
			$data["is_public"] = "0";
		}
		$data["id_user"] = $this->session->userdata('id_user');
		$project = $this->project_model->createProject($data);
	}
	
	public function updateProject(){
		is_logged();
		
		$data["descripcion"] = $this->input->post("descripcion");
		$data["capas"] = $this->input->post("panels");
		if($this->session->userdata('is_admin') == "t"){
			$data["is_public"] = $this->input->post("public");
		}else{
			$data["is_public"] = "0";
		}
		$data["id_user"] = $this->session->userdata('id_user');
		
		$projectAux = $this->project_model->getProject($this->input->post("titulo"));
		if($projectAux->id_user != $data["id_user"])
		{
			echo "0";
		}
		else
		{
			$project = $this->project_model->updateProject($this->input->post("titulo"),$data);
			echo "1";
		}
		
		
		
	}

	public function getPublicProjects()
	{
		echo json_encode($this->project_model->getPublicProjects());
	}
	
	public function getMyProjects()
	{
		echo json_encode($this->project_model->getMyProjects($this->session->userdata('id_user')));
	}
	
	public function getLayersProject($id_project)
	{
		echo json_encode($this->project_model->getLayersProject(urldecode($id_project)));
	}
	
	public function getInformationProject($id_project)
	{
		echo json_encode($this->project_model->getInformationProject(urldecode($id_project)));
	}

	public function deleteProyect($idProyect){
		// echo urldecode($idProyect);
		is_logged();
		if($this->session->userdata('is_admin') == "t"){
			$this->project_model->deleteProject(urldecode($idProyect));
		}
		else{
			$project = $this->project_model->getProject(urldecode($idProyect));
			if($project->id_user == $this->session->userdata("id_user")){
				$this->project_model->deleteProject(urldecode($idProyect));
			}
		}
	}

	public function defaultProyect($idProyect){
		is_logged();
		if($this->session->userdata('is_admin') == "t"){
			$this->project_model->defaultProject(urldecode($idProyect));
		}	
	}

	public function removeDefaultProyect(){
		is_logged();
		if($this->session->userdata('is_admin') == "t"){
			$this->project_model->removeDefaultProyect();
		}	
	}

	public function getDefaultProject(){
		echo json_encode($this->project_model->getDefaultProject());
	}
	
	
} 
?>