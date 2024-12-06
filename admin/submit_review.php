<?php
require_once './admin/config.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $stmt = $pdo->prepare("INSERT INTO reviews (review_text, city, state, status) VALUES (?, ?, ?, 'pending')");
        $stmt->execute([
            $_POST['reviewText'],
            $_POST['city'],
            $_POST['state']
        ]);
        error_log("Review submitted successfully");
        echo json_encode(['success' => true]);
    } catch(PDOException $e) {
        error_log("Error submitting review: " . $e->getMessage());
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}
?>