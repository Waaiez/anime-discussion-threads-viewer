import { gql } from 'graphql-request';

const query = gql`
	query ($search: String, $page: Int = 1) {
		Page(page: $page) {
			pageInfo {
				hasNextPage
				total
			}
			media(
				search: $search
				type: ANIME
				isAdult: false
				sort: [TRENDING_DESC]
			) {
				id
				siteUrl
				title {
					romaji
				}
				coverImage {
					large
				}
				status(version: 2)
				description(asHtml: true)
				averageScore
			}
		}
	}
`;

export default query;
