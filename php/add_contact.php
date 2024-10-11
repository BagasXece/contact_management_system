<!-- <?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $id = $_POST['contactId'];

    // Validasi email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // Validasi nomor telepon (hanya angka)
    if (!is_numeric($phone)) {
        echo "Phone number must be numeric.";
        exit;
    }

    if (!empty($id)) {
        // Update kontak yang ada
        $stmt = $conn->prepare("UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $name, $email, $phone, $address, $id);
        $stmt->execute();
        echo "Contact updated successfully!";
    } else {
        // Tambahkan kontak baru
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $phone, $address);
        $stmt->execute();
        echo "Contact added successfully!";
    }

    $stmt->close();
    $conn->close();
}
?> -->










<?php
require_once 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_NUMBER_INT);
    $address = filter_var($_POST['address'], FILTER_SANITIZE_STRING);
    $id = filter_var($_POST['contactId'], FILTER_SANITIZE_NUMBER_INT);

    // Validasi email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // Validasi nomor telepon (hanya angka)
    if (!is_numeric($phone)) {
        echo "Phone number must be numeric.";
        exit;
    }

    if (!empty($id)) {
        // Update kontak yang ada
        $stmt = $conn->prepare("UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $name, $email, $phone, $address, $id);
        if ($stmt->execute()) {
            echo "Contact updated successfully!";
        } else {
            echo "Failed to update contact.";
        }
    } else {
        // Tambahkan kontak baru
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $phone, $address);
        if ($stmt->execute()) {
            echo "Contact added successfully!";
        } else {
            echo "Failed to add contact.";
        }
    }

    $stmt->close();
    $conn->close();
}
