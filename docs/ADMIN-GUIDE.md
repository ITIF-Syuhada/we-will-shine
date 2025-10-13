# Admin Dashboard Guide

## 🔐 Akses Admin Panel

**URL Admin:**

```
https://itif-syuhada.github.io/we-will-shine/admin
```

**Password Default:**

```
WeWillShine2025!
```

⚠️ **Penting**: Ganti password di production dengan update variable `ADMIN_PASSWORD` di `/src/routes/admin/+page.svelte`

---

## 🎯 Fitur Admin Dashboard

### 1. **Dashboard Overview** (`/admin/dashboard`)

**Quick Stats:**

- 👥 Siswa yang sudah login
- ⭐ Total points terkumpul
- 🎯 Total karir yang di-explore
- 🧠 Quiz yang sudah diselesaikan

**Navigation:**

- Manage Students
- Analytics
- QR Generator

---

### 2. **Manage Students** (`/admin/students`)

**Fitur:**

- ✅ Daftar semua siswa (22 siswa)
- ✅ Search/filter siswa
- ✅ Lihat status: Active / Never logged in
- ✅ Track individual progress:
  - Points
  - Level
  - Karir explored (x/8)
  - Quiz completed (✓/-)
  - Dreams count

**Stats:**

- Siswa aktif vs total
- Total points
- Average points per siswa

---

### 3. **Analytics & Reports** (`/admin/analytics`)

**Metrics:**

- 📊 Engagement rate (% siswa yang login)
- ⭐ Total & average points
- 🧠 Quiz completion rate
- 🏆 Total achievements unlocked

**Career Popularity:**

- Top 5 karir yang paling banyak di-explore
- Visualization dengan progress bar
- View count per karir

**Leaderboard:**

- Top 10 students berdasarkan points
- Ranking dengan medal icons (🥇🥈🥉)
- Points, level, dan careers explored

**Export Data:**

- 📥 Export ke CSV
- Includes: Nama, Kode, Points, Level, Karir, Quiz status
- Filename: `students-data-YYYY-MM-DD.csv`

---

### 4. **QR Code Generator** (`/admin/qr-generator`)

**Fitur Generate QR:**

- ✅ Select individual siswa atau semua
- ✅ Generate QR codes untuk sticker coklat
- ✅ Preview semua QR codes
- ✅ Download individual QR (PNG format)
- ✅ Print all stickers (print-optimized layout)

**Sticker Design Include:**

- 🌟 App logo & name
- QR Code (purple colored)
- Nama siswa
- Kode unik (highlighted)
- URL aplikasi
- Instructions

**QR Code Format:**

```
https://itif-syuhada.github.io/we-will-shine/unlock?code=INSPIRE2025XXX
```

**Print Layout:**

- 2 columns untuk efficiency
- Page-break optimized
- Ready untuk A4 paper

---

## 📊 Data Architecture

### Current (LocalStorage):

- **Pros**: Simple, no backend needed, works di GitHub Pages
- **Cons**: Data di client-side, tidak real-time sync

### Cara Kerja:

1. Setiap siswa login → data tersimpan di localStorage mereka
2. Admin dashboard → aggregate data dari localStorage admin device
3. ⚠️ **Limitation**: Admin hanya bisa lihat data jika siswa login di device yang sama

### Recommended Upgrade (Supabase):

**Why Supabase?**

- ✅ Real-time database
- ✅ User authentication
- ✅ API endpoints
- ✅ Free tier generous
- ✅ Easy integration

**Migration Path:**

```typescript
// 1. Setup Supabase
// 2. Create tables: users, progress, analytics
// 3. Update stores to sync dengan Supabase
// 4. Real-time admin dashboard
```

**Tables Schema:**

```sql
-- users table
id, student_code, student_name, created_at

-- progress table
id, student_code, points, level, explored_careers,
quiz_completed, quiz_answers, personal_motivation,
achievements, dreams, last_active

-- analytics table
date, total_logins, total_points, popular_careers
```

---

## 🛠️ Admin Workflow

### Setup Awal:

**1. Generate QR Codes:**

```
Admin → QR Generator → Pilih Semua → Generate
→ Download semua → Print
```

**2. Siapkan Coklat:**

- Print stickers (2 per page)
- Cut & attach ke coklat
- Distribute ke siswa

**3. Monitor Usage:**

```
Admin → Analytics → Lihat stats real-time
→ Track engagement & popular careers
```

---

## 📱 QR Code Usage Flow

**Student Experience:**

```
1. Terima coklat dengan sticker QR
2. Scan QR dengan smartphone
   → Auto open: .../unlock?code=INSPIRE2025XXX
3. Kode pre-filled (optional)
4. Login → Start exploring!
```

---

## 📥 Export Data

### CSV Export

**Columns:**

- Nama
- Kode
- Points
- Level
- Karir Explored
- Quiz Status
- Active Status

**Use Cases:**

- 📊 Import ke Excel untuk analysis
- 📈 Create charts & graphs
- 📝 Generate reports
- 🎯 Identify engagement patterns

---

## 🔒 Security Notes

### Current Setup:

- Simple password authentication
- Stored di localStorage
- No encryption

### Recommendations:

1. **Change default password** di production
2. **Use Supabase Auth** untuk proper authentication
3. **Enable Row Level Security** di Supabase
4. **Use environment variables** untuk secrets

---

## 🚀 Future Enhancements

### Phase 1 (Current): ✅

- ✅ Admin login
- ✅ Students management
- ✅ Analytics dashboard
- ✅ QR generator
- ✅ CSV export

### Phase 2 (Optional):

- [ ] Supabase integration untuk real-time data
- [ ] Class management (multiple classes)
- [ ] Bulk import students (CSV)
- [ ] Email notifications
- [ ] Custom QR design templates
- [ ] PDF export dengan charts
- [ ] Real-time dashboard updates
- [ ] Student messaging system

---

## 💡 Tips untuk Ustadz/Ustadzah

**Monitoring Engagement:**

1. Check analytics weekly
2. Identify siswa yang belum login
3. Encourage inactive students
4. Celebrate top performers

**Using Data:**

1. Track which careers most popular
2. Adjust content based on feedback
3. Share success stories
4. Plan follow-up activities

**QR Codes:**

1. Test scan before printing
2. Ensure good print quality
3. Laminate for durability
4. Keep backup digital copies

---

## 📞 Support

**Issues?**

- Check browser console untuk errors
- Verify login di correct URL
- Clear cache if needed
- Contact tech support

---

**Created with ❤️ for Ustadz & Ustadzah**
**October 2025**
