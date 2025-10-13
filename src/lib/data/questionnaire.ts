export interface QuestionOption {
	text: string;
	value: string;
}

export interface Question {
	id: number;
	question: string;
	options: QuestionOption[];
}

export const questionnaire: Question[] = [
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
