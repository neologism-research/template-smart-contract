import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";
// import "@tenderly/hardhat-tenderly";
// import "hardhat-ethernal";
import * as dotenv from "dotenv";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";
import "tsconfig-paths/register";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 7777,
      },
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    deploy: "./deploy",
    sources: "./contracts",
    tests: "./tests",
  },
  gasReporter: {
    currency: "USD",
    // gasPrice: 20, // in gwei
    enabled: true,
    coinmarketcap: process.env.COINMARKETCAP_KEY ?? "",
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: "test test test test test test test test test test test test",
      },
      live: false,
      saveDeployments: true,
      tags: ["dev"],
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL as string,
      accounts: [process.env.SEPOLIA_DEPLOYER_KEY as string],
      live: true,
      saveDeployments: true,
      tags: ["uat"],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    alice: {
      default: 1,
    },
    bob: {
      default: 2,
    },
  },
};

export default config;
