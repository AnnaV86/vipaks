import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Box, CircularProgress, Link, Typography } from '@mui/material';

import { Header } from '../Header';
import { Repositories } from './comsponents/Repositories';
import { formattedDate } from '@src/utils/formattedDate';
import { useSelector } from '@src/utils/useSelector';
import { IUser } from '@src/models';
import { getUserThunk } from '@src/store/actionsThunk';
import { Followers } from './comsponents/Followers';

import styles from './Home.module.scss';

export const Home = () => {
	const dispatch = useDispatch();
	const { user, repositories, followers, isFetching, error } = useSelector((state) => state.user);
	const [userData, setUserData] = useState<IUser | null>(null);

	useEffect(() => {
		if (!user) {
			dispatch(getUserThunk());
		} else setUserData(user);
	}, [user]);

	return (
		<div className={styles.container}>
			<Header />
			{!isFetching ? (
				user && (
					<section className={styles.content}>
						<div className={styles.nameBlock}>
							<Avatar variant="circular" src={userData?.avatar_url} />
							<Link
								sx={{ fontSize: 34, fontWeight: 700, color: '#000', marginLeft: 2, textDecoration: 'none' }}
								href={userData?.html_url}
								target="_blank"
							>
								{userData?.name}
							</Link>
						</div>
						<Typography fontSize={20} fontWeight={500} className={styles.date}>
							Профиль создан: {formattedDate(userData?.created_at)}
						</Typography>
						<Repositories repositories={repositories} />
						<Followers followers={followers} />
					</section>
				)
			) : (
				<Box sx={{ p: 2, marginTop: 15, display: 'flex', justifyContent: 'center' }}>
					<CircularProgress color={'inherit'} />
				</Box>
			)}
			{error && (
				<Typography fontSize={20} sx={{ display: 'flex', justifyContent: 'center', color: 'red', marginTop: 10 }}>
					{error}
				</Typography>
			)}
		</div>
	);
};
