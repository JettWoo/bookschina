<?php
    include './dbConn.php';

    $conn = getConn();
    
    //var_dump($result);
    // 注册
    if(isset($_POST['phoneNum']) && isset($_POST['pwd'])){
        $phone = $_POST['phoneNum'];
        $pwd = $_POST['pwd'];

        $result = $conn->query("select *  from user_info WHERE phoneNumber = '$phone' && password = '$pwd'"); // 
        $data = $result->fetch_assoc();
        if(isset($data)){
            echo true;
           /*  header("location:http://172.20.10.5/bookschina/dist/html/index.html"); */
        }else{
            echo false;
        }
        //;
        //echo "注册成功";
    }
?>