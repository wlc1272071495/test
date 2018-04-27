<?php 
require_once("config.php");

$tel = $_GET["tel"];
$code = $_GET["code"];

$var_sql = "select `code` from telcode where tel ='$tel'";//书写要数据库中执行的sql语言

mysql_query("set character set 'utf8'");//对字符进行编码

$result= mysql_query($var_sql);//执行查询语句 并且获取查询语句的结果


$item = mysql_fetch_row($result);

if ($item[0]) {//存在
    # code...
    if($item[0] == $code){
        $item = array("code"=>1,"msg"=>"登陆成功");
        //快速登陆成功之后 就将该手机号写入数据库中 
        //做一个验证  已经存在就不处理 不存在就新增

        $var_sql = "select count(*) from userinfo where tel = '$tel'";
        $var_result = mysql_query($var_sql);
        $result = mysql_fetch_row($var_result);
        if (!$result[0]) {
            # code...
               $var_new_sql = "insert into userinfo(tel) values('$tel')";
               mysql_query($var_new_sql);
               $new_result = mysql_affected_rows();
               if ($new_result) {
                   # code...
               }else{
                $item["code"]=0;
                $item["msg"]= "服务器异常"; 
               }


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
 