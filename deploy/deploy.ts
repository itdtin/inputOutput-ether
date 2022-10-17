import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the TokenSale contract`);

  const walletPrimaryKey = "" //ToDo if deploy directly - must define pk

  // Initialize the wallet.
  const wallet = new Wallet(walletPrimaryKey);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("IO");

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  const depositAmount = ethers.utils.parseEther("0.001");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();

  const inputOutputContract = await deployer.deploy(artifact, []);

  // Show the contract info.
  const contractAddress = inputOutputContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
  console.log("Constructor params ABI: ", inputOutputContract.interface.encodeDeploy([]))
}