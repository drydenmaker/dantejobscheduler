<?php
// make sure you comment this file!
class Handle_Home_Header implements X_Controller_Handler_Interface
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
        return X_Array_Tokenizer::combine(
        		array(
					'title' => "Dante Job Scheduler",
				),
				X_Broker::getRegistered('theme_dir').'/tpl/header.tpl.html');
	}

    public function getResponseType()
    {
        return X_Broker_Response::ENCODE_HTML;
    }
}
