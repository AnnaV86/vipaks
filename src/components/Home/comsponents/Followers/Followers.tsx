import { FC } from 'react';
import { Avatar, Box, Typography, Link } from '@mui/material';
import { IFollower } from '@src/models';

interface IFollowers {
	followers: IFollower[];
}

export const FollowersCard = ({ follower }: { follower: IFollower }) => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				gap: 2,
				alignItems: 'center',
			}}
		>
			<Avatar variant="circular" src={follower?.avatar_url}></Avatar>
			<Link
				style={{ fontWeight: 600, color: 'black', textDecorationColor: 'black' }}
				href={follower?.html_url}
				target="_blank"
			>
				{follower.login}
			</Link>
		</Box>
	);
};

export const Followers: FC<IFollowers> = ({ followers }) => {
	return (
		<div style={{ marginTop: 40 }}>
			<Typography fontSize={30} fontWeight={600}>
				Мои подписчики
			</Typography>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					gap: 2,
					justifyContent: 'center',
					flexDirection: 'column',
					flexWrap: 'wrap',
					marginTop: 3,
				}}
			>
				{followers.map((item) => (
					<FollowersCard key={item.id} follower={item} />
				))}
			</Box>
		</div>
	);
};
