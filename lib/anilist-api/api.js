import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://graphql.anilist.co', {
	redirect: 'follow',
});

const api = (query, variables) =>
	client
		.request(query, variables)
		.then((data) => data)
		.catch((error) => ({
			error: error || 'Unknown Error',
		}));

export default api;
