<?php
// make sure you comment this file!
class Handle_Tasks_Xml extends Handle_Tasks_View
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
        $oTask = parent::handle($oEvent);
        return $oTask->xml;
    }

    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
