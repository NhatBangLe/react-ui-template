import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '.';

export function pokemonResponseMapping(response: PokemonResponse) {
	return response as Pokemon;
}

export const pokemonApi = createApi({
	reducerPath: 'pokemonApi',
	baseQuery: axiosBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
	tagTypes: ['Pokemon', 'UNKNOWN_ERROR'],
	endpoints: (builder) => ({
		getPokemonByName: builder.query<Pokemon, string>({
			query: (name) => ({ url: `/pokemon/${name}`, method: 'GET' }),
			transformResponse(returnValue: PokemonResponse) {
				return pokemonResponseMapping(returnValue);
			},
			providesTags(result, _error, arg) {
				return result
					? [{ type: 'Pokemon', id: arg }]
					: [{ type: 'UNKNOWN_ERROR' }];
			},
		}),
		getPokemons: builder.query<Pagination<Pokemon>, PaginationParams>({
			query: ({ pageIndex, pageSize }) => ({
				url: '/pokemon/',
				params: {
					offset: pageIndex,
					limit: pageSize,
				},
			}),
			transformResponse(rawReturnValue, _meta, arg) {
				const returnValue = rawReturnValue as {
					count: number;
					next: string | null;
					previous: string | null;
					results: PokemonResponse[];
				};

				return {
					data: returnValue.results.map(pokemonResponseMapping),
					pageIndex: arg.pageIndex,
					pageSize: arg.pageSize,
					totalElements: returnValue.count,
					first: returnValue.previous === null,
					last: returnValue.next === null,
				};
			},
			providesTags(result) {
				return result
					? [{ type: 'Pokemon', id: 'LIST' }]
					: [{ type: 'UNKNOWN_ERROR' }];
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;
