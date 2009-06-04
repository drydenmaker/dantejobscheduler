<?php
// make sure you comment this file!
class Handle_Tasks_View implements X_Controller_Handler_Interface
{
    /**
     * mysqli connection
     *
     * @var unknown_type
     */
    protected $oMySQLi;
    /**
     * mysql object
     *
     * @var X_DB_MySQL
     */
    protected $oDB;
    /**
     * mysql adaptor
     *
     * @var X_DB_MySQL_Adapter
     */
    protected $oAdapter;

    /**
     * use the registry to setup db connections
     *
     */
    public function setDb()
    {
        static $bSet = false;

        if (!$bSet)
        {
            // @todo write db connection code
            $bSet = true;
        }
    }
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
			$oTask->sTemplate = X_Broker::getRegistered('theme_dir').'tpl/task_details.tpl.html';
//			return X_Debug::out($oTask);
			return $oTask;
		}
		
		return 'no task by the name of '.$sTaskName;
    }

    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
