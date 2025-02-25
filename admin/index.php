<?php
require_once 'config/database.php';
require_once 'includes/auth.php';

$error = '';

// التحقق من تسجيل الدخول
if (isLoggedIn()) {
    if (isAdmin()) {
        header("Location: dashboard.php");
    } else {
        header("Location: ../index.html");
    }
    exit();
}

// معالجة نموذج تسجيل الدخول
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    
    if (empty($phone) || empty($password)) {
        $error = "يرجى إدخال رقم الهاتف وكلمة المرور";
    } else {
        if (login($phone, $password, $conn)) {
            if (isAdmin()) {
                header("Location: dashboard.php");
            } else {
                header("Location: ../index.html");
            }
            exit();
        } else {
            $error = "رقم الهاتف أو كلمة المرور غير صحيحة";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل الدخول - منصة الإعلانات</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-purple-900 min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-purple-800">تسجيل الدخول</h1>
            <p class="text-gray-600">منصة إعلانيكس - ثورة التكنولوجيا في عالم الإعلانات</p>
        </div>
        
        <?php if (!empty($error)): ?>
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="mb-4">
                <label for="phone" class="block text-gray-700 font-medium mb-2">رقم الهاتف</label>
                <input type="text" id="phone" name="phone" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required>
            </div>
            
            <div class="mb-6">
                <label for="password" class="block text-gray-700 font-medium mb-2">كلمة المرور</label>
                <input type="password" id="password" name="password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required>
            </div>
            
            <button type="submit" class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                تسجيل الدخول
            </button>
        </form>
    </div>
</body>
</html>
