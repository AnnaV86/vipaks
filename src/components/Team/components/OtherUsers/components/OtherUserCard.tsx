import React, { FC } from 'react';
import { Avatar, Box, IconButton, Link, Typography } from '@mui/material';

import { ITeamUser } from '@src/models';
import { AddCircleOutline, Check } from '@mui/icons-material';

interface IOtherUserCard {
	user: ITeamUser;
	addUser: (user: ITeamUser) => void;
}

export const OtherUserCard: FC<IOtherUserCard> = React.memo(({ user, addUser }) => {
	const addUserTeam = () => {
		addUser(user);
	};

	return (
		<Box key={user.id} sx={{ pt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
			<Avatar variant="circular" src={user.avatar_url}></Avatar>
			<div>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '37px' }}>
					<Typography>Логин: {user.login}</Typography>{' '}
					{user.in_team ? (
						<Check />
					) : (
						<IconButton onClick={addUserTeam}>
							<AddCircleOutline />
						</IconButton>
					)}
				</Box>
				<Link href={user.html_url} target="_blank">
					Ссылка: {user.html_url}
				</Link>
			</div>
		</Box>
	);
});
