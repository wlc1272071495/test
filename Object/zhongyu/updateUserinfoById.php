<?php 
require_once("config.php");
$id = $_GET["id"];
$username = $_GET["username"];
$pwd = $_GET["pwd"];
$tel = $_GET["tel"];

//做一个判断 判断该用户是否存在

if(!usernameIsEixst($id,$username)){//如果该用户名不存在 就可以编译使用
$var_sql = "update userinfo set username ='$username',tel ='$tel' ,pwd='$pwd' where id = $id";//书写要数据库中执行的sql语言

mysql_query("set character set 'utf8'");//对字符进行编码
mysql_query($var_sql);

$count = mysql_affected_rows();//表示执行语句受影响的行数

if($count){
    $result = array('code'=>1);
     echo json_encode($result);   
}else{
    $result = array('code'=>0,'msg'=>'更新失败');
      echo json_encode($result);   
}
}else{
     $result = array('code'=>0,'msg'=>'该用户已经存在');
      echo json_encode($result);   
}

function usernameIsEixst($id,$username)
{
  $sql = "select count(*) from userinfo where username = '$username' and id!=$id";
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
