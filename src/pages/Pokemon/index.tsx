import { RoutePlaceholder } from '@/routes';
import { useParams } from 'react-router';

const PokemonPage = () => {
	const params = useParams();

	return <div>Pokemon: {params[RoutePlaceholder.POKEMON_NAME]}</div>;
};

export default PokemonPage;
