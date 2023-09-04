import React, { FC, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Link, Typography, LinearProgress, Box } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import { IRepository } from '@src/models';
import { formattedDate } from '@src/utils/formattedDate';

import styles from './RepositoryCard.module.scss';

interface IRepositoryCard {
	repository: IRepository;
	fetchLanguages: (repository: IRepository) => Promise<void>;
}

export const RepositoryCard: FC<IRepositoryCard> = React.memo(({ repository, fetchLanguages }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const openAccordion = async () => {
		if (!isOpen && !repository.languages) {
			setIsFetching(true);
			await fetchLanguages(repository);
			setIsFetching(false);
		}
		setIsOpen((prev) => !prev);
	};

	return (
		<Accordion
			style={{ backgroundColor: 'unset', boxShadow: '2px 2px 2px 2px yellow', borderRadius: 4 }}
			className={styles.accordionContainer}
			onClick={openAccordion}
		>
			<AccordionSummary expandIcon={<ArrowDropDown />}>
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
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography fontSize={16} fontWeight={600}>
						Языки программирования:
					</Typography>
					{!isFetching ? (
						<span style={{ fontWeight: 400 }}>{repository.languages || 'язык не найден'}</span>
					) : (
						<LinearProgress color="inherit" sx={{ width: 60 }} />
					)}
				</Box>

				<Typography fontSize={16} fontWeight={600}>
					Дата создания: <span style={{ fontWeight: 400 }}>{formattedDate(repository.created_at)}</span>
				</Typography>
				<Typography fontSize={16} fontWeight={600}>
					Ссылка на клонирование репозитория: <span style={{ fontWeight: 400 }}>{repository.clone_url}</span>
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
});
