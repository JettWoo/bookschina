<?php
include './dbConn.php';

header('Access-Control-Allow-Origin:*'); // 允许跨越的域名
header('Access-Control-Allow-Method:POST,GET'); // 允许跨域的请求方式

$conn = getConn();
$conn->query('SET NAMES UTF8');

//$id = $_GET['sid'];
//$id = $_GET['sid'];
if(isset($_POST['sid'])){
    $id = $_POST['sid'];

    $sql = "SELECT * FROM bookinfo WHERE id = $id";
    //echo($sql);
    $result = $conn->query($sql);
    
    //var_dump($result);
    $data = $result->fetch_assoc();
    /* $data = array();
    
    for($i=0;$i<$result->num_rows;$i++){
        $data[$i] = $result->fetch_assoc();
        //echo("")
    } */
    echo json_encode($data);
}

?>