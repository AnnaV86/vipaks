export interface IUser {
	avatar_url: string;
	bio: null;
	blog: string;
	company: null;
	created_at: string;
	email: null;
	events_url: string;
	followers: number;
	followers_url: string;
	following: number;
	following_url: string;
	gists_url: string;
	gravatar_id: '';
	hireable: null;
	html_url: string;
	id: number;
	location: string;
	login: string;
	name: string;
	node_id: string;
	organizations_url: string;
	public_gists: number;
	public_repos: number;
	received_events_url: string;
	repos_url: string;
	site_admin: false;
	starred_url: string;
	subscriptions_url: string;
	twitter_username: null;
	type: string;
	updated_at: string;
	url: string;
}

export interface IRepository {
	id: number;
	name: string;
	html_url: string;
	description?: string;
	languages_url?: string;
	created_at: string;
	clone_url: string;
	languages?: string;
}

export interface IFollower {
	id: number;
	avatar_url: string;
	login: string;
	html_url: string;
}

export interface ITeamUser {
	id: number;
	avatar_url: string;
	login: string;
	html_url: string;
	in_team?: boolean;
}
