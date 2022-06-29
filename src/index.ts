import { loadHandler } from './load-handler';

/**
 * Входная точка приложения
 */
const init = (uuid: string) => {
	window.addEventListener('load', loadHandler.bind(this, uuid));
};

export { init };
