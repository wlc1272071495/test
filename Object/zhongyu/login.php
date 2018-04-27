<?php 

require_once("config.php");



$content = $_GET["content"];

$pwd = $_GET["pwd"];



$var_sql = "select pwd,id from userinfo where username ='$content' or tel ='$content'";//书写要数据库中执行的sql语言



mysql_query("set character set 'utf8'");//对字符进行编码



$result= mysql_query($var_sql);//执行查询语句 并且获取查询语句的结果





$item = mysql_fetch_row($result);



if ($item[0]) {//存在

    # code...

    if($item[0] == $pwd){

        $item = array("code"=>1,"msg"=>"登陆成功","id"=>$item[1]);

        echo json_encode($item);

    }else{

        $item = array("code"=>0,"msg"=>"用户名和密码不匹配");

        echo json_encode($item);

    }



}else{//该用户名不存在



$item = array("code"=>0,"msg"=>"该用户名不存在");



echo json_encode($item);



}







 ?>

 