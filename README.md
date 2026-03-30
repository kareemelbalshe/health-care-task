# 🏥 نظام إدارة الرعاية الصحية - Healthcare Management System

نظام متكامل لإدارة العيادات والمستشفيات يوفر تتبع المرضى، المواعيد، الأدوية، والفواتير بكفاءة عالية.

---

## 📋 نظرة عامة على المشروع

**Healthcare Management System** هو تطبيق ويب شامل يربط بين:
- **المرضى**: لحجز مواعيد مع الأطباء وتتبع سجلهم الطبي
- **الأطباء**: لإدارة المواعيد وإدارة الأدوية والفواتير
- **موظفي المالية**: لتتبع الدفعات والفواتير

---

## 🎯 الميزات الرئيسية

### ✅ نظام المستخدمين
- تسجيل حساب بثلاث أنواع مختلفة: **مريض**, **طبيب**, **موظف مالي**
- تسجيل الدخول الآمن باستخدام JWT
- إدارة ملف المستخدم الشخصي
- تشفير كلمات المرور بـ bcryptjs

### ✅ إدارة الأطباء
- قائمة الأطباء مع معلوماتهم المتخصصة
- البحث والتصفية حسب:
  - الاسم
  - التخصص الطبي
  - رقم الهاتف
  - العنوان

### ✅ نظام الحجوزات والمواعيد
- حجز مواعيد مع الأطباء
- تتبع حالة المواعيد:
  - `scheduled` - مجدول
  - `in-progress` - قيد الإجراء
  - `completed` - مكتمل
  - `cancelled` - ملغى
- منع حجز مواعيد متكررة مع نفس الطبيب
- عرض السجل الطبي للمريض مع التقسيم (Pagination)

### ✅ نظام الأدوية والعلاجات
- إضافة الأدوية لكل موعد
- تتبع:
  - اسم الدواء
  - الكمية
  - الوصف
  - التكلفة
- تحديث أو حذف الأدوية
- حساب التكلفة الإجمالية للموعد

### ✅ إدارة المالية
- تتبع حالة الدفع:
  - `pending` - قيد الانتظار
  - `paid` - مدفوع
- حساب التكاليف الإجمالية
- الفلترة حسب حالة الدفع

### ✅ لوحات التحكم المتخصصة
- **لوحة الطبيب**: مواعيده اليومية + إضافة أدوية + إدارة الموظفين
- **لوحة المالية**: جميع المواعيد + تحديث حالة الدفع
- **لوحة المريض**: السجل الطبي الشامل

### ✅ الأمان والحماية
- Helmet.js لحماية رؤوس HTTP
- تنظيف البيانات من XSS
- HPP - منع تضخيم الجيوب الأنفية
- معدل الضغط (Rate Limiting)
- التحقق من صحة المدخلات بـ Joi

---

## 🛠️ متطلبات التثبيت

### المتطلبات الأساسية:
- **Node.js** v18 أو أحدث
- **npm** أو **yarn**
- **MongoDB** (محلي أو MongoDB Atlas)

### المنصات المدعومة:
- Windows
- macOS
- Linux

---

## 📦 التثبيت والإعداد

### 1️⃣ استنساخ المشروع

```bash
git clone https://github.com/kareemelbalshe/health-care-task.git
cd health
```

### 2️⃣ إعداد Backend

```bash
cd backend

# تثبيت المكتبات
npm install

# إنشاء ملف .env
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare
JWT_SECRET=your_secret_key_here
NODE_ENV=development" > .env

# بدء السيرفر
npm start
```

**المتغيرات المطلوبة في `.env`:**
```
PORT - رقم المنفذ (افتراضي: 5000)
MONGODB_URI - عنوان قاعدة البيانات
JWT_SECRET - مفتاح التوقيع السري
NODE_ENV - بيئة التطوير (development/production)
```

### 3️⃣ إعداد Frontend

```bash
cd ../frontend

# تثبيت المكتبات
npm install

# بدء خادم التطوير
npm run dev
```

