<?php
session_start();
require_once 'config.php';

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: admin_login.php');
    exit;
}

// Handle review actions (approve/reject/delete)
if (isset($_POST['action']) && isset($_POST['review_id'])) {
    $action = $_POST['action'];
    $reviewId = $_POST['review_id'];
    
    if ($action === 'approve') {
        $stmt = $pdo->prepare("UPDATE reviews SET status = 'approved' WHERE id = ?");
    } elseif ($action === 'reject') {
        $stmt = $pdo->prepare("UPDATE reviews SET status = 'rejected' WHERE id = ?");
    } elseif ($action === 'delete') {
        $stmt = $pdo->prepare("DELETE FROM reviews WHERE id = ?");
    }
    
    $stmt->execute([$reviewId]);
}

// Get all reviews
$stmt = $pdo->query("SELECT * FROM reviews ORDER BY created_at DESC");
$reviews = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html>
<head>
    <title>G&K Construction - Review Management</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: rgb(181, 214, 240);
        }
        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .logout-btn {
            background: #dc3545;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
        }
        .filters {
            margin-bottom: 20px;
        }
        .filter-btn {
            background: steelblue;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            margin-right: 10px;
            cursor: pointer;
        }
        .filter-btn.active {
            background: #4682B4;
        }
        .review-card {
            background: #f8f9fa;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 4px;
            border-left: 4px solid #ddd;
        }
        .review-card.pending {
            border-left-color: #ffc107;
        }
        .review-card.approved {
            border-left-color: #28a745;
        }
        .review-card.rejected {
            border-left-color: #dc3545;
        }
        .review-actions {
            margin-top: 10px;
        }
        .action-btn {
            padding: 5px 10px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            margin-right: 5px;
        }
        .approve-btn {
            background: #28a745;
            color: white;
        }
        .reject-btn {
            background: #dc3545;
            color: white;
        }
        .delete-btn {
            background: #6c757d;
            color: white;
        }
        .status-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: bold;
        }
        .status-pending {
            background: #fff3cd;
            color: #856404;
        }
        .status-approved {
            background: #d4edda;
            color: #155724;
        }
        .status-rejected {
            background: #f8d7da;
            color: #721c24;
        }
        .help-tip {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>Review Management Dashboard</h1>
            <a href="logout.php" class="logout-btn">Logout</a>
        </div>

        <div class="help-tip">
            <h3>Quick Guide:</h3>
            <ul>
                <li>New reviews appear as "Pending" and need your approval</li>
                <li>Click "Approve" to make a review visible on your website</li>
                <li>Click "Reject" to hide inappropriate reviews</li>
                <li>Click "Delete" to permanently remove a review</li>
            </ul>
        </div>

        <div class="filters">
            <button class="filter-btn active" data-filter="all">All Reviews</button>
            <button class="filter-btn" data-filter="pending">Pending</button>
            <button class="filter-btn" data-filter="approved">Approved</button>
            <button class="filter-btn" data-filter="rejected">Rejected</button>
        </div>

        <div class="reviews">
            <?php foreach ($reviews as $review): ?>
                <div class="review-card <?php echo $review['status']; ?>" data-status="<?php echo $review['status']; ?>">
                    <span class="status-badge status-<?php echo $review['status']; ?>">
                        <?php echo ucfirst($review['status']); ?>
                    </span>
                    <p><?php echo htmlspecialchars($review['review_text']); ?></p>
                    <p><em>From: <?php echo htmlspecialchars($review['city'] . ', ' . $review['state']); ?></em></p>
                    <p><small>Posted: <?php echo date('M j, Y', strtotime($review['created_at'])); ?></small></p>
                    
                    <div class="review-actions">
                        <?php if ($review['status'] !== 'approved'): ?>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="review_id" value="<?php echo $review['id']; ?>">
                                <input type="hidden" name="action" value="approve">
                                <button type="submit" class="action-btn approve-btn">Approve</button>
                            </form>
                        <?php endif; ?>
                        
                        <?php if ($review['status'] !== 'rejected'): ?>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="review_id" value="<?php echo $review['id']; ?>">
                                <input type="hidden" name="action" value="reject">
                                <button type="submit" class="action-btn reject-btn">Reject</button>
                            </form>
                        <?php endif; ?>
                        
                        <form method="POST" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete this review?');">
                            <input type="hidden" name="review_id" value="<?php echo $review['id']; ?>">
                            <input type="hidden" name="action" value="delete">
                            <button type="submit" class="action-btn delete-btn">Delete</button>
                        </form>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <script>
        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                document.querySelector('.filter-btn.active').classList.remove('active');
                button.classList.add('active');
                
                // Filter reviews
                const filter = button.dataset.filter;
                document.querySelectorAll('.review-card').forEach(card => {
                    if (filter === 'all' || card.dataset.status === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    </script>
</body>
</html>