import os
import argparse


    def withdraw(address: str, wallet: str) -> str:
    return """
import {Contract, utils, Wallet} from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// The address of the counter smart contract
  const ADDRESS = "%s";
  // The ABI of the counter smart contract
  const ABI = require("../abi/IO.json");

  const wallet = new Wallet("%s");

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const contract = new Contract(ADDRESS, ABI, deployer.zkWallet);

  console.log(`The contract is ${await contract.address}`);
  await contract.withDrawAll()
}
    """ % (address, name)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-wallet", dest="wallet", required=True)
    parser.add_argument("-contractAddress", dest="contract address", required=True)

    args = parser.parse_args()
    withdraw(args.contractAddress, args.wallet)
