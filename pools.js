// https://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules
//

const pools = [
  { name: "WBTC-WETH", add: "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed" },
  { name: "ETH-DAI", add: "0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8" },
  { name: "ETH-USDT", add: "0x11b815efb8f581194ae79006d24e0d814b7697f6" },
];

module.exports = { pools };
