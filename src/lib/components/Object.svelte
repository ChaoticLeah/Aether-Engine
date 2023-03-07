<script lang="ts">
  import type { TreeData } from "./TreeType";

  export let id: string;
  export let Tree: TreeData;
  export let treeChanged: (newTree: TreeData) => void;

  function toggle() {
    Tree[id].opened = !Tree[id].opened;
    treeChanged(Tree);
  }
</script>

<button on:click={toggle}>{Tree[id].label}</button>

{#if Tree[id].opened}
  <ul>
    {#each Tree[id].children as child}
      <li>
        {#if Tree[child].children}
          <svelte:self id={child} {Tree} {treeChanged} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  button {
    padding: 0 0 0 1.5em;
    background: url(/tutorial/icons/folder.svg) 0 0.1em no-repeat;
    background-size: 1em 1em;
    font-weight: bold;
    cursor: pointer;
    border: none;
    margin: 0;
  }

  .expanded {
    background-image: url(/tutorial/icons/folder-open.svg);
  }

  ul {
    padding: 0.2em 0 0 0.5em;
    margin: 0 0 0 0.5em;
    list-style: none;
    border-left: 1px solid #eee;
  }

  li {
    padding: 0.2em 0;
  }
</style>
