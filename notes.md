_-_ Using external libraries requires

_-_ truffle init does'nt create package.json

```
  npm init dir
  install library
  import in contract file
  import "@openzeppelin/contracts/access/Ownable.sol";
```

_-_ Migrating means changing schema of blockchain

# schema to accomodate contract

- Deploy contracts with -> `truffle migrate`
- Deploy new copy of contract -> `truffle migrate --reset`

# For Frontend

- svelte interacts with wallet via a json file
- this json file os built by truffles
- truffles need to know where to build the contracts

# Using truffle console

- enter console -> `truffle console`
- retrieve contract and assign to variable ->
  `variableName = await ContractName.deployed()`
- you must interact with blockchain in a async manner
- address of contract -> `variableName.address`
- getting a public var in contract -> `variableName.var()` \*\* as a <BN > big number
- you can parse BN to int with -> `var await variableName.var()`
- `var.toNumber() or toString() or toArray() or toJSON()`

# Truffle , Migration (Updating)

- open ganache and use truffle migrate

# Solidity

- mapping does not call all the list
- you have to reference the list one by time

# General Steps

- Code Smart Contract
- Run Tests (If development server set, spin up ganache)
- Migrate / Deploy Contract
- Connect Wallet via metamask
- Instantitate Web3
- Instantitate Contract
- Call Smart Contract functions

### [Change in Smart Contract Code]()

- Redeploy / Remigrate
