<script>
  import { onMount } from "svelte";
  import Hello from "./Hello.svelte";
  import TodoList from "./TodoList.svelte";

  let metamaskConnected = false;
  let accountAddress;

  // function to connect to wallet
  async function connectWallet() {
    if (window.ethereum) {
      // load web3 library from index.html script
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        let accounts = await window.web3.eth.getAccounts();
        accountAddress = accounts[0];
      } catch (error) {
        // User denied account access...
        console.log(error);
      }
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

<nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-sm-3 col-md-3 mr-0" href="/">Svelte Solidity App</a
  >
  <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap d-none d-sm-none d-sm-block">
      <small
        ><a class="nav-link" href="#address"
          ><span id="account">{accountAddress && accountAddress}</span></a
        ></small
      >
    </li>
  </ul>
</nav>
<main>
  {#if window.ethereum}
    <p class={metamaskConnected ? "alert-success" : "alert-danger"}>
      Browser Wallet is already connected to metamask : {metamaskConnected}
    </p>
  {/if}
  {#if window.ethereum && !metamaskConnected}
    <button on:click={onClickConnectWallet}>Connect Wallet</button>
  {:else}
    <Hello />
    <TodoList />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 20px auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
