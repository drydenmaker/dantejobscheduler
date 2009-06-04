<?php
//error_reporting(E_ALL|E_STRICT);
session_start();
//ob_start("ob_gzhandler");

require_once 'includes/X/Loader.php';

X_Loader::registerAutoload();
X_Loader::addIncludePath('includes/');

// authentication hack
if (array_key_exists('auth_token', $_SESSION) && $_SESSION['auth_token'] == md5(session_id().'dryden'))
{
     // pass   
}
else
{
    if (array_key_exists('q1947', $_POST) &&
        $_POST['q1947'] == '.u5%-*' &&
	    $_POST['p1947'] == 'admina')
        {
            $_SESSION['auth_token'] = md5(session_id().'dryden');
        }
        else 
        {      
       	    print "
       	    	<form method='POST' action=''>
       	    		Username: <input type='text' name='p1947'><br>
       	    		Password: <input type='text' name='q1947'><br>
       	    		<input type='SUBMIT' value='Login'>
       	    	</form>
       	    ";
       	    exit(0);
        }
}


if (function_exists('__autoload'))
{
    spl_autoload_register('__autoload');
}

X_Broker::setPath('controllers/');
X_Broker::registerValue('theme_dir', 'theme/default/');

$oBroker = X_Broker::getInstance();
$oBroker->setHtmlFileContent();

    $oBroker->setDebug();
    $oBroker->setGenerate();

// output the response
print $oBroker->respond();

//print X_Debug::out(X_Loader::$aTrace, ini_get('include_path'));
