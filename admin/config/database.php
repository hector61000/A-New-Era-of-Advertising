<?php
// معلومات الاتصال بقاعدة البيانات
$host = "localhost";
$username = "root";
$password = "";
$database = "ad_platform";

// إنشاء اتصال
$conn = mysqli_connect($host, $username, $password, $database);

// التحقق من الاتصال
if (!$conn) {
    die("فشل الاتصال بقاعدة البيانات: " . mysqli_connect_error());
}

// تعيين ترميز الاتصال إلى UTF-8
mysqli_set_charset($conn, "utf8");
?>
