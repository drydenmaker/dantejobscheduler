<?php

$sHeaders = 'From: ' . $sFrom . "\r\n" .
    'Reply-To: ' . $sFrom . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
mail($sTo, $sSubject , $sBody, $sHeaders);