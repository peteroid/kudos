<?php
session_start();
$cxn = mysql_connect('localhost', 'root', 'hkuaec');
if (!$cxn)
    exit;
mysql_select_db('db1', $cxn);
$id = $_POST["id"];
$fbid = $_POST["fbid"];
$checkexist = mysql_query("SELECT * FROM users WHERE user_id='$id' LIMIT 1");
$fbcheckexist = mysql_query("SELECT * FROM fbuser WHERE fbid='$fbid' LIMIT 1");
$fbgetkudos = mysql_query("SELECT kudos1,kudos2,kudos3 FROM fbuser WHERE fbid='$fbid'");
$getkudos = mysql_query("SELECT kudos FROM users WHERE user_id='$id'");

if (mysql_fetch_array($checkexist) !== false){
    if (mysql_fetch_array($fbcheckexist) !== false){
        $row = mysql_fetch_assoc($getkudos);
        $fbrow = mysql_fetch_assoc($fbgetkudos);
        $kudosplus = $row["kudos"] - 1;  
        if ($fbrow["kudos1"] == $id){
            $fbupdate1 = mysql_query("UPDATE fbuser SET kudos1='0' WHERE fbid='$fbid'");
            $updatekudosplus = mysql_query("UPDATE users SET kudos='$kudosplus' WHERE user_id='$id'");
        } elseif ($fbrow["kudos2"] == $id){
            $fbupdate2 = mysql_query("UPDATE fbuser SET kudos2='0' WHERE fbid='$fbid'");
            $updatekudosplus = mysql_query("UPDATE users SET kudos='$kudosplus' WHERE user_id='$id'");
        } elseif ($fbrow["kudos3"] == $id){
            $fbupdate3 = mysql_query("UPDATE fbuser SET kudos3='0' WHERE fbid='$fbid'");
            $updatekudosplus = mysql_query("UPDATE users SET kudos='$kudosplus' WHERE user_id='$id'");
        } else {
            $updatekudosplus = mysql_query("UPDATE users SET kudos='$kudosplus' WHERE user_id='$id'");
        }
    }
} else {
    echo 'Kudos ID does not exist.';
    exit();
}

session_destroy();
?>
