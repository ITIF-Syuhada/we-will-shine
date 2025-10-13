# 🔒 Ethics & Privacy Framework - We Will Shine

## 🎯 Core Ethical Principles

### **1. Student Wellbeing First**

> Every decision must prioritize the mental health, safety, and dignity of students above all else.

### **2. Privacy as a Human Right**

> Privacy is not a feature or option - it is a fundamental right that we protect rigorously.

### **3. Transparency & Accountability**

> We are transparent about what we do with data and accountable for how we use AI.

### **4. No Harm**

> We commit to "do no harm" - our platform will never be used for surveillance, punishment, or discrimination.

### **5. Professional Collaboration**

> AI is a tool to support professionals, never a replacement for human judgment and care.

---

## 🔐 Privacy Framework

### **Data Minimization**

**We only collect what's necessary:**

```typescript
// What we DON'T collect:
❌ Full name (we use student codes)
❌ Home address
❌ ID card numbers
❌ Phone numbers (unless for crisis)
❌ Parents' financial data
❌ Academic grades (unless shared)
❌ Biometric data
❌ Location tracking
❌ Device fingerprints
❌ Browser history
❌ Social media data

// What we DO collect (with consent):
✅ Student code (anonymized)
✅ Chat messages (encrypted)
✅ Mood scores (for trends)
✅ Personality quiz results
✅ Career interests
✅ Anonymous feedback
```

### **Consent Management**

**Three-Tier Consent Model:**

**Tier 1: Anonymous Mode (Default)**

```
✅ No identification required
✅ Data aggregated only
✅ Chat history not saved
✅ Guru BK sees statistics only
✅ Perfect for sensitive topics

Use case:
Student wants to talk about serious issues
without anyone knowing it's them
```

**Tier 2: Semi-Anonymous Mode**

```
✅ Student identified by code only
✅ Mood trends tracked
✅ Personality insights saved
✅ Guru BK sees patterns, not chats
✅ Balanced privacy & support

Use case:
Student wants personalized guidance
while maintaining privacy
```

**Tier 3: Full Support Mode**

```
✅ Full chat history accessible to BK
✅ Requires parent consent (under 18)
✅ For students requesting help
✅ Can be revoked anytime
✅ Maximum support, minimum privacy

Use case:
Student actively seeks counseling
and wants BK to have full context
```

**Consent Expiry:**

```
📅 Annual renewal required
⏰ Reminder 30 days before expiry
🔄 Easy to change levels anytime
🗑️ Right to delete all data
📋 Parents notified of changes
```

---

## 🤖 Ethical AI Framework

### **AI Limitations & Disclaimers**

**What AI CAN Do:**

```
✅ Listen empathetically
✅ Provide general advice
✅ Suggest coping strategies
✅ Offer Islamic perspective
✅ Detect crisis keywords
✅ Recommend professional help
✅ Track emotional patterns
```

**What AI CANNOT Do:**

```
❌ Diagnose mental illness
❌ Prescribe medication
❌ Replace professional counseling
❌ Make clinical judgments
❌ Guarantee outcomes
❌ Handle all crises alone
```

**Mandatory Disclaimers:**

```svelte
<div class="ai-disclaimer">
	<h3>⚠️ Important: AI Limitations</h3>
	<p>AI Mentor adalah teman curhat yang peduli, BUKAN pengganti psikolog atau dokter.</p>
	<p>
		Jika kamu merasa: - Sangat tertekan - Ingin menyakiti diri sendiri - Mengalami krisis serius
		Segera hubungi: 📞 Guru BK: [contact] 📞 Hotline 119 (Sejiwa) 📞 KPAI: 1500-454
	</p>
</div>
```

### **Crisis Detection Protocol**

**Tier 1: Keywords Detection**

