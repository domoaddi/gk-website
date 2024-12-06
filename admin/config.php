<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
$host = 'localhost';
$dbname = 'u517537707_Reviews'; // Your database name from Hostinger
$username = 'u517537707_gandkc'; // Your database username from Hostinger
$password = 'VAO44!mi'; // The password you created for the database

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<pre>Database connection successful!</pre>";
    
    // Test query to verify table exists
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo "<pre>Available tables:\n";
    print_r($tables);
    echo "</pre>";
} catch(PDOException $e) {
    echo "<pre>Connection failed: " . $e->getMessage() . "</pre>";
}
?>