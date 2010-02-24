<?php
// make sure you comment this file!
class Handle_Home_Menu implements X_Controller_Handler_Interface
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
        return X_Array_Tokenizer::combine(array(
				'title' => null,
				'menu' => array(
                    array('title' => 'List Tasks', 'link' => '/tasks/list/', 'target' => 'main_body')
					, array('title' => 'New Task', 'link' => '/tasks/new/', 'target' => '_modal')					
				)
			),
			X_Broker::getRegistered('theme_dir').'/tpl/menu.tpl.html');
    }

    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
