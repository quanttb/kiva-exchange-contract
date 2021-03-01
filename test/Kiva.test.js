const KivaExchange = artifacts.require("KivaExchange");
const Kiva = artifacts.require("Kiva");

contract('Test', function (accounts) {
  let owner = accounts[0];
  let user1 = accounts[1];
  let user2 = accounts[2];
  let kivaExchangeContract;
  let kivaContract;

  const TWO_ETHER = web3.utils.toWei('2', 'ether');
  const THREE_ETHER = web3.utils.toWei('3', 'ether');
  const FIVE_ETHER = web3.utils.toWei('5', 'ether');
  const EIGHT_ETHER = web3.utils.toWei('8', 'ether');

  before("setup", async function () {
    kivaExchangeContract = await KivaExchange.new({ from: owner });
    kivaContractAddress = await kivaExchangeContract.token.call();
    kivaContract = await Kiva.at(kivaContractAddress);
  });

  it('deploys the contracts', () => {
    assert(kivaExchangeContract.address);
    assert(kivaContract.address);
  });

  it('allows user to buy token', async () => {
    await kivaExchangeContract.buy({
      from: user1,
      value: FIVE_ETHER
    });

    const user1Balance = await kivaContract.balanceOf(user1);
    const remainingBalance = await kivaContract.balanceOf(kivaExchangeContract.address);

    assert.equal(FIVE_ETHER, user1Balance);
    assert.equal(FIVE_ETHER, remainingBalance);
  });

  it('allows user to transfer token', async () => {
    await kivaContract.transfer(user2, THREE_ETHER, {
      from: user1
    });

    const user1Balance = await kivaContract.balanceOf(user1);
    const user2Balance = await kivaContract.balanceOf(user2);

    assert.equal(TWO_ETHER, user1Balance);
    assert.equal(THREE_ETHER, user2Balance);
  });

  it('allows user to sell token', async () => {
    await kivaContract.approve(kivaExchangeContract.address, THREE_ETHER, {
      from: user2
    });

    await kivaExchangeContract.sell(THREE_ETHER, {
      from: user2
    });

    const user2Balance = await kivaContract.balanceOf(user2);
    const remainingBalance = await kivaContract.balanceOf(kivaExchangeContract.address);

    assert.equal(0, user2Balance);
    assert.equal(EIGHT_ETHER, remainingBalance);
  });
});