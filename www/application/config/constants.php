<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| File and Directory Modes
|--------------------------------------------------------------------------
|
| These prefs are used when checking and setting modes when working
| with the file system.  The defaults are fine on servers with proper
| security, but you may wish (or even need) to change the values in
| certain environments (Apache running a separate process for each
| user, PHP under CGI with Apache suEXEC, etc.).  Octal values should
| always be used to set the mode correctly.
|
*/
define('FILE_READ_MODE', 0644);
define('FILE_WRITE_MODE', 0666);
define('DIR_READ_MODE', 0755);
define('DIR_WRITE_MODE', 0777);

/*
|--------------------------------------------------------------------------
| File Stream Modes
|--------------------------------------------------------------------------
|
| These modes are used when working with fopen()/popen()
|
*/

define('FOPEN_READ',							'rb');
define('FOPEN_READ_WRITE',						'r+b');
define('FOPEN_WRITE_CREATE_DESTRUCTIVE',		'wb'); // truncates existing file data, use with care
define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE',	'w+b'); // truncates existing file data, use with care
define('FOPEN_WRITE_CREATE',					'ab');
define('FOPEN_READ_WRITE_CREATE',				'a+b');
define('FOPEN_WRITE_CREATE_STRICT',				'xb');
define('FOPEN_READ_WRITE_CREATE_STRICT',		'x+b');

/*Language */
define("LANGUAGE_ENGLISH","english");
define("LANGUAGE_SPANISH","spanish");
define("LANGUAGE_FRENCH","french");


/* End of file constants.php */
/* Location: ./application/config/constants.php */

/* Section constants */ 
define("SEC_GES",1);
define("SEC_EXP",2);
define("SEC_ADM",3);

/* Incidents */
define("INC_O",1);
define("INC_P",2);

/* Logging */
define("LOGGED_STATUS_IN",1);

/* Users */
define("GRP_GESTOR_USUARIOS",1);
define("GRP_EDITOR_L1",2);
define("GRP_EDITOR_L2",3);
define("GRP_VIS",4);
define("GRP_VIS_TAR",5);
define("GRP_VIS_ECO",6);
define("GRP_EDITOR_ECO",7);
define("GRP_EDITOR_IYC",8);

/* Menu */
define('MENU_GESTION',"gestion");
define('MENU_CRM',"crm");
define('MENU_ADMIN',"admin");
define("MENU_PERSONAL","personal");

define('MENU_GESTION_EJES_EST',1);
define('MENU_GESTION_ACT_ACC',2);
define('MENU_GESTION_INFORMES',3);

define("MENU_ADMIN_USERS",300);

define("MENU_PERSONAL_PERFIL",400);
define("MENU_PERSONAL_TAREAS",401);

/*Date format*/
define("PG_DATE_FORMAT","Y-m-d H:i:s");
define("PG_SHORT_DATE_FORMAT", 'd-m-Y');
define("PG_DATEMIN_FORMAT","Y-m-d");
define("DATE_FORMAT","d/m/Y");
define("TIME_FORMAT","H:i");
define("DATE_TIME_FORMAT","d/m/Y – H:i");
define("LINEAL_DATE_FORMAT","dmY");
define("LINEAL_DATE_FORMAT_ISO","YmdHis");
define("LINEAL_DATE_FORMAT_ISO_MIN","ymd");


/* ERRNO */
/* Bad paramenters */
define("ERRNO_BADPAR", -1 );

/* FORM ACTIONS */
define('FORM_ACTION_NEW',1);
define('FORM_ACTION_EDIT',2);

/* Character limiter*/
define("CL_G3",20);
define("CL_G6",35);
define("CL_G7",37);
define("CL_G8",40);
define("CL_G10",45);
define("CL_G10U",30);
define("CL_G12",70);
define("CL_G12B",60);

/* Pagination block sizes */
define("DEF_BKSIZE",16);
define("MAX_ALL_ELEMENTS",1000000);

define("N_DECIMALS",2);

define("ST_ENABLE",1);
define("ST_DISABLE",2);

define("PAG_ACT","n_list_acts");

define("TAREA_IMP_BAJA",3);
define("TAREA_IMP_MEDIA",2);
define("TAREA_IMP_ALTA",1);

define("LIMIT_AUTOCOMPLETE",10);
