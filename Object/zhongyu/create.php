<?php 
require_once("config.php");

$username = $_GET["username"];//接收参数
$pwd = $_GET["pwd"];
$tel = $_GET["tel"];

if(!usernameIsEixst($username)){

$var_sql = " INSERT  into userinfo(username,pwd,tel) VALUES('$username','$pwd','$tel')";//书写要数据库中执行的sql语言

mysql_query($var_sql);

$count = mysql_affected_rows();//表示执行语句受影响的行数


if($count){
    $result = array('code'=>1);
     echo json_encode($result);   
}else{
    $result = array('code'=>0,'msg'=>'服务异常请稍后再试');
      echo json_encode($result);   
}
}else{
        $result = array('code'=>0,'msg'=>'该用户名已经存在');
      echo json_encode($result);   
}


function usernameIsEixst($username)
{
  $sql = "select count(*) from userinfo where username = '$username'";
    mysql_query("set character set 'utf8'");//对字符进行编码
    $result= mysql_query($sql);//执行查询语句 并且获取查询语句的结果

    $row = mysql_fetch_row($result);//获取里面的结果


    if($row[0]){//该用户已经存在
          return true;      
    }else{//该用户不存在
        return false;
    }

}


// $result= mysql_query($var_sql);//执行查询语句 并且获取查询语句的结果


 ?>
