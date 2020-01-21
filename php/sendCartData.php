<?php
include './dbConn.php';

header('Access-Control-Allow-Origin:*'); // 允许跨越的域名
header('Access-Control-Allow-Method:POST,GET'); // 允许跨域的请求方式

$conn = getConn();
$conn->query("SET NAMES UTF8");
$sql = "SELECT * FROM bookinfo";
$result = $conn->query($sql);
$data = array();

for ($i = 0; $i < $result->num_rows; $i++) {
    $data[$i] = $result->fetch_assoc();
}
echo json_encode($data);
    /* if(isset($_POST["selects"])){
        $data = $_POST['selects'];
        echo $data;
        $array = array(json_decode($data));
        var_dump($array);
        for($i=0; $i<$array->num_rows - 1; $i++){
            $sql.$array[i].'|| id=';
        }
        $sql.$array[$array->num_rows];
        echo($sql);
    }else{
        echo "aaaa";
    } */
