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
After loading truffle develop, you should see:
```
Truffle Develop started at http://localhost:9545/

Accounts:
(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
(3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
(4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
(5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
(6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
(7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
(8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
(9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de

Private Keys:
(0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
(1) ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
(2) 0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1
(3) c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c
(4) 388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418
(5) 659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63
(6) 82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8
(7) aa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7
(8) 0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4
(9) 8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5

Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```
The private keys can be used to import their respective account to metamask. Smart contracts in the "/contracts" folder can also be compiled and deployed using the following commands once in the truffle develop command line interface.

If there are any errors in running truffle develop (node versioning error), please install the latest version of node:
```
$npm install -g n
$n latest
```

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

Note: other available networks are: ethereumInfura (mainnet); ropstenInfura; kovanInfura

### Part 2: Front-end
Please navigate to "/client" on Github for more info (please see the /client/README.md) located at the bottom of the page [here](https://github.com/KhazanahAmericasInc/ConvictionEngine/tree/master/client).



