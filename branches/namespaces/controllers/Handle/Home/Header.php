<?php
// make sure you comment this file!
class Handle_Home_Header implements X_Controller_Handler_Interface
{
    /**
	 * indicate if this is a secure handler 
	 *
	 * @var bool
	 */
	public $isSecure = false;
    /**
	 * handle input
	 *
	 * @param Array Filtered SAE (Simple Array Event) Array
	 * @return variant
	 */
	public function handle(X_Broker_Event_Interface $oEvent)
    {
        return X_Array_Tokenizer::combine(
        		array(
					'title' => "Dante Job Scheduler",
				),
				X_Broker::getRegistered('theme_dir').'/tpl/header.tpl.html');
	}

    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
