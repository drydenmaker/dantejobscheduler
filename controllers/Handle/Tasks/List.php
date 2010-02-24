<?php
// make sure you comment this file!
class Handle_Tasks_List implements X_Controller_Handler_Interface
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
		$aTasks = $oTaskService->getTaskArray(X_Scheduler_Ms_Service::VISIBILITY_NORMAL);
		
		if (empty($aTasks))
		{
			$aTasks[] = 'no accessable tasks';
		}

        return X_Array_Tokenizer::combine(array(
				'title' => "Scheduled Tasks",
				'tasks' => $aTasks
			),
			  X_Broker::getRegistered('theme_dir').'/tpl/tasklist.tpl.html');
	}

    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
