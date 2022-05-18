import moment from 'moment';
import { useEffect, useState } from 'react';

import SkeletonCard from './../SkeletonCard';

function getData(post) {
	// {title, episode} = parseTitle(post.title);
	// searchResults = searchAnilistTitle(title);

	let dateCreated = new Date(post.data.created * 1000);
	return (
		<li
			key={post.data.title}
			className='relative group cursor-pointer select-none'>
			<a href={post.data.url}>
				<div className='block w-full aspect-w-2 aspect-h-3 rounded-lg bg-slate-100 group-hover:ring-2 group-hover:ring-slate-100 overflow-hidden select-none'>
					<img
						src='https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'
						alt=''
						className='object-cover pointer-events-none select-none'
					/>
				</div>
				<p className='mt-2 block text-sm font-medium text-slate-100 truncate pointer-events-none select-none'>
					{post.data.title}
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					{post.data.title}
				</p>
				<p className='block text-sm font-medium text-slate-300 truncate pointer-events-none select-none'>
					{moment(dateCreated).fromNow()}
				</p>
			</a>
		</li>
	);
}

export default function RecentThreads() {
	const [data, setData] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fetch('https://www.reddit.com/user/AutoLovepon.json')
			.then((res) => res.json())
			.then((data) => {
				setData(data);
			});
	}, []);

	useEffect(() => {
		if (data) {
			let fData = data.data.children.filter(
				(post) => post.data.link_flair_text === 'Episode'
			);
			setFilteredData(fData);
			setLoading(false);
		}
	}, [data]);

	if (isLoading) {
		let emptyArray = new Array(4).fill(0);
		console.log(emptyArray);
		return (
			<div className='w-full py-5'>
				<div className='text-4xl font-semibold text-slate-100 py-5'>
					Recent Threads
				</div>
				<ul
					role='list'
					className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
					{emptyArray.map(() => (
						<SkeletonCard />
					))}
				</ul>
			</div>
		);
	}

	return (
		<div className='w-full py-5'>
			<div className='text-4xl font-semibold text-slate-100 py-5'>
				Recent Threads
			</div>
			<ul
				role='list'
				className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
				{filteredData.slice(0, 4).map((post) => getData(post))}
			</ul>
		</div>
	);
}
