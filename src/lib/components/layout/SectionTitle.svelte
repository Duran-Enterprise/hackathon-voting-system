<script lang="ts">
	export let sectionName: string;
	export let sticky: boolean = false;
</script>

<div class={sticky ? `mr-auto mt-14 sticky top-0 left-0 z-10 ` : 'mr-auto mt-14'}>
	<h1>{sectionName}</h1>
	<div class="divider" />
</div>
