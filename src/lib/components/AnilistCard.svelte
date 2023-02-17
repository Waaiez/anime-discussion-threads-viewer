<script lang="ts">
	// TODO: better type for anilist result
	export let result: any;
</script>

<li class="relative cursor-pointer select-none">
	<a href={'/anime/' + result.id} class="group card">
		<div class="bg-transparent">
			<div class="shadow-xl group-hover:ring-2 group-hover:ring-slate-100 rounded-lg">
				<figure class="aspect-w-2 aspect-h-3 ">
					<img
						src={result.coverImage.large}
						alt={result.title.romaji}
						class="object-cover rounded-lg"
					/>
				</figure>
			</div>

			<div class="select-none card-body !p-0">
				<p class="block mt-2 truncate pointer-events-none !text-slate-100">
					{@html result.title.romaji}
				</p>
			</div>
		</div>
	</a>
</li>
