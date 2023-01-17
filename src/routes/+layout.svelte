<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, Toast } from '@skeletonlabs/skeleton';
</script>

<Toast position="tr" />

<AppShell>
	<div class="max-w-3xl md:max-w-6xl mx-auto py-16 px-6 lg:px-8 select-none flex flex-col h-full">
		<slot />
	</div>
</AppShell>
