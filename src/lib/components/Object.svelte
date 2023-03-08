<script lang="ts">
  import type { TreeData } from "./TreeType";

  export let id: string;
  export let Tree: TreeData;
  export let treeChanged: (newTree: TreeData) => void;

  function toggle() {
    Tree[id].opened = !Tree[id].opened;
    treeChanged(Tree);
  }


function allowDrop(ev : DragEvent) {
  ev.preventDefault();
}

function drag(ev : DragEvent) {
  ev.dataTransfer?.setData("dragTreeData", (ev?.target as HTMLButtonElement).id.substring("treeNode_".length));
}

function isParent(elemId: string, TargetId: string): boolean {
  let currentNode = Tree[elemId];
  
  while (currentNode) {
    if (currentNode.parent === TargetId) {
      return true;
    }

    else if(currentNode.parent == "core"){
      return false;
    }
    
    currentNode = Tree[currentNode.parent];
  }
  
  return false;
}


function drop(ev : DragEvent) {
  ev.preventDefault();
  let id = ev.dataTransfer?.getData("dragTreeData").toString();
  let newParentId = (ev?.target as HTMLButtonElement).parentElement?.parentElement?.firstElementChild?.id.substring("treeNode_".length);

  // If its dragged onto the top div then it should pair
  const shouldParent = ev?.target == (ev?.target as HTMLButtonElement).parentElement?.firstElementChild;

  if(!shouldParent){
    newParentId = Tree[newParentId ? newParentId : ""].parent;
  }

  // If we are parenting to ourself, dont
  if(newParentId == id) return;
  
  //Dont pair a parent to a child. Eg dont pare root to a child
  if(isParent(newParentId ? newParentId : "", id ? id : "")) return;


  // Remove the child from the parents list
  const oldParentId = Tree[id ? id : ""].parent;
  Tree[oldParentId].children = Tree[oldParentId].children.filter((value)=>{
    return value != id
  }) 

  // Set the new parent
  Tree[id ? id : ""].parent = newParentId ? newParentId : "";

  // Add the new child 
  Tree[newParentId ? newParentId : ""].children.push(id ? id : "");
  
  // Update the tree
  treeChanged(Tree);
}	
</script>

<button class={(Tree[id].opened ? "expanded" : "") + " -mb-4"} on:click={toggle} draggable="true" on:dragstart={drag} id={`treeNode_${id}`}>{Tree[id].label}</button>

<div class="m-0">
  <div class="flex-1 p-1 border-b-slate-600 border-b" on:dragover={allowDrop} on:drop={drop}></div>
  {#if id != "root"}
    <div class="flex-1 p-1" on:dragover={allowDrop} on:drop={drop}></div>
  {/if}
</div>

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
    background: url($lib/engine-assets/Icon-Closed.svg) 0 0.1em no-repeat;
    background-size: 1em 1em;
    font-weight: bold;
    cursor: pointer;
    border: none;
    margin: 0;
  }
  .expanded {
    background-image: url($lib/engine-assets/Icon-Open.svg);
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