**الموقع الافتراضي:**
```
http://localhost:5173
```

---

## 🚀 بدء التطبيق

### في الإنتاج:

**Backend:**
```bash
npm run build
npm start
```

**Frontend:**
```bash
npm run build
npm preview
```

---

## 🏗️ البنية المعمارية

### نموذج العمارة

```
┌─────────────────────────────────┐
│    Frontend (React + Redux)     │
│  ↓ HTTP Requests + JWT Token    │
├─────────────────────────────────┤
│  Backend API (Express.js)       │
│  ↓ Mongoose ORM                 │
├─────────────────────────────────┤
│  MongoDB Database               │
└─────────────────────────────────┘
```

### مستويات الأمان والتحقق

```
Request
  ↓
Rate Limiting
  ↓
XSS Cleaning
  ↓
JWT Verification
  ↓
Joi Validation
  ↓
Role-Based Authorization
  ↓
Controller
  ↓
Database
```

---

## 📊 نموذج قاعدة البيانات

### جدول المستخدمين (User)

| الحقل | النوع | الملاحظات |
|------|------|---------|
| `_id` | ObjectId | المعرف الفريد |
| `username` | String | اسم المستخدم (فريد) |
| `email` | String | البريد الإلكتروني (فريد) |
| `password` | String | كلمة المرور (مشفرة بـ bcryptjs) |
| `role` | Enum | `patient` / `doctor` / `finance` |
| `specialization` | String | التخصص الطبي (للأطباء فقط) |
| `followDoctor` | ObjectId | المرجع للطبيب المتابع (للمريض) |
| `phone` | String | رقم الهاتف |
| `address` | String | العنوان |
| `createdAt` | Date | تاريخ الإنشاء |
| `updatedAt` | Date | تاريخ التحديث |

### جدول المواعيد (Visit)

| الحقل | النوع | الملاحظات |
|------|------|---------|
| `_id` | ObjectId | المعرف الفريد |
| `patient` | ObjectId | المرجع للمريض |
| `doctor` | ObjectId | المرجع للطبيب |
| `status` | Enum | `scheduled` / `in-progress` / `completed` / `cancelled` |
| `paymentStatus` | Enum | `pending` / `paid` |
| `startDate` | Date | تاريخ البداية |
| `endDate` | Date | تاريخ النهاية |
| `notes` | String | ملاحظات الموعد |
| `cost` | Number | تكلفة الموعد |
| `createdAt` | Date | تاريخ الإنشاء |
| `updatedAt` | Date | تاريخ التحديث |

### جدول الأدوية (Medicine)

| الحقل | النوع | الملاحظات |
|------|------|---------|
| `_id` | ObjectId | المعرف الفريد |
| `visitId` | ObjectId | المرجع للموعد |
| `name` | String | اسم الدواء |
| `count` | Number | الكمية |
| `description` | String | الوصف |
| `cost` | Number | التكلفة |
| `createdAt` | Date | تاريخ الإنشاء |
| `updatedAt` | Date | تاريخ التحديث |

---

## 🔗 API Endpoints

### 🔐 المصادقة (Authentication)

#### تسجيل دخول
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "doctor@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "username": "doctor",
      "email": "doctor@example.com",
      "role": "doctor"
    },
    "token": "jwt_token_here"
  }
}
```

#### التسجيل
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "newdoctor",
  "email": "doctor@example.com",
  "password": "password123",
  "phone": "01012345678",
  "address": "Cairo, Egypt",
  "role": "doctor",
  "specialization": "Cardiologist"
}

Response:
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### 👤 المستخدمين (Users)

#### الحصول على بيانات المستخدم
```http
GET /api/v1/user/:id
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": { ... user data ... }
}
```

#### تحديث بيانات المستخدم
```http
PUT /api/v1/user/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "newname",
  "phone": "01012345678",
  "address": "New Address"
}

Response:
{
  "success": true,
  "message": "User updated successfully"
}
```

#### حذف حساب المستخدم
```http
DELETE /api/v1/user/:id
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### 👨‍⚕️ الأطباء (Doctors)

