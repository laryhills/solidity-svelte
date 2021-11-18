<script>
  import { Web3 } from "svelte-web3";
  import HelloContract from "./contracts/Hello.json";

  let greetie = "";
  let balance = "";

  async function getGreeting() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = HelloContract.networks[networkId];
    const contract = new web3.eth.Contract(
      HelloContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    balance = await web3.eth.getBalance(accounts[0]);

    const response = await contract.methods.greet().call();
    return response;
  }

  $: promise = getGreeting();

  const setGreetie = async (greetie) => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = HelloContract.networks[networkId];
    const contract = new web3.eth.Contract(
      HelloContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    try {
      const response = await contract.methods.setGreetie(greetie).send({
        from: accounts[0],
      });
      console.log(response);
      balance = await web3.eth.getBalance(accounts[0]);
      promise = getGreeting();
    } catch (error) {
      if (error.code === -32603) {
        alert(`You cant Perform this action with account  - ${accounts[0]}`);
      } else {
        console.log(error);
      }
    }
  };
</script>

{#await promise}
  <h2>Loading ...</h2>
{:then greeting}
  <div>
    <h1>{greeting}</h1>
    {`Wallet Balance - ${balance / 1000000000000000000}ETH`}
    <br />
    <input type="text" bind:value={greetie} />
    <button on:click={setGreetie(greetie)}>Submit</button>
  </div>
{/await}

<style>
  div {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
