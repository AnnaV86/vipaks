import { Dispatch } from 'redux';
import { isFetching, setError, setFollowers, setLanguages, setRepositories, setUser } from '../reducers/user';
import { setUsers, setErrorTeam, isFetchingTeam } from '../reducers/team';
import { api } from '@src/api';

export function getUserThunk() {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(setError(''));
			dispatch(isFetching(true));

			const [user, repositories, followers] = await Promise.all([
				api.getUser(),
				api.getUserRepositories(),
				api.getUserFollowing(),
			]);

			dispatch(setUser(user?.data));
			dispatch(setRepositories(repositories?.data));
			dispatch(setFollowers(followers?.data));
		} catch (e) {
			dispatch(setError('Что-то пошло не так...'));
		} finally {
			dispatch(isFetching(false));
		}
	};
}

export function getLanguagesThunk(id: number, repositoryName: string) {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(setError(''));
			const res = await api.getLanguages(repositoryName);
			dispatch(setLanguages({ id, languages: res?.data }));
		} catch (e) {
			dispatch(setError('Что-то пошло не так...'));
		}
	};
}

export function getTeamUsersThunk() {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(isFetchingTeam(true));
			dispatch(setErrorTeam(''));
			const res = await api.getTeamUsers({ since: '50000000' });
			dispatch(setUsers(res?.data));
		} catch (e) {
			dispatch(setErrorTeam('Что-то пошло не так...'));
		} finally {
			dispatch(isFetchingTeam(false));
		}
	};
}
