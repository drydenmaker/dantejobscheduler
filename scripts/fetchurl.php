<?php
if (!isset($_SERVER["argv"][1]))
{
    print "usage: ". __FILE__ . " <url> <output>";
    exit(0);
}
else 
{
    $sUrl = $_SERVER["argv"][1];
}

// more checks should be done here, this is just quick and dirty
if (isset($_SERVER["argv"][2]))
{
    $sOutputFile = realpath($_SERVER["argv"][2]);
}

if (empty($sOutputFile))
{
    $sDir = dirname(__FILE__);
    $sOutputFile = $sDir .'\\..\\output\\' . time() . '.txt';
}

$oCurl = curl_init($sUrl);

// if we defined an output file open it and set it
if (!empty($sOutputFile))
{
    $rFile = fopen($sOutputFile, "w");
    curl_setopt($oCurl, CURLOPT_FILE, $rFile);
}
curl_setopt($oCurl, CURLOPT_HEADER, 0);

curl_exec($oCurl);
curl_close($oCurl);
fclose($rFile);