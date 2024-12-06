<?php
require_once './admin/config.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM reviews WHERE status = 'approved' ORDER BY created_at DESC");
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($reviews);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>