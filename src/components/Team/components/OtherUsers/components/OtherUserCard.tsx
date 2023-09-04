import React, { FC } from 'react';
import { Avatar, Box, IconButton, Link, Typography } from '@mui/material';
import { AddCircleOutline, Check } from '@mui/icons-material';

import { ITeamUser } from '@src/models';

import styles from './OtherUserCard.module.scss';

interface IOtherUserCard {
	user: ITeamUser;
	addUser: (user: ITeamUser) => void;
}

export const OtherUserCard: FC<IOtherUserCard> = React.memo(({ user, addUser }) => {
	const addUserTeam = () => {
		addUser(user);
	};

	return (
		<Box className={styles.container}>
			<Avatar variant="circular" src={user.avatar_url}></Avatar>
			<div>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '37px' }}>
					<Typography>{user.login}</Typography>{' '}
					{user.in_team ? (
						<Check />
					) : (
						<IconButton onClick={addUserTeam}>
							<AddCircleOutline />
						</IconButton>
					)}
				</Box>
				<Link href={user.html_url} target="_blank">
					{user.html_url}
				</Link>
			</div>
		</Box>
	);
});
