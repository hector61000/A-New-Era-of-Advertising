<?php
require_once 'config/database.php';
require_once 'includes/auth.php';

// التحقق من تسجيل الدخول وصلاحيات المدير
if (!isLoggedIn() || !isAdmin()) {
    header("Location: index.php");
    exit();
}

// التحقق من وجود معرف المستخدم
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    header("Location: dashboard.php");
    exit();
}

$user_id = $_GET['id'];

// التحقق من عدم حذف حساب مدير
$check_sql = "SELECT role FROM users WHERE id = $user_id";
$check_result = mysqli_query($conn, $check_sql);

if (mysqli_num_rows($check_result) == 1) {
    $user = mysqli_fetch_assoc($check_result);
    
    if ($user['role'] == 'admin') {
        header("Location: dashboard.php");
        exit();
    }
    
    // حذف المستخدم
    $sql = "DELETE FROM users WHERE id = $user_id";
    
    if (mysqli_query($conn, $sql)) {
        header("Location: dashboard.php?deleted=1");
    } else {
        header("Location: dashboard.php?error=1");
    }
} else {
    header("Location: dashboard.php");
}

exit();
?>
