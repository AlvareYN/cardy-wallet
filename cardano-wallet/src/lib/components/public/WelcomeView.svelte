<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function dispatchEvent(status) {
        dispatch('change-status', status);
    }
</script>

<div class="text-center ">
    <h1 class="text-2xl text-slate-400">
        Welcome to Cardy
        <br />
        Your cardano Wallet
    </h1>
</div>
<div class="grid content-center gap-2">
    <button
        class="btn btn-blue"
        on:click={() => {
            dispatchEvent('create');
        }}
    >
        create a new wallet
    </button>
    <button
        class="btn btn-blue"
        on:click={() => {
            dispatchEvent('import');
        }}
    >
        import a wallet
    </button>
</div>