```typescript
const CRISIS_KEYWORDS = {
	high: [
		'bunuh diri',
		'suicide',
		'mau mati',
		'tidak berguna',
		'hopeless',
		'putus asa',
		'menyerah',
		'give up',
		'ending it all'
	],
	medium: ['tertekan', 'depressed', 'cemas berlebihan', 'menyakiti diri', 'self harm', 'cutting'],
	context: ['bullying', 'diintimidasi', 'dipukul', 'abuse', 'kekerasan', 'pelecehan']
};

function detectCrisis(message: string): CrisisLevel {
	// Check for high-risk keywords
	if (containsAny(message, CRISIS_KEYWORDS.high)) {
		return 'CRITICAL'; // Immediate alert
	}

	// Check for medium-risk
	if (containsAny(message, CRISIS_KEYWORDS.medium)) {
		return 'HIGH'; // Alert within 1 hour
	}

	// Check for concerning context
	if (containsAny(message, CRISIS_KEYWORDS.context)) {
		return 'MEDIUM'; // Flag for review
	}

	return 'LOW'; // Normal monitoring
}
```

**Tier 2: Sentiment Analysis**

```typescript
async function analyzeSentiment(message: string) {
	const sentiment = await AI.getSentiment(message);

	if (sentiment < -0.8) {
		// Very negative sentiment
		return {
			level: 'HIGH',
			action: 'alert_bk',
			message: 'Extreme negative emotion detected'
		};
	}

	if (sentiment < -0.5) {
		// Moderately negative
		return {
			level: 'MEDIUM',
			action: 'monitor',
			message: 'Concerning emotional state'
		};
	}

	return { level: 'LOW', action: 'normal' };
}
```

**Tier 3: Pattern Recognition**

```typescript
function detectPatterns(studentCode: string) {
	const recentMessages = getLast7Days(studentCode);

	// Sudden mood drop
	if (avgMood(recentMessages) < 4 && previousAvg > 7) {
		alert({
			type: 'MOOD_DROP',
			severity: 'HIGH',
			message: 'Sudden significant mood decrease'
		});
	}

	// Increasing negativity
	if (trendIsNegative(recentMessages)) {
		alert({
			type: 'NEGATIVE_TREND',
			severity: 'MEDIUM',
			message: 'Worsening emotional state over time'
		});
	}
}
```

### **AI Response Guidelines**

**DO's:**

```typescript
const AI_GUIDELINES = {
	empathy: ['Saya paham perasaanmu...', 'Terima kasih sudah berbagi...', 'Kamu tidak sendirian...'],

	validation: [
		'Perasaanmu itu valid',
		'Wajar kok merasa seperti itu',
		'Banyak orang mengalami hal serupa'
	],

	islamic_wisdom: [
		'Dalam Islam, kita diajarkan bahwa...',
		'Prophet Muhammad SAW mengatakan...',
		'Allah SWT selalu bersama yang sabar...'
	],

	action_oriented: ['Coba...', 'Mungkin kamu bisa...', 'Langkah kecil yang bisa diambil adalah...']
};
```

**DON'Ts:**

```typescript
const FORBIDDEN_RESPONSES = [
  ❌ "Kamu pasti sakit jiwa"  // No diagnosis
  ❌ "Ini cuma pikiran kamu aja"  // No dismissal
  ❌ "Ya sudah terima aja"  // No toxic positivity
  ❌ "Orang lain lebih susah"  // No comparison
  ❌ "Jangan lebay"  // No minimizing
  ❌ "Minum obat ini..."  // No medical advice
];
```

---

## 👨‍⚕️ Professional Safeguards

### **Guru BK Access Controls**

**Role-Based Permissions:**

```typescript
type BKRole = 'viewer' | 'counselor' | 'coordinator' | 'admin';

const PERMISSIONS = {
	viewer: {
		canSeeStats: true,
		canSeeChats: false,
		canContact: false,
		canExport: false
	},

	counselor: {
		canSeeStats: true,
		canSeeChats: true, // Only with consent
		canContact: true,
		canExport: true,
		canFlag: true
	},

	coordinator: {
		canSeeStats: true,
		canSeeChats: true,
		canContact: true,
		canExport: true,
		canFlag: true,
		canAssignCases: true
	},

	admin: {
		// Full access + audit logs
		// Requires additional verification
	}
};
```

**Audit Trail:**

```typescript
interface AuditLog {
	timestamp: Date;
	user: string;
	role: BKRole;
	action: 'view' | 'export' | 'contact' | 'flag';
	studentCode: string;
	justification: string; // Required for sensitive actions
	ipAddress: string;
}

// Every BK action is logged
// Logs are immutable & reviewable
// Suspicious activity triggers alert
```

