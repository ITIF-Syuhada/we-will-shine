# Security Policy

## 🔒 Reporting Security Vulnerabilities

We take the security of We Will Shine seriously, especially given that we handle sensitive student data and mental health information.

### **DO NOT** report security vulnerabilities through public GitHub issues.

Instead, please report them responsibly by emailing:

📧 **security@wewillshine.dev**

### What to Include

Please include the following in your report:

- Type of vulnerability (e.g., SQL injection, XSS, authentication bypass)
- Full paths of affected files
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability
- Suggested mitigation (if any)

### What to Expect

1. **Acknowledgment**: We will acknowledge receipt within **24 hours**
2. **Initial Assessment**: We will provide initial assessment within **48 hours**
3. **Regular Updates**: You will receive updates every **3-5 days** on our progress
4. **Resolution**: We aim to resolve critical issues within **7 days**
5. **Disclosure**: We will coordinate public disclosure with you

## 🏆 Security Rewards

While we don't have a formal bug bounty program yet, we will:

- Publicly acknowledge your contribution (with your permission)
- Add you to our Security Hall of Fame
- Provide a detailed reference/recommendation
- Consider swag/rewards for critical findings (when available)

## 🛡️ Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🔐 Security Best Practices

### For Contributors:

- Never commit secrets, API keys, or passwords
- Use environment variables for sensitive data
- Run `pnpm run lint` before committing
- Keep dependencies updated
- Review third-party packages before adding

### For Deployers:

- Always use HTTPS in production
- Keep server software updated
- Use strong, unique passwords
- Enable two-factor authentication
- Regularly backup data
- Monitor access logs
- Implement rate limiting
- Use Web Application Firewall (WAF)

## 🚨 Known Security Considerations

### Student Data Protection

- All student data encrypted at rest
- End-to-end encryption for sensitive messages
- Row-level security (RLS) in database
- Audit logs for all data access
- Auto-deletion after retention period

### AI Safety

- No medical diagnosis capability
- Crisis detection with human oversight
- Transparent AI limitations
- No training on student data
- Content filtering enabled

### Authentication

- Code-based login (no passwords stored for students)
- Admin login with hashed passwords (bcrypt)
- Session management
- Rate limiting on login attempts

## 📋 Incident Response

In case of a security incident:

1. **Immediate**: Contain and isolate affected systems
2. **24 Hours**: Notify affected users and authorities (if required by law)
3. **72 Hours**: Full incident report and remediation plan
4. **1 Week**: Implement fixes and enhanced monitoring
5. **Public Disclosure**: Transparent post-mortem (after fix deployed)

## 🔍 Security Audit History

| Date | Type           | Findings | Status  |
| ---- | -------------- | -------- | ------- |
| TBD  | External Audit | -        | Planned |

## 📞 Contact

- Security Team: security@wewillshine.dev
- General: hello@wewillshine.dev
- Emergency: [To be set up]

## 📜 Compliance

We comply with:

- UU PDP (Indonesia Data Protection)
- GDPR (when applicable)
- ISO 27001 guidelines
- OWASP Top 10

---

**Thank you for helping keep We Will Shine and its users safe!** 🙏
