import Box from '@mui/material/Box';
import { Outlet } from 'react-router';

const RootLayout = () => {
	return (
		<Box p={2}>
			<Outlet />
		</Box>
	);
};

export default RootLayout;
