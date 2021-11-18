<script>
  import { onMount } from "svelte";

  // import Web3 from "svelte-web3";

  import Hello from "./Hello.svelte";
  let metamaskConnected = false;
  // function to connect to wallet
  async function connectWallet() {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      await window.ethereum.enable();
      metamaskConnected = window.ethereum.isConnected();
    }
  }
  onMount(() => {
    connectWallet();
  });

  const onClickConnectWallet = () => {
    promise = connectWallet();
  };

  // $: promise = connectWallet();
  // $: metamaskConnected = window.ethereum
  //   ? window.ethereum.isConnected()
  //   : false;
</script>

<main>
  {#if window.ethereum}
    <p>Browser Wallet is already connected to metamask : {metamaskConnected}</p>
  {/if}
  {#if window.ethereum && !metamaskConnected}
    <button on:click={onClickConnectWallet}>Connect Wallet</button>
  {:else}
    <Hello />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
