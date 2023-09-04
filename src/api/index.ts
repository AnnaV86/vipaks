import { axios } from './axios';

export const api = {
	async getUser() {
		try {
			const response = await axios.get('users/AnnaV86');
			return response;
		} catch (error) {
			console.error(error);
		}
	},
	async getUserRepositories() {
		try {
			const response = await axios.get('users/AnnaV86/repos');
			return response;
		} catch (error) {
			console.error(error);
		}
	},
	async getUserFollowing() {
		try {
			const response = await axios.get('users/AnnaV86/following');
			return response;
		} catch (error) {
			console.error(error);
		}
	},
	async getLanguages(data: string) {
		try {
			const response = await axios.get(`repos/AnnaV86/${data}/languages`);
			return response;
		} catch (error) {
			console.error(error);
		}
	},
	async getTeamUsers(params?: Record<string, string>) {
		try {
			const response = await axios.get(`users`, { params });
			return response;
		} catch (error) {
			console.error(error);
		}
	},
};
