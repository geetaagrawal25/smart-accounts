
const hre = require("hardhat");
const Account_Addr = "0x8aCd85898458400f7Db866d53FCFF6f0D49741FF";
const EP_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const PM_ADDRESS = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

async function main() {
  
  const account = await hre.ethers.getContractAt("Account",Account_Addr);
  const count = await account.count();
  console.log(count
  );

  console.log("Account Balance:", await hre.ethers.provider.getBalance(Account_Addr));

  const EP = await hre.ethers.getContractAt("EntryPoint",EP_ADDRESS);
  console.log("Account Balance on EP:", await EP.balanceOf(Account_Addr));
  console.log("Paymaster Balance on EP:",await EP.balanceOf(PM_ADDRESS));
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
