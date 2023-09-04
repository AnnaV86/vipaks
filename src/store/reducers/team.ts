import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITeamUser } from '@src/models';

export interface ITeamState {
	team: ITeamUser[];
	users: ITeamUser[];
	isFetching: boolean;
	error: string;
}

const initialState: ITeamState = {
	team: [],
	users: [],
	isFetching: false,
	error: '',
};

const teamSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<ITeamUser[]>) => {
			state.users = action.payload;
		},
		addUserTeam: (state, action: PayloadAction<ITeamUser>) => {
			state.team = state.team.concat(action.payload);
			state.users = state.users.map((user) => (user.id === action.payload.id ? { ...user, in_team: true } : user));
		},
		deleteUserTeam: (state, action: PayloadAction<number>) => {
			state.team = state.team.filter(({ id }) => id !== action.payload);
			state.users = state.users.map((user) => (user.id === action.payload ? { ...user, in_team: false } : user));
		},
		isFetchingTeam: (state, action: PayloadAction<boolean>) => {
			state.isFetching = action.payload;
		},
		setErrorTeam: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { setUsers, addUserTeam, deleteUserTeam, isFetchingTeam, setErrorTeam } = teamSlice.actions;
export default teamSlice.reducer;
