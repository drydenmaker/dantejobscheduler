<?php
// make sure you comment this file!
class Handle_Tasks_List implements X_Controller_Handler_Interface
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
    	$oTaskService = new X_Scheduler_Ms_Service();
		$aTasks = $oTaskService->getTaskArray(X_Scheduler_Ms_Service::VISIBILITY_NORMAL);
		
		if (empty($aTasks))
		{
			$aTasks[] = 'no accessable tasks';
		}

        return X_Array_Tokenizer::combine(array(
				'title' => "Currently Registered Tasks",
				'tasks' => $aTasks
			),
			  X_Broker::getRegistered('theme_dir').'/tpl/tasklist.tpl.html');
	}

    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
