import React, { useState, useEffect } from 'react';
import {
	Sparkles,
	Rocket,
	MessageCircle,
	Trophy,
	ChevronRight,
	LogOut,
	Heart,
	CheckCircle,
	Brain
} from 'lucide-react';

const students = [
	{ id: 'adinda-salsabila', name: 'ADINDA SALSABILA', code: 'INSPIRE2025AS' },
	{ id: 'aisya-jasmine-nurmana', name: 'AISYA JASMINE NURMANA', code: 'INSPIRE2025AJN' },
	{ id: 'aisyah-lovegne-restugusti', name: 'AISYAH LOVEGNE RESTUGUSTI', code: 'INSPIRE2025ALR' },
	{ id: 'ashadewi-zada-aretha', name: 'ASHADEWI ZADA ARETHA', code: 'INSPIRE2025AZA' },
	{ id: 'aurelia-bulan-meizzaluna', name: 'AURELIA BULAN MEIZZALUNA', code: 'INSPIRE2025ABM' },
	{ id: 'cahaya-shfa-aulia', name: 'CAHAYA SHFA AULIA', code: 'INSPIRE2025CSA' },
	{
		id: 'chillia-aurellia-ayyatul-husna',
		name: 'CHILLIA AURELLIA AYYATUL HUSNA',
		code: 'INSPIRE2025CAAH'
	},
	{ id: 'diya-aisyah', name: 'DIYA AISYAH', code: 'INSPIRE2025DA' },
	{
		id: 'kafaya-nariswari-nismara-ageng',
		name: 'KAFAYA NARISWARI NISMARA AGENG',
		code: 'INSPIRE2025KNNA'
	},
	{ id: 'kanaya-rasheeda-syam', name: 'KANAYA RASHEEDA SYAM', code: 'INSPIRE2025KRS' },
	{
		id: 'khoirunnisa-radhwa-pratista',
		name: 'KHOIRUNNISA RADHWA PRATISTA',
		code: 'INSPIRE2025KRP'
	},
	{ id: 'kintan-ambar-wati', name: 'KINTAN AMBAR WATI', code: 'INSPIRE2025KAW' },
	{ id: 'nadia-aurora-salsabila', name: 'NADIA AURORA SALSABILA', code: 'INSPIRE2025NAS' },
	{
		id: 'najwa-nafeeza-meidina-la-zahra',
		name: 'NAJWA NAFEEZA MEIDINA LA ZAHRA',
		code: 'INSPIRE2025NNMLZ'
	},
	{ id: 'nayla-azahra-saputra', name: 'NAYLA AZAHRA SAPUTRA', code: 'INSPIRE2025NAS2' },
	{ id: 'nayla-putri-ramadhani', name: 'NAYLA PUTRI RAMADHANI', code: 'INSPIRE2025NPR' },
	{ id: 'naysa-ilmira-kusrachmasari', name: 'NAYSA ILMIRA KUSRACHMASARI', code: 'INSPIRE2025NIK' },
	{ id: 'qaireena-agenta-kean', name: 'QAIREENA AGNETA KEAN', code: 'INSPIRE2025QAK' },
	{ id: 'rainasari-jihan-sabela', name: 'RAINASARI JIHAN SABELA', code: 'INSPIRE2025RJS' },
	{ id: 'rizkya-ayu-mahardika', name: 'RIZKYA AYU MAHARDIKA', code: 'INSPIRE2025RAM' },
	{ id: 'shakila-elza-zamari-loong', name: 'SHAKILA ELZA ZAMARI LOONG', code: 'INSPIRE2025SEZL' },
	{ id: 'vina-aretha-indriani', name: 'VINA ARETHA INDRIANI', code: 'INSPIRE2025VAI' }
];

