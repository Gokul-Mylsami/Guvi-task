<?php 

$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

if (isset($_POST['action']) && $_POST['action'] === 'logout') {
   
    $redisId = $_POST["redisId"];
    $redis->del("session:$redisId");
    // Return a success message
    $response = array(
        "status" => "success",
        "message" => "Logout successful",
    );

    echo json_encode($response);
}

if (isset($_POST['action']) && $_POST['action'] === 'valid-session'){
  $redisId = $_POST["redisId"];
  if ($redis->get("session:$redisId")) {
    $sessionData = $redis->get("session:$redisId");
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
  $redisId = $_POST["redisId"];
  $sessionData = $redis->get("session:$redisId");

  $email = $sessionData;
  

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