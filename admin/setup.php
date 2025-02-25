<?php
require_once 'config/database.php';

// إنشاء جدول المستخدمين إذا لم يكن موجوداً
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

if (mysqli_query($conn, $sql)) {
    echo "تم إنشاء جدول المستخدمين بنجاح<br>";
} else {
    echo "خطأ في إنشاء جدول المستخدمين: " . mysqli_error($conn) . "<br>";
}

// إضافة حساب المدير الافتراضي إذا لم يكن موجوداً
$admin_phone = "123456789";
$admin_password = password_hash("admin123", PASSWORD_DEFAULT);

$check_admin = "SELECT * FROM users WHERE role = 'admin' LIMIT 1";
$result = mysqli_query($conn, $check_admin);

if (mysqli_num_rows($result) == 0) {
    $sql = "INSERT INTO users (phone, password, role) VALUES ('$admin_phone', '$admin_password', 'admin')";
    
    if (mysqli_query($conn, $sql)) {
        echo "تم إنشاء حساب المدير الافتراضي بنجاح<br>";
        echo "رقم الهاتف: $admin_phone<br>";
        echo "كلمة المرور: admin123<br>";
    } else {
        echo "خطأ في إنشاء حساب المدير: " . mysqli_error($conn) . "<br>";
    }
} else {
    echo "حساب المدير موجود بالفعل<br>";
}

mysqli_close($conn);
?>
