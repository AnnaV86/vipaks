import { Route, Routes } from 'react-router-dom';

import { Home } from '@src/components/Home';
import { Team } from '@src/components/Team';

export const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/team" element={<Team />} />
		</Routes>
	);
};
