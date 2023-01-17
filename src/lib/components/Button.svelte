<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Search, ArrowRightS, ArrowLeftS } from '@steeze-ui/remix-icons';

	export let icon: 'rightChevron' | 'leftChevron' | 'search';
	export let colour: 'primary' | 'secondary';
	export let link: string;

	let iconMapping = {
		rightChevron: ArrowRightS,
		leftChevron: ArrowLeftS,
		search: Search
	};
</script>

<a href={link} class={`btn btn-ghost-${colour} btn-base rounded-lg w-full !ring-0`}>
	<Icon src={iconMapping[icon]} size="40" />
</a>
