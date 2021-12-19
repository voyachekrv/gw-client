import { CookieUtils, FetchUtils, UUIDUtils } from './utils';
import { SchemaParser } from './parser';

const COOKIE_VISITOR = 'visitorId';

type RequestBody = { [p: string]: string | null; visitorId: string };

export const loadHandler = async (): Promise<void> => {
	if (CookieUtils.getCookie(COOKIE_VISITOR) === undefined) {
		CookieUtils.setCookie(COOKIE_VISITOR, UUIDUtils.getUUID(), {
			expires: 'Fri, 31 Dec 9999 23:59:59 GMT'
		});
	}

	const visitor = CookieUtils.getCookie(COOKIE_VISITOR);

	const itemProps = new SchemaParser().getData();

	if (Object.keys(itemProps).length > 0 && visitor) {
		const requestBody: RequestBody = {
			visitorId: visitor,
			...itemProps
		};

		console.log('Request body: ', requestBody);

		const response = await FetchUtils.post(requestBody);

		console.log(response);
	}
};
