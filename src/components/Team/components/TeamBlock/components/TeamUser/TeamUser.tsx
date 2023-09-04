import React, { FC } from 'react';
import { RemoveCircleOutline } from '@mui/icons-material';
import { Avatar, Box, IconButton, Link } from '@mui/material';

import { ITeamUser } from '@src/models';

interface ITeamUserCard {
	user: ITeamUser;
	deleteUser: (id: number) => void;
}

export const TeamUser: FC<ITeamUserCard> = React.memo(({ user, deleteUser }) => {
	const removeUser = () => {
		deleteUser(user.id);
	};

	return (
		<Box sx={{ pt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
			<Avatar variant="circular" src={user.avatar_url}></Avatar>
			<Link href={user.html_url} target="_blank" style={{ fontWeight: 600, color: 'black', textDecoration: 'none' }}>
				{user.login}
			</Link>
			<IconButton onClick={removeUser}>
				<RemoveCircleOutline />
			</IconButton>
		</Box>
	);
});
