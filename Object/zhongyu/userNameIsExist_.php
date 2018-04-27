<?php 

require_once("config.php");



$username = $_GET["username"];



 $sql = "select count(*) from userinfo where username = '$username'";

    mysql_query("set character set 'utf8'");//对字符进行编码

    $result= mysql_query($sql);//执行查询语句 并且获取查询语句的结果



    $row = mysql_fetch_row($result);//获取里面的结果





    if($row[0]){//该用户名存在

          echo json_encode(array("code"=>1));      

    }else{//该用户名不存在

        echo json_encode(array("code"=>0));

    }



 ?>

 