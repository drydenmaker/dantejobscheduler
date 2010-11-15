<?php
// make sure you comment this file!
class Handle_Tasks_Stop implements X_Controller_Handler_Interface
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
        $sTaskName = $oEvent->getStep();
        $oTaskService = new X_Scheduler_Ms_Service();
		$oTask = $oTaskService->getTaskByName($sTaskName, X_Scheduler_Ms_Service::VISIBILITY_NORMAL);
		if ($oTask)
		{
		    $oTask->stop();
			return "Task $sTaskName run.<br><a href='/tasks/list'>Return to Tasks</a>";
		}
		
		return 'no task by the name of '.$sTaskName;
    }

}
