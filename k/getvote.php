<?php
session_start();
$cxn = mysql_connect('localhost', 'root', 'hkuaec');
if (!$cxn)
    exit;
mysql_select_db('db1', $cxn);
$fbid = $_POST["fbid"];
$checkexist = mysql_query("SELECT * FROM fbuser WHERE fbid='$fbid' LIMIT 1");
$checkkudos = mysql_query("SELECT kudos1,kudos2,kudos3 FROM fbuser WHERE fbid='$fbid'");

if (mysql_fetch_array($checkexist) !== false){
    $result = mysql_fetch_assoc($checkkudos);
    $kudos1 = $result["kudos1"];
    $kudos2 = $result["kudos2"];
    $kudos3 = $result["kudos3"];
    $data = array($kudos1, $kudos2, $kudos3);
    echo json_encode($data);
} else {
    echo 'FBID does not exist.';
    exit();
}

session_destroy();
?>
