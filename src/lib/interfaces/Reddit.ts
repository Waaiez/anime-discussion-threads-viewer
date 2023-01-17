export interface RedditPost {
	data: {
		link_flair_text: string;
		selftext: string;
		title: string;
		url: string;
		created: number;
	};
}

export interface RedditData {
	data: {
		after: string | null;
		children: RedditPost[];
		before: string | null;
	};
}
