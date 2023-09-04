import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';

import { useSelector } from '@src/utils/useSelector';
import { ITeamUser } from '@src/models';
import { TeamUser } from './components/TeamUser';
import { deleteUserTeam } from '@src/store/reducers/team';

enum SortType {
	ALPHABET = 'A...Z',
	REVERSE = 'Z...A',
}

const options = [SortType.ALPHABET, SortType.REVERSE];

export const TeamBlock = () => {
	const [teamData, setTeamData] = useState<ITeamUser[]>([]);
	const { team } = useSelector((state) => state.team);
	const dispatch = useDispatch();

	const deleteUser = useCallback((id: number) => {
		dispatch(deleteUserTeam(id));
	}, []);

	const sortTeam = (e: React.SyntheticEvent<Element, Event>) => {
		if (!e.currentTarget.textContent) {
			setTeamData(team);
		}

		if (e.currentTarget.textContent === SortType.ALPHABET) {
			const sortTeam = [...team].sort((a, b) => a.login.localeCompare(b.login));
			setTeamData(sortTeam);
		}

		if (e.currentTarget.textContent === SortType.REVERSE) {
			const sortTeam = [...team].sort((a, b) => b.login.localeCompare(a.login));
			setTeamData(sortTeam);
		}
	};

	useEffect(() => {
		if (team) setTeamData(team);
	}, [team]);

	return (
		<Box>
			<Typography fontSize={24} fontWeight={600}>
				Моя команда
			</Typography>
			<Autocomplete
				disablePortal
				id="sort"
				options={options}
				sx={{ width: 200, height: 40, marginTop: 2, marginBottom: 5 }}
				renderInput={(params) => <TextField {...params} label="Сортировать" />}
				onChange={sortTeam}
			/>
			{teamData.length ? (
				teamData.map((user) => <TeamUser key={user.id} user={user} deleteUser={deleteUser} />)
			) : (
				<Typography fontSize={16} fontWeight={600}>
					Команда не выбрана
				</Typography>
			)}
		</Box>
	);
};
