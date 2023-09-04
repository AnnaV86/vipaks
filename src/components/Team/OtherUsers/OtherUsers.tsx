import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Typography, Link, Box, IconButton, Input } from '@mui/material';
import { AddCircleOutline, Search, Check } from '@mui/icons-material';
import { addUserTeam } from '@src/store/reducers/team';

import { ITeamUser } from '@src/models';
import { useSelector } from '@src/utils/useSelector';

interface IOtherUsers {
	users: ITeamUser[];
}

export const OtherUsers: FC<IOtherUsers> = ({ users }) => {
	const dispatch = useDispatch();
	const { team } = useSelector((state) => state.team);
	const [usersData, setUsersData] = useState(users);
	const [searchText, setSearchText] = useState('');

	const addUser = (user: ITeamUser) => {
		if (team.find((item) => item.id === user.id)) return;
		dispatch(addUserTeam(user));
	};

	const searchUsers = () => {
		const filteredUsers = users.filter((user) => user.login.includes(searchText));
		setUsersData(filteredUsers);
	};

	const changeText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		if (users) setUsersData(users);
	}, [users]);

	return (
		<Box>
			<Typography fontSize={24} fontWeight={600}>
				Пользователи
			</Typography>
			<Input type="text" value={searchText} onChange={changeText} />
			<IconButton onClick={searchUsers}>
				<Search />
			</IconButton>
			<Box>
				{usersData.map((user) => (
					<Box key={user.id} sx={{ pt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
						<Avatar variant="circular" src={user.avatar_url}></Avatar>
						<div>
							<Typography>Логин: {user.login}</Typography>
							<Link href={user.html_url} target="_blank">
								Ссылка: {user.html_url}
							</Link>
						</div>
						{user.in_team ? (
							<Check />
						) : (
							<IconButton onClick={() => addUser(user)}>
								<AddCircleOutline />
							</IconButton>
						)}
					</Box>
				))}
			</Box>
		</Box>
	);
};
