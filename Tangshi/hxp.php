<?php
	// $username=$_POST['user'];
	$success=array('msg'=>'ok');
	$con=mysqli_connect('localhost','login','hengxipeng123','login');
	if($con){
		mysqli_query($con,'set names utf8');
		mysqli_query($con,'set character_set_client=utf8');
		mysqli_query($con,'set character_set_results=utf8');
		$sql = "SELECT * FROM `pinglun`";
      /*查询当前登录账号对应的收藏歌曲数据库信息*/
		$result=$con->query($sql);		
		if($result->num_rows>0){			
			$info=[];
		 //解析查询结果
		 /*$result->fetch_assoc()每次只取出一条数据*/
			for($i=0;$row=$result->fetch_assoc();$i++){
				$info[$i]=$row;
			}
			$success['pinglun']=$info;
	}
	}
	else{
		$success['infoCode']=1;
		//0数据库连接失败;
	}
	//数据返回给前台
	echo json_encode($success);
?>