#### البحث عن الأطباء
```http
GET /api/v1/doctor/?username=ahmed&specialization=cardiologist&page=1&limit=10

Query Parameters:
- username: اسم الطبيب (اختياري)
- specialization: التخصص (اختياري)
- phone: رقم الهاتف (اختياري)
- address: العنوان (اختياري)
- page: رقم الصفحة (افتراضي: 1)
- limit: عدد النتائج (افتراضي: 10)

Response:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "username": "ahmed",
      "specialization": "Cardiologist",
      "phone": "...",
      "address": "..."
    }
  ],
  "totalPages": 5
}
```

---

### 📅 المواعيد (Visits)

#### حجز موعد جديد
```http
POST /api/v1/visit/:doctorId
Authorization: Bearer {token}
Content-Type: application/json

{
  "startDate": "2024-04-15T10:00:00Z",
  "endDate": "2024-04-15T10:30:00Z"
}

Response:
{
  "success": true,
  "message": "Visit created successfully"
}
```

#### الحصول على مواعيد الطبيب
```http
GET /api/v1/visit/doctor/:doctorId?date=2024-04-15&patientName=&paymentStatus=
Authorization: Bearer {token}

Query Parameters:
- date: تاريخ محدد (اختياري)
- patientName: اسم المريض (اختياري)
- paymentStatus: حالة الدفع (اختياري)

Response:
{
  "success": true,
  "data": [ ... visits array ... ]
}
```

#### الحصول على الموعد النشط حاليًا
```http
GET /api/v1/visit/active/:id
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": { ... visit details ... }
}
```

#### الحصول على سجل المريض الطبي
```http
GET /api/v1/visit/patient/:patientId?page=1&limit=10
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [ ... patient visits ... ],
  "totalPages": 3
}
```

#### تحديث موعد (الطبيب/المالي)
```http
PATCH /api/v1/visit/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "completed",
  "cost": 500,
  "paymentStatus": "pending",
  "notes": "Patient is stable"
}

Response:
{
  "success": true,
  "message": "Visit updated successfully"
}
```

#### تحديث موعد (المريض)
```http
PATCH /api/v1/visit/:id/patient
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "cancelled"
}

Response:
{
  "success": true,
  "message": "Visit updated successfully"
}
```

---

### 💊 الأدوية (Medicines)

#### إضافة دواء لموعد
```http
POST /api/v1/medicine/:visitId
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Aspirin",
  "count": 30,
  "description": "Take once daily after meals",
  "cost": 50
}

Response:
{
  "success": true,
  "message": "Medicine added successfully"
}
```

#### الحصول على أدوية الموعد
```http
GET /api/v1/medicine/:visitId
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [ ... medicines array ... ]
}
```

#### تحديث دواء
```http
PUT /api/v1/medicine/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "count": 60,
  "description": "Updated description",
  "cost": 75
}

Response:
{
  "success": true,
  "message": "Medicine updated successfully"
}
```

#### حذف دواء
```http
DELETE /api/v1/medicine/:id
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Medicine deleted successfully"
}
```

---

### 💰 المالية (Finance)

#### إنشاء موظف مالي
```http
POST /api/v1/finance/
Authorization: Bearer {token}
Content-Type: application/json

{
  "financeId": "finance_user_id"
}

Response:
{
  "success": true,
  "message": "Finance staff created successfully"
}
```

#### الحصول على أدوية وتكاليف الموعد
```http
GET /api/v1/finance/:visitId/medicines
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "medicines": [ ... ],
    "totalCost": 500,
    "paymentStatus": "pending"
  }
}
```

---

## 🛣️ هيكل المسارات (Routing)

### الصفحات العامة

| المسار | الكمبوننت | الدور |
|------|----------|-----|
| `/` | Home | الجميع |
| `/login` | Login | الجميع (غير المصرح) |
| `/register` | Register | الجميع (غير المصرح) |
| `/profile/:id` | Profile | المصرح به |
| `/*` | NotFound | جميع المسارات غير الموجودة |

