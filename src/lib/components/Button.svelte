<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronRight, ChevronLeft, MagnifyingGlass } from '@steeze-ui/heroicons';

	export let icon: 'rightChevron' | 'leftChevron' | 'search';
	export let colour: 'primary' | 'secondary';
	export let link: string;

	let iconMapping = {
		rightChevron: ChevronRight,
		leftChevron: ChevronLeft,
		search: MagnifyingGlass
	};
</script>

<a
	href={link}
	class={`btn btn-base rounded-lg w-full !ring-0 ${
		colour === 'primary' ? 'btn-ghost-primary' : 'btn-ghost-secondary'
	}`}
>
	<Icon src={iconMapping[icon]} size="40" />
</a>
