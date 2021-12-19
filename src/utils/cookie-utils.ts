export class CookieUtils {
	public static getCookie(name: string): string | undefined {
		const matches = document.cookie.match(
			new RegExp(
				`(?:^|; )${name.replace(
					/([.$?*|{}()[\]\\/+^])/g,
					'\\$1'
				)}=([^;]*)`
			)
		);

		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	public static setCookie(
		name: string,
		value: string,
		options: Record<string, string | boolean | number | Date>
	): void {
		const cookieOptions = {
			path: '/',
			...options
		};

		if (options['expires'] instanceof Date) {
			options['expires'] = options['expires'].toUTCString();
		}

		let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
			value
		)}`;

		for (const optionKey in cookieOptions) {
			if (Object.hasOwnProperty.call(cookieOptions, optionKey)) {
				updatedCookie += `; ${optionKey}`;

				const optionValue = options[optionKey];

				if (optionValue !== true) {
					updatedCookie += `=${optionValue}`;
				}
			}
		}

		document.cookie = updatedCookie;
	}

	public static deleteCookie(name: string): void {
		this.setCookie(name, '', {
			'max-age': -1
		});
	}
}