const careers = [
	{
		id: 1,
		title: 'Software Developer',
		emoji: '💻',
		description: 'Membuat aplikasi dan website yang bermanfaat untuk umat',
		details:
			"Seorang Software Developer adalah arsitek digital yang membangun aplikasi, website, dan sistem yang kita gunakan sehari-hari. Dari aplikasi Al-Quran digital hingga platform edukasi online, software developer menciptakan solusi teknologi yang memudahkan kehidupan. Di era digital ini, kemampuan coding menjadi seperti 'literasi baru' yang sangat powerful!",
		skills: ['Problem Solving', 'Logical Thinking', 'Coding (Python, JavaScript)', 'Teamwork'],
		path: 'Mulai belajar coding dasar (Scratch, Python) → Ikut coding bootcamp/komunitas → Bangun project sederhana → Kuliah Informatika/Teknik Komputer',
		demand: 'Sangat Tinggi - Dibutuhkan di semua industri!',
		salary: 'Rp 6-20 juta (fresh graduate) hingga puluhan juta (expert)',
		islamicValue:
			'Gunakan kemampuan coding untuk membuat tools yang bermanfaat bagi umat, seperti aplikasi ibadah, edukasi Islam, atau platform sosial yang positif.'
	},
	{
		id: 2,
		title: 'UI/UX Designer',
		emoji: '🎨',
		description: 'Mendesain pengalaman digital yang indah dan mudah digunakan',
		details:
			'UI/UX Designer adalah seniman digital yang membuat tampilan aplikasi dan website tidak hanya cantik, tapi juga nyaman digunakan. Mereka memastikan setiap tombol, warna, dan layout dirancang dengan cermat agar pengguna merasa senang. Ini perpaduan sempurna antara seni, psikologi, dan teknologi!',
		skills: ['Kreativitas', 'Design Thinking', 'Empati', 'Tools: Figma, Adobe XD'],
		path: 'Belajar design basics → Eksplorasi Figma/Adobe XD → Buat portfolio project → Kuliah DKV/Desain Grafis/Informatika',
		demand: 'Tinggi - Setiap produk digital butuh designer!',
		salary: 'Rp 5-15 juta (junior) hingga puluhan juta (senior)',
		islamicValue:
			'Ciptakan desain yang estetis namun tetap sopan dan sesuai nilai Islam. Desain yang baik bisa menyebarkan kebaikan dengan cara yang menarik.'
	},
	{
		id: 3,
		title: 'Data Analyst',
		emoji: '📊',
		description: 'Mengubah data menjadi insight berharga untuk keputusan bijak',
		details:
			'Data Analyst adalah detektif data yang mencari pola dan insight dari jutaan informasi. Mereka membantu organisasi membuat keputusan yang tepat berdasarkan fakta, bukan hanya feeling. Di era big data ini, kemampuan membaca dan mengolah data menjadi super power yang sangat dicari!',
		skills: ['Analytical Thinking', 'Statistik', 'Excel/Python', 'Data Visualization'],
		path: 'Kuasai matematika dasar → Belajar Excel & statistik → Python untuk data → Kuliah Statistika/Matematika/Informatika',
		demand: 'Sangat Tinggi - Semua perusahaan butuh data analyst!',
		salary: 'Rp 6-18 juta (junior) hingga puluhan juta (senior)',
		islamicValue:
			'Gunakan data untuk membantu organisasi Islam membuat keputusan yang tepat, mengoptimalkan program dakwah, atau menganalisis kebutuhan umat.'
	},
	{
		id: 4,
		title: 'Digital Marketing Specialist',
		emoji: '📱',
		description: 'Menyebarkan pesan positif melalui platform digital',
		details:
			'Digital Marketing Specialist adalah storyteller modern yang menyebarkan pesan melalui media sosial, website, dan platform digital lainnya. Mereka membuat konten yang engaging, menganalisis tren, dan membangun komunitas online. Perfect untuk yang suka kreativitas dan komunikasi!',
		skills: ['Content Creation', 'Social Media', 'Copywriting', 'Analytics'],
		path: 'Aktif di social media → Belajar content creation → Praktek personal branding → Kuliah Komunikasi/Marketing/DKV',
		demand: 'Tinggi - Semua bisnis butuh presence digital!',
		salary: 'Rp 5-15 juta (junior) hingga puluhan juta + bonus (senior)',
		islamicValue:
			'Manfaatkan digital marketing untuk dakwah, menyebarkan konten Islami yang berkualitas, dan membangun komunitas muslim yang positif di dunia digital.'
	},
	{
		id: 5,
		title: 'Cybersecurity Specialist',
		emoji: '🔒',
		description: 'Menjaga keamanan data dan sistem digital',
		details:
			'Cybersecurity Specialist adalah guardian digital yang melindungi sistem, data, dan privasi dari ancaman cyber. Di dunia yang semakin digital, keamanan informasi menjadi sangat krusial. Mereka adalah pahlawan yang bekerja di balik layar menjaga keamanan kita semua!',
		skills: ['Problem Solving', 'Networking', 'Ethical Hacking', 'Risk Analysis'],
		path: 'Belajar networking dasar → Pahami sistem keamanan → Ikut CTF competitions → Kuliah Informatika/Sistem Informasi',
		demand: 'Sangat Tinggi - Cyber threats terus meningkat!',
		salary: 'Rp 8-25 juta (junior) hingga ratusan juta (expert)',
		islamicValue:
			'Lindungi data dan privasi umat Muslim, amankan sistem organisasi Islam, dan jaga amanah digital dengan integritas tinggi.'
	},
	{
		id: 6,
		title: 'AI/ML Engineer',
		emoji: '🤖',
		description: 'Membangun kecerdasan buatan untuk masa depan',
		details:
			"AI/Machine Learning Engineer adalah innovator yang mengajarkan komputer untuk 'berpikir' dan belajar sendiri. Dari chatbot hingga rekomendasi Netflix, AI ada di mana-mana! Ini adalah frontier teknologi yang akan membentuk masa depan kita.",
		skills: ['Mathematics', 'Programming (Python)', 'Deep Learning', 'Problem Solving'],
		path: 'Kuasai matematika & coding → Belajar AI/ML basics → Ikut competition (Kaggle) → Kuliah Informatika/Matematika/AI',
		demand: 'Sangat Tinggi - Teknologi masa depan!',
		salary: 'Rp 10-30 juta (junior) hingga ratusan juta (expert)',
		islamicValue:
			'Kembangkan AI yang etis dan bermanfaat untuk umat, seperti AI untuk pembelajaran Al-Quran, analisis kesehatan halal, atau tools produktivitas Islami.'
	},
	{
		id: 7,
		title: 'Content Creator & Educator',
		emoji: '🎥',
		description: 'Menciptakan konten edukatif yang menginspirasi',
		details:
			'Content Creator & Educator digital adalah guru modern yang menyebarkan ilmu melalui video, podcast, artikel, dan media digital lainnya. Mereka membuat pembelajaran menjadi fun dan accessible untuk semua orang. Kombinasi kreativitas, komunikasi, dan teknologi!',
		skills: ['Content Creation', 'Video Editing', 'Public Speaking', 'Storytelling'],
		path: 'Mulai buat konten di YouTube/TikTok → Belajar editing → Bangun audience → Kuliah Komunikasi/Pendidikan/DKV',
		demand: 'Tinggi - Era creator economy!',
		salary: 'Varies (0 hingga ratusan juta tergantung audience)',
		islamicValue:
			"Ciptakan konten edukatif Islami yang berkualitas, sebarkan ilmu agama dengan cara menarik, dan jadilah da'i digital yang menginspirasi."
	},
	{
		id: 8,
		title: 'Islamic Tech Entrepreneur',
		emoji: '🚀',
		description: 'Membangun startup teknologi berbasis nilai Islam',
		details:
			'Islamic Tech Entrepreneur adalah visioner yang membangun bisnis teknologi dengan pondasi nilai-nilai Islam. Mereka menciptakan solusi digital yang tidak hanya profitable tapi juga membawa berkah. Dari fintech syariah hingga edtech Islami, peluangnya unlimited!',
		skills: ['Business Acumen', 'Leadership', 'Tech Knowledge', 'Innovation'],
		path: 'Belajar bisnis & teknologi → Identifikasi problem umat → Build MVP → Kuliah Bisnis/Informatika + ikut startup incubator',
		demand: 'Berkembang Pesat - Islamic tech market huge!',
		salary: 'Varies (unlimited potential sebagai founder)',
		islamicValue:
			'Bangun bisnis yang halal, berkah, dan memberikan dampak positif untuk umat. Jadikan teknologi sebagai sarana untuk memakmurkan dan memberdayakan umat Muslim.'
	}
];

const questionnaire = [
	{
		id: 1,
		question: 'Apa yang paling kamu suka lakukan di waktu luang?',
		options: [
			{ text: 'Main game atau coding', value: 'tech' },
			{ text: 'Menggambar atau desain', value: 'creative' },
			{ text: 'Baca atau analisis data', value: 'analytical' },
			{ text: 'Bikin konten atau vlog', value: 'content' }
		]
	},
	{
		id: 2,
		question: 'Mata pelajaran apa yang paling kamu kuasai?',
		options: [
			{ text: 'Matematika & IPA', value: 'analytical' },
			{ text: 'Bahasa & Seni', value: 'creative' },
			{ text: 'Semua mata pelajaran seimbang', value: 'balanced' },
			{ text: 'Praktek & Olahraga', value: 'practical' }
		]
	},
	{
		id: 3,
		question: 'Kalau ada project kelompok, kamu biasanya jadi apa?',
		options: [
			{ text: 'Yang mikirin konsep & ide', value: 'leader' },
			{ text: 'Yang ngerjain detail teknisnya', value: 'executor' },
			{ text: 'Yang bikin presentasi menarik', value: 'presenter' },
			{ text: 'Yang ngatur & koordinasi tim', value: 'organizer' }
		]
	},
	{
		id: 4,
		question: 'Kamu lebih suka bekerja...',
		options: [
			{ text: 'Sendiri, fokus deep work', value: 'independent' },
			{ text: 'Dalam tim, brainstorming bareng', value: 'collaborative' },
			{ text: 'Kombinasi keduanya', value: 'flexible' },
			{ text: 'Dengan banyak orang, suka networking', value: 'social' }
		]
	},
	{
		id: 5,
		question: 'Apa mimpi terbesarmu untuk masa depan?',
		options: [
			{ text: 'Bikin produk/aplikasi yang bermanfaat', value: 'builder' },
			{ text: 'Jadi expert di bidang tertentu', value: 'specialist' },
			{ text: 'Punya bisnis sendiri', value: 'entrepreneur' },
			{ text: 'Menginspirasi & mengajar orang lain', value: 'educator' }
		]
	},
	{
		id: 6,
		question: 'Skill apa yang sudah kamu miliki sejak kecil?',
		options: [
			{ text: 'Kreatif & imajinatif', value: 'creative' },
			{ text: 'Teliti & detail', value: 'analytical' },
			{ text: 'Komunikatif & persuasif', value: 'social' },
			{ text: 'Problem solver yang baik', value: 'logical' }
		]
	}
];

const motivationalQuotes = [
	'Masa depanmu dimulai dari keputusan kecil yang kamu buat hari ini. Keep learning, keep growing! 🌱',
	'Kamu punya potensi luar biasa! Jangan pernah ragu untuk bermimpi besar dan mengejarnya. ✨',
	'Setiap ahli pernah menjadi pemula. Yang penting adalah keberanianmu untuk memulai! 💪',
	'Teknologi adalah tools, tapi hatimu yang menentukan impact-nya. Gunakan untuk kebaikan! 🌟',
	'Kesuksesan bukan tentang seberapa cepat, tapi tentang konsistensi dan tidak menyerah. You got this! 🚀',
	'Ilmu adalah investasi terbaik. Apa yang kamu pelajari hari ini akan berguna 10 tahun ke depan! 📚'
];

