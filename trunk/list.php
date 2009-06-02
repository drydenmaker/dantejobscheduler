<?php
require_once('bootstrap.inc.php');
print "<h3>Currently Registered Tasks</h3>";

$oTaskService = new X_Scheduler_Ms_Service();
$aTasks = $oTaskService->getTaskArray(X_Scheduler_Ms_Service::VISIBILITY_NORMAL);

// output
print X_Array_Tokenizer::combine(array(
		'title' => "Currently Registered Tasks",
		'tasks' => $aTasks
	),
	$aSettings['theme_dir'].$aSettings['theme'].'/tpl/tasklist.tpl.html');