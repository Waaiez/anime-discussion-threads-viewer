import { gql } from 'graphql-request';

const index = gql`
	query ($search: String, $page: Int = 1, $sort: [MediaSort], $id: Int) {
		Page(page: $page) {
			pageInfo {
				hasNextPage
				total
			}
			media(
				search: $search
				type: ANIME
				isAdult: false
				sort: $sort
				id: $id
			) {
				id
				siteUrl
				title {
					romaji
				}
				coverImage {
					extraLarge
					large
				}
				status(version: 2)
				description(asHtml: true)
				averageScore
			}
		}
	}
`;

export default index;
