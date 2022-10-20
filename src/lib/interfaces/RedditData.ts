export interface RedditPost {
	kind: string;
	data: {
		link_flair_text: string;
		selftext: string;
		title: string;
		url: string;
		created: number;
	};
}

export interface RedditData {
	kind: string;
	data: {
		after: string | null;
		children: RedditPost[];
		before: string | null;
	};
}
