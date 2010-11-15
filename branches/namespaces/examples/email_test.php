<?php
error_reporting(E_ALL|E_STRICT);

require_once 'X/Loader.php';
X_Loader::registerAutoload();

$oJob = new X_Scheduler_Job(X_Scheduler_Job::TYPE_PHP);

$oJob->setScript('email_script.php');
$oJob->setVariable('sFrom', 'me@example.com');
$oJob->setVariable('sTo', 'you@example.com');
$oJob->setVariable('sSubject', 'A Test Email');
$oJob->setVariable('sBody', '<h1>YO</h1>This is a test, Yo.');

$oJob->register()