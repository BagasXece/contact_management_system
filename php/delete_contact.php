<?php
include 'connect.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    // Hapus kontak berdasarkan ID
    $stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Contact deleted successfully!";
    } else {
        echo "Failed to delete contact.";
    }

    $stmt->close();
    $conn->close();
}
?>
