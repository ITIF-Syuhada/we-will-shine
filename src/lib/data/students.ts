export interface Student {
	id: string;
	name: string;
	code: string;
}

export const students: Student[] = [
	{ id: 'adinda-salsabila', name: 'ADINDA SALSABILA', code: 'INSPIRE2025AS' },
	{ id: 'aisya-jasmine-nurmana', name: 'AISYA JASMINE NURMANA', code: 'INSPIRE2025AJN' },
	{
		id: 'aisyah-lovegne-restugusti',
		name: 'AISYAH LOVEGNE RESTUGUSTI',
		code: 'INSPIRE2025ALR'
	},
	{ id: 'ashadewi-zada-aretha', name: 'ASHADEWI ZADA ARETHA', code: 'INSPIRE2025AZA' },
	{
		id: 'aurelia-bulan-meizzaluna',
		name: 'AURELIA BULAN MEIZZALUNA',
		code: 'INSPIRE2025ABM'
	},
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
	{
		id: 'naysa-ilmira-kusrachmasari',
		name: 'NAYSA ILMIRA KUSRACHMASARI',
		code: 'INSPIRE2025NIK'
	},
	{ id: 'qaireena-agenta-kean', name: 'QAIREENA AGNETA KEAN', code: 'INSPIRE2025QAK' },
	{ id: 'rainasari-jihan-sabela', name: 'RAINASARI JIHAN SABELA', code: 'INSPIRE2025RJS' },
	{ id: 'rizkya-ayu-mahardika', name: 'RIZKYA AYU MAHARDIKA', code: 'INSPIRE2025RAM' },
	{
		id: 'shakila-elza-zamari-loong',
		name: 'SHAKILA ELZA ZAMARI LOONG',
		code: 'INSPIRE2025SEZL'
	},
	{ id: 'vina-aretha-indriani', name: 'VINA ARETHA INDRIANI', code: 'INSPIRE2025VAI' }
];

export function getStudentByCode(code: string): Student | undefined {
	return students.find((s) => s.code === code.toUpperCase().trim());
}

export function getStudentById(id: string): Student | undefined {
	return students.find((s) => s.id === id);
}
