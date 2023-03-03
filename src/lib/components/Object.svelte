<script context="module" lang="ts">
  // retain module scoped expansion state for each tree node
  const _expansionState: any = {
    /* treeNodeId: expanded <boolean> */
  };
</script>

<script>
  //	import { slide } from 'svelte/transition'
  export let tree;
  const { label, children } = tree;

  let expanded = _expansionState[label] || false;
  const toggleExpansion = () => {
    expanded = _expansionState[label] = !expanded;
  };
  $: arrowDown = expanded;
</script>

<ul>
  <!-- transition:slide -->
  <li>
    {#if children}
      <!-- Arrow not toggled -->
      <span on:click={toggleExpansion}>
        <span class="arrow" class:arrowDown>&#x25b6</span>
        {label}
      </span>
      <!-- Render tree if toggled recursivly -->
      {#if expanded}
        {#each children as child}
          <svelte:self tree={child} />
        {/each}
      {/if}
    {:else}
      <!-- Otherwise just render the name -->
      <span>
        <span class="no-arrow" />
        {label}
      </span>
    {/if}
  </li>
</ul>

<style>
  ul {
    margin: 0;
    list-style: none;
    padding-left: 1.2rem;
    user-select: none;
  }
  .no-arrow {
    padding-left: 1rem;
  }
  .arrow {
    cursor: pointer;
    display: inline-block;
    /* transition: transform 200ms; */
  }
  .arrowDown {
    transform: rotate(90deg);
  }
</style>