### **Mandatory Training**

**Before BK Access:**

```
✅ Ethics training (2 hours)
✅ Privacy certification
✅ Crisis intervention protocol
✅ AI limitations workshop
✅ Case study review
✅ Signed ethics agreement
```

**Ongoing Requirements:**

```
✅ Quarterly refresher training
✅ Annual ethics recertification
✅ Peer review sessions
✅ Supervision from senior psychologist
✅ Participation in case conferences
```

---

## 📊 Data Governance

### **Data Retention Policy**

**Student Chat Data:**

```
📅 Default: 6 months auto-delete
🔒 Encrypted at rest
🗑️ Student can delete anytime
📋 Parent can request deletion
⚖️ Legal hold exceptions only
```

**Aggregated Analytics:**

```
📅 Retained: 2 years
🔒 Anonymized & aggregated
📊 Used for: School insights only
🗑️ Purged after 2 years
```

**Crisis Alerts:**

```
📅 Retained: 1 year (for follow-up)
🔒 Highest security level
👁️ Accessible only to assigned BK
🗑️ Deleted after case closure
```

### **Data Export & Portability**

**Student Rights:**

```typescript
// Students can request:
✅ View all their data
✅ Export as JSON/PDF
✅ Delete specific entries
✅ Delete everything
✅ Transfer to another school

// Response time: Within 7 days
// Format: Human-readable + machine-readable
```

**School Rights:**

```typescript
// Schools can:
✅ Export anonymized aggregate data
✅ Migrate to different platform
✅ Keep data on-premise
❌ Cannot sell student data
❌ Cannot share without consent
```

---

## 🌍 Legal Compliance

### **Indonesia (UU PDP - Perlindungan Data Pribadi)**

**Requirements:**

```
✅ Explicit consent for data collection
✅ Clear purpose limitation
✅ Data minimization
✅ Storage limitation
✅ Security measures
✅ Accountability
✅ Data subject rights
✅ Cross-border transfer restrictions
```

**Our Implementation:**

```
✅ Consent forms in Bahasa Indonesia
✅ Purpose clearly stated
✅ Minimal data collection
✅ 6-month retention
✅ Encryption + access controls
✅ DPO appointed
✅ Student/parent rights portal
✅ Data stored in Indonesia (if required)
```

### **International (GDPR - for future expansion)**

**Key Principles:**

```
✅ Lawfulness, fairness, transparency
✅ Purpose limitation
✅ Data minimization
✅ Accuracy
✅ Storage limitation
✅ Integrity & confidentiality
✅ Accountability
```

**GDPR-Ready Features:**

```
✅ Right to access
✅ Right to rectification
✅ Right to erasure ('right to be forgotten')
✅ Right to restrict processing
✅ Right to data portability
✅ Right to object
✅ Rights related to automated decision making
```

---

## 🚨 Incident Response

### **Data Breach Protocol**

**Immediate Actions (Within 1 Hour):**

```
1. Isolate affected systems
2. Assess breach scope
3. Notify security team
4. Begin forensic analysis
5. Document everything
```

**Short-term (Within 24 Hours):**

```
1. Notify affected schools/users
2. Provide remediation steps
3. Offer credit monitoring (if applicable)
4. Update security measures
5. Report to authorities (UU PDP requires 72hrs)
```

**Long-term (Within 1 Week):**

```
1. Complete investigation report
2. Implement permanent fixes
3. Third-party security audit
4. Update incident response plan
5. Transparency report to community
```

### **Crisis Escalation**

**Level 1: AI Detection**

```
→ Keywords detected
→ Auto-log to BK dashboard
→ Suggested actions displayed
```

**Level 2: BK Review**

```
→ BK assesses severity
→ Contacts student (if consent)
→ Schedules intervention
```

**Level 3: Immediate Action**

```
→ Critical risk identified
→ Parents notified immediately
→ School counselor engaged
→ Emergency services (if needed)
→ Follow-up within 24 hours
```

---

## 🎓 Ethics Committee

### **Composition:**

```
👨‍🏫 Educators (3): Guru BK, teachers, principals
🧠 Mental Health (2): Licensed psychologists
🔒 Privacy (1): Legal expert in data protection
💻 Tech (2): Senior developers, security experts
🎓 Students (2): Student representatives
👪 Parents (1): PTA representative
📚 Academic (1): University researcher
```

