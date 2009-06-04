<?php
// make sure you comment this file!
class Handle_Tasks_New implements X_Controller_Handler_Interface
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
    	
    	if ($oEvent->getData('rundate'))
    	{
    		$oTaskService = new X_Scheduler_Ms_Service();
    		$oTaskService->scheduleCommand($oEvent->getData('cmd'), strtotime($oEvent->getData('rundate').' '.$oEvent->getData('runtime')));
    		
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
