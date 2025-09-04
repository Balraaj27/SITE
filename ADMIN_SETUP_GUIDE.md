# Admin Access Setup Guide for Law Crusade

This guide explains how to set up and manage admin access for your Law Crusade website.

## 🔐 **Default Admin Credentials**

### **Super Admin (Full Access)**
- **Email:** `admin@lawcrusade.com`
- **Password:** `admin123`
- **Access:** Full admin panel + content management

### **Content Editor (Limited Access)**
- **Email:** `editor@lawcrusade.com`
- **Password:** `editor123`
- **Access:** Content management only

## 🚀 **How to Access Admin Areas**

### **For Full Admin Access:**
1. Go to: `your-website.com/admin`
2. Login with admin credentials
3. Access user management, analytics, and all settings

### **For Content Management:**
1. Go to: `your-website.com/content-manager`
2. Login with admin or editor credentials
3. Manage articles, pages, and site content

## 👥 **Handing Over to Someone Else**

### **Option 1: Give Them Editor Access**
1. **Share these credentials:**
   - Email: `editor@lawcrusade.com`
   - Password: `editor123`
   - URL: `your-website.com/content-manager`

2. **They can manage:**
   - ✅ Articles and blog posts
   - ✅ Page content (Home, About, Services)
   - ✅ Site settings (contact info, hours)
   - ✅ Media library
   - ❌ User data and analytics (protected)

### **Option 2: Give Them Full Admin Access**
1. **Share these credentials:**
   - Email: `admin@lawcrusade.com`
   - Password: `admin123`
   - URL: `your-website.com/admin`

2. **They can manage:**
   - ✅ Everything editors can do
   - ✅ User management and consultation requests
   - ✅ Analytics and reports
   - ✅ Advanced settings

## 🔧 **Customizing Admin Credentials**

To change the default credentials, update the file `src/contexts/AuthContext.tsx`:

```typescript
const ADMIN_CREDENTIALS = [
  {
    id: '1',
    email: 'your-custom-admin@email.com',
    password: 'your-secure-password',
    name: 'Your Admin Name',
    role: 'admin'
  },
  {
    id: '2',
    email: 'your-editor@email.com',
    password: 'editor-password',
    name: 'Content Editor Name',
    role: 'editor'
  }
];
```

## 📊 **What Each Role Can Do**

### **Admin Role:**
- View all consultation requests from Google Sheets
- Manage user accounts and permissions
- Access analytics and reports
- Edit all website content
- Change site settings and configuration
- Full access to admin panel

### **Editor Role:**
- Edit articles and blog posts
- Update page content (Home, About, Services, Contact)
- Manage media library
- Update contact information and office hours
- Cannot access user data or analytics

## 🔒 **Security Features**

- **Session-based authentication** - users stay logged in until they logout
- **Role-based access control** - different permissions for admin vs editor
- **Protected routes** - unauthorized users can't access admin areas
- **Secure logout** - clears all session data

## 📱 **Mobile-Friendly Admin**

Both admin panels work perfectly on mobile devices, so your content manager can update the website from anywhere.

## 🎯 **Quick Start for New Admin:**

1. **Give them the credentials** (admin or editor)
2. **Show them the URL** (`/admin` or `/content-manager`)
3. **They login and start managing** content immediately

**Your website now has professional admin access that you can safely hand over to content managers or other team members!** 🚀

## 📞 **Support**

If you need to add more admin users or change permissions, the system is designed to be easily expandable in the `AuthContext.tsx` file.