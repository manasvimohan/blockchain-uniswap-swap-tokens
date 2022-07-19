# Project Name

# Tags

# Links

Youtube: https://www.youtube.com/watch?v=vXu5GeLP6A8

Github: https://gist.github.com/BlockmanCodes/1ed5e4b3cd597f02e539049c3473f7b3

Other:
Uniswap Deployments like swaprouter, quoter router etc --> https://docs.uniswap.org/protocol/reference/deployments
Getting testnet pool address for two tokens --> https://docs.uniswap.org/protocol/V2/reference/smart-contracts/factory
Also watch this for pool address on testnet --> https://www.youtube.com/watch?v=gPCMxTKAvXk

[Link to the get price project](../blockchain_uniswap_getprice/README.md)

# Objective

# Overview

# Details

testnet used is Ropsten
Now By faucet you get ETH. And in uniswap, eth token address for the testnet, I am not able to find. Hence swap some eth for weth --> https://app.uniswap.org/#/swap?chain=ropsten

Files in the project and why they are there

1. findUniswapPool.js --> Get Pool address from token addresses
2. getPrice.js --> Get exchange value for two pairs -- Uses mainnet; hence token addresses are different. Pool address are same as testnet.
3. trade.js --> Make a swap -- Uses ropsten testnet, so token address diff from mainnet. Pool address same as mainnet.
4. helper.js --> Get immutables and pool state
5. pools.js --> List of pools
6. abi.json --> ERC20 abi which is used in swapping

# Author Details

**Name**: Manasvi Mohan Sharma
**Website**: <https://www.manasvi.co.in>
**Mobile**: +91-9899447040, +91-8181010179
**Email**: <manasvimsharma@gmail.com>
**LinkedIn**: <https://www.linkedin.com/in/manasvi-m/>
