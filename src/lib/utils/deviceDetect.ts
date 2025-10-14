export function detectBrowser(userAgent: string): string {
	if (userAgent.includes('Firefox')) return 'Firefox';
	if (userAgent.includes('SamsungBrowser')) return 'Samsung Browser';
	if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
	if (userAgent.includes('Trident')) return 'Internet Explorer';
	if (userAgent.includes('Edge')) return 'Edge';
	if (userAgent.includes('Chrome')) return 'Chrome';
	if (userAgent.includes('Safari')) return 'Safari';
	return 'Unknown';
}

export function detectOS(userAgent: string): string {
	if (userAgent.includes('Windows NT 10.0')) return 'Windows 10';
	if (userAgent.includes('Windows NT 6.3')) return 'Windows 8.1';
	if (userAgent.includes('Windows NT 6.2')) return 'Windows 8';
	if (userAgent.includes('Windows NT 6.1')) return 'Windows 7';
	if (userAgent.includes('Windows')) return 'Windows';
	if (userAgent.includes('Mac OS X')) return 'macOS';
	if (userAgent.includes('Android')) return 'Android';
	if (userAgent.includes('Linux')) return 'Linux';
	if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
	return 'Unknown';
}

export function detectDeviceType(userAgent: string): string {
	if (userAgent.includes('Mobile') || userAgent.includes('Android')) return 'mobile';
	if (userAgent.includes('Tablet') || userAgent.includes('iPad')) return 'tablet';
	return 'desktop';
}

export function getDeviceInfo() {
	if (typeof navigator === 'undefined') {
		return {
			browser: 'Unknown',
			os: 'Unknown',
			deviceType: 'Unknown',
			userAgent: ''
		};
	}

	const userAgent = navigator.userAgent;

	return {
		browser: detectBrowser(userAgent),
		os: detectOS(userAgent),
		deviceType: detectDeviceType(userAgent),
		userAgent
	};
}
