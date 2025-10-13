# 🤝 Contributing to We Will Shine

Thank you for your interest in contributing to We Will Shine! This project aims to provide free, ethical, and effective student wellbeing support for schools across Indonesia.

## 🌟 How to Contribute

We welcome contributions from everyone! Here are ways you can help:

### **1. Code Contributions** 💻

- Bug fixes
- New features
- Performance improvements
- UI/UX enhancements
- Test coverage

### **2. Documentation** 📚

- Improve existing docs
- Write tutorials
- Translate to Bahasa Indonesia/regional languages
- Create video guides

### **3. Design** 🎨

- UI/UX improvements
- Accessibility enhancements
- Mobile optimization
- Icon/illustration contributions

### **4. Testing** 🧪

- Report bugs
- Test new features
- Write test cases
- Improve test coverage

### **5. Community Support** 💬

- Answer questions in Discussions
- Help other contributors
- Share on social media
- Organize events/workshops

---

## 🚀 Getting Started

### **Prerequisites**

```bash
Node.js >= 20
pnpm >= 8.0
Git
```

### **Setup Development Environment**

1. **Fork the repository**
   - Click "Fork" button on GitHub
   - Clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/we-will-shine.git
   cd we-will-shine
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run development server**

   ```bash
   pnpm run dev
   ```

   Open http://localhost:5173

4. **Run tests**

   ```bash
   pnpm run test        # Unit tests
   pnpm run test:e2e    # E2E tests
   ```

5. **Build for production**
   ```bash
   pnpm run build
   pnpm run preview
   ```

---

## 📝 Development Workflow

### **1. Create a Branch**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions:**

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test improvements
- `chore/` - Maintenance tasks

### **2. Make Your Changes**

**Code Style:**

- Follow existing code patterns
- Use TypeScript for type safety
- Write meaningful variable names
- Add comments for complex logic
- Use Prettier for formatting
- Follow ESLint rules

**Commit Messages:**

```bash
# Format: <type>(<scope>): <subject>

# Examples:
feat(ai): add sentiment analysis to chatbot
fix(dashboard): correct mood trend calculation
docs(readme): update installation instructions
style(ui): improve mobile responsiveness
test(quiz): add personality test coverage
refactor(stores): optimize user progress state
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - UI/UX changes
- `refactor` - Code refactoring
- `test` - Testing
- `chore` - Maintenance

### **3. Test Your Changes**

```bash
# Lint
pnpm run lint

# Type check
pnpm run check

# Run tests
pnpm run test
pnpm run test:e2e

# Build
pnpm run build
```

### **4. Commit and Push**

```bash
git add .
git commit -m "feat(scope): your changes"
git push origin your-branch-name
```

### **5. Create Pull Request**

- Go to your fork on GitHub
- Click "New Pull Request"
- Fill in the PR template
- Link related issues
- Wait for review

---

## 🔍 Pull Request Guidelines

### **Before Submitting:**

- [ ] Code follows project style guide
- [ ] Tests pass locally
- [ ] Documentation updated (if needed)
- [ ] Commits are clear and descriptive
- [ ] No console.log or debugging code
- [ ] Build succeeds without warnings
- [ ] Linter passes without errors

### **PR Description Should Include:**

- What changes were made
- Why the changes are needed
- How to test the changes
- Screenshots (for UI changes)
- Related issues/PRs

### **Example PR:**

```markdown
## Description

Add sentiment analysis to AI chatbot for crisis detection

## Why?

To detect when students are in distress and alert Guru BK

## How to Test

1. Chat with AI using negative words
2. Check if sentiment score is calculated
3. Verify BK alert is triggered for extreme negativity

## Screenshots

[If UI changes]

Fixes #123
```

---

## 🐛 Reporting Bugs

### **Before Reporting:**

1. Check if bug already reported
2. Test on latest version
3. Gather reproduction steps

### **Bug Report Should Include:**

- Clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos
- Environment (OS, browser, version)
- Error messages/logs

**Use our bug report template!**

---

## 💡 Feature Requests

### **Before Requesting:**

1. Check existing feature requests
2. Discuss in Discussions first
3. Consider if it aligns with project goals

### **Feature Request Should Include:**

- Problem you're trying to solve
- Proposed solution
- Alternative solutions considered
- Additional context
- Mockups/examples (if applicable)

**Use our feature request template!**

---

## 🔒 Security Issues

**DO NOT report security vulnerabilities in public issues!**

Instead:

- Email: security@wewillshine.dev
- Include detailed description
- Steps to reproduce
- Impact assessment

See [SECURITY.md](SECURITY.md) for details.

---

## 📋 Code Review Process

### **What Reviewers Look For:**

- Code quality & readability
- Test coverage
- Documentation
- Performance impact
- Security implications
- Accessibility
- Mobile responsiveness

### **Review Timeline:**

- Initial response: Within 48 hours
- Full review: Within 1 week
- Approval & merge: When ready

### **After Review:**

- Address feedback
- Push updates
- Request re-review
- Be patient & respectful

---

## 🎯 Project Structure

```
we-will-shine/
├── src/
│   ├── routes/              # SvelteKit pages
│   │   ├── +page.svelte     # Landing page
│   │   ├── unlock/          # Login
│   │   ├── dashboard/       # Student app
│   │   └── admin/           # Admin panel
│   ├── lib/
│   │   ├── components/      # Reusable components
│   │   ├── stores/          # State management
│   │   ├── data/            # Data files
│   │   └── utils/           # Utilities
│   └── app.css              # Global styles
├── static/                  # Static assets
├── tests/                   # E2E tests
├── docs/                    # Documentation
├── .github/                 # GitHub configs
└── package.json             # Dependencies
```

---

## 🧪 Testing Guidelines

### **Unit Tests (Vitest):**

```typescript
// src/lib/stores/user.test.ts
import { describe, it, expect } from 'vitest';
import { userProgress } from './user';