### **Responsibilities:**

**Monthly:**

- Review AI responses for bias
- Audit privacy practices
- Assess new feature requests
- Handle ethics complaints

**Quarterly:**

- Comprehensive platform audit
- Policy updates
- Training curriculum review
- Community feedback session

**Annually:**

- Full ethics assessment
- Third-party audit
- Impact study
- Public transparency report

---

## 📋 Ethical Checklist (for New Features)

Before implementing any new feature, we ask:

**Privacy:**

- [ ] Does it collect minimal necessary data?
- [ ] Is consent explicit and informed?
- [ ] Can users opt-out easily?
- [ ] Is data encrypted?
- [ ] Is there an auto-delete mechanism?

**Safety:**

- [ ] Can it be misused?
- [ ] Does it protect vulnerable users?
- [ ] Is there human oversight?
- [ ] Are crisis protocols in place?
- [ ] Is it age-appropriate?

**Fairness:**

- [ ] Is it accessible to all?
- [ ] Does it avoid discrimination?
- [ ] Is it culturally sensitive?
- [ ] Does it respect diversity?
- [ ] Is it available in local language?

**Transparency:**

- [ ] Is functionality clearly explained?
- [ ] Are limitations disclosed?
- [ ] Is the algorithm explainable?
- [ ] Can users understand their data?
- [ ] Is there a feedback mechanism?

**Accountability:**

- [ ] Who is responsible if something goes wrong?
- [ ] Is there a remediation process?
- [ ] Are there audit trails?
- [ ] Can decisions be appealed?
- [ ] Is there continuous monitoring?

---

## 🤝 Commitments to Stakeholders

### **To Students:**

"We promise to:

- ✅ Respect your privacy absolutely
- ✅ Never judge or punish you for what you share
- ✅ Provide a truly safe space
- ✅ Use AI to support, not surveil
- ✅ Give you control over your data
- ✅ Listen to your feedback
- ✅ Protect you from harm"

### **To Parents:**

"We promise to:

- ✅ Keep your child's data secure
- ✅ Seek consent for sensitive features
- ✅ Alert you in crisis situations
- ✅ Be transparent about our practices
- ✅ Never sell or exploit data
- ✅ Respect your values
- ✅ Include you in major decisions"

### **To Educators:**

"We promise to:

- ✅ Empower, not replace you
- ✅ Provide actionable insights
- ✅ Support your professional judgment
- ✅ Train you thoroughly
- ✅ Protect from liability
- ✅ Respect your expertise
- ✅ Listen to your needs"

### **To Schools:**

"We promise to:

- ✅ Remain free forever
- ✅ Protect your reputation
- ✅ Comply with all regulations
- ✅ Provide excellent support
- ✅ Continuous improvement
- ✅ Data ownership to you
- ✅ Easy migration if needed"

---

## 📞 Ethics Concerns & Reporting

**How to Report Ethics Violations:**

```
📧 Email: ethics@wewillshine.dev
📞 Phone: +62-XXX-XXXX-XXXX (24/7)
📝 Form: wewillshine.dev/report
🔒 Anonymous: Tor-based submission
```

**What Happens Next:**

```
1️⃣ Acknowledgment within 24 hours
2️⃣ Investigation begins immediately
3️⃣ Weekly updates to reporter
4️⃣ Resolution within 30 days
5️⃣ Transparency report published
```

**Whistleblower Protection:**

```
✅ Full anonymity if requested
✅ No retaliation policy
✅ Legal support if needed
✅ Compensation for valid concerns
✅ Recognition for major findings
```

---

## 📈 Continuous Improvement

**We commit to:**

```
📊 Quarterly ethics audits
🔬 Annual third-party review
📝 Biannual policy updates
🎓 Continuous team training
💬 Regular community feedback
📢 Transparent reporting
🔄 Iterative improvement
```

---

**This framework is a living document.**

Last Updated: October 2025  
Next Review: January 2026

Ethics Committee: ethics@wewillshine.dev

---

_"Ethics is not about what we're allowed to do, but what we should do."_

_"Privacy is not about having something to hide, but having something to protect."_

_"With great data comes great responsibility."_
