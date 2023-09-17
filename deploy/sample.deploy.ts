import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployFunc: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // deploy Sample
  await deploy("Sample", {
    from: deployer,
    contract: "Sample",
    args: [],
    log: true,
  });
};

deployFunc.tags = ["Sample", "dev", "uat"];

export default deployFunc;