const chatbotResponses = {
	greeting: [
		'Halo! 👋 Aku di sini untuk membantu eksplorasi karirmu. Mau tanya tentang profesi tertentu atau butuh motivasi?',
		'Hai! Senang bisa menemanimu menjelajah dunia karir. Ada yang ingin kamu tanyakan? 😊'
	],
	career: {
		'software developer':
			'Software Developer itu keren! Kamu bisa mulai dari belajar coding dasar seperti Python atau JavaScript. Coba buat project kecil seperti kalkulator atau to-do list app. Yang penting: jangan takut error, setiap bug adalah kesempatan belajar! 💻',
		'ui/ux':
			"UI/UX Designer perfect untuk yang suka seni dan teknologi! Mulai dengan belajar Figma (gratis!), lalu coba redesign app favoritmu. Perhatikan kenapa beberapa app enak dipakai dan yang lain nggak. That's UX thinking! 🎨",
		data: 'Data Analyst itu seperti detective! Mulai dari Excel dulu, lalu belajar visualisasi data. Coba analisis data sederhana seperti nilai kelas atau statistik hobi teman-teman. Numbers tell stories! 📊',
		marketing:
			'Digital Marketing cocok buat yang kreatif dan suka media sosial! Mulai dengan bikin konten untuk personal brand-mu. Pelajari apa yang bikin konten viral dan engaging. Content is king! 📱',
		security:
			'Cybersecurity itu penting banget di era digital! Mulai dengan belajar dasar networking dan keamanan internet. Ikuti CTF (Capture The Flag) competition untuk practice. Be the guardian! 🔒',
		ai: 'AI/ML adalah masa depan! Mulai dengan matematika yang kuat dan Python. Coba project ML sederhana seperti prediksi sederhana atau image classification. The possibilities are endless! 🤖',
		creator:
			'Content Creator & Educator bisa dimulai sekarang! Pick satu platform, buat konten yang kamu passionate about, dan konsisten. Share ilmu yang kamu punya, meski masih belajar. Teaching is learning! 🎥',
		entrepreneur:
			'Entrepreneur mindset bisa dimulai dari sekarang! Identifikasi masalah di sekitarmu dan pikirkan solusinya. Start small, learn fast, iterate quickly. Every big business started small! 🚀'
	},
	motivation: [
		"Remember: Setiap expert dulunya adalah beginner. Kamu sudah berani explore, that's a great start! Keep going! 💪",
		'Jangan bandingkan journey-mu dengan orang lain. Everyone has their own pace. Focus on progress, not perfection! 🌟',
		'Masa SMP adalah waktu terbaik untuk explore banyak hal. Try everything, fail fast, learn faster! ✨',
		'Tech industry itu sangat welcome untuk perempuan! We need more female voices in technology. You belong here! 👩‍💻',
		'Investasi terbaik adalah investasi di dirimu sendiri. Keep learning, stay curious! 📚'
	],
	study: [
		'Tips belajar: Pakai teknik Pomodoro (25 menit fokus, 5 menit break). Jangan lupa catat yang penting! 📝',
		'Belajar coding atau tech? Practice every day, meski cuma 15 menit. Consistency beats intensity! 💻',
		'Gabung komunitas atau klub tech di sekolah. Learning together is more fun! 🤝',
		"Don't just consume, create! Praktek langsung adalah cara belajar terbaik. 🛠️"
	],
	islam: [
		'Dalam Islam, menuntut ilmu itu ibadah. Setiap skill yang kamu pelajari bisa jadi amal jariyah kalau digunakan untuk kebaikan! 🤲',
		'Teknologi adalah alat. Niat dan cara menggunakannya yang menentukan berkah atau tidak. Always keep your intention pure! ☪️',
		"Prophet Muhammad SAW bilang: 'Tuntutlah ilmu sampai ke negeri China.' Itu artinya: never stop learning! 📖"
	],
	default: [
		'Pertanyaan menarik! Mau tahu lebih spesifik tentang profesi mana? Atau butuh motivasi untuk memulai? 🤔',
		'Aku di sini untuk bantu! Coba tanya tentang: cara mulai belajar suatu skill, tips study, atau motivasi karir! 💡'
	]
};