### لوحات التحكم المحمية

| المسار | الدور | الميزات |
|------|-----|--------|
| `/dashboard/doctor` | طبيب | المواعيد + الأدوية + الموظفين |
| `/dashboard/finance` | مالي | جميع المواعيد + حالة الدفع |
| `/dashboard/patient` | مريض | السجل الطبي |

### صفحات المواعيد

| المسار | الدور | الغرض |
|------|-----|--------|
| `/visits` | مريض | عرض جميع المواعيد |
| `/visits/add-medicine/:id` | طبيب | إضافة أدوية |
| `/visits/edit/:id` | طبيب/مالي | تعديل موعد |
| `/visits/view/:id` | الجميع | عرض تفاصيل موعد |

---

## 📁 هيكل المشروع

### Backend

```
backend/
├── index.js                  # نقطة البداية الرئيسية
├── package.json              # المكتبات والمتطلبات
│
├── config/
│   └── connectToDB.js        # الاتصال بـ MongoDB
│
├── controller/               # منطق المعالجة الرئيسي
│   ├── auth.controller.js    # المصادقة
│   ├── doctor.controller.js  # الأطباء
│   ├── user.controller.js    # المستخدمين
│   ├── visit.controller.js   # المواعيد
│   ├── medicine.controller.js# الأدوية
│   └── finance.controller.js # المالية
│
├── models/                   # نماذج قاعدة البيانات
│   ├── User.js              # نموذج المستخدم
│   ├── Visit.js             # نموذج الموعد
│   └── Medicine.js          # نموذج الدواء
│
├── middleware/              # الدوال الوسيطية
│   ├── error.js             # معالجة الأخطاء
│   ├── verifyToken.js       # التحقق من التوكن
│   ├── validate.js          # التحقق من الصحة
│   └── safeXssClean.js      # تنظيف XSS
│
├── routes/                  # المسارات
│   ├── auth.js              # مسارات المصادقة
│   ├── doctor.js            # مسارات الأطباء
│   ├── user.js              # مسارات المستخدمين
│   ├── visit.js             # مسارات المواعيد
│   ├── medicine.js          # مسارات الأدوية
│   └── finance.js           # مسارات المالية
│
└── Joi/                     # التحقق من الصحة
    ├── auth.joi.js
    ├── user.joi.js
    ├── visit.joi.js
    ├── medicine.joi.js
    └── finance.joi.js
```

### Frontend

```
frontend/
├── index.html               # صفحة HTML الرئيسية
├── package.json             # المكتبات والمتطلبات
├── vite.config.ts          # إعدادات Vite
├── tsconfig.json           # إعدادات TypeScript
│
├── src/
│   ├── main.tsx            # نقطة البداية
│   ├── App.tsx             # المكون الجذر
│   ├── index.css           # الأنماط العامة
│   │
│   ├── components/          # المكونات القابلة لإعادة الاستخدام
│   │   ├── button/
│   │   ├── input/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── loader/
│   │   ├── table/
│   │   └── dashboardSlide/
│   │
│   ├── pages/              # صفحات التطبيق
│   │   ├── home/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── visits/
│   │   ├── visitsToPatient/
│   │   ├── createFinance/
│   │   └── not-found/
│   │
│   ├── lib/                # مكتبات وأدوات
│   │   ├── axios/          # HTTP Client
│   │   ├── redux/          # Redux Store
│   │   │   ├── store.ts
│   │   │   └── slices/
│   │   │       ├── authSlice.ts
│   │   │       ├── userSlice.ts
│   │   │       ├── doctorSlice.ts
│   │   │       ├── visitSlice.ts
│   │   │       ├── medicineSlice.ts
│   │   │       └── financeSlice.ts
│   │   ├── routes/         # التوجيه
│   │   ├── types/          # أنواع TypeScript
│   │   ├── functions/      # دوال مساعدة
│   │   └── animation/      # الرسوم المتحركة
│   │
│   ├── utils/              # أدوات عامة
│   └── assets/             # الموارد (صور، إلخ)
│
└── public/                 # الملفات الثابتة
```

