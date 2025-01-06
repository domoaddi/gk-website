<?php
error_reporting(0); // Disable error reporting for production
ini_set('display_errors', 0);

// Database configuration
$host = 'localhost';
$dbname = 'u517537707_Reviews'; // Your database name from Hostinger
$username = 'u517537707_gandkc'; // Your database username from Hostinger
$password = 'VAO44!mi'; // The password you created for the database

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Log error but don't output anything
    error_log("Database connection failed: " . $e->getMessage());
    exit;
}
?>