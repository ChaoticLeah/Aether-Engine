<script lang="ts">
  import ProjectExploror from "$lib/components/ProjectExploror.svelte";
  import { Pane, Splitpanes } from "svelte-splitpanes";
</script>

<Splitpanes style="height: 100vh">
  <Pane minSize={15}>
    <ProjectExploror />
  </Pane>
  <Pane size={70}>
    <Splitpanes horizontal={true}>
      <!-- <Pane minSize={15}>2<br /><em class="specs">I have a min height of 15%</em></Pane> -->
      <Pane size={80}>3</Pane>
      <Pane minSize={10}>4</Pane>
    </Splitpanes>
  </Pane>
  <Pane minSize={15}>
    <button class="btn">Test</button>
  </Pane>
</Splitpanes>