function generatePersonalMotivation(name, answers) {
	const firstName = name.split(' ')[0];

	const traits = {
		creative: 0,
		analytical: 0,
		tech: 0,
		social: 0,
		leader: 0,
		builder: 0
	};

	answers.forEach((answer) => {
		if (answer.includes('creative')) traits.creative++;
		if (answer.includes('analytical')) traits.analytical++;
		if (answer.includes('tech')) traits.tech++;
		if (answer.includes('social') || answer.includes('collaborative')) traits.social++;
		if (answer.includes('leader') || answer.includes('organizer')) traits.leader++;
		if (answer.includes('builder') || answer.includes('entrepreneur')) traits.builder++;
	});

	const dominant = Object.keys(traits).reduce((a, b) => (traits[a] > traits[b] ? a : b));

	const motivations = {
		creative: `${firstName}, jiwa kreatifmu adalah anugerah yang luar biasa! Kamu punya kemampuan untuk melihat dunia dengan cara yang unik dan mengubah imajinasi menjadi karya nyata. Di era digital ini, kreativitas sepertimu sangat dibutuhkan untuk menciptakan produk dan konten yang tidak hanya fungsional, tapi juga indah dan menginspirasi. Jangan pernah biarkan siapapun mematikan api kreatifmu. Terus eksplorasi, terus berkarya, dan ingat: setiap desainer hebat, setiap creator sukses, dulunya memulai dari titik yang sama sepertimu sekarang. Dunia butuh sentuhan kreatif dari perempuan muslimah sepertimu! 🎨✨`,

		analytical: `${firstName}, kemampuan analitismu adalah kekuatan super yang jarang dimiliki! Kamu punya mata yang tajam untuk detail, pikiran yang sistematis, dan kemampuan untuk memecahkan puzzle yang rumit. Di dunia yang penuh dengan data dan informasi, skill seperti ini adalah emas! Baik itu menjadi Data Analyst, AI Engineer, atau Cybersecurity Specialist, kemampuanmu untuk berpikir logis dan mendalam akan membawamu jauh. Remember: otak analitis sepertimu bisa memecahkan masalah-masalah besar yang akan mengubah dunia. Don't underestimate the power of your analytical mind! 📊🧠`,

		tech: `${firstName}, passion-mu terhadap teknologi adalah modal awal yang sempurna untuk masa depan! Di era digital ini, tech savvy sepertimu adalah game changer. Kamu sudah punya fondasi yang kuat - sekarang tinggal diperdalam dan diasah. Mulai dari coding, exploring AI, atau bahkan bikin app sendiri - semua dimulai dari ketertarikan seperti yang kamu punya sekarang. Tech industry butuh lebih banyak perempuan muslimah yang paham teknologi dan punya values yang kuat. You could be the next tech innovator that changes how Muslims interact with technology! Keep coding, keep building! 💻🚀`,

		social: `${firstName}, kemampuan sosial dan komunikasimu adalah aset yang sangat berharga! Dalam dunia teknologi, technical skill memang penting, tapi kemampuan untuk berkolaborasi, memimpin tim, dan mengkomunikasikan ide dengan baik adalah yang membedakan leader dengan follower. Kamu bisa jadi Project Manager, Digital Marketing Specialist, atau Content Creator yang menginspirasi jutaan orang. Your voice matters, your leadership matters. Gunakan kemampuan sosialmu untuk membangun komunitas, menyebarkan kebaikan, dan memimpin perubahan positif di dunia digital! 🌟👥`,

		leader: `${firstName}, jiwa kepemimpinanmu sudah terlihat dari sekarang! Leader bukan tentang yang paling pintar atau paling cepat - tapi tentang yang paling berani memulai, yang bisa menginspirasi orang lain, dan yang punya vision untuk masa depan. Dengan kemampuan organize dan koordinasi yang kamu punya, kamu bisa jadi Tech Entrepreneur yang membangun startup, Project Manager yang memimpin tim international, atau Educator yang menginspirasi generasi. Dream big, start small, but START! The world needs more young Muslim women leaders like you! 👑🎯`,

		builder: `${firstName}, kamu adalah builder sejati! Passion-mu untuk menciptakan sesuatu, untuk mengubah ide menjadi realita, adalah DNA seorang innovator. Baik itu build aplikasi, design produk, atau start bisnis - kamu punya mindset yang tepat. Di dunia tech, builder mentality sepertimu adalah foundation untuk kesuksesan. Start dengan project kecil, learn from failures, iterate quickly. Remember: semua produk besar - dari Instagram sampai Gojek - dimulai dari seseorang yang berani BUILD. Your ideas can change the world, so start building now! 🏗️💡`
	};

	return motivations[dominant] || motivations.creative;
}

