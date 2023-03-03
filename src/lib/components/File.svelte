<script lang="ts">
	export let name : string | undefined = undefined;
	$: type = name?.slice(name.lastIndexOf('.') + 1);


</script>

<span style="background-image: url(/src/lib/engine-assets/{type}.svg)">{name}</span>

<style>
	span {
		padding: 0 0 0 1.5em;
		background: 0 0.1em no-repeat;
		background-size: 1em 1em;
	}
</style>
