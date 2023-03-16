<?php 
$servername = "localhost";
$username = "root";
$password = "gokul123";
$database = "guvi";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

ini_set('session.save_handler', 'redis');
ini_set('session.save_path', 'tcp://127.0.0.1:6379');


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
        session_start();
        $_SESSION['email'] = $email;
        $_SESSION['expire_time'] = time() * (5*60);
        setcookie('PHPSESSID', session_id(), time() + 3600, '/');

        $payload = array(
            "email" => $row['email'],
        );
      
        $response = array(
            "status" => "success",
            "message" => "Login successful",
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