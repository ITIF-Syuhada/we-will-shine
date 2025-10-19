# Header Component Documentation

## Overview
Komponen `Header.svelte` adalah floating navigation header yang clean, minimalistic, dan interaktif untuk aplikasi We Will Shine.

## Features

### 🎯 **Core Features:**
1. **Conditional Rendering** - Tidak muncul di landing page (`/`) dan sign-in page (`/signin`)
2. **Interactive Logo** - Logo bintang dengan pulse animation dan spin on hover
3. **Brand Title** - Gradient text "We Will Shine" dengan glow effect
4. **Dynamic Shortcuts Menu** - Menu navigasi yang muncul/hilang dengan toggle button
5. **Smart CTA Button** - Dynamic call-to-action yang berubah berdasarkan authentication status
6. **Staggered Animation** - Menu shortcuts muncul satu per satu dengan delay 80ms
7. **Sticky & Transforming** - Full-width glassmorphism saat di top, rounded floating saat scroll
8. **Responsive Design** - Optimized untuk desktop, mobile, dan very small screens
9. **Dark Mode Support** - Automatic dark mode adaptation
10. **Accessibility** - ARIA labels dan semantic HTML

---

## Component Structure

### **Script Section:**
```svelte
<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/stores';

  // Hide header on landing and signin pages
  const hideHeader = $derived($page.url.pathname === '/' || $page.url.pathname === '/signin/');

  // Shortcut buttons configuration
  const shortcutButtons = [
    { href, icon, title, label }
  ];

  // Toggle state
  let showShortcuts = $state(false);
</script>
```

### **Template Structure:**
```
Floating Header Container (justify-between)
├── Left Section (grouped navigation)
│   ├── Main Header Button
│   │   ├── Back Arrow Icon (←)
│   │   ├── Logo Star (🌟)
│   │   └── Brand Title ("We Will Shine")
│   ├── Shortcuts Container (conditional)
│   │   ├── Features Button (⚡)
│   │   ├── Pricing Button (💰)
│   │   ├── About Button (ℹ️)
│   │   ├── Roadmap Button (🗺️)
│   │   ├── For Schools Button (🏫)
│   │   └── Partnership Button (🤝)
│   └── Toggle Button (☰/✕)
└── Right Section (CTA)
    └── Smart CTA Button (dynamic based on auth)
        ├── Guest: "🚀 Mulai Gratis"
        ├── Admin: "🏢 Dashboard"
        └── Student: "📚 Aplikasi"
```

---

## Design Specifications

### **Visual Design:**
- **Position**: Fixed, top-left corner (16px from top/left)
- **Background**: White with 90% opacity + blur(10px) glassmorphism
- **Border**: 1px solid rgba(0, 0, 0, 0.1)
- **Shadow**: 0 4px 12px rgba(0, 0, 0, 0.15)
- **Border Radius**: 16px (rounded-2xl) for main button, 12px for shortcuts

### **Interactive States:**
- **Hover**: Brighter background, larger shadow, scale(1.05)
- **Active**: Scale(0.95)
- **Menu Open**: Toggle button slides right dynamically

### **Animations:**
1. **fadeInSlideDown** - Header appears from top (0.3s)
2. **logoPulse** - Logo pulses continuously (2s infinite)
3. **logoSpin** - Logo spins 360° on hover (0.5s)
4. **slideInFromLeft** - Shortcuts slide in staggered (0.4s each)

---

## Staggered Animation System

### **How It Works:**
```svelte
{#if showShortcuts}
  {#each shortcutButtons as button, index}
    <a style="animation-delay: {index * 80}ms;">
  {/each}
{/if}
```

### **Animation Flow:**
1. User clicks toggle button
2. Icon changes: ☰ → ✕
3. Shortcuts appear with delay:
   - Features: 0ms
   - Pricing: 80ms
   - About: 160ms
   - Roadmap: 240ms
4. Toggle button slides right to final position

### **Positioning Logic:**
- **Desktop**: `translateX(298px)` - 4 buttons × 70px + 3 gaps × 6px
- **Mobile**: `translateX(238px)` - 4 buttons × 55px + gaps
- **Small**: `translateX(146px)` - 4 buttons × 32px + gaps (icon only)

---

## Responsive Behavior

### **Desktop (> 640px):**
- Full-sized buttons with text labels
- Logo: 18px
- Brand title: 14px
- Shortcut buttons: 2.5rem × 2rem padding

### **Mobile (≤ 640px):**
- Smaller buttons and text
- Logo: 14px
- Brand title: 12px
- Toggle: 6×6 (24px)

### **Very Small (≤ 480px):**
- Text labels hidden (icon-only)
- Compact button sizes
- Reduced toggle travel distance

---

## Accessibility

### **ARIA Labels:**
- Main button: `"Kembali ke halaman utama We Will Shine"`
- Toggle button: `"Buka menu navigasi"` / `"Tutup menu navigasi"`
- Each shortcut: Custom label per button

### **Keyboard Navigation:**
- All buttons are keyboard accessible
- Focus states visible
- Semantic HTML (`<a>`, `<button>`)

### **Screen Readers:**
- Descriptive titles for all interactive elements
- SVG icons have proper stroke attributes

---

## Dark Mode Support

Automatically adapts to user's system preference:
```css
@media (prefers-color-scheme: dark) {
  background: rgba(17, 24, 39, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
  text-color: gray-300;
  hover:bg-gray-800;
}
```

---

## Bug Fixes & Refactoring (Latest Update)

