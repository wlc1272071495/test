<?php 
require_once("config.php");


$var_sql = "select count(*) from userinfo";//书写要数据库中执行的sql语言

mysql_query("set character set 'utf8'");//对字符进行编码

$result= mysql_query($var_sql);//执行查询语句 并且获取查询语句的结果


$item = mysql_fetch_row($result);

$obj = array();
$obj["count"] = $item[0];


echo json_encode($obj);
 ?>
 