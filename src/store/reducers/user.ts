import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFollower, IRepository, IUser } from '@src/models';

export interface IUserState {
	user: IUser | null;
	repositories: IRepository[];
	followers: IFollower[];
	isFetching: boolean;
	error: string;
}

const initialState: IUserState = {
	user: null,
	repositories: [],
	followers: [],
	isFetching: false,
	error: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
		setRepositories: (state, action: PayloadAction<IRepository[]>) => {
			state.repositories = action.payload;
		},
		setFollowers: (state, action: PayloadAction<any[]>) => {
			state.followers = action.payload;
		},
		isFetching: (state, action: PayloadAction<boolean>) => {
			state.isFetching = action.payload;
		},
		setLanguages: (state, action: PayloadAction<{ id: number; languages: { [key: string]: number } }>) => {
			state.repositories = state.repositories.map((repository) =>
				repository.id === action.payload.id
					? { ...repository, languages: Object.keys(action.payload.languages).join(', ') }
					: repository,
			);
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { setUser, setRepositories, setFollowers, setLanguages, isFetching, setError } = userSlice.actions;
export default userSlice.reducer;
