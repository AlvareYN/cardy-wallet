<script>
    import { createEventDispatcher } from "svelte";

    import { get, post } from "../../utils/RestService";
    import { initialData } from "../../utils/stores";
    import { API_URL } from "../../utils/Utils";

    //state
    let accountName = "";
    let passphrase = "";
    let confirmPassphrase = "";
    let steps = "account_name";
    let prevStep = [];
    let status = "loading";
    let secretPhrase = [];
    let verifySecretPhrase = [];
    let wallet;
    //initializations
    let copyMockSecretPhrase = [];
    const dispatch = createEventDispatcher();
    //functions
    function getRandomSortedSecretPhrase() {
        const copy = [...secretPhrase];
        return copy.sort(() => Math.random() - 0.5);
    }

    async function getNmonic() {
        console.log(API_URL + "/wallet/nmonic");
        const response = await get(API_URL + "/wallet/nmonic");
        if (response.status !== 200) {
            alert("error el servidor no puede responder");
            return [];
        }
        return await response.json();
    }

    async function verify() {
        for (let i = 0; i < verifySecretPhrase.length; i++) {
            const element = verifySecretPhrase[i];
            const element2 = secretPhrase[i];
            if (element !== element2) {
                alert("Secret Phrase is not correct");
                return;
            }
        }
        prevStep.push("verify_secret_phrase");

        const response = await post(API_URL + "/wallet/create_wallet", {
            name: accountName,
            passphrase: passphrase,
            nmonicSentence: verifySecretPhrase,
        });

        if (response.status !== 200) {
            alert("error el servidor no puede responder");
            return;
        }
        wallet = await response.json();
        steps = "done";
    }

    async function validatePassphrase() {
        if (passphrase !== confirmPassphrase) {
            alert("passphrase is not correct");
            return;
        }
        if (accountName === "") {
            alert("account name is empty");
            return;
        }
        if (passphrase.length < 10) {
            alert("passphrase is to short");
            return;
        }
        prevStep.push("account_name");
        steps = "secret_phrase";
        secretPhrase = await getNmonic();
        copyMockSecretPhrase = getRandomSortedSecretPhrase();
        status = "done";
    }
</script>

<div class="grid content-center gap-4">
    {#if steps === "account_name"}
        <div>
            <label
                class="block text-slate-200 text-sm font-bold mb-2"
                for="account_name"
            >
                Account Name
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="account_name"
                type="text"
                placeholder="Account1"
                bind:value={accountName}
            />
            <label
                class="block text-slate-200 text-sm font-bold mb-2"
                for="account_name"
            >
                passphrase
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="*********"
                bind:value={passphrase}
            />
            <label
                class="block text-slate-200 text-sm font-bold mb-2"
                for="account_name"
            >
                confirm passphrase
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="*********"
                bind:value={confirmPassphrase}
            />
        </div>
        <button class="btn btn-blue" on:click={validatePassphrase}>next</button>
    {:else if steps === "secret_phrase"}
        {#if status === "loading"}
            ...loading
        {:else}
            <div class="p-1 ">
                <label
                    class="block text-slate-200 text-sm font-bold mb-2"
                    for="secret_phrase"
                >
                    Secret Phrase
                </label>
                <div class="grid grid-cols-2 gap-1">
                    {#each secretPhrase as secret}
                        <p
                            class="bg-slate-200 rounded-full text-slate-800 p-2 w-fit"
                        >
                            {secret}
                        </p>
                    {/each}
                    <button
                        class="btn btn-blue w-fit"
                        on:click={() => {
                            navigator.clipboard.writeText(
                                secretPhrase.join(" ")
                            );
                        }}
                    >
                        copy
                    </button>
                </div>
            </div>
            <button
                class="btn btn-blue"
                on:click={() => {
                    prevStep.push("secret_phrase");
                    steps = "account_name";
                }}>back</button
            >
            <button
                class="btn btn-blue"
                on:click={() => {
                    prevStep.push("secret_phrase");
                    steps = "verify_secret_phrase";
                }}>next</button
            >
        {/if}
    {:else if steps === "verify_secret_phrase"}
        <div class="p-1">
            <label
                class="block text-slate-200 text-sm font-bold mb-2"
                for="verify_secret_phrase"
            >
                Verify Secret Phrase
            </label>
            <div class="grid grid-cols-2 gap-1">
                {#each verifySecretPhrase as secret}
                    <p
                        class="bg-slate-200 rounded-full text-slate-800 p-2 w-fit"
                        on:click={() => {
                            console.log(
                                secret,
                                verifySecretPhrase[
                                    verifySecretPhrase.length - 1
                                ]
                            );
                            if (
                                secret ===
                                verifySecretPhrase[
                                    verifySecretPhrase.length - 1
                                ]
                            ) {
                                verifySecretPhrase.pop();
                                verifySecretPhrase = verifySecretPhrase;
                                copyMockSecretPhrase.push(secret);
                                copyMockSecretPhrase = copyMockSecretPhrase;
                            }
                        }}
                    >
                        {secret}
                    </p>
                {/each}
            </div>
            <p>Select word</p>
            <div class="grid grid-cols-2 gap-1">
                {#each copyMockSecretPhrase as secret, i}
                    <p
                        class="bg-slate-200 rounded-full text-slate-800 p-2 w-fit"
                        on:click={() => {
                            verifySecretPhrase.push(secret);
                            verifySecretPhrase = verifySecretPhrase;
                            copyMockSecretPhrase.splice(i, 1);
                            copyMockSecretPhrase = copyMockSecretPhrase;
                        }}
                    >
                        {secret}
                    </p>
                {/each}
            </div>
        </div>
        <button class="btn btn-blue" on:click={verify}>verify</button>
        <button
            class="btn btn-blue"
            on:click={() => {
                copyMockSecretPhrase = getRandomSortedSecretPhrase();
                verifySecretPhrase = [];
            }}
        >
            reset
        </button>
    {:else if steps === "done"}
        <p>succefully created a new account</p>
        <button
            class="btn btn-blue"
            on:click={() => {
                prevStep = [];
                accountName = "";
                steps = "account_name";
                copyMockSecretPhrase = [];
                initialData.set(wallet);
                localStorage.setItem(
                    "cardano-wallet-v1",
                    JSON.stringify(wallet)
                );
            }}>Account Home</button
        >
    {/if}
</div>
