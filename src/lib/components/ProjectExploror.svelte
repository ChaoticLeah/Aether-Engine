<script>
  // from https://svelte.dev/repl/82b00644720a4ca2bdb89c6a653ec987
  import Object from "./Object.svelte";

  const tree = {
    label: "USA",
    children: [
      {
        label: "Florida",
        children: [
          { label: "Jacksonville" },
          {
            label: "Orlando",
            children: [
              { label: "Disney World" },
              { label: "Universal Studio" },
              { label: "Sea World" },
            ],
          },
          { label: "Miami" },
        ],
      },
      {
        label: "California",
        children: [
          { label: "San Francisco" },
          { label: "Los Angeles" },
          { label: "Sacramento" },
        ],
      },
    ],
  };
</script>

<Object {tree} />
