import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Header } from '../Header';
import { TeamBlock } from './components/TeamBlock';
import { OtherUsers } from './components/OtherUsers';
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
			{isFetching ? (
				<Box sx={{ p: 2, marginTop: 15, display: 'flex', justifyContent: 'center' }}>
					<CircularProgress color={'inherit'} />
				</Box>
			) : (
				<section className={styles.content}>
					<TeamBlock />
					<OtherUsers users={users} />
				</section>
			)}
			<Typography fontSize={20} sx={{ display: 'flex', justifyContent: 'center', color: 'red', marginTop: 10 }}>
				{error}
			</Typography>
		</div>
	);
};
