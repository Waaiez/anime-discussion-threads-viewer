<script lang="ts">
	// TODO: better type for anilist result
	export let result: any;
</script>

<div class="relative group cursor-pointer h-full w-full">
	<a href={'/anime/' + result.id} class="group !no-underline flex flex-col justify-between">
		<img
			src={result.coverImage.large}
			alt={result.title.romaji + ' Poster'}
			class="hover:opacity-75 transition ease-in-out duration-150 object-cover h-96 w-full rounded-lg shadow-xl group-hover:ring-2 group-hover:ring-slate-100"
		/>
		<div class="space-y-1">
			<div class="mt-4 truncate text-slate-100">
				{@html result.title.romaji}
			</div>
		</div>
	</a>
</div>
