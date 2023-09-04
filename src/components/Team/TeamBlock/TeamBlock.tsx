import { useDispatch } from 'react-redux';
import { Avatar, Box, IconButton, Link, Typography } from '@mui/material';
import { RemoveCircleOutline } from '@mui/icons-material';

import { deleteUserTeam } from '@src/store/reducers/team';
import { useSelector } from '@src/utils/useSelector';

export const TeamBlock = () => {
	const dispatch = useDispatch();
	const { team } = useSelector((state) => state.team);

	const deleteUser = (id: number) => {
		dispatch(deleteUserTeam(id));
	};

	return (
		<Box>
			<Typography fontSize={24} fontWeight={600}>
				Моя команда
			</Typography>

			{team.map((user) => (
				<Box key={user.id} sx={{ pt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
					<Avatar variant="circular" src={user.avatar_url}></Avatar>
					<Link
						href={user.html_url}
						target="_blank"
						style={{ fontWeight: 600, color: 'black', textDecoration: 'none' }}
					>
						{user.login}
					</Link>
					<IconButton onClick={() => deleteUser(user.id)}>
						<RemoveCircleOutline />
					</IconButton>
				</Box>
			))}
		</Box>
	);
};
