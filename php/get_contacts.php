<?php
include 'connect.php';

$result = $conn->query("SELECT * FROM contacts");
$contacts = [];

while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}

echo json_encode($contacts);

$conn->close();
?>
