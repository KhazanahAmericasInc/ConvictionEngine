# Conviction Engine
This is the repostiory for the blockchain-based conviction engine project for KAI.
## Dependencies and Requirements
1. [NodeJS](https://nodejs.org/en/download/)
2. [Truffle Framework](https://truffleframework.com/docs/truffle/getting-started/installation)
3. All other dependencies are downloaded by node package manager (npm)
## Setting Up the Development Environment
There are two main components to the projects, located in two separate locations. 
1. The back-end (Smart Contracts)
Located in "/contracts"
2. The Front-end (ReactJS)
Located in "/client"

### Part 1: Back-end
To set-up a test and local Ethereum blockchain, use the following command in the terminal:
```
$truffle develop
```
Wallet private-keys can be viewed in the console after the above command. Smart contracts in the "/contracts" folder can also be compiled and deployed using the following commands once in the truffle develop command line interface.

#### Editor for Smart Contracts
The Ethereum smart contracts are developed in Solidity. Solidity documentation is located [here](https://solidity.readthedocs.io/en/v0.4.25/).

However, a good resource which may allow you to skip learning (any programming language) through documentation is [learnxinyminutes](https://learnxinyminutes.com/docs/solidity/) (<= link).

There are many editors that have solidity packages to show syntax highlighting, snippets, compilation and more. A good recommendation is [Visual Studio Code](https://code.visualstudio.com/), or [Sublime Text](https://www.sublimetext.com/). Both of which have their respective soldity packages.


#### Deployment to the Local Blockchain Environment (truffle develop)
On the truffle develop CLI:

1. Compile your solidity smart-contracts:
```
$compile
```

2. Migrate your solidity smart-contracts (reset flag may be necessary):
```
$migrate --reset
```

#### Deployment to the Public Testnet (rinkeby testnet)
On the truffle develop CLI:

1. Compile your solidity smart-contracts:
```
$compile
```

2. Migrate your solidity smart-contracts via Infura (cloud provider to Ethereum nodes) to the testnet 
```
$migrate --network rinkebyInfura
```

### Part 2: Front-end
Please navigate to "/client" on Github for more info (please see the /client/README.md) located at the bottom of the page [here](https://github.com/KhazanahAmericasInc/ConvictionEngine/tree/master/client).



