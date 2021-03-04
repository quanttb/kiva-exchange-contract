# Kiva Exchange Contract

## Prerequisites

The following prerequisites are required to be installed on your system:

- NodeJS 12
- Yarn
- Metamask (optional)

Then run:
```sh
yarn install
```

Get more BNB for testing: [LINK](https://testnet.binance.org/faucet-smart)

BSC Testnet Explorer: [LINK](https://testnet.bscscan.com/)

## Execution

### Test

```sh
yarn run test
```
or
```sh
yarn run test:dev
```

### Deploy to dev network

```sh
yarn run start:dev
```
and
```sh
yarn run migrate:dev

yarn run console:dev
```

### Deploy to bsc_testnet network

```sh
yarn run migrate:bsc

yarn run console:bsc
```

### Console commands

```js
user1 = await web3.eth.getAccounts().then(accList => { return accList[0]; });

KivaExchange.deployed().then(inst => { kivaExchangeContract = inst });

kivaContractAddress = await kivaExchangeContract.token.call();

kivaContract = await Kiva.at(kivaContractAddress);

await kivaExchangeContract.buy({ from: user1, value: web3.utils.toWei('1', 'ether') });
```

## Contribution

Your contribution is welcome and greatly appreciated. Please contribute your fixes and new features via a pull request.
Pull requests and proposed changes will then go through a code review and once approved will be merged into the project.

If you like my work, please leave me a star :)