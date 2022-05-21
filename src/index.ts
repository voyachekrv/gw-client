import { loadHandler } from './load-handler';

/**
 * Входная точка приложения
 */
const init = (uuid: string) => {
	console.log(uuid);
	window.addEventListener('load', loadHandler);
};

export { init };
