<?php
require_once 'config/database.php';
require_once 'includes/auth.php';

// التحقق من تسجيل الدخول وصلاحيات المدير
if (!isLoggedIn() || !isAdmin()) {
    header("Location: index.php");
    exit();
}

$success = '';
$error = '';
$user = null;

// التحقق من وجود معرف المستخدم
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    header("Location: dashboard.php");
    exit();
}

$user_id = $_GET['id'];

// الحصول على بيانات المستخدم
$sql = "SELECT * FROM users WHERE id = $user_id";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) != 1) {
    header("Location: dashboard.php");
    exit();
}

$user = mysqli_fetch_assoc($result);

// معالجة نموذج تعديل المستخدم
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $role = $_POST['role'];
    $password = $_POST['password'];
    
    // التحقق من البيانات
    if (empty($phone)) {
        $error = "يرجى إدخال رقم الهاتف";
    } else {
        // التحقق من عدم وجود رقم الهاتف مسبقاً لمستخدم آخر
        $check_sql = "SELECT * FROM users WHERE phone = '$phone' AND id != $user_id";
        $check_result = mysqli_query($conn, $check_sql);
        
        if (mysqli_num_rows($check_result) > 0) {
            $error = "رقم الهاتف مستخدم بالفعل";
        } else {
            // تحديث بيانات المستخدم
            if (!empty($password)) {
                // تحديث كلمة المرور إذا تم إدخالها
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $sql = "UPDATE users SET phone = '$phone', role = '$role', password = '$hashed_password' WHERE id = $user_id";
            } else {
                // تحديث البيانات بدون كلمة المرور
                $sql = "UPDATE users SET phone = '$phone', role = '$role' WHERE id = $user_id";
            }
            
            if (mysqli_query($conn, $sql)) {
                $success = "تم تحديث بيانات المستخدم بنجاح";
                // تحديث بيانات المستخدم المعروضة
                $sql = "SELECT * FROM users WHERE id = $user_id";
                $result = mysqli_query($conn, $sql);
                $user = mysqli_fetch_assoc($result);
            } else {
                $error = "حدث خطأ أثناء تحديث بيانات المستخدم: " . mysqli_error($conn);
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تعديل المستخدم - منصة الإعلانات</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 min-h-screen">
    <nav class="bg-purple-800 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">لوحة تحكم المدير</h1>
            <div class="flex items-center space-x-4">
                <span class="ml-4"><?php echo $_SESSION['phone']; ?></span>
                <a href="dashboard.php" class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors ml-2">العودة للوحة التحكم</a>
                <a href="?logout=1" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors">تسجيل الخروج</a>
            </div>
        </div>
    </nav>
    
    <div class="container mx-auto p-6">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-bold mb-6">تعديل المستخدم</h2>
            
            <?php if (!empty($success)): ?>
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <?php echo $success; ?>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($error)): ?>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <?php echo $error; ?>
                </div>
            <?php endif; ?>
            
            <form method="POST" action="">
                <div class="mb-4">
                    <label for="phone" class="block text-gray-700 font-medium mb-2">رقم الهاتف</label>
                    <input type="text" id="phone" name="phone" value="<?php echo $user['phone']; ?>" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required>
                </div>
                
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 font-medium mb-2">كلمة المرور الجديدة (اتركها فارغة للاحتفاظ بكلمة المرور الحالية)</label>
                    <input type="text" id="password" name="password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <p class="text-sm text-gray-500 mt-1">كلمة المرور ستظهر بوضوح. اتركها فارغة إذا كنت لا ترغب في تغييرها.</p>
                </div>
                
                <div class="mb-6">
                    <label for="role" class="block text-gray-700 font-medium mb-2">الدور</label>
                    <select id="role" name="role" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="user" <?php echo $user['role'] == 'user' ? 'selected' : ''; ?>>مستخدم</option>
                        <option value="admin" <?php echo $user['role'] == 'admin' ? 'selected' : ''; ?>>مدير</option>
                    </select>
                </div>
                
                <div class="flex justify-between">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                        حفظ التغييرات
                    </button>
                    <a href="dashboard.php" class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                        إلغاء
                    </a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
