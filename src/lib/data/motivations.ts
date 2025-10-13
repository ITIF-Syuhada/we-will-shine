export const motivationalQuotes = [
	'Masa depanmu dimulai dari keputusan kecil yang kamu buat hari ini. Keep learning, keep growing! 🌱',
	'Kamu punya potensi luar biasa! Jangan pernah ragu untuk bermimpi besar dan mengejarnya. ✨',
	'Setiap ahli pernah menjadi pemula. Yang penting adalah keberanianmu untuk memulai! 💪',
	'Teknologi adalah tools, tapi hatimu yang menentukan impact-nya. Gunakan untuk kebaikan! 🌟',
	'Kesuksesan bukan tentang seberapa cepat, tapi tentang konsistensi dan tidak menyerah. You got this! 🚀',
	'Ilmu adalah investasi terbaik. Apa yang kamu pelajari hari ini akan berguna 10 tahun ke depan! 📚',
	'Mimpi besar dimulai dari langkah kecil hari ini! 🌟',
	'Kamu lebih kuat dari yang kamu kira! 💪',
	'Setiap hari adalah kesempatan baru untuk belajar! 📚',
	'Jangan takut bermimpi, takutlah tidak bermimpi! ✨',
	'Masa depan cerah menanti mereka yang berani berusaha! 🌅',
	'Kegagalan adalah guru terbaik menuju kesuksesan! 🎯',
	'Percaya pada diri sendiri adalah langkah pertama! 🚀'
];

interface PersonalMotivations {
	[key: string]: (name: string) => string;
}

export const personalMotivations: PersonalMotivations = {
	creative: (name: string) =>
		`${name}, jiwa kreatifmu adalah anugerah yang luar biasa! Kamu punya kemampuan untuk melihat dunia dengan cara yang unik dan mengubah imajinasi menjadi karya nyata. Di era digital ini, kreativitas sepertimu sangat dibutuhkan untuk menciptakan produk dan konten yang tidak hanya fungsional, tapi juga indah dan menginspirasi. Jangan pernah biarkan siapapun mematikan api kreatifmu. Terus eksplorasi, terus berkarya, dan ingat: setiap desainer hebat, setiap creator sukses, dulunya memulai dari titik yang sama sepertimu sekarang. Dunia butuh sentuhan kreatif dari perempuan muslimah sepertimu! 🎨✨`,

	analytical: (name: string) =>
		`${name}, kemampuan analitismu adalah kekuatan super yang jarang dimiliki! Kamu punya mata yang tajam untuk detail, pikiran yang sistematis, dan kemampuan untuk memecahkan puzzle yang rumit. Di dunia yang penuh dengan data dan informasi, skill seperti ini adalah emas! Baik itu menjadi Data Analyst, AI Engineer, atau Cybersecurity Specialist, kemampuanmu untuk berpikir logis dan mendalam akan membawamu jauh. Remember: otak analitis sepertimu bisa memecahkan masalah-masalah besar yang akan mengubah dunia. Don't underestimate the power of your analytical mind! 📊🧠`,

	tech: (name: string) =>
		`${name}, passion-mu terhadap teknologi adalah modal awal yang sempurna untuk masa depan! Di era digital ini, tech savvy sepertimu adalah game changer. Kamu sudah punya fondasi yang kuat - sekarang tinggal diperdalam dan diasah. Mulai dari coding, exploring AI, atau bahkan bikin app sendiri - semua dimulai dari ketertarikan seperti yang kamu punya sekarang. Tech industry butuh lebih banyak perempuan muslimah yang paham teknologi dan punya values yang kuat. You could be the next tech innovator that changes how Muslims interact with technology! Keep coding, keep building! 💻🚀`,

	social: (name: string) =>
		`${name}, kemampuan sosial dan komunikasimu adalah aset yang sangat berharga! Dalam dunia teknologi, technical skill memang penting, tapi kemampuan untuk berkolaborasi, memimpin tim, dan mengkomunikasikan ide dengan baik adalah yang membedakan leader dengan follower. Kamu bisa jadi Project Manager, Digital Marketing Specialist, atau Content Creator yang menginspirasi jutaan orang. Your voice matters, your leadership matters. Gunakan kemampuan sosialmu untuk membangun komunitas, menyebarkan kebaikan, dan memimpin perubahan positif di dunia digital! 🌟👥`,

	leader: (name: string) =>
		`${name}, jiwa kepemimpinanmu sudah terlihat dari sekarang! Leader bukan tentang yang paling pintar atau paling cepat - tapi tentang yang paling berani memulai, yang bisa menginspirasi orang lain, dan yang punya vision untuk masa depan. Dengan kemampuan organize dan koordinasi yang kamu punya, kamu bisa jadi Tech Entrepreneur yang membangun startup, Project Manager yang memimpin tim international, atau Educator yang menginspirasi generasi. Dream big, start small, but START! The world needs more young Muslim women leaders like you! 👑🎯`,

	builder: (name: string) =>
		`${name}, kamu adalah builder sejati! Passion-mu untuk menciptakan sesuatu, untuk mengubah ide menjadi realita, adalah DNA seorang innovator. Baik itu build aplikasi, design produk, atau start bisnis - kamu punya mindset yang tepat. Di dunia tech, builder mentality sepertimu adalah foundation untuk kesuksesan. Start dengan project kecil, learn from failures, iterate quickly. Remember: semua produk besar - dari Instagram sampai Gojek - dimulai dari seseorang yang berani BUILD. Your ideas can change the world, so start building now! 🏗️💡`
};

export function generatePersonalMotivation(firstName: string, answers: string[]): string {
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

	const dominant = Object.keys(traits).reduce((a, b) =>
		traits[a as keyof typeof traits] > traits[b as keyof typeof traits] ? a : b
	);

	return personalMotivations[dominant]
		? personalMotivations[dominant](firstName)
		: personalMotivations.creative(firstName);
}
