# HelpChatBox Component

## Overview

Reusable help widget yang muncul di pojok kanan bawah layar dengan style chat box. Compact, non-intrusive, dan dapat digunakan di seluruh aplikasi untuk memberikan contextual help, tips, atau hints kepada user.

## Features

- ✅ **Non-blocking UI** - Tidak menghalangi content utama
- ✅ **Compact design** - 320px width, scrollable content
- ✅ **Smooth animations** - Slide in dari kanan bawah
- ✅ **Responsive** - Full width pada mobile
- ✅ **Color-coded sections** - Visual organization
- ✅ **Reusable** - Dapat dipakai di mana saja
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Future-ready** - Siap untuk AI chat integration

## Usage

### Basic Example

```svelte
<script lang="ts">
  import HelpChatBox from '$lib/components/HelpChatBox.svelte';
  import type { HelpSection } from '$lib/components/HelpChatBox.svelte';

  let showHelp = $state(false);

  const helpSections: HelpSection[] = [
    {
      title: 'Getting Started',
      icon: '🚀',
      color: 'indigo',
      content: 'This is a simple text help section.'
    },
    {
      title: 'Examples',
      icon: '📝',
      color: 'green',
      content: [
        { label: 'Example 1:', value: 'Value 1' },
        { label: 'Example 2:', value: 'Value 2' }
      ]
    }
  ];
</script>

<!-- Trigger button -->
<button onclick={() => showHelp = true}>
  ? Help
</button>

<!-- Help chat box -->
<HelpChatBox
  title="Help Center"
  headerIcon="💡"
  sections={helpSections}
  bind:isOpen={showHelp}
  onClose={() => showHelp = false}
/>
```

### Advanced Example (Sign-in Page)

```svelte
<script lang="ts">
  import HelpChatBox from '$lib/components/HelpChatBox.svelte';
  import type { HelpSection } from '$lib/components/HelpChatBox.svelte';

  let showHelpModal = $state(false);

  const helpSections: HelpSection[] = [
    {
      title: 'Email Belajar.id (Kemendikbud)',
      icon: '📧',
      color: 'indigo',
      content: [
        { label: '🎓 Siswa:', value: 'ahmad@belajar.id' },
        { label: '👨‍🏫 Guru/Staff:', value: 'budi@guru.belajar.id' }
      ]
    },
    {
      title: 'Login Cepat',
      icon: '🚀',
      color: 'green',
      content: 'Gunakan Google Sign-In dengan akun Belajar.id untuk login otomatis tanpa password!'
    },
    {
      title: 'Punya Kode Unlock?',
      icon: '🔑',
      color: 'orange',
      content: 'Siswa dari sekolah partner dapat login langsung dengan kode unlock. Klik tab "Kode" di atas.'
    }
  ];
</script>

<!-- Trigger in form label -->
<label>
  Email
  <button onclick={() => showHelpModal = true}>
    ? Bantuan
  </button>
</label>

<HelpChatBox
  title="Panduan Login"
  headerIcon="💡"
  sections={helpSections}
  bind:isOpen={showHelpModal}
  onClose={() => showHelpModal = false}
/>
```

## Props

### `title` (optional)
- **Type:** `string`
- **Default:** `"Bantuan"`
- **Description:** Title displayed in the chat box header

### `headerIcon` (optional)
- **Type:** `string`
- **Default:** `"💡"`
- **Description:** Emoji icon shown in the header

### `sections` (required)
- **Type:** `HelpSection[]`
- **Description:** Array of help sections to display

### `isOpen` (bindable, required)
- **Type:** `boolean`
- **Description:** Controls visibility of the chat box. Use `bind:isOpen={yourState}`

### `onClose` (required)
- **Type:** `() => void`
- **Description:** Callback function when user closes the chat box

## HelpSection Interface

```typescript
interface HelpSection {
  title: string;    // Section title
  icon: string;     // Emoji icon for the section
  color: 'indigo' | 'purple' | 'green' | 'orange' | 'blue' | 'pink';
  content: string | { label: string; value: string }[];
}
```

### Content Types

**1. Simple Text:**
```typescript
{
  title: 'Tip',
  icon: '💡',
  color: 'green',
  content: 'This is a simple text help message.'
}
```

**2. Key-Value Pairs (e.g., Examples):**
```typescript
{
  title: 'Email Examples',
  icon: '📧',
  color: 'indigo',
  content: [
    { label: '🎓 Student:', value: 'student@school.edu' },
    { label: '👨‍🏫 Teacher:', value: 'teacher@school.edu' }
  ]
}
```

## Color Options

Available colors with semantic meaning:

| Color | Best For | Example Use Case |
|-------|----------|------------------|
| `indigo` | Information | Email patterns, documentation |
| `purple` | Features | Feature highlights, new features |
| `green` | Success/Tips | Quick tips, success messages |
| `orange` | Warnings | Important notes, cautions |
| `blue` | Technical | API docs, technical details |
| `pink` | Special | Special offers, promotions |

## Styling

The component uses:
- **Tailwind CSS v4** with `@reference "tailwindcss"`
- **Fixed positioning** at bottom-right corner
- **Responsive breakpoints** for mobile
- **Smooth animations** with CSS keyframes

## Customization

### Custom Animation Duration

Edit the `slideInRight` animation in the component:

```css
animation: slideInRight 0.5s ease-out; /* Change from 0.3s */
```

### Custom Position

Edit the CSS:

```css
.help-chat-box {
  bottom: 2rem;  /* Change vertical position */
  right: 2rem;   /* Change horizontal position */
  left: auto;    /* Or position on left side */
}
```

### Custom Width

```css
.help-chat-box {
  width: 400px;  /* Change from 320px */
}
```

## Future Enhancements

### AI Chat Integration

```svelte
<script lang="ts">
  let aiMode = $state(false);
  let chatMessages = $state([]);

  function toggleAIMode() {
    aiMode = !aiMode;
    // Initialize AI chat session
  }
</script>

<HelpChatBox ...>
  {#if aiMode}
    <!-- Show AI chat interface -->
    <ChatInterface messages={chatMessages} />
  {:else}
    <!-- Show static help sections -->
    <HelpSections sections={helpSections} />
  {/if}
</HelpChatBox>
```

### Live Support

```svelte
<HelpChatBox ...>
  <div slot="footer">
    <button onclick={connectToSupport}>
      💬 Chat dengan Support
    </button>
  </div>
</HelpChatBox>
```

### Search Functionality

```svelte
<HelpChatBox ...>
  <input 
    type="search" 
    placeholder="Cari bantuan..." 
    oninput={filterSections}
  />
</HelpChatBox>
```

## Best Practices

1. **Keep sections concise** - Max 3-4 sentences per section
2. **Use emojis** - Visual cues improve scannability
3. **Color code meaningfully** - Match color to content type
4. **Provide examples** - Concrete examples > abstract descriptions
5. **Mobile-first** - Test on small screens
6. **Limit sections** - 3-5 sections optimal, use scrolling if more

## Examples in Production

### Sign-in Page
- Email format examples
- Google Sign-In tip
- Code unlock info

### Student Dashboard
- Quick start guide
- Feature highlights
- Keyboard shortcuts

### Admin Dashboard
- Common tasks
- Bulk action tips
- Report generation guide

### Analytics Page
- Chart interpretation
- Date range selection
- Export options

## Accessibility

- ARIA labels for close button
- Keyboard navigation support (future)
- Screen reader friendly
- High contrast text
- Touch-friendly tap targets (48px minimum)

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## License

MIT License - Free to use and modify