function App() {
	const [currentStudent, setCurrentStudent] = useState(null);
	const [inputCode, setInputCode] = useState('');
	const [error, setError] = useState('');
	const [selectedCareer, setSelectedCareer] = useState(null);
	const [showChat, setShowChat] = useState(false);
	const [chatMessages, setChatMessages] = useState([]);
	const [chatInput, setChatInput] = useState('');
	const [exploredCareers, setExploredCareers] = useState([]);
	const [showMotivation, setShowMotivation] = useState(false);
	const [showQuestionnaire, setShowQuestionnaire] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [showFinalCard, setShowFinalCard] = useState(false);
	const [personalMotivation, setPersonalMotivation] = useState('');

	useEffect(() => {
		if (currentStudent) {
			setChatMessages([
				{
					type: 'bot',
					text: `Assalamualaikum ${currentStudent.name.split(' ')[0]}! 🌟 Selamat datang di aplikasi eksplorasi karir! Aku siap membantumu menemukan passion dan potensimu. Yuk mulai jelajahi dunia profesi yang menarik! ✨`
				}
			]);
		}
	}, [currentStudent]);

	const handleLogin = () => {
		const student = students.find((s) => s.code === inputCode.toUpperCase().trim());
		if (student) {
			setCurrentStudent(student);
			setError('');
			setShowMotivation(true);
			setTimeout(() => setShowMotivation(false), 5000);
		} else {
			setError('Kode tidak valid. Cek kembali kode di coklat hadiah kamu ya! 🍫');
		}
	};

	const handleLogout = () => {
		setCurrentStudent(null);
		setInputCode('');
		setSelectedCareer(null);
		setExploredCareers([]);
		setChatMessages([]);
		setShowQuestionnaire(false);
		setCurrentQuestion(0);
		setAnswers([]);
		setShowFinalCard(false);
	};

	const handleCareerClick = (career) => {
		setSelectedCareer(career);
		if (!exploredCareers.includes(career.id)) {
			setExploredCareers([...exploredCareers, career.id]);
		}
	};

	const handleQuestionnaireAnswer = (value) => {
		const newAnswers = [...answers, value];
		setAnswers(newAnswers);

		if (currentQuestion < questionnaire.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			const motivation = generatePersonalMotivation(currentStudent.name, newAnswers);
			setPersonalMotivation(motivation);
			setShowQuestionnaire(false);
			setShowFinalCard(true);
		}
	};

	const sendMessage = () => {
		if (!chatInput.trim()) return;

		const userMessage = { type: 'user', text: chatInput };
		setChatMessages((prev) => [...prev, userMessage]);

		const input = chatInput.toLowerCase();
		let botResponse;

		if (input.includes('halo') || input.includes('hai') || input.includes('hi')) {
			botResponse =
				chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
		} else if (
			input.includes('software') ||
			input.includes('coding') ||
			input.includes('programmer')
		) {
			botResponse = chatbotResponses.career['software developer'];
		} else if (input.includes('design') || input.includes('ui') || input.includes('ux')) {
			botResponse = chatbotResponses.career['ui/ux'];
		} else if (input.includes('data') || input.includes('analyst')) {
			botResponse = chatbotResponses.career['data'];
		} else if (
			input.includes('marketing') ||
			input.includes('sosmed') ||
			input.includes('konten')
		) {
			botResponse = chatbotResponses.career['marketing'];
		} else if (input.includes('security') || input.includes('cyber') || input.includes('hacker')) {
			botResponse = chatbotResponses.career['security'];
		} else if (
			input.includes('ai') ||
			input.includes('machine learning') ||
			input.includes('kecerdasan')
		) {
			botResponse = chatbotResponses.career['ai'];
		} else if (input.includes('creator') || input.includes('youtube') || input.includes('video')) {
			botResponse = chatbotResponses.career['creator'];
		} else if (
			input.includes('entrepreneur') ||
			input.includes('bisnis') ||
			input.includes('usaha')
		) {
			botResponse = chatbotResponses.career['entrepreneur'];
		} else if (input.includes('motivasi') || input.includes('semangat') || input.includes('down')) {
			botResponse =
				chatbotResponses.motivation[Math.floor(Math.random() * chatbotResponses.motivation.length)];
		} else if (input.includes('belajar') || input.includes('study') || input.includes('tips')) {
			botResponse =
				chatbotResponses.study[Math.floor(Math.random() * chatbotResponses.study.length)];
		} else if (input.includes('islam') || input.includes('agama') || input.includes('allah')) {
			botResponse =
				chatbotResponses.islam[Math.floor(Math.random() * chatbotResponses.islam.length)];
		} else {
			botResponse =
				chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
		}

		setTimeout(() => {
			setChatMessages((prev) => [...prev, { type: 'bot', text: botResponse }]);
		}, 500);

		setChatInput('');
	};

	if (!currentStudent) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-teal-400 p-4">
				<div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
					<div className="mb-6 text-center">
						<div className="mb-4 inline-block rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-4">
							<Sparkles className="h-12 w-12 text-white" />
						</div>
						<h1 className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
							Jelajah Karir 🚀
						</h1>
						<p className="text-gray-600">Hadiah Spesial untuk 8C Putri</p>
					</div>

					<div className="space-y-4">
						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Masukkan Kode dari Coklat 🍫
							</label>
							<input
								type="text"
								value={inputCode}
								onChange={(e) => setInputCode(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										handleLogin();
									}
								}}
								placeholder="INSPIRE2025XXX"
								className="w-full rounded-xl border-2 border-purple-200 px-4 py-3 transition-colors focus:border-purple-500 focus:outline-none"
							/>
						</div>

						{error && (
							<div className="rounded-xl border-2 border-red-200 bg-red-50 p-3 text-sm text-red-600">
								{error}
							</div>
						)}

						<button
							onClick={handleLogin}
							className="w-full transform rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
						>
							Mulai Petualangan! ✨
						</button>
					</div>

					<div className="mt-6 text-center text-sm text-gray-500">
						<p>Dengan ❤️ dari Ustadz/Ustadzah kamu</p>
					</div>
				</div>
			</div>
		);
	}

	if (showMotivation) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-teal-400 p-4">
				<div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-2xl">
					<Sparkles className="mx-auto mb-4 h-16 w-16 text-purple-500" />
					<h2 className="mb-4 text-3xl font-bold text-gray-800">
						Assalamualaikum, {currentStudent.name.split(' ')[0]}! 🌟
					</h2>
					<p className="mb-6 text-xl text-gray-600">
						{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}
					</p>
					<div className="mb-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 p-6">
						<p className="text-gray-700 italic">
							Kamu adalah bagian dari generasi yang akan membawa perubahan. Masa depan teknologi ada
							di tanganmu. Mulai dari sekarang, setiap langkah kecil yang kamu ambil akan membawamu
							lebih dekat ke mimpi besarmu!
						</p>
					</div>
					<p className="text-sm text-gray-500">Loading aplikasi...</p>
				</div>
			</div>
		);
	}

	if (showQuestionnaire) {
		const question = questionnaire[currentQuestion];
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-teal-400 p-4">
				<div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
					<div className="mb-6">
						<div className="mb-4 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Brain className="h-8 w-8 text-purple-500" />
								<h2 className="text-2xl font-bold text-gray-800">Kenali Dirimu</h2>
							</div>
							<span className="text-sm text-gray-500">
								Pertanyaan {currentQuestion + 1}/{questionnaire.length}
							</span>
						</div>
						<div className="mb-6 h-2 w-full rounded-full bg-gray-200">
							<div
								className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
								style={{ width: `${((currentQuestion + 1) / questionnaire.length) * 100}%` }}
							></div>
						</div>
					</div>

					<div className="mb-8">
						<h3 className="mb-6 text-xl font-semibold text-gray-800">{question.question}</h3>
						<div className="space-y-3">
							{question.options.map((option, idx) => (
								<button
									key={idx}
									onClick={() => handleQuestionnaireAnswer(option.value)}
									className="w-full transform rounded-xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4 text-left transition-all hover:scale-105 hover:border-purple-400 hover:from-purple-100 hover:to-pink-100"
								>
									<span className="font-medium text-gray-800">{option.text}</span>
								</button>
							))}
						</div>
					</div>

					<div className="text-center text-sm text-gray-500">
						<p>Jawab sejujur-jujurnya ya! Tidak ada jawaban yang salah 😊</p>
					</div>
				</div>
			</div>
		);
	}

	if (showFinalCard) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-teal-400 p-4">
				<div className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">
					<div className="mb-6 text-center">
						<div className="mb-4 inline-block rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-4">
							<Heart className="h-16 w-16 text-white" />
						</div>
						<h2 className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
							Pesan Khusus Untukmu, {currentStudent.name.split(' ')[0]}! 💝
						</h2>
					</div>

					<div className="mb-6 rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-8">
						<p className="mb-6 text-lg leading-relaxed text-gray-800">{personalMotivation}</p>

						<div className="mb-4 rounded-xl bg-white p-6">
							<h3 className="mb-3 text-lg font-bold text-purple-900">🎯 Next Steps untuk Kamu:</h3>
							<ul className="space-y-2 text-gray-700">
								<li className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
									<span>Mulai eksplorasi lebih dalam tentang karir yang kamu minati</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
									<span>Ikuti komunitas atau klub yang sesuai dengan passion-mu</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
									<span>Mulai belajar skill dasar yang relevan dari sekarang</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
									<span>Jangan takut mencoba dan gagal - itu bagian dari belajar!</span>
								</li>
							</ul>
						</div>

						<div className="rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 p-6">
							<p className="text-center text-gray-700 italic">
								"Ustadz/Ustadzah sangat bangga dengan semangat dan potensi yang kalian punya. Ingat,
								perjalanan 1000 mil dimulai dari satu langkah. Langkah pertamamu sudah dimulai hari
								ini. Keep going, never give up! Semoga Allah SWT selalu membimbing langkahmu menuju
								masa depan yang penuh berkah. Aamiin." 🤲
							</p>
						</div>
					</div>

					<div className="flex gap-4">
						<button
							onClick={() => {
								setShowFinalCard(false);
								setCurrentQuestion(0);
								setAnswers([]);
							}}
							className="flex-1 transform rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
						>
							Kembali ke Dashboard
						</button>
						<button
							onClick={() => {
								setShowFinalCard(false);
								setShowQuestionnaire(true);
								setCurrentQuestion(0);
								setAnswers([]);
							}}
							className="flex-1 transform rounded-xl border-2 border-purple-500 bg-white py-3 font-semibold text-purple-600 transition-all hover:scale-105 hover:shadow-lg"
						>
							Isi Ulang Kuesioner
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (selectedCareer) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-teal-400 p-4">
				<div className="mx-auto max-w-4xl">
					<button
						onClick={() => setSelectedCareer(null)}
						className="mb-4 flex items-center gap-2 rounded-full bg-white px-6 py-2 shadow-lg transition-all hover:shadow-xl"
					>
						← Kembali
					</button>

					<div className="rounded-3xl bg-white p-8 shadow-2xl">
						<div className="mb-6 text-center">
							<div className="mb-4 text-6xl">{selectedCareer.emoji}</div>
							<h2 className="mb-2 text-3xl font-bold text-gray-800">{selectedCareer.title}</h2>
							<p className="text-lg text-gray-600">{selectedCareer.description}</p>
						</div>

						<div className="space-y-6">
							<div className="rounded-2xl bg-purple-50 p-6">
								<h3 className="mb-3 text-lg font-bold text-purple-900">
									📖 Apa itu {selectedCareer.title}?
								</h3>
								<p className="leading-relaxed text-gray-700">{selectedCareer.details}</p>
							</div>

							<div className="rounded-2xl bg-pink-50 p-6">
								<h3 className="mb-3 text-lg font-bold text-pink-900">💪 Skills yang Dibutuhkan</h3>
								<div className="flex flex-wrap gap-2">
									{selectedCareer.skills.map((skill, idx) => (
										<span
											key={idx}
											className="rounded-full bg-pink-200 px-4 py-2 text-sm font-medium text-pink-800"
										>
											{skill}
										</span>
									))}
								</div>
							</div>

							<div className="rounded-2xl bg-teal-50 p-6">
								<h3 className="mb-3 text-lg font-bold text-teal-900">🛤️ Jalur Karir</h3>
								<p className="leading-relaxed text-gray-700">{selectedCareer.path}</p>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="rounded-2xl bg-blue-50 p-6">
									<h3 className="mb-2 text-lg font-bold text-blue-900">📈 Demand Pasar</h3>
									<p className="text-gray-700">{selectedCareer.demand}</p>
								</div>
								<div className="rounded-2xl bg-green-50 p-6">
									<h3 className="mb-2 text-lg font-bold text-green-900">💰 Range Gaji</h3>
									<p className="text-gray-700">{selectedCareer.salary}</p>
								</div>
							</div>

							<div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100 p-6">
								<h3 className="mb-3 text-lg font-bold text-purple-900">
									☪️ Nilai Islam dalam Karir Ini
								</h3>
								<p className="leading-relaxed text-gray-700">{selectedCareer.islamicValue}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-teal-400 p-4">
			<div className="mx-auto max-w-6xl">
				<div className="mb-6 rounded-3xl bg-white p-6 shadow-2xl">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold text-gray-800">
								Halo, {currentStudent.name.split(' ')[0]}! 👋
							</h1>
							<p className="text-gray-600">Yuk jelajahi dunia karir teknologi!</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="text-center">
								<Trophy className="mx-auto mb-1 h-8 w-8 text-yellow-500" />
								<p className="text-sm font-bold text-gray-700">{exploredCareers.length}/8</p>
								<p className="text-xs text-gray-500">Terjelajah</p>
							</div>
							<button
								onClick={handleLogout}
								className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200"
							>
								<LogOut className="h-4 w-4" />
								<span className="text-sm">Keluar</span>
							</button>
						</div>
					</div>
				</div>

				<div className="mb-6 rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100 p-6 shadow-lg">
					<div className="mb-3 flex items-center gap-3">
						<Sparkles className="h-6 w-6 text-purple-600" />
						<h2 className="text-xl font-bold text-purple-900">
							Lihat Apa yang Bisa Menjadi Bagian dari Potensi Dirimu di Masa Depan!
						</h2>
					</div>
					<p className="mb-4 text-gray-700">
						Eksplorasi 8 profesi teknologi masa depan yang cocok untuk muslimah sepertimu. Setiap
						profesi punya keunikan dan peluang yang luar biasa. Klik untuk tahu lebih detail, lalu
						isi kuesioner untuk mendapat motivasi personal khusus untukmu! ✨
					</p>
					{!showFinalCard && exploredCareers.length >= 3 && (
						<button
							onClick={() => setShowQuestionnaire(true)}
							className="flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
						>
							<Brain className="h-5 w-5" />
							Isi Kuesioner & Dapatkan Motivasi Personal!
						</button>
					)}
				</div>

				<div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{careers.map((career) => (
						<div
							key={career.id}
							onClick={() => handleCareerClick(career)}
							className={`transform cursor-pointer rounded-2xl bg-white p-6 transition-all hover:scale-105 hover:shadow-2xl ${
								exploredCareers.includes(career.id) ? 'ring-2 ring-purple-500' : ''
							}`}
						>
							<div className="mb-3 text-center text-5xl">{career.emoji}</div>
							<h3 className="mb-2 text-center text-lg font-bold text-gray-800">{career.title}</h3>
							<p className="mb-3 text-center text-sm text-gray-600">{career.description}</p>
							<div className="flex justify-center">
								<ChevronRight className="h-5 w-5 text-purple-500" />
							</div>
							{exploredCareers.includes(career.id) && (
								<div className="mt-2 text-center">
									<span className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700">
										✓ Terjelajah
									</span>
								</div>
							)}
						</div>
					))}
				</div>

				<div className="mb-6 rounded-3xl bg-white p-6 shadow-2xl">
					<button
						onClick={() => setShowChat(!showChat)}
						className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white transition-all hover:shadow-lg"
					>
						<div className="flex items-center gap-3">
							<MessageCircle className="h-6 w-6" />
							<span className="font-semibold">Chat dengan Mentor AI</span>
						</div>
						<span className="text-2xl">{showChat ? '−' : '+'}</span>
					</button>

					{showChat && (
						<div className="mt-4">
							<div className="mb-4 h-96 space-y-3 overflow-y-auto rounded-2xl bg-gray-50 p-4">
								{chatMessages.map((msg, idx) => (
									<div
										key={idx}
										className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
									>
										<div
											className={`max-w-xs rounded-2xl px-4 py-3 ${
												msg.type === 'user'
													? 'bg-purple-500 text-white'
													: 'bg-white text-gray-800 shadow-md'
											}`}
										>
											{msg.text}
										</div>
									</div>
								))}
							</div>

							<div className="flex gap-2">
								<input
									type="text"
									value={chatInput}
									onChange={(e) => setChatInput(e.target.value)}
									onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
									placeholder="Tanya tentang karir, motivasi, atau tips belajar..."
									className="flex-1 rounded-xl border-2 border-purple-200 px-4 py-3 focus:border-purple-500 focus:outline-none"
								/>
								<button
									onClick={sendMessage}
									className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
								>
									Kirim
								</button>
							</div>

							<div className="mt-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-4">
								<p className="mb-2 text-sm font-semibold text-gray-600">💡 Coba tanya:</p>
								<div className="flex flex-wrap gap-2">
									<button
										onClick={() => setChatInput('Bagaimana cara mulai belajar coding?')}
										className="rounded-full bg-white px-3 py-1 text-xs transition-colors hover:bg-purple-100"
									>
										Cara mulai coding
									</button>
									<button
										onClick={() => setChatInput('Aku butuh motivasi')}
										className="rounded-full bg-white px-3 py-1 text-xs transition-colors hover:bg-purple-100"
									>
										Butuh motivasi
									</button>
									<button
										onClick={() => setChatInput('Tips belajar efektif')}
										className="rounded-full bg-white px-3 py-1 text-xs transition-colors hover:bg-purple-100"
									>
										Tips belajar
									</button>
									<button
										onClick={() => setChatInput('Teknologi dalam Islam')}
										className="rounded-full bg-white px-3 py-1 text-xs transition-colors hover:bg-purple-100"
									>
										Tech & Islam
									</button>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="rounded-3xl bg-white p-6 text-center shadow-2xl">
					<Heart className="mx-auto mb-3 h-8 w-8 text-red-500" />
					<p className="text-gray-700 italic">
						Hadiah ini dibuat dengan penuh cinta dan harapan agar kalian semua menemukan passion dan
						meraih mimpi setinggi langit. Ustadz/Ustadzah percaya pada potensi luar biasa yang
						kalian miliki!
					</p>
					<p className="mt-3 text-sm text-gray-500">- Ustadz/Ustadzah Kamu 💙</p>
				</div>
			</div>
		</div>
	);
}

export default App;
