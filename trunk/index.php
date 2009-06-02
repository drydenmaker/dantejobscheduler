<?php
ob_start("ob_gzhandler");

require_once 'X/Loader.php';
X_Loader::registerAutoload();


if (function_exists('__autoload'))
{
    spl_autoload_register('__autoload');
}

X_Broker::setPath('controllers/');

$oBroker = X_Broker::getInstance();
$oBroker->setHtmlFileContent();

    error_reporting(E_ALL|E_STRICT);
    $oBroker->setDebug();
    $oBroker->setGenerate();

// output the response
print $oBroker->respond();
