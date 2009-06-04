<?php
require_once('bootstrap.inc.php');
print "<h3>Currently Registered Tasks</h3>";

$oTaskService = new X_Scheduler_Ms_Service();
$aTasks = $oTaskService->getTaskArray(X_Scheduler_Ms_Service::VISIBILITY_NORMAL);

// output
print X_Array_Tokenizer::combine(array(
		'title' => "Menu",
		'menu' => array(
			array('title' => 'View Tasks', 'link' => '/tasks/list/')
			,array('title' => 'New Task', 'link' => '/tasks/new/')
			
		)
	),
	$aSettings['theme_dir'].$aSettings['theme'].'/tpl/menu.tpl.html');
	
	


