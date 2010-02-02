<?php
// use session instance as the athority
$oWP_Authority = new X_User_Session_Authority('/account/login');
$oMap = new X_User_Permission_Map();
$oWP_Authority->setPermissionMap($oMap);
X_User::registerIdAuthority($oWP_Authority);
X_User::registerPermissionAuthority($oWP_Authority);