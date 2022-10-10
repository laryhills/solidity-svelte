// SPDX-License-Identifier: MIT
// pragma solidity ^0.5.0; // set version of solidity to use
pragma solidity >=0.4.22 <0.9.0; // set version of solidity to use

import "@openzeppelin/contracts/access/Ownable.sol";

contract TodoList is Ownable {
// contract TodoList {

  // public provide a function to access a variable or function
  // meaning a variable will become  a getter function , called via variable()

  // keep track of no of tasks
  // state variable written to the storage/ blockchain
  // this variable automatically uses storage since its outside any function
  // state of contract changes with changes of variable
  // change read taskCount from contract
  uint public taskCount = 0;

  // custom datatype
  struct Task {
    uint id;
    string content;
    bool completed;
  }

  // mapping is a key => value pair
  // you declare datatype of key and value
  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  event TaskDeleted(
    uint id
  );

  // called everytime contract is run for first rime
  constructor() public {
    // populate todolist
    createTask("Read Your Bible");
  }
  
  // creating new task
  function createTask(string memory _content) public {
    // _variable is a convention
    // _content is a temporary variable 

    // getting an id
    // increment taskCount by 1
    // assign this as the id of the task
    taskCount ++;

    // new task and defaults to false
    tasks[taskCount] = Task(taskCount, _content, false);

    // broadcast an event for a consumer to subscribe
    emit TaskCreated(taskCount, _content, false);
  }

  function deleteTask(uint _id) public onlyOwner{
    delete tasks[_id];
    taskCount -= 1;
    emit TaskDeleted(_id);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id]; // store in local variable in memory
    _task.completed = !_task.completed;
    tasks[_id] = _task;

    emit TaskCompleted(_id, _task.completed);
  }

  

}
