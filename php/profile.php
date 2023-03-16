<?php 

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

ini_set('session.save_handler', 'redis');
ini_set('session.save_path', 'tcp://127.0.0.1:6379');
session_start();

if (isset($_POST['action']) && $_POST['action'] === 'logout') {
   
    session_unset();
  
    // Destroy the session
    setcookie(session_name(), "", time()-3600, "/");
    session_destroy();
  
    // Return a success message
    $response = array(
        "status" => "success",
        "message" => "Logout successful",
    );

    echo json_encode($response);
}

if (isset($_POST['action']) && $_POST['action'] === 'valid-session'){
  
  if (session_status() == PHP_SESSION_ACTIVE && isset($_SESSION['email']) && isset($_SESSION['expire_time']) && time() < $_SESSION['expire_time']) {
    $response = array(
        "status" => "success",
        "message" => "Session is valid",
    );
    echo json_encode($response);
  }
  else
  {
    $response = array(
        "status" => "error",
        "message" => "Session is invalid",
    );
    echo json_encode($response);
  }
}


?>