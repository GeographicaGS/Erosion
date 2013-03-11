<?php

/*
 * Get variable from cache
*/
function get_cache($vname)
{
	$CI =& get_instance();
	 
	if ($CI->config->item("cache"))
	{
		$vname = $CI->config->item("cache_master_name") . "_$vname";		
		return $CI->cache->get($vname);
	}
	else
	{
		return false;
	}
}

/*
 * Set variable to cache
*/
function set_cache($vname,$value,$ms=null)
{
	$CI =& get_instance();
	
	 
	if ($CI->config->item("cache"))
	{
		if (!$ms) $ms = $CI->config->item("cache_timeout");
		$vname = $CI->config->item("cache_master_name") . "_$vname";		
		$CI->cache->save($vname, $value, $ms);
	}
}

function clean_cache()
{
	$CI =& get_instance();
	if ($CI->config->item("cache"))
	{
		$CI->cache->clean();
	}
}

/**
 * Cache model results
 * @param string $model model to call
 * @param string $func function in the model to call
 * @param array $params params of the function to call
 * @return return the value of func
 */
function cache_model($model,$func,$params=array())
{
	$CI =& get_instance();
	$name = "$model-$func";
	foreach($params as $p)
	{
		$name .= "-$p";
	}

	$value = get_cache($name);
	if ($value === false)
	{		
		$CI->load->model($model);	
		$value = call_user_func_array(array($CI->$model, $func), $params);
		
		set_cache($name,$value);
	}
	
	return $value;
}
?>