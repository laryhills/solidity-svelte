const TodoList = artifacts.require("TodoList");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TodoList", function (accounts) {
  // similar to a describe block in mocha
  // before(async () => {
  //   // get a deployed copy of contract before test runs
  //   this.todoList = await TodoList.deployed();
  // });

  // it("deploys successfully", async function () {
  //   const address = await this.todoList.address;
  //   assert.notEqual(address, 0x0);
  //   assert.notEqual(address, "");
  //   assert.notEqual(address, null);
  //   assert.notEqual(address, undefined);
  // });

  // note tests affect state of contract

  it("should deploy successfully", async function () {
    const todoList = await TodoList.deployed(); //check if contract is deployed
    const address = await todoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  describe("owner()", () => {
    it("should return owner", async () => {
      const todoList = await TodoList.deployed();
      const result = await todoList.owner();
      assert(result, "this is current owner"); // gets back the owner
    });

    it("should return owner's address", async () => {
      const todoList = await TodoList.deployed();
      const result = await todoList.owner();
      const expected = accounts[0];
      assert.equal(result, expected, "matches the owner's address");
    });
  });
  describe("tasks()", () => {
    it("should list task", async () => {
      const todoList = await TodoList.deployed();
      const taskCount = await todoList.taskCount();
      const task = await todoList.tasks(taskCount);
      assert.equal(task.id.toNumber(), taskCount.toNumber());
      assert.equal(task.content, "Read Your Bible");
      assert(task.completed === false);
      assert.equal(taskCount.toNumber(), 1);
    });

    it("should create task", async () => {
      const todoList = await TodoList.deployed();
      const result = await todoList.createTask("A new task");
      const taskCount = await todoList.taskCount();
      const task = await todoList.tasks(taskCount);
      assert.equal(taskCount.toNumber(), 2);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), taskCount.toNumber());
      assert.equal(event.content, "A new task");
      assert.equal(event.completed, false);
    });

    it("should toggle task completion", async () => {
      const todoList = await TodoList.deployed();
      const result = await todoList.toggleCompleted(1);
      const task = await todoList.tasks(1);
      assert.equal(task.completed, true);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), 1);
      assert.equal(event.completed, true);
    });

    it("should delete a task", async () => {
      const todoList = await TodoList.deployed();
      // since create task test is run first, we delete the new task
      const result = await todoList.deleteTask(2);
      const taskCount = await todoList.taskCount();
      assert.equal(taskCount.toNumber(), 1);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), 2);
    });
  });
});