---

## 🔐 المصادقة والأمان

### تدفق JWT

```
1. المستخدم يدخل بريده وكلمة مروره
   ↓
2. Backend يتحقق من البيانات ويصدر JWT Token
   ↓
3. Token يتم حفظه في Cookie (userInfo)
   ↓
4. Axios Interceptor يضيف Token في كل طلب
   ↓
5. Backend يتحقق من صحة Token والصلاحيات
   ↓
6. يتم تنفيذ المطلوب أو يتم رفضه
```

### طبقات الأمان

1. **Rate Limiting**: 200 طلب / 10 دقائق
2. **XSS Protection**: تنظيف جميع المدخلات
3. **HPP Protection**: منع تضخيم الجيوب الأنفية
4. **Helmet.js**: تأمين رؤوس HTTP
5. **Joi Validation**: التحقق من صحة البيانات
6. **bcryptjs**: تشفير كلمات المرور
7. **Role-Based Authorization**: التحقق من الصلاحيات

---

## 🖼️ لقطات واجهة المستخدم

### الصفحات الرئيسية

- **الصفحة الرئيسية**: شاشة الترحيب والتنقل
- **تسجيل الدخول**: نموذج المصادقة
- **التسجيل**: نموذج إنشاء حساب جديد
- **الملف الشخصي**: عرض بيانات المستخدم

### لوحات التحكم

**لوحة الطبيب:**
- قائمة المواعيد اليومية
- إضافة وتحديث الأدوية
- إدارة الموظفين الماليين
- تحديث حالة الموعد والفاتورة

**لوحة المريض:**
- السجل الطبي الكامل
- معلومات الأطباء
- حالة الدفع

**لوحة موظف المالية:**
- جميع المواعيد
- تحديث حالة الدفع
- التقارير المالية

---

## 🧪 الاختبار

### اختبار Backend

```bash
cd backend
npm run test
```

### اختبار Frontend

```bash
cd frontend
npm run test
```

---

## 📚 المكتبات والأدوات الرئيسية

### Backend
- **Express.js**: إطار العمل الخادم
- **MongoDB**: قاعدة البيانات
- **Mongoose**: ORM لـ MongoDB
- **bcryptjs**: تشفير كلمات المرور
- **JWT**: المصادقة
- **Joi**: التحقق من الصحة
- **Helmet**: الأمان
- **HPP**: حماية من تضخيم الجيوب الأنفية
- **XSS-clean**: تنظيف من XSS

### Frontend
- **React 19**: مكتبة واجهة المستخدم
- **TypeScript**: لغة برمجة محسّنة
- **Vite**: أداة البناء
- **Redux Toolkit**: إدارة الحالة
- **React Router v7**: التوجيه
- **Axios**: HTTP Client
- **Tailwind CSS**: الأنماط
- **React Toastify**: الإشعارات

---

## 🤝 المساهمة

للمساهمة في المشروع:

1. انسخ المشروع (Fork)
2. إنشاء فرع جديد (`git checkout -b feature/AmazingFeature`)
3. احفظ التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. ادفع للفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

---

## 📄 الترخيص

هذا المشروع مرخص تحت MIT License - انظر ملف LICENSE للتفاصيل.

---

## 👨‍💻 المطورون

**كريم الباشا** - [GitHub](https://github.com/kareemelbalshe)

---

## 📞 التواصل والدعم

- 📧 البريد الإلكتروني: [admin@healthcare.com]
- 🌐 الموقع: [www.healthcare.com]
- 📱 رقم الدعم: +20 1012345678

---

## 🙏 شكراً لاستخدامك النظام!

إذا واجهت أي مشاكل أو لديك اقتراحات، يرجى فتح Issue أو التواصل معنا.

---

**آخر تحديث**: مارس 2026  
**الإصدار**: 1.0.0
