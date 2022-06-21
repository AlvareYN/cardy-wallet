<script>
  import { onMount } from "svelte";

  import Layout from "./layout.svelte";
  import Wallet from "./lib/components/private/Wallet.svelte";
  import Register from "./lib/components/public/Register.svelte";
  import WelcomeView from "./lib/components/public/WelcomeView.svelte";
  import { loadLocalStorage } from "./lib/utils/localStorage";
  import { initialData } from "./lib/utils/stores";

  let walletStatus = "welcome"; // wallet status represent wich view to show depending of the status of the wallet
  let prevStatus = "welcome"; // previous status of the wallet

  // function to change the status of the wallet
  function changeStatus(status) {
    prevStatus = walletStatus;
    walletStatus = status;
  }
  $: console.log($initialData);
  if ($initialData) {
    walletStatus = "wallet";
  } else {
    walletStatus = "welcome";
  }

  onMount(() => {
    initialData.set(loadLocalStorage());
  });
</script>

<Layout>
  <main
    class="grid content-center h-full bg-slate-900 text-slate-100 p-4 gap-10"
  >
    {#if $initialData}
      <Wallet />
    {:else if walletStatus === "welcome"}
      <WelcomeView
        on:change-status={(e) => {
          changeStatus(e.detail);
        }}
      />
    {:else if walletStatus === "create"}
      <button
        on:click={() => {
          walletStatus = prevStatus;
        }}
      >
        Back Home
      </button>
      <Register />
    {:else if walletStatus === "import"}
      <button
        on:click={() => {
          walletStatus = prevStatus;
        }}
      >
        back
      </button>
    {:else}
      erroor
    {/if}
  </main>
</Layout>

<style>
</style>
