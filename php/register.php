<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Connect to the database
// $servername = "sql12.freesqldatabase.com";
// $username = "sql12605910";
// $password = "SLeaaLh6Gm";
// $database = "sql12605910";

$servername = "localhost";
$username = "root";
$password = "gokul123";
$database = "guvi";

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

if (mysqli_query($conn, $sql)) {
    echo "Table users created successfully";
} else {
    echo "Error creating table: " . mysqli_error($conn);
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

// Add insert operation to bulk write object
$_id = $bulk->insert($document);

// Create MongoDB write concern object
$writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);

// Execute bulk write operation
$result = $manager->executeBulkWrite("$database.$collection", $bulk, $writeConcern);


// Print result

printf("Inserted %d document(s)\n", $result->getInsertedCount());
$mongoId = (string)$_id;
printf($mongoId);
$sql = "INSERT INTO users (email, password ,mongodbId) VALUES ('$email', '$password','$mongoId')";

if(mysqli_query($conn,$sql))
{
    echo "Data inserted successfully";
}

?>