<script lang="ts">
  import Object from "./Object.svelte";
  import type { TreeData } from "./TreeType";

  // let root = [
  //   {
  //     name: "Important work stuff",
  //     files: [{ name: "quarterly-results.xlsx" }],
  //   },
  //   {
  //     name: "Animal GIFs",
  //     files: [
  //       {
  //         name: "Dogs",
  //         files: [{ name: "treadmill.gif" }, { name: "rope-jumping.gif" }],
  //       },
  //       {
  //         name: "Goats",
  //         files: [{ name: "parkour.gif" }, { name: "rampage.gif" }],
  //       },
  //       { name: "cat-roomba.gif" },
  //       { name: "duck-shuffle.gif" },
  //       { name: "monkey-on-a-pig.gif" },
  //     ],
  //   },
  //   { name: "TODO.md" },
  // ];

  let data: TreeData = {
    root: {
      opened: false,
      parent: "core",
      label: "Root",
      children: ["0", "2"],
    },
    "0": {
      opened: false,
      parent: "root",
      label: "00",
      children: ["1"],
    },
    "1": {
      opened: false,
      parent: "0",
      label: "01",
      children: [],
    },
    "2": {
      opened: false,
      parent: "root",
      label: "02",
      children: [],
    },
  };
</script>

<!-- <Folder name="Home" files={root} expanded /> -->

<Object
  Tree={data}
  id="root"
  treeChanged={(newTree) => {
    data = newTree;
  }}
/>
