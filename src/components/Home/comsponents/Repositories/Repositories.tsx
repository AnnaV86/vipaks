import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';

import { IRepository } from '@src/models';
import { RepositoryCard } from './components/RepositoryCard';
import { getLanguagesThunk } from '@src/store/actionsThunk';

interface IRepositories {
	repositories: IRepository[];
}

export const Repositories: FC<IRepositories> = ({ repositories }) => {
	const dispatch = useDispatch();

	const fetchLanguages = useCallback(async (repository: IRepository) => {
		await dispatch(getLanguagesThunk(repository.id, repository.name));
	}, []);

	return (
		<>
			<Typography fontSize={30} fontWeight={600} style={{ marginTop: 40 }}>
				Мои репозитории
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
				{repositories.length ? (
					repositories.map((item) => <RepositoryCard key={item.id} repository={item} fetchLanguages={fetchLanguages} />)
				) : (
					<Typography fontSize={16} fontWeight={600}>
						Нет репозиториев
					</Typography>
				)}
			</Box>
		</>
	);
};
