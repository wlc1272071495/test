<?php
@header("content-type:text/html;charset=UTF8");
/**
 * 验证码通知短信接口
 */

require_once("include/config.php");
require_once("include/httpUtil.php");

$tel = $_GET["tel"];

/**
 * url中{function}/{operation}?部分
 */
$funAndOperate = "industrySMS/sendSMS";
$rand = rand(1000,9999);

// 参数详述请参考http://miaodiyun.com/https-xinxichaxun.html
// 生成body
$body = createBasicAuthData();
// // 在基本认证参数的基础上添加短信内容和发送目标号码的参数
// 【秒嘀科技】您的验证码是345890，30分钟内有效。
$body['smsContent'] = "【大吉科技】登录验证码：{$rand}，如非本人操作，请忽略此短信。";
$body['to'] = $tel;

// 提交请求
$result = post($funAndOperate, $body);

//全部要写入数据库
require_once("../../config.php");//引入了数据库连接地址的配置

//在新增之前  我们要把检查该手机号是否存在 如果存在就更新  不存在就新增


if(!telIsEixst($tel)){

$var_sql = "INSERT into telcode(tel,code) values('$tel','$rand')";

mysql_query("set character set 'utf8'");//对字符进行编码


mysql_query($var_sql);

$result = mysql_affected_rows();


if ($result) {
    # code...
  $item = array('code'=>1,'msg'=>'发送成功');
  echo json_encode($item);  
}else{
     $item = array('code'=>0,'msg'=>'发送失败');
     echo json_encode($item);
}

}else{//更新

    $var_sql = "UPDATE telcode set `code`='$rand' where tel = '$tel'";
    mysql_query($var_sql);
    $count = mysql_affected_rows();//表示执行语句受影响的行数
    if ($count) {
         $item = array('code'=>1,'msg'=>'发送成功');
         echo json_encode($item);  
    }else{
         $item = array('code'=>0,'msg'=>'发送失败');
        echo json_encode($item); 
    }
}


function telIsEixst($tel)//表示该手机号是否存在
{
  $sql = "select count(*) from telcode where tel = '$tel'";
    mysql_query("set character set 'utf8'");//对字符进行编码
    $result= mysql_query($sql);//执行查询语句 并且获取查询语句的结果

    $row = mysql_fetch_row($result);//获取里面的结果


    if($row[0]){//该用户已经存在
          return true;      
    }else{//该用户不存在
        return false;
    }

}


