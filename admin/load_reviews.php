<?php
ob_start();
require_once 'config.php';
ob_clean();
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM reviews WHERE status = 'approved' ORDER BY created_at DESC");
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Debug log
    error_log('Found ' . count($reviews) . ' approved reviews');
    
    echo json_encode($reviews);
} catch(PDOException $e) {
    error_log('Error loading reviews: ' . $e->getMessage());
    echo json_encode([]);
}
exit;
?>