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
    	
    	if ($oEvent->getData('rundate'))
    	{
    		$oTaskService = new X_Scheduler_Ms_Service();
    		$oTaskService->scheduleCommand($oEvent->getData('cmd'), strtotime($oEvent->getRawData('rundate').' '.$oEvent->getRawData('runtime')));
    		
    		if ($oTaskService->register($oEvent->getData('taskname')))
    		{
    			return '<h3>task saved</h3>';    		
    		}
    		else 
    		{
    			return 'unknown error';
    		}
    	}
    	
        return X_Array_Tokenizer::combine(array(),
			  X_Broker::getRegistered('theme_dir').'/tpl/cmd_form.tpl.html');
    }

    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
