import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import teamReducer from './reducers/team';

import thunk from 'redux-thunk';

const store = configureStore({
	reducer: {
		user: userReducer,
		team: teamReducer,
	},
	middleware: [thunk],
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
