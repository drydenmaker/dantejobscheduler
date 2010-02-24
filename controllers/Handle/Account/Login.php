<?php
// make sure you comment this file!
class Handle_Account_Login implements X_Controller_Handler_Interface
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
        // if we get submitted username and password process them
        if ($oEvent->getData('username') && $oEvent->getData('password'))
        {
            //        $oTest = X_Data_Adapter_Mssql::getInstance("localhost", "sa", "sqlq", "dante");
        $oQuery = new X_Data_Meta_Query_Mssql();
        $oQuery->Select('*', 'users')
            ->Where('username = "' . str_replace("'","''", $oEvent->getData('username')). '"')
            ->Where('password = "' . md5($oEvent->getData('password')). '"');
//        
//        $oTest->setQuery($oQuery->getQuery());
//        $oTest->execute();
        
        // do some stuff to handle the $xData
        return 'You have reached an event that has not been handled yet.  (Handeler)<br>' . $oQuery->getQuery() . "<br>" . 
          X_Debug::formatHtml($oQuery, '$oQuery'). X_Debug::formatHtml($oEvent, '$oEvent');
            
        }


          // render form
          return X_Debug::formatHtml($oEvent->getData(), 'getData()');
    }


}
