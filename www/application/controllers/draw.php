<?php
class Draw extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		
		$this->load->model("category_model");
		$this->load->model("draw_model");
		$this->load->model("notification_model");
	}
	
	public function index()
	{
		

	}
	
	public function getCategories()
	{
		echo json_encode($this->category_model->getCategories());	
	}

	public function getCategoriesWithData()
	{
		echo json_encode($this->category_model->getCategoriesWithData());	
	}
	
	public function saveDraw(){
		
		is_logged();
		
		$puntos = json_decode($this->input->post("puntos"), true);
		
		$data["tipo"] = $this->input->post("type");
		$data["titulo"] = $this->input->post("titulo");
		$data["comentario"] = $this->input->post("comentario");
		$data["id_category"] = $this->input->post("categoria");
		$data["fecha"] = date(PG_DATE_FORMAT, now());
		$data["id_user"] = $this->session->userdata('id_user');
		
		$notification["texto"] = "";
		$notification["id_user"] = $data["id_user"];
		$notification["fecha"] = $data["fecha"];
		$notification["tipo"] = 0;
	
		if($data["tipo"] == "marker" || $data["tipo"] == "linea" || $data["tipo"] == "poligono")
		{
			$geom = "ST_GeomFromEWKT('SRID=4326;";
			$arrayPuntos = "";
			
			if($data["tipo"] != "marker"){
				foreach ($puntos as $punto) {
					$arrayPuntos .= $punto['lng'] . " " . $punto['lat'] . ",";
					$notification["titulo"] = "ha añadido un nuevo punto:";
				}
				$arrayPuntos = rtrim($arrayPuntos, ",");
				if($data["tipo"] == "linea"){
					$geom .= "LINESTRING(" . $arrayPuntos . ")";
					$notification["titulo"] = "ha añadido un nueva línea:";
				}else{
					$arrayPuntos .= "," . $puntos[0]['lng'] . " " . $puntos[0]['lat'];
					$geom .= "POLYGON((" . $arrayPuntos . "))";
					$notification["titulo"] = "ha añadido un nuevo polígono:";
				}
			}
			else{
				$geom .= "POINT(" . $puntos['lng'] . " " . $puntos['lat'] . ")";
			}
			
			$geom .= "')";
			
			$data["geom"] = $geom;
		}else{
			$data["geom"] = "null";
			$notification["titulo"] = "ha añadido una historia sin geometría";
		}
		
		$notification["id_draw"] = $this->draw_model->saveDraw($data);
		
		$this->notification_model->createNotification($notification);
	
	}

	public function getDrawList($id_category)
	{
		echo json_encode($this->draw_model->getDrawListByCategory($id_category));	
	}

	public function getBoundingBox($id_draw)
	{
		echo json_encode($this->draw_model->getBoundingBox($id_draw));	
	}
	
	public function getDraw($id_draw){
		$draw = $this->draw_model->getDraw($id_draw);
	
		$result["type"] = "Feature";
		$properties =  array('id' => $draw->id_draw, 'titulo' => $draw->titulo, 'comentario' => $draw->comentario, 'id_category' => $draw->id_category, 'category' => $draw->title, 'fecha' => $draw->fecha, 'id_user' => $draw->id_user, 'tipo' => $draw->tipo);
		$result["properties"] = $properties;
		$result["geometry"] = json_decode($draw->st_asgeojson);
		
		echo json_encode($result);
	}
	
	public function getDraws($id_category){
		$draws = $this->draw_model->getDrawsByCategory($id_category);
		
		$geojson = array();
		
		foreach($draws as $draw){
			$properties = array('id' => $draw->id_draw);
			array_push($geojson,array( 'type' => 'Feature', 'properties' => array('id' => $draw->id_draw, 'titulo' => $draw->titulo, 'comentario' => $draw->comentario, 'id_category' => $draw->id_category, 'category' => $draw->title, 'fecha' => $draw->fecha, 'id_user' => $draw->id_user, 'tipo' => $draw->tipo), 'geometry' => json_decode($draw->st_asgeojson)));
		}
		
		echo json_encode($geojson);
	}
	
	public function addComent($id_draw){
		
		is_logged();
		
		$data["id_draw"] = $id_draw;
		$data["comentario"] = $this->input->post("cometario");
		$data["fecha"] = date(PG_DATE_FORMAT, now());
		$data["id_user"] = $this->session->userdata('id_user');
		$data["user"] = $this->session->userdata('name') . " " . $this->session->userdata('surname');
		
		$data["id_coment"] = $this->draw_model->saveComent($data);
		$data["comentario"] = nl2br($data["comentario"]);
		
		$notification["id_draw"] = $id_draw;
		$notification["id_user"] = $this->session->userdata('id_user');
		$notification["fecha"] = date(PG_DATE_FORMAT, now());
		$notification["tipo"] = 2;
		$notification["titulo"] = "dejó un comentario en";
		$notification["texto"] = $data["comentario"];
		$this->notification_model->createNotification($notification);
		
		echo json_encode($data);
	}

	public function deteleComent($id_comment){
		is_logged();
		if($this->session->userdata('is_admin') == "t"){
			$this->draw_model->deleteComment($id_comment);
		}
		else{
			$comment = $this->draw_model->getComentById($id_comment);
			if($comment->id_user == $this->session->userdata("id_user")){
				$this->draw_model->deleteComment($id_comment);
			}
		}
	}
	
	
	public function getDrawsComents($id_draw){
		$data["result"] = $this->draw_model->getComents($id_draw);
		echo json_encode($data);
	}

	public function deteleDraw($idDraw){
		is_logged();
		if($this->session->userdata('is_admin') == "t"){
			$this->notification_model->deleteNotificationByDraw($idDraw);
			$this->draw_model->deleteCommentByDraw($idDraw);
			$this->draw_model->deleteDraw($idDraw);
		}
		else{
			$draw = $this->draw_model->getDraw($idDraw);
			if($draw->id_user == $this->session->userdata("id_user")){
				$this->notification_model->deleteNotificationByDraw($idDraw);
				$this->draw_model->deleteCommentByDraw($idDraw);
				$this->draw_model->deleteDraw($idDraw);
			}
		}
	}

	public function deteleGeom($idDraw){
		is_logged();
		if($this->session->userdata('is_admin') == "t"){
			$this->draw_model->deleteGeom($idDraw);
		}
		else{
			$draw = $this->draw_model->getDraw($idDraw);
			if($draw->id_user == $this->session->userdata("id_user")){
				$this->draw_model->deleteGeom($idDraw);
			}
		}
	}
	
	public function changeCategorie($id_draw, $id_category){
		is_logged();
		
		$categoriaActual = $this->draw_model->getCategeryTitleByDraw($id_draw);;
		$categoriaNueva = $this->category_model->getCategeryTitle($id_category);
		
		$this->draw_model->updateCategory($id_draw,$id_category);
		
		$notification["id_draw"] = $id_draw;
		$notification["id_user"] = $this->session->userdata('id_user');
		$notification["fecha"] = date(PG_DATE_FORMAT, now());
		$notification["tipo"] = 1;
		$notification["titulo"] = "cambió la categoría en";
		$notification["texto"] = "<span>De " . $categoriaActual->title . " a </span><span style=''font-weight: bold;''>" . $categoriaNueva->title . "</span>";
		$this->notification_model->createNotification($notification);
		
		echo "true";
	}
} 
?>