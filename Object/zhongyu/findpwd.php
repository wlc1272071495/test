<?php 

require_once("config.php");



$tel = $_GET["tel"];

$code = $_GET["code"];

$pwd = $_GET["pwd"];



$var_sql = "SELECT t.`code` from userinfo u,telcode t where u.tel =t.tel and t.tel = '$tel'";//书写要数据库中执行的sql语言



mysql_query("set character set 'utf8'");//对字符进行编码



$result= mysql_query($var_sql);//执行查询语句 并且获取查询语句的结果





$item = mysql_fetch_row($result);



if ($item[0]) {//手机号存在

    # code...

    if($item[0] == $code){ //验证码相等

                $item = array();

               $var_new_sql = "update userinfo set pwd ='$pwd' where tel = '$tel' ";

           

               mysql_query($var_new_sql);

               $new_result = mysql_affected_rows();

               if ($new_result) {

                 $item["code"]=1;

                 $item["msg"]= "更新成功"; 

               }else{

                $item["code"]=0;

                $item["msg"]= "更新失败"; 

               }


        echo json_encode($item);

    }else{

        $item = array("code"=>0,"msg"=>"手机号和验证码不匹配");

        echo json_encode($item);

    }



}else{//该用户名不存在



$item = array("code"=>0,"msg"=>"该手机号不存在");



echo json_encode($item);



}







 ?>

 