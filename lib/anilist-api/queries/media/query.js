import { gql } from 'graphql-request';

const query = gql`
	query ($search: String) {
		Media(search: $search, type: ANIME, isAdult: false) {
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
`;

export default query;
