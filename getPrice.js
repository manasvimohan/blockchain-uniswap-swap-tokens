const { ethers } = require("ethers");
const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const {
  abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");
const { pools } = require("./pools");

const { getAbi, getPoolImmutables } = require("./helpers");

require("dotenv").config();
const INFURA_URL = process.env.INFURA_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// Setup the provider, a node that will let us access and call from mainnet of ethereum
const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

// The address of the pair for which we need to find swap rate
const selectedPool = pools[2]; // pools defined in ./pools.js file
const poolName = selectedPool.name; // pools defined in ./pools.js file
const poolAddress = selectedPool.add; // pools defined in ./pools.js file

console.log(`Checking for pair ${poolName} at address ${poolAddress}`);

// A wierd issue. When setting pooladdress wrt USDC or USDT, we get error

// This is given by uniswap, this address let us find pair ratio
// Get from https://docs.uniswap.org/protocol/reference/deployments
const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

// Setup the main pool contract
const getPrice = async (inputAmount) => {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  );

  // Setup first token
  const tokenAddress0 = await poolContract.token0();
  const tokenAbi0 = await getAbi(tokenAddress0);
  const tokenContract0 = new ethers.Contract(
    tokenAddress0,
    tokenAbi0,
    provider
  );
  //console.log(tokenContract0)
  const tokenSymbol0 = await tokenContract0.symbol();
  const tokenDecimals0 = await tokenContract0.decimals();

  // Setup second token
  const tokenAddress1 = await poolContract.token1();
  const tokenAbi1 = await getAbi(tokenAddress1);
  const tokenContract1 = new ethers.Contract(
    tokenAddress1,
    tokenAbi1,
    provider
  );
  const tokenSymbol1 = await tokenContract1.symbol();
  const tokenDecimals1 = await tokenContract1.decimals();

  // Set up quotation contract which is on uniswap
  const quoterContract = new ethers.Contract(
    quoterAddress,
    QuoterABI,
    provider
  );

  // Getting basic information for the pair
  const immutables = await getPoolImmutables(poolContract);

  const amountIn = ethers.utils.parseUnits(
    inputAmount.toString(),
    tokenDecimals0
  );

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn,
    0
  );

  const amountOut = ethers.utils.formatUnits(quotedAmountOut, tokenDecimals1);

  console.log("==================================");
  console.log(
    `${inputAmount} ${tokenSymbol0} can be swapped for ${amountOut} ${tokenSymbol1}`
  );
  console.log("==================================");
};

getPrice(1);
