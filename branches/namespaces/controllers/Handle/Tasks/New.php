<?php
// make sure you comment this file!
class Handle_Tasks_New implements X_Controller_Handler_Interface
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
        $aReturn = array();
        $aReturn['message'] = 'Enter a <i>unique</i> task name.';
    	if ($oEvent->getData('submit') == 'Submit' &&
    	    $oEvent->getData('taskname'))
    	{
    	    if (strlen($oEvent->getData('cmd')))
    	    {
    	        $aReturn['message'] = X_Broker::callLoopback('/tasks/cmd/', $oEvent);
    	    }
    	    elseif (strlen($oEvent->getData('url')))
    	    {
    	        $aReturn['message'] = X_Broker::callLoopback('/tasks/url/', $oEvent);
    	    }
    	    else 
    	    {
    	        $aReturn['message'] = 'No valid task data.';
    	    }
    	    
    	}
    	
        return X_Array_Tokenizer::combine($aReturn,
			  X_Broker::getRegistered('theme_dir').'/tpl/cmd_form.tpl.html');
    }
    
    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
