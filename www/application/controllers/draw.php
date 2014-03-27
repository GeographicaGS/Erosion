<?php
class Draw extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		
		$this->load->model("category_model");
		$this->load->model("draw_model");
	}
	
	public function index()
	{
		

	}
	
	public function getCategories()
	{
		echo json_encode($this->category_model->getCategories());	
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
	
		$geom = "ST_GeomFromEWKT('SRID=4326;";
		$arrayPuntos = "";
		
		if($data["tipo"] != "marker"){
			foreach ($puntos as $punto) {
				$arrayPuntos .= $punto['lng'] . " " . $punto['lat'] . ",";
			}
			$arrayPuntos = rtrim($arrayPuntos, ",");
			if($data["tipo"] == "linea"){
				$geom .= "LINESTRING(" . $arrayPuntos . ")";
			}else{
				$arrayPuntos .= "," . $puntos[0]['lng'] . " " . $puntos[0]['lat'];
				$geom .= "POLYGON((" . $arrayPuntos . "))";
			}
		}
		else{
			$geom .= "POINT(" . $puntos['lng'] . " " . $puntos['lat'] . ")";
		}
		
		$geom .= "')";
		
		$data["geom"] = $geom;
		
 		$this->draw_model->saveDraw($data);
		
	}
	
	public function getDraws($id_category){
		$draws = $this->draw_model->getDrawsByCategory($id_category);
		
		$geojson = array();
		
		foreach($draws as $draw){
			$properties = array('id' => $draw->id_draw);
			array_push($geojson,array( 'type' => 'Feature', 'properties' => array('id' => $draw->id_draw, 'titulo' => $draw->titulo, 'comentario' => $draw->comentario, 'id_category' => $draw->id_category, 'category' => $draw->title, 'fecha' => $draw->fecha, 'id_user' => $draw->id_user), 'geometry' => json_decode($draw->st_asgeojson)));
		}
		
		echo json_encode($geojson);
	}
} 
?>