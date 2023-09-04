import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Accordion, AccordionDetails, AccordionSummary, Box, Link, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { IRepository } from '@src/models';
import { formattedDate } from '@src/utils/formattedDate';
import { getLanguagesThunk } from '@src/store/actionsThunk';

interface IRepositories {
	repositories: IRepository[];
}

export const RepositoryCard = ({ repository }: { repository: IRepository }) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);

	const open = (isOpenAccordion: boolean) => {
		if (isOpenAccordion && !repository.languages) {
			dispatch(getLanguagesThunk(repository.id, repository.name));
		}
		setIsOpen((prev) => !prev);
	};

	return (
		<Accordion
			style={{ backgroundColor: 'unset', boxShadow: '2px 2px 2px 2px yellow', borderRadius: 4 }}
			onClick={() => open(!isOpen)}
		>
			<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
				<Typography fontSize={16} fontWeight={600}>
					Название:{' '}
					<Link
						style={{ fontWeight: 400, color: 'black', textDecorationColor: 'black' }}
						href={repository.html_url}
						target="_blank"
					>
						{repository.name}
					</Link>
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{repository.description && (
					<Typography fontSize={16} fontWeight={600}>
						Описание: <span style={{ fontWeight: 400 }}>{repository.description}</span>
					</Typography>
				)}
				<Typography fontSize={16} fontWeight={600}>
					Языки программирования: <span style={{ fontWeight: 400 }}>{repository.languages || 'язык не указан'}</span>
				</Typography>
				<Typography fontSize={16} fontWeight={600}>
					Дата создания: <span style={{ fontWeight: 400 }}>{formattedDate(repository.created_at)}</span>
				</Typography>
				<Typography fontSize={16} fontWeight={600}>
					Ссылка на клонирование репозитория: <span style={{ fontWeight: 400 }}>{repository.clone_url}</span>
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export const Repositories: FC<IRepositories> = ({ repositories }) => {
	return (
		<>
			<Typography fontSize={30} fontWeight={600}>
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
				{repositories.map((item) => (
					<RepositoryCard key={item.id} repository={item} />
				))}
			</Box>
		</>
	);
};
