<script>
  import { onMount } from "svelte";
  import { Web3 } from "svelte-web3";
  import { get } from "svelte/store";
  import TodoListContract from "./contracts/TodoList";

  let todoList = [];
  let taskCount = 0;
  let newTask = "";
  let contract = {};
  let accounts;

  function clearInput() {
    newTask = "";
  }

  async function getTasks() {
    // const web3 = new Web3(window.ethereum);
    // const networkId = await web3.eth.net.getId();
    // const deployedNetwork = TodoListContract.networks[networkId];
    // const contract = new web3.eth.Contract(
    //   TodoListContract.abi,
    //   deployedNetwork && deployedNetwork.address
    // );
    taskCount = await contract.methods.taskCount().call();
    taskCount = Number(taskCount);
    let tasks = [];
    for (let i = 1; i <= taskCount; i++) {
      let task = await contract.methods.tasks(i).call();
      const taskId = Number(task[0]);
      const taskContent = task[1];
      const taskCompleted = task[2];
      let todo = { taskId, taskContent, taskCompleted };
      tasks.push(todo);
    }
    todoList = tasks;
    // return response;
  }
  // $: promise = getTasks();

  const addTask = async () => {
    newTask = newTask.trim();
    if (newTask) {
      // const web3 = new Web3(window.ethereum);
      // const accounts = await web3.eth.getAccounts();
      // const networkId = await web3.eth.net.getId();
      // load contract
      // const deployedNetwork = TodoListContract.networks[networkId];
      // const contract = new web3.eth.Contract(
      //   TodoListContract.abi,
      //   deployedNetwork && deployedNetwork.address
      // );
      try {
        const res = await contract.methods.createTask(newTask).send({
          from: accounts[0],
        });
        // getTasks();
        if (res.status) {
          let taskId = Number(taskCount) + 1;
          let taskContent = newTask;
          let taskCompleted = false;
          let todo = { taskId, taskContent, taskCompleted };
          todoList.push(todo);
          todoList = todoList;
          taskCount = Number(taskCount) + 1;
          clearInput();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Task cant be empty");
    }
  };

  onMount(async () => {
    // load contract once
    const web3 = new Web3(window.ethereum);
    accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TodoListContract.networks[networkId];
    contract = await new web3.eth.Contract(
      TodoListContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    console.log(contract);

    getTasks();
  });

  const updateTask = async (id) => {
    try {
      const res = await contract.methods.toggleCompleted(id).send({
        from: accounts[0],
      });
      if (res.status) {
        // ...
        const updatedIndex = todoList.findIndex((x) => x.taskId === id);
        todoList[updatedIndex].taskCompleted =
          !todoList[updatedIndex].taskCompleted;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await contract.methods.deleteTask(id).send({
        from: accounts[0],
      });
      if (res.status) {
        const deletedIndex = todoList.findIndex((x) => x.taskId === id);
        todoList.splice(deletedIndex, 1);
        todoList = todoList;
      }
    } catch (error) {
      if (error.code === -32603) {
        alert(`You cant Perform this action with account  - ${accounts[0]}`);
      } else {
        console.log(error);
      }
    }
  };
</script>

<!-- {#await promise}
  
{:then taskCount}
  <div>
    <!-- <h1>{greeting}</h1> -->
<!-- {`No of Tasks is - ${taskCount}`}
    <br /> -->
<!-- <input type="text" bind:value={greetie} />
    <button on:click={setGreetie(greetie)}>Submit</button> -->
<!-- </div>
{/await} -->
<main>
  {#if todoList === []}
    <h2>Loading ...</h2>
  {:else}
    <h2>{`No of Tasks - ${taskCount}`}</h2>
    <div class="tasks">
      {#each todoList as todo}
        {#if !todo.taskCompleted}
          <div class="task">
            <span>
              <input
                type="checkbox"
                checked={todo.taskCompleted}
                on:click|preventDefault={() => updateTask(todo.taskId)}
              />
              {todo.taskContent}
            </span>
            <span class="deleteIcon" on:click={() => deleteTask(todo.taskId)}
              >x</span
            >
          </div>
        {/if}
      {/each}
    </div>
    <form style="text-align:center" on:submit|preventDefault={addTask}>
      <input
        type="text"
        class="checker form-control"
        style="width:20%;"
        bind:value={newTask}
      />
      <!-- <button
        class="btn btn-primary btn-xs"
        style="margin:5px"
        on:click={addTask(newTask)}>Add Task</button
      > -->
    </form>
    <div class="tasks">
      {#each todoList as todo}
        {#if todo.taskCompleted}
          <div class="taskCompleted">
            <span>
              <input
                type="checkbox"
                checked={todo.taskCompleted}
                on:click|preventDefault={() => updateTask(todo.taskId)}
              />
              {todo.taskContent}
            </span>

            <span class="deleteIcon" on:click={() => deleteTask(todo.taskId)}
              >x</span
            >
          </div>
        {/if}
      {/each}
    </div>
    <!-- 
      <input
        class="form-control sm"
        style="margin:5px"
        type="text"
        
      />
      <button class="btn btn-primary sm" on:click={addTask(newTask)}
        >Add Task</button
      >
    </div> -->
  {/if}
</main>

<style>
  main {
    text-align: center;
  }

  .tasks {
    /* display: flex;
    flex-direction: column;
    align-items: flex-start; */
  }
  .task {
    max-width: 20%;
    text-align: left;
    padding: 5px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .taskCompleted {
    max-width: 20%;
    text-align: left;
    padding: 5px;
    margin: 0 auto;
    text-decoration: line-through;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .checker {
    padding: 5px;
    margin: auto;
  }

  .deleteIcon {
    color: red;
    cursor: pointer;
    font-weight: bolder;
  }

  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 50;
  }
</style>
