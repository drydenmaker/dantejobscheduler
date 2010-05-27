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
        $oTaskService = new X_Scheduler_Ms_Service();
		$oTask = $oTaskService->scheduleUrl($oEvent->getRawData('url'), strtotime($oEvent->getRawData('rundate').' '.$oEvent->getRawData('runtime')));
		
		if ($oTaskService->register($oEvent->getData('taskname')))
		{
			return '<h3>task '.$oEvent->getData('taskname').' saved</h3>';    		
		}
		else 
		{
			return 'unknown error';
		}
    }
    
    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
