<?php
// make sure you comment this file!
class Handle_Tasks_Url implements X_Controller_Handler_Interface
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
        // need to use an Xpath query here
        $oXml = simplexml_load_file('web.config');
        
        foreach ($oXml->appSettings[0]->add as $oSetting)
        {
            //$sRet .= X_Debug::out($oSetting);
            if ($this->_getAttr($oSetting, 'key') == 'php_path')
            {
                $sPath = $this->_getAttr($oSetting, 'value');
            }
        }
        
        $sScript = realpath('../scripts/fetchurl.php');
		$sParameter = " -f " . $sScript . ' ' . $oEvent->getRawData('url');
		
		//return X_Debug::out($sParameter,$sPath);
        
        $oTaskService = new X_Scheduler_Ms_Service();
		$oTask = $oTaskService->scheduleUrl(''.$sPath.'', strtotime($oEvent->getRawData('rundate').' '.$oEvent->getRawData('runtime')));
		$oTask->setArguments($sParameter);
		
		if ($oTaskService->register($oEvent->getData('taskname')))
		{
			return '<h3>task '.$oEvent->getData('taskname').' saved</h3>';    		
		}
		else 
		{
			return 'unknown error';
		}
    }
    
    private function _getAttr($o, $sName)
    {
        if(isset($o[$sName]))
            return (string) $o[$sName];
    }
    
    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