describe('User Progress Store', () => {
	it('should add points correctly', () => {
		userProgress.addPoints(100);
		// Assertions
	});
});
```

### **E2E Tests (Playwright):**

```typescript
// tests/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('student can login', async ({ page }) => {
	await page.goto('/unlock');
	await page.fill('input', 'INSPIRE2025AS');
	await page.click('button[type="submit"]');
	await expect(page).toHaveURL(/dashboard/);
});
```

### **Coverage Requirements:**

- New features: 80%+ coverage
- Bug fixes: Add regression test
- Critical paths: 100% coverage

---

## 🌍 Internationalization (i18n)

### **Adding Translations:**

```typescript
// src/lib/i18n/id.ts (Bahasa Indonesia)
export default {
	common: {
		welcome: 'Selamat Datang',
		loading: 'Memuat...'
	},
	dashboard: {
		home: 'Beranda',
		careers: 'Karir'
	}
};

// src/lib/i18n/en.ts (English)
export default {
	common: {
		welcome: 'Welcome',
		loading: 'Loading...'
	},
	dashboard: {
		home: 'Home',
		careers: 'Careers'
	}
};
```

---

## 📦 Dependencies

### **Adding New Dependencies:**

**Before adding:**

- Is it really needed?
- Check bundle size impact
- Verify license compatibility (MIT preferred)
- Consider alternatives

**How to add:**

```bash
# Production dependency
pnpm add package-name

# Dev dependency
pnpm add -D package-name
```

**Update documentation:**

- Add to README if user-facing
- Document in relevant guide
- Update type definitions

---

## 🏷️ Issue Labels

We use labels to categorize issues:

**Type:**

- `bug` - Something isn't working
- `feature` - New feature request
- `enhancement` - Improve existing feature
- `documentation` - Docs improvements
- `question` - Questions

**Priority:**

- `priority: critical` - Security, data loss
- `priority: high` - Major bugs, UX issues
- `priority: medium` - Normal features
- `priority: low` - Nice to have

**Status:**

- `status: needs-triage` - Needs review
- `status: in-progress` - Being worked on
- `status: blocked` - Waiting on something
- `status: ready` - Ready to work on

**Area:**

- `area: student-app` - Student features
- `area: admin` - Admin dashboard
- `area: ai` - AI/chatbot
- `area: privacy` - Privacy/security
- `area: mobile` - Mobile experience

**Good First Issue:**

- `good first issue` - For beginners
- `help wanted` - Need extra hands

---

## 💬 Communication Channels

**GitHub Discussions:**

- General questions
- Feature discussions
- Show and tell
- Ideas

**GitHub Issues:**

- Bug reports
- Feature requests
- Task tracking

**Discord (Coming Soon):**

- Real-time chat
- Quick questions
- Community hangout

**Email:**

- General: hello@wewillshine.dev
- Security: security@wewillshine.dev
- Partnership: partnerships@wewillshine.dev

---

## 🎓 Learning Resources

**New to the Stack?**

- [SvelteKit Tutorial](https://learn.svelte.dev/)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Playwright Docs](https://playwright.dev/)

**Project-Specific:**

- [Development Journey](docs/DEVELOPMENT-JOURNEY.md)
- [Architecture Guide](docs/SUPABASE-MIGRATION-GUIDE.md)
- [Testing Guide](docs/TESTING-GUIDE.md)
- [Ethics Framework](docs/ETHICS-FRAMEWORK.md)

---

## 🏆 Recognition

We value all contributions! Contributors will be:

- ✅ Listed in README
- ✅ Added to contributors graph
- ✅ Mentioned in release notes
- ✅ Featured in community highlights
- ✅ Eligible for swag (when available)

**Top contributors may receive:**

- Core team invitation
- Speaking opportunities
- Certificate of contribution
- LinkedIn recommendation

---

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment.

**Our Standards:**

- ✅ Be respectful and inclusive
- ✅ Welcome diverse perspectives
- ✅ Accept constructive criticism
- ✅ Focus on what's best for community
- ✅ Show empathy towards others

**Not Acceptable:**

- ❌ Harassment or discrimination
- ❌ Trolling or insulting comments
- ❌ Personal or political attacks
- ❌ Publishing others' private info
- ❌ Inappropriate sexual content

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for full details.

---

## ❓ FAQ

**Q: I'm new to open source. Where do I start?**
A: Check issues labeled `good first issue`. These are beginner-friendly!

**Q: How long before my PR is reviewed?**
A: We aim to respond within 48 hours, full review within 1 week.

**Q: Can I work on multiple issues?**
A: Yes, but focus on one at a time to avoid conflicts.

**Q: My PR was rejected. What now?**
A: Don't worry! Address feedback and resubmit. We're here to help.

**Q: Can I add myself to contributors list?**
A: No need! We use All Contributors bot to auto-add you.

**Q: How do I become a core contributor?**
A: Consistent quality contributions + active community participation.

---

## 🙏 Thank You!

Every contribution, no matter how small, makes a difference. Together, we're building a platform that will help thousands of students across Indonesia.

**Your code could literally save lives.** 💝

---

## 📞 Need Help?

Stuck? Don't hesitate to ask!

- 💬 GitHub Discussions
- 📧 hello@wewillshine.dev
- 📚 Check our docs
- 👥 Tag @maintainers in issues

**Happy Contributing!** 🚀✨

---

_"Alone we can do so little; together we can do so much." - Helen Keller_

_"Open source is not just code - it's collaboration, community, and collective impact."_
