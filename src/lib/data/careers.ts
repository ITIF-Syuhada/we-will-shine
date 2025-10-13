export interface Career {
	id: number;
	title: string;
	emoji: string;
	description: string;
	details: string;
	skills: string[];
	path: string;
	demand: string;
	salary: string;
	islamicValue: string;
}

export const careers: Career[] = [
	{
		id: 1,
		title: 'Software Developer',
		emoji: '💻',
		description: 'Membuat aplikasi dan website yang bermanfaat untuk umat',
		details:
			'Seorang Software Developer adalah arsitek digital yang membangun aplikasi, website, dan sistem yang kita gunakan sehari-hari. Dari aplikasi Al-Quran digital hingga platform edukasi online, software developer menciptakan solusi teknologi yang memudahkan kehidupan. Di era digital ini, kemampuan coding menjadi seperti "literasi baru" yang sangat powerful!',
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
			'AI/Machine Learning Engineer adalah innovator yang mengajarkan komputer untuk "berpikir" dan belajar sendiri. Dari chatbot hingga rekomendasi Netflix, AI ada di mana-mana! Ini adalah frontier teknologi yang akan membentuk masa depan kita.',
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

export function getCareerById(id: number): Career | undefined {
	return careers.find((c) => c.id === id);
}
