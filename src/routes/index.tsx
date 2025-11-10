import RootLayout from '@/layouts/RootLayout';
import ErrorPage from '@/pages/Error';
import HomePage from '@/pages/Home';
import PokemonPage from '@/pages/Pokemon';
import { createBrowserRouter } from 'react-router';

export const RoutePlaceholder = {
	POKEMON_NAME: ':pokName',
};

export const PageRoute = {
	POKEMON: `pokemon/${RoutePlaceholder.POKEMON_NAME}`,
};

const router = createBrowserRouter([
	{
		Component: RootLayout,
		ErrorBoundary: ErrorPage,
		hasErrorBoundary: true,
		children: [
			{
				path: '/',
				index: true,
				Component: HomePage,
			},
			{
				path: PageRoute.POKEMON,
				Component: PokemonPage,
			},
		],
	},
]);

export default router;
