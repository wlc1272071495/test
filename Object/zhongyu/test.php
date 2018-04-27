<?php 

@header("content-type:text/html;charset=utf8");

@header("Access-Control-Allow-Origin:*");

$var_connet = mysql_connect("qdm169076529.my3w.com","qdm169076529","123654798"); //根据用户名和密码 进入指定的地址

$test = mysql_select_db("qdm169076529_db",$var_connet);
	if($test){
		echo "1";
	}else{
		echo "0";
	}

?>