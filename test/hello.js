const Hello = artifacts.require("Hello"); // name of contract not solidity file

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

// accounts is an array
contract("Hello", function (accounts) {
  it("should assert true", async function () {
    await Hello.deployed(); //check if contract is deployed
    return assert.isTrue(true);
  });

  // Describe a function called greet()
  describe("greet()", () => {
    // It should return 'Hello World!'
    it("should return 'Hello, World!'", async () => {
      const hello = await Hello.deployed();
      const result = await hello.greet();
      const expected = "Hello, World!";
      assert.equal(result, expected, "greeted with 'Hello, World!'");
    });
  });

  describe("owner()", () => {
    // gets the owner and its, the right person thats is accounts[0]
    it("should return owner", async () => {
      const hello = await Hello.deployed();
      const result = await hello.owner();
      /* // check owner is expected 
        const expected = accounts[0];
        assert.equal(result, expected, "owner is accounts[0]");
      */
      assert(result, "this is current owner"); // gets back the owner
    });
    // it should return owner address
    it("should return owner's address", async () => {
      const hello = await Hello.deployed();
      const result = await hello.owner();
      const expected = accounts[0];
      assert.equal(result, expected, "matches the owner's address");
    });
  });

  // Ensure function is called only by owner

  //Update the greeting message
  describe("setGreetie()", () => {
    it("sets greeting to passed in string", async () => {
      // deploy
      const hello = await Hello.deployed();
      // set expected
      const expected = "Hello, Human!";
      // set greetie
      const greetie = "Human!";
      // call setGreetie
      await hello.setGreetie(greetie);
      // get actual
      const actual = await hello.greet();
      // assert
      assert.equal(actual, expected, "greeted with 'Hello, Human!'");
    });
  });
});
