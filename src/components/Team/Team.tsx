import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Header } from '../Header';
import { TeamBlock } from './TeamBlock';
import { OtherUsers } from './OtherUsers';
import { getTeamUsersThunk } from '@src/store/actionsThunk';
import { useSelector } from '@src/utils/useSelector';

import styles from './Team.styles.scss';
import { Box, CircularProgress, Typography } from '@mui/material';

export const Team = () => {
	const dispatch = useDispatch();
	const { users, isFetching, error } = useSelector((state) => state.team);
	useEffect(() => {
		dispatch(getTeamUsersThunk());
	}, []);

	return (
		<div className={styles.container}>
			<Header />
			{!isFetching ? (
				<section className={styles.content}>
					<TeamBlock />
					<OtherUsers users={users} />
				</section>
			) : (
				<Box sx={{ p: 2, marginTop: 15, display: 'flex', justifyContent: 'center' }}>
					<CircularProgress color={'inherit'} />
				</Box>
			)}
			{error && <Typography color={'red'}>{error}</Typography>}
		</div>
	);
};
