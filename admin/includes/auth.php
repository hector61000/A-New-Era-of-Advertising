<?php
session_start();

// دالة تسجيل الدخول
function login($phone, $password, $conn) {
    $phone = mysqli_real_escape_string($conn, $phone);
    
    $sql = "SELECT * FROM users WHERE phone = '$phone'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);
        
        if (password_verify($password, $user['password'])) {
            // تحديث وقت آخر تسجيل دخول
            $update_sql = "UPDATE users SET last_login = NOW() WHERE id = " . $user['id'];
            mysqli_query($conn, $update_sql);
            
            // تخزين معلومات المستخدم في الجلسة
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['phone'] = $user['phone'];
            $_SESSION['role'] = $user['role'];
            
            return true;
        }
    }
    
    return false;
}

// دالة التحقق من تسجيل الدخول
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// دالة التحقق من صلاحيات المدير
function isAdmin() {
    return isset($_SESSION['role']) && $_SESSION['role'] == 'admin';
}

// دالة تسجيل الخروج
function logout() {
    session_unset();
    session_destroy();
}
?>
