import { useRouter } from 'next/router';

import { AnimeDetails } from '../../components';

export default function Anime() {
	const router = useRouter();

	return <AnimeDetails id={router.query.id} />;
}
