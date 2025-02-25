<?php
require_once 'config/database.php';
require_once 'includes/auth.php';

// التحقق من تسجيل الدخول وصلاحيات المدير
if (!isLoggedIn() || !isAdmin()) {
    header("Location: index.php");
    exit();
}

// الحصول على قائمة المستخدمين
$sql = "SELECT id, phone, role, created_at, last_login FROM users ORDER BY created_at DESC";
$result = mysqli_query($conn, $sql);
$users = mysqli_fetch_all($result, MYSQLI_ASSOC);

// معالجة تسجيل الخروج
if (isset($_GET['logout'])) {
    logout();
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم - منصة الإعلانات</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 min-h-screen">
    <nav class="bg-purple-800 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">لوحة تحكم المدير</h1>
            <div class="flex items-center space-x-4">
                <span class="ml-4"><?php echo $_SESSION['phone']; ?></span>
                <a href="?logout=1" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors">تسجيل الخروج</a>
            </div>
        </div>
    </nav>
    
    <div class="container mx-auto p-6">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-bold">إدارة المستخدمين</h2>
                <a href="add_user.php" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">إضافة مستخدم جديد</a>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white">
                    <thead>
                        <tr class="bg-gray-200 text-gray-700">
                            <th class="py-3 px-4 text-right">الرقم</th>
                            <th class="py-3 px-4 text-right">رقم الهاتف</th>
                            <th class="py-3 px-4 text-right">الدور</th>
                            <th class="py-3 px-4 text-right">تاريخ الإنشاء</th>
                            <th class="py-3 px-4 text-right">آخر تسجيل دخول</th>
                            <th class="py-3 px-4 text-right">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $index => $user): ?>
                        <tr class="border-b hover:bg-gray-100">
                            <td class="py-3 px-4"><?php echo $index + 1; ?></td>
                            <td class="py-3 px-4"><?php echo $user['phone']; ?></td>
                            <td class="py-3 px-4">
                                <?php echo $user['role'] == 'admin' ? 'مدير' : 'مستخدم'; ?>
                            </td>
                            <td class="py-3 px-4"><?php echo $user['created_at']; ?></td>
                            <td class="py-3 px-4"><?php echo $user['last_login'] ? $user['last_login'] : 'لم يسجل الدخول بعد'; ?></td>
                            <td class="py-3 px-4">
                                <div class="flex space-x-2">
                                    <a href="edit_user.php?id=<?php echo $user['id']; ?>" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors ml-2">تعديل</a>
                                    <?php if ($user['role'] != 'admin'): ?>
                                    <a href="delete_user.php?id=<?php echo $user['id']; ?>" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors" onclick="return confirm('هل أنت متأكد من حذف هذا المستخدم؟')">حذف</a>
                                    <?php endif; ?>
                                </div>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
