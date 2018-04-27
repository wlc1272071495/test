<?php 

require_once("config.php");



$tel = $_GET["tel"];



 $sql = "select count(*) from userinfo where tel = '$tel'";

    mysql_query("set character set 'utf8'");//对字符进行编码

    $result= mysql_query($sql);//执行查询语句 并且获取查询语句的结果



    $row = mysql_fetch_row($result);//获取里面的结果





    if($row[0]){//该手机号存在

          echo json_encode(array("code"=>1));      

    }else{//该手机号不存在

        echo json_encode(array("code"=>0));

    }



 ?>

 