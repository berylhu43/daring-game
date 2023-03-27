const main = async() => {
  
  const Token = await hre.ethers.getContractFactory("buyToken");
  const token = await Token.deploy();

  await token.deployed();

  console.log(
    'token deployed to: ', token.address
  );
}

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
}}

runMain();

