<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Starting connection test...<br>";

require_once './admin/config.php';  // Updated path to look in admin folder

try {
    $stmt = $pdo->query("SELECT 1");
    echo "Database connection successful!";
} catch(PDOException $e) {
    echo "Database Error: " . $e->getMessage();
} catch(Exception $e) {
    echo "General Error: " . $e->getMessage();
}
?>