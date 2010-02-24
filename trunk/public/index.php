<?php
session_start();
// enable output compression for all requests that can handle it
ob_start("ob_gzhandler");

// @todo remove this hack and replace with some better timezone considerations
if(function_exists("date_default_timezone_set") and function_exists("date_default_timezone_get"))
@date_default_timezone_set(@date_default_timezone_get());

require_once '../includes/X/Loader.php';

X_Loader::registerAutoload();
// Crossley framework is not in the path
X_Loader::addIncludePath('../includes/');

X_Broker::setPath('../controllers/');

// set up authentication
require_once '../includes/authorities.php';

// this will be used by the view engine for including styles
X_Broker::registerValue('theme_name', 'default');
X_Broker::registerValue('theme_dir', 'themes/default/');
X_Broker::registerValue('content_dir', '../assets/content/');
X_Broker::setHtmlFileContent();

// get the registered instance of the broker (broker is not a singelton)
$oBroker = X_Broker::getInstance();
// allow for flat HTML file content
$oBroker->setHtmlFileContent();
	
	// allow debuging
    $oBroker->setDebug();
    // allow development generation
    $oBroker->setGenerate();
    // allow for html to be displayed
    $oBroker->setHtmlFileContent();

// output the response
print $oBroker->respond();