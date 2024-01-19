// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const EP_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {

  const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

  const sender = await hre.ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE,
  }
  );

  //CREATE : hash(deployer +nonce)
  //CREATE2 : hash(0xFF + sender + bytecode +salt)

  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();
  const initCode = "0x";
  // FACTORY_ADDRESS + 
  // AccountFactory.interface
  // .encodeFunctionData("createAccount", [address0])
  // .slice(2);

  console.log(sender);
  
  // await entryPoint.depositTo(sender,{
  //   value: hre.ethers.parseEther("10")
  // });

  const Account = await hre.ethers.getContractFactory("Account");
  const userOp ={
         sender, //smart acount address
         nonce: await entryPoint.getNonce(sender,0),
         initCode,
         callData: await Account.interface.encodeFunctionData("execute"),
         callGasLimit: 200_000,
         verificationGasLimit: 200_000,
         preVerificationGas: 50_000,
         maxFeePerGas: hre.ethers.parseUnits("10","gwei"),
         maxPriorityFeePerGas: hre.ethers.parseUnits("15","gwei"),
         paymasterAndData: "0x",
         signature: "0x"
  };
  
  const tx = await entryPoint.handleOps([userOp], address0);
  const receipt = await tx.wait();
  console.log(receipt);
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
