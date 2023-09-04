import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.styles.scss';

export const Header = () => {
	return (
		<header className={styles.header}>
			<NavLink to={'/'} className={({ isActive }) => (isActive ? `${styles.item} ${styles.active}` : styles.item)}>
				Главная
			</NavLink>
			<NavLink to={'/team'} className={({ isActive }) => (isActive ? `${styles.item} ${styles.active}` : styles.item)}>
				Команда
			</NavLink>
		</header>
	);
};