### **Bugs Fixed:**
1. ✅ **Double Animation Definition** - Removed conflicting keyframes
2. ✅ **Double Transition** - Consolidated `.toggle-icon` transitions
3. ✅ **Conflicting Animations** - Simplified to single animation system
4. ✅ **Always Visible Shortcuts** - Fixed with `{#if showShortcuts}` conditional
5. ✅ **Inconsistent Timing** - Unified to inline `animation-delay` only
6. ✅ **CSS Utility Class Error** - Removed `@apply cubic-bezier(...)`

### **Code Simplifications:**
1. **Removed**: Duplicate `.toggle-icon` definitions
2. **Removed**: `nth-child` animation delays
3. **Removed**: `.animate-in` class (replaced with conditional rendering)
4. **Removed**: Container animations (only buttons animate now)
5. **Simplified**: Single animation keyframe per type
6. **Improved**: Cleaner CSS structure with better organization

### **Performance Improvements:**
- Conditional rendering reduces DOM nodes when menu closed
- Single animation system reduces CSS complexity
- Removed redundant transitions

---

## Usage Example

```svelte
<!-- In +layout.svelte -->
<script>
  import Header from '$lib/components/Header.svelte';
  let { children } = $props();
</script>

<div class="app">
  <Header />
  {@render children()}
</div>
```

The header will automatically hide on `/` and `/signin/` routes.

---

## Customization

### **Add New Shortcut Button:**
```typescript
const shortcutButtons = [
  // ... existing buttons
  {
    href: `${base}/new-page`,
    icon: '🚀',
    title: 'New Page',
    label: 'Navigate to new page'
  }
];
```

### **Adjust Animation Timing:**
```svelte
<!-- Change delay multiplier (default: 80ms) -->
style="animation-delay: {index * 100}ms;"
```

### **Modify Toggle Position:**
```css
/* Adjust based on new button count/sizes */
.toggle-shortcuts.menu-open {
  transform: translateX(XXXpx); /* Calculate accordingly */
}
```

---

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ Backdrop-filter requires modern browsers

---

## Technical Notes

### **Svelte 5 Runes:**
- `$derived` for reactive hide logic
- `$state` for toggle state

### **CSS Features:**
- Tailwind CSS v4 with `@reference`
- PostCSS processing
- Glassmorphism effects
- Cubic-bezier easing

### **Performance:**
- GPU-accelerated animations (transform, opacity)
- Conditional rendering for better performance
- Optimized transitions

---

## Maintenance

### **When Adding Routes:**
Update `hideHeader` logic:
```typescript
const hideHeader = $derived(
  $page.url.pathname === '/' || 
  $page.url.pathname === '/signin/' ||
  $page.url.pathname === '/new-route/' // Add here
);
```

### **When Changing Button Sizes:**
Update toggle position calculations for all breakpoints:
- Desktop: `.toggle-shortcuts.menu-open`
- Mobile: `@media (max-width: 640px)`
- Small: `@media (max-width: 480px)`

---

## Future Enhancements

### **Potential Additions:**
- [ ] Keyboard shortcuts (e.g., Cmd+K for menu)
- [ ] Search integration
- [ ] User profile dropdown
- [ ] Notification badge
- [ ] Theme toggle button
- [ ] Breadcrumb navigation
- [ ] Active route highlighting

---

## Smart CTA Button

### **🎯 Authentication-Based Dynamic Button:**

Header sekarang memiliki **Smart CTA Button** di pojok kanan yang secara otomatis berubah berdasarkan status authentication user:

#### **States:**

1. **Guest (Not Logged In):**
   - **Button:** `🚀 Mulai Gratis`
   - **Link:** `/signin`
   - **Style:** Gradient purple dengan glow effect
   - **Purpose:** Conversion-focused CTA untuk mendorong signup

2. **Admin (Logged In):**
   - **Button:** `🏢 Dashboard`
   - **Link:** `/dashboard`
   - **Style:** White background dengan subtle shadow
   - **Purpose:** Quick access ke admin dashboard

3. **Student (Logged In):**
   - **Button:** `📚 Aplikasi`
   - **Link:** `/app`
   - **Style:** White background dengan subtle shadow
   - **Purpose:** Quick access ke student application

#### **Implementation:**

```svelte
// Authentication detection
import { adminStore } from '$lib/stores/admin';
import { studentCode } from '$lib/stores/session';

// Reactive auto-update
$effect(() => {
  checkAuthStatus();
});

// Smart rendering
{#if isLoggedIn}
  <!-- Dashboard/App button -->
{:else}
  <!-- Mulai Gratis button -->
{/if}
```

#### **Features:**
- ✅ Real-time reactive updates (no refresh needed)
- ✅ Smooth animations & hover effects
- ✅ Responsive sizing for all screen sizes
- ✅ Eye-catching for conversion (guest state)
- ✅ Intuitive quick access (logged in state)

---

## Version History

### **v3.0 - Smart CTA (Current)**
- Added Smart CTA Button with authentication detection
- Implemented `justify-between` layout
- Added left/right section grouping
- Real-time reactive authentication status
- Improved conversion-focused design

### **v2.0 - Refactored**
- Fixed multiple animation bugs
- Simplified code structure
- Improved performance
- Better conditional rendering
- Cleaner CSS organization

### **v1.0 - Initial**
- Basic floating header
- Static navigation
- Simple back button

---

**Last Updated**: October 2025  
**Component Path**: `/src/lib/components/Header.svelte`  
**Documentation**: `/docs/COMPONENTS-HEADER.md`
