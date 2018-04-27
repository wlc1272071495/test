<?php 

require_once("config.php");



$id = $_GET["id"];//接收参数




$var_sql = "select * from goodsList where goodsid ='$id'";//书写要数据库中执行的sql语言


mysql_query("set character set 'utf8'");//对字符进行编码


$result= mysql_query($var_sql);//执行查询语句 并且获取查询语句的结果
$item = mysql_fetch_row($result);
  $temp = array();
  $temp["goodsid"] = $item[1];
  $temp["imageSrc"] = $item[2];
  $temp["goodsName"] = $item[3];
  $temp["goodsPrice"] = $item[4];

echo json_encode($temp);
 ?>

