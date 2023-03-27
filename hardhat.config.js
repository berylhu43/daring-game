require('dotenv').config()
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: 'https://goerli.infura.io/v3/7744c80f018f4bacbf76903a342c1418',
      accounts: [ '27d488cf3743fe1a8da706fce3f89ab683a724e35f21f5ae28964372733c7734' ]
    }
  }
}
