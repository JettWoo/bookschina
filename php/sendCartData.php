<?php
    include './dbConn.php';

    header('Access-Control-Allow-Origin:*'); // 允许跨越的域名
    header('Access-Control-Allow-Method:POST,GET'); // 允许跨域的请求方式

    $conn = getConn();
    $conn->query("SET NAMES UTF8");

    if(isset($_POST["selects"])){
        //json_decode
        //echo($_POST['selects']);
        
        $data = $_POST['selects'];
        echo($data);
        $data = '{"1": 1, "2":2}';
        echo($data);
        //echo($data);
        //$array = array();
        $array = json_decode($data);
        var_dump($array);
        /* $json = '{"Peter":65,"Harry":80,"John":78,"Clark":90}';
        var_dump(json_decode($json)); */
        /* for($i =0; $i<$array->num_rows; $i++){
            echo($array[$i])
        } */
        //var_dump($_POST['selects']);
    }else{
        echo "aaaa";
    }
?>