<script lang="ts">
	export let sectionName: string,
		h1Class: string = '',
		divClass: string = '';
</script>

<div class="mr-auto mt-14 {divClass}">
	<h1 class={h1Class}>{sectionName.toUpperCase()}</h1>
	<div class="divider" />
</div>
