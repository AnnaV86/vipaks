import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box, IconButton, Input } from '@mui/material';
import { Search } from '@mui/icons-material';

import { addUserTeam } from '@src/store/reducers/team';
import { ITeamUser } from '@src/models';
import { useSelector } from '@src/utils/useSelector';
import { OtherUserCard } from './components';

interface IOtherUsers {
	users: ITeamUser[];
}

export const OtherUsers: FC<IOtherUsers> = ({ users }) => {
	const dispatch = useDispatch();
	const { team } = useSelector((state) => state.team);
	const [usersData, setUsersData] = useState<ITeamUser[]>([]);
	const [searchText, setSearchText] = useState('');

	const addUser = useCallback((user: ITeamUser) => {
		if (team.find((item) => item.id === user.id)) return;
		dispatch(addUserTeam(user));
	}, []);

	const searchUsers = () => {
		const filteredUsers = users.filter((user) => user.login.includes(searchText));
		setUsersData(filteredUsers);
	};

	const changeText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		if (users)
			if (searchText) {
				searchUsers();
			} else setUsersData(users);
	}, [users]);

	return (
		<Box sx={{ marginTop: 2, p: 2, borderRadius: 2, boxShadow: '2px 2px 2px 2px #32CD32', backgroundColor: 'white' }}>
			<Typography fontSize={24} fontWeight={600}>
				Пользователи
			</Typography>
			<Input type="text" value={searchText} onChange={changeText} sx={{ marginTop: 5, marginBottom: 3 }} />
			<IconButton onClick={searchUsers}>
				<Search />
			</IconButton>
			<Box>
				{usersData?.map((user) => (
					<OtherUserCard key={user.id} user={user} addUser={addUser} />
				))}
			</Box>
		</Box>
	);
};
