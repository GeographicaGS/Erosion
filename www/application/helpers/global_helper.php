<? 
$CI =& get_instance();

date_default_timezone_set($CI->config->item("timezone"));

function tr($key)
{
	if (strstr($key,"###"))
	{
		return substr($key,3);
	}
	return $key;
}

function get_css($file)
{
	return base_url("application/views/css") . "/" . $file;
}

function get_js($file)
{
	return base_url("application/views/js") . "/" . $file;
}

function get_img($file=null)
{
	$url = base_url("application/views/img");
	if ($file) $url .= "/$file";
	return  $url;
}

function get_img_path($file=null)
{
	$CI =& get_instance();
	$url = $CI->config->item("server_path") . "/views/img";
	if ($file) $url .= "/$file";
	return  $url;
}

function print_array($array)
{
	echo "<pre>";
	print_r($array);
	echo "</pre>";
}
function pg2format($date,$format=DATE_FORMAT)
{
	$CI =& get_instance();
	 
	$date = new DateTime($date);
	return $date->format($format);
}

function date2pg($date,$format=DATE_FORMAT)
{
	$date = DateTime::createFromFormat($format, $date);
	if (!$date)
	{
		 return null;
	}
	
	return  $date->format(PG_DATE_FORMAT);
}

function nullSearchParameter($s)
{
	 
	if ($s == "NULL" || $s=="null")
	{
		$s = null;
	}
	return $s;
}

function nbf($number)
{
	return str_replace(",00","",number_format($number,N_DECIMALS,",","."));
}

function nbf2($number)
{
	return number_format($number,N_DECIMALS,",",".");
}

function log_show($msg,$level='error')
{
	log_message($level, $msg);
	show_error($msg);
}

function log_showie($msg,$level='error')
{
	log_message($level, $msg);
	show_error(tr("###Error interno"));
}

function ref_mem($obj,$mem)
{
	if (!$obj || !$mem)
	{
		return null;
	}
	else
	{
		return $obj->$mem;	
	}
}

function strtrun($s, $max, $extra=null)
{
	$CI = & get_instance();

	$ls = ($extra) ? $extra . $s : $s;

	if (strlen($ls) > $max)
	{
		$s = mb_substr($s, 0, $max - strlen($extra), $CI->config->item("encoding"));
		$s .= "...";
	}
	return $s;
}
