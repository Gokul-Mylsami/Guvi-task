<?php 
// $servername = "localhost";
// $username = "root";
// $password = "gokul123";
// $database = "guvi";

$servername = "sql12.freesqldatabase.com";
$username = "sql12605910";
$password = "SLeaaLh6Gm";
$database = "sql12605910";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$redis = new Redis();
$redis->connect('redis-13263.c270.us-east-1-3.ec2.cloud.redislabs.com', 13263);
$redis->auth('IzDni3FPBUerad8Q3F6qUdbOvBr42uBL');

// $redis->connect('127.0.0.1', 6379);


$email = $_POST["email"];
$password = $_POST["password"];

$result = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");
if (mysqli_num_rows($result) == 0) {
    $response = array(
        "status" => "error",
        "message" => "User not found"
    );
    echo json_encode($response);
} else {
    $row = mysqli_fetch_assoc($result);

    if(password_verify($password, $row['password'])){
        $session_id = uniqid();
        $redis->set("session:$session_id", $email);
        $redis->expire("session:$session_id", 10*60);
       

        $payload = array(
            "email" => $row['email'],
        );
      
        $response = array(
            "status" => "success",
            "message" => "Login successful",
            'session_id' => $session_id
        );
        echo json_encode($response);
    } else {
        $response = array(
            "status" => "error",
            "message" => "Incorrect password"
        );
        echo json_encode($response);
    }
}

?>