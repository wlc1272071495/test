<?php 

require_once("config.php");

$content = $_GET["content"];
$order = $_GET["order"];
$pageindex  = $_GET["pageindex"];
$pagesize = $_GET["pagesize"];
$skip =  $pageindex*$pagesize;
$var_sql = "select * from userinfo where username like '%$content%' order by $order limit $skip,$pagesize";//书写要数据库中执行的sql语言
mysql_query("set character set 'utf8'");//对字符进行编码
$result= mysql_query($var_sql);//执行查询语句 并且获取查询语句的结果
$list = array();//表示一个集合
while($item = mysql_fetch_row($result)){
    $temp = array();
    $temp["id"] =$item[0];
    $temp["username"]= $item[1];
    $temp["tel"] = $item[2];
    $temp["pwd"] = $item[3];
    $list[] = $temp;
}
echo json_encode($list);
 ?>
 