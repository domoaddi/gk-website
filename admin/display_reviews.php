<?php
require_once './admin/config.php';

try {
    $stmt = $pdo->query("SELECT * FROM reviews WHERE status = 'approved' ORDER BY created_at DESC");
    $reviews = $stmt->fetchAll();
    
    foreach ($reviews as $review) {
        echo '<div class="review-item">';
        echo '<div class="review-content">';
        echo '<p>' . htmlspecialchars($review['review_text']) . '</p>';
        echo '<p class="review-location">- ' . htmlspecialchars($review['city']) . ', ' . 
             htmlspecialchars($review['state']) . '</p>';
        echo '</div>';
        echo '<hr>';
        echo '</div>';
    }
} catch(PDOException $e) {
    echo '<!-- Error loading reviews -->';
}
?>