<?php
    include './dbConn.php';

    $conn = getConn();

    // 验证手机号是否注册
    /* if(isset($_POST['phoneNum'])){
        $phoneNum = $_POST['phoneNum'];
        //echo $phoneNum;
        $result = $conn->query("SELECT * FROM user_info WHERE phoneNumber = '$phoneNum'");
        //var_dump($result);
        if($result->fetch_assoc()){
            //echo "数据库已存在该用户";
            return true;
        }else{
            return false;
        }
    } */

    // 注册
    if(isset($_POST['submit'])){
        $phoneNum = $_POST['phoneNum'];
        $pwd = sha1($_POST['pwd']);
        //echo $phoneNum.$pwd;
        $conn->query("INSERT INTO user_info VALUES (null, '$phoneNum', null,  '$pwd')");
        header("location:http://10.31.152.26:8080/bookStore/src/html/login.html");
        //echo "注册成功";
    }
?>