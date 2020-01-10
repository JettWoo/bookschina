<?php
    include './dbConfig.php';
    function getConn(){
        //$conn = @new mysqli($server, $username, $password, $dbName);
        $conn = @new mysqli(SERVER, USERNAME, PASSWORD, DBNAME);
        if($conn->connect_error){
            die("连接失败：".$conn->connect_error);
            return false;
        }

        return $conn;
    }
?>