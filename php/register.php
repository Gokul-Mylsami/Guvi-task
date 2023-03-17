<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Connect to the database
$servername = "sql12.freesqldatabase.com";
$username = "sql12605910";
$password = "SLeaaLh6Gm";
$database = "sql12605910";

// $servername = "localhost";
// $username = "root";
// $password = "gokul123";
// $database = "guvi";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


$sql = "CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    mongodbId VARCHAR(255) NOT NULL,
    PRIMARY KEY (email)
)";

$email = $_POST['email'];
$password = $_POST['password'];
$password = password_hash($password, PASSWORD_DEFAULT);
$confirmPassword = $_POST['confirmPassword'];

if (!mysqli_query($conn, $sql)) 
{
    echo "Error creating table: " . mysqli_error($conn);
}

//check if the user is already exist
$result = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");
if (mysqli_num_rows($result) > 0) {
    $response = array(
        "status" => "error",
        "message" => "User already exists"
    );
    echo json_encode($response);
    exit();
}


$uri = 'mongodb+srv://Gokul:TN33BB3621@cluster0.x8urb.mongodb.net/';
$manager = new MongoDB\Driver\Manager($uri);

$database = "guvi";
$collection = "users";

$bulk = new MongoDB\Driver\BulkWrite;

$document = [
    'email' => $email,
    'dob' => '',
    'age' => '',
    'contact'=>'',
];

$bulk = new MongoDB\Driver\BulkWrite;
$_id = $bulk->insert($document);
$writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
$result = $manager->executeBulkWrite("$database.$collection", $bulk, $writeConcern);


$mongoId = (string)$_id;


$sql = "INSERT INTO users (email, password ,mongodbId) VALUES ('$email', '$password','$mongoId')";

if(mysqli_query($conn,$sql))
{
    $response = ['status' => 'success', 'message' => 'Registered successfully'];
}else{
    $response = ['status' => 'error', 'message' => 'Registration failed'];
}

echo json_encode($response);

?>