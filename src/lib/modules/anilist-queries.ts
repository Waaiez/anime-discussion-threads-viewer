import { gql } from 'graphql-request';

// anilist query to search by id and get cover image
export const querySearchById = gql`
	query ($id: Int) {
		Media(id: $id, type: ANIME) {
			id
			title {
				romaji
			}
			coverImage {
				extraLarge
				large
			}
		}
	}
`;

// anilist query to search by string and get cover image
export const querySearchByString = gql`
	query ($search: String) {
		Page(page: 1) {
			media(search: $search, type: ANIME, isAdult: false) {
				id
				title {
					romaji
				}
				coverImage {
					large
				}
			}
		}
	}
`;

// anilist query to get trending anime
export const queryTrending = gql`
	{
		Page(page: 1, perPage: 4) {
			media(type: ANIME, sort: [TRENDING_DESC]) {
				id
				title {
					romaji
				}
				coverImage {
					large
				}
			}
		}
	}
`;
