<?php
class MY_Controller extends CI_Controller
{
	function __construct()
	{
		parent::__construct();

		if (!$this->session->userdata('language'))
		{
			$this->load->library('user_agent');
			if ($this->agent->accept_lang('es'))
			{
				$this->session->set_userdata('language',LANGUAGE_SPANISH);
			}
			elseif ($this->agent->accept_lang('fr'))
			{
				$this->session->set_userdata('language',LANGUAGE_FRENCH);
			}
			elseif ($this->agent->accept_lang('en'))
			{
				$this->session->set_userdata('language',LANGUAGE_ENGLISH);
			}
		}

		if ($this->config->item("cache"))
		{
			$this->load->driver('cache', array('adapter' => 'apc','backup' => 'file'));
		}

		if ($this->input->is_ajax_request())
		{
				
			if (!is_logged())
			{
				$this->output->set_status_header('401');
				$this->session->sess_destroy();
			}
				
		}

	}



	function debug_info()
	{
		if ($this->config->item("debug"))
		{
			$this->output->enable_profiler(TRUE);
		}
	}

	 


	 

}

?>
