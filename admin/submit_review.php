<?php
ob_start();
require_once 'config.php';
ob_clean();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        if (empty($_POST['reviewText']) || empty($_POST['city']) || empty($_POST['state'])) {
            throw new Exception('Missing required fields');
        }

        // Handle anonymous and name fields
        $isAnonymous = isset($_POST['isAnonymous']) && $_POST['isAnonymous'] === 'true';
        $reviewerName = $isAnonymous ? NULL : ($_POST['reviewerName'] ?? NULL);

        $stmt = $pdo->prepare("INSERT INTO reviews (review_text, city, state, status, reviewer_name, is_anonymous) VALUES (?, ?, ?, 'pending', ?, ?)");
        $result = $stmt->execute([
            $_POST['reviewText'],
            $_POST['city'],
            $_POST['state'],
            $reviewerName,
            $isAnonymous
        ]);

        if ($result) {
            echo json_encode([
                'success' => true,
                'message' => 'Review submitted successfully'
            ]);
        } else {
            throw new Exception('Failed to insert review');
        }
    } catch(Exception $e) {
        error_log('Error submitting review: ' . $e->getMessage());
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid request method'
    ]);
}
exit;
?>