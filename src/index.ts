import { loadHandler } from './load-handler';

/**
 * Входная точка приложения
 */
const init = () => {
	window.addEventListener('load', loadHandler);
};

init();
