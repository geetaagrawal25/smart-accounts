
const hre = require("hardhat");
const Account_Addr = "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81";

async function main() {
  
  const account = await hre.ethers.getContractAt("Account",Account_Addr);
  const count = await account.count();
  console.log(count
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
