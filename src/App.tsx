import './i18n';
import './App.css';
import '@fontsource/roboto/500.css';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Provider } from 'react-redux';
import { store } from './redux';
import { RouterProvider } from 'react-router';
import router from './routes';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
				<ToastContainer
					role="toast"
					position="top-right"
					closeOnClick
					pauseOnHover
					pauseOnFocusLoss={false}
				/>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
