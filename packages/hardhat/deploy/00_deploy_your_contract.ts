import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("MockSwap", {
    from: deployer,
    // Contract constructor arguments
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const mockSwap = await hre.ethers.getContract<Contract>("MockSwap", deployer);
  const mockSwapAddress = await mockSwap.getAddress();

  console.log(
    "👋 first address funded:",
    await mockSwap.setTokenBalance("0x0177f3a60495B1c55fa0440929C458f5064886c7", BigInt(10 * 10 ** 18)),
  );
  console.log(
    "👋 second address funded:",
    await mockSwap.setTokenBalance("0x2Af3E6F7AdB774eEC4EAd62B29FEBAF2929504e2", BigInt(10 * 10 ** 18)),
  );
  console.log("👋 deployer address funded:", await mockSwap.setTokenBalance(deployer, BigInt(10 ** 18)));

  await deploy("Automation", {
    from: deployer,
    // Contract constructor arguments
    args: [mockSwapAddress],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["MockSwap"];
