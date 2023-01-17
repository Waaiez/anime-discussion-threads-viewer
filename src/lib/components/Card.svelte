<script lang="ts">
	let urls = [
		'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg',
		'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145139-Z4DjPTGNyuDj.jpg',
		'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx125367-bl5vGalMH2cC.png',
		'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.png',
		'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx129201-HJBauga2be8I.png'
	];
</script>

<div class="relative rounded-xl overflow-hidden">
	<img
		src={urls[Math.floor(Math.random() * urls.length)]}
		class="object-cover h-96 w-full"
		alt=""
	/>
	<div class="space-y-2">
		<div class="w-3/4 h-4 rounded-xl bg-surface-900 mt-4" />
		<div class="w-2/4 h-4 rounded-xl bg-surface-900" />
		<div class="w-1/4 h-4 rounded-xl bg-surface-900" />
	</div>
</div>
