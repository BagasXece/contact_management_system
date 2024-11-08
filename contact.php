<?php
require 'db_config.php';

try {
    // Cek apakah request menggunakan GET atau POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!isset($input['action'])) {
            throw new Exception('Missing action parameter');
        }

        switch ($input['action']) {
            case 'add':
                // Menambahkan kontak baru
                if (!isset($input['name'], $input['email'], $input['phone'], $input['address'])) {
                    throw new Exception('Missing required fields for add action');
                }
                $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)");
                $stmt->execute([$input['name'], $input['email'], $input['phone'], $input['address']]);
                echo json_encode(['message' => 'Contact added successfully']);
                break;
                
            case 'delete':
                // Menghapus kontak
                if (!isset($input['id'])) {
                    throw new Exception('Missing id parameter for delete action');
                }
                $stmt = $pdo->prepare('DELETE FROM contacts WHERE id = ?');
                $stmt->execute([$input['id']]);
                echo json_encode(['message' => 'Contact deleted successfully']);
                break;
            
            case 'update':
                // Mengupdate kontak
                if (!isset($input['id'], $input['name'], $input['email'], $input['phone'], $input['address'])) {
                    throw new Exception('Missing required fields for update action');
                }
                $stmt = $pdo->prepare("UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?");
                $stmt->execute([$input['name'], $input['email'], $input['phone'], $input['address'], $input['id']]);
                echo json_encode(['message' => 'Contact updated successfully']);
                break;
                
            default:
                throw new Exception('Invalid action parameter');
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'list') {
        // Memproses action 'list' dari request GET
        $stmt = $pdo->query('SELECT * FROM contacts');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get' && isset($_GET['id'])) {
        // Memproses action 'get' dari request GET
        $stmt = $pdo->prepare('SELECT * FROM contacts WHERE id = ?');
        $stmt->execute([$_GET['id']]);
        $contact = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($contact) {
            echo json_encode($contact);
        } else {
            throw new Exception('Contact not found');
        }
    } else {
        throw new Exception('Invalid request method or missing action parameter');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}

?>