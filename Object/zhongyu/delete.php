<?php 
require_once("config.php");

$id = $_GET["id"];//接收参数
$var_sql = "delete from userinfo where id =$id ";//书写要数据库中执行的sql语言

mysql_query($var_sql);

$count = mysql_affected_rows();//表示执行语句受影响的行数


if($count){
    $result = array('code'=>1);
     echo json_encode($result);   
}else{
    $result = array('code'=>0);
      echo json_encode($result);   
}



// $result= mysql_query($var_sql);//执行查询语句 并且获取查询语句的结果


 ?>
