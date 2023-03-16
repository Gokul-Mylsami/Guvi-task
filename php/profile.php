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

if (isset($_POST['action']) && $_POST['action'] === 'get-data'){
  $email = $_SESSION['email'];

  $manager = new MongoDB\Driver\Manager("mongodb+srv://Gokul:TN33BB3621@cluster0.x8urb.mongodb.net/");
  $database = "guvi";
  $collection = "users";

  $filter = ['email' => $email];

  $options = [];

  $query = new MongoDB\Driver\Query($filter, $options);

  $cursor = $manager->executeQuery("$database.$collection", $query);

  foreach ($cursor as $document) {
    $data[] = $document;
  }

  if (!empty($data)) {
    $response = ['status' => 'success', 'data' => $data];
  }else{
    $response = ['status' => 'error', 'message' => 'No data found.'];
  }
  echo json_encode($response);
}


?>