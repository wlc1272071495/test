<?php 

@header("content-type:text/html;charset=utf8");

@header("Access-Control-Allow-Origin:*");

$var_connet = mysql_connect("qdm169076529.my3w.com","qdm169076529","123654798"); //根据用户名和密码 进入指定的地址

mysql_select_db("qdm169076529_db",$var_connet);//然后到指定地址中找到要用的数据库



 