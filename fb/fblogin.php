<?php
session_start();
$cxn = mysql_connect('localhost', 'root', 'hkuaec');
if (!$cxn)
    exit;
mysql_select_db('db1', $cxn);
$fbname = $_POST["fbname"];
$fbid = $_POST["fbid"];
$fbemail = $_POST["fbemail"];
$sql = sprintf("INSERT INTO fbuser (fbid, fbname, fbemail) VALUES ('%s', '%s', '%s');", mysql_real_escape_string($fbid),
              mysql_real_escape_string($fbname),
              mysql_real_escape_string($fbemail));
$checkexist = mysql_query("SELECT * FROM fbuser WHERE fbid='$fbid' LIMIT 1");
$updatelogin = "UPDATE fbuser SET lastlogin=now() WHERE fbid='$fbid'";
if (mysql_fetch_array($checkexist) !== false){
    $updatelogintime =  mysql_query($updatelogin);
    echo 'Old user returning.';
} else {
    $result = mysql_query($sql);
    echo 'New user written.';
}

session_destroy();
?>
