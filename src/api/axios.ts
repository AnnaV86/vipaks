import initAxios from 'axios';

export const axios = initAxios.create({
	baseURL: `${'https://api.github.com'}/`,
});
