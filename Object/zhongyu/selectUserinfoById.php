<?php 
require_once("config.php");

$id = $_GET["userid"];

$var_sql = "select * from userinfo where id = $id";//书写要数据库中执行的sql语言

mysql_query("set character set 'utf8'");//对字符进行编码

$result= mysql_query($var_sql);//执行查询语句 并且获取查询语句的结果


$item = mysql_fetch_row($result);
    $temp = array();
    $temp["id"] =$item[0];
    $temp["username"]= $item[1];
    $temp["tel"] = $item[2];
    $temp["pwd"] = $item[3];


echo json_encode($temp);
 ?>
 