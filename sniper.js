require('dotenv').config()
const Web3 = require('web3')
const pressAnyKey = require('press-any-key')
const {
  ChainId,
  Fetcher,
  WETH,
  Route,
  Trade,
  TokenAmount,
  TradeType,
  Percent,
} = require("@uniswap/sdk");
const ethers = require('ethers')


const chainId = ChainId.MAINNET

let token
let weth
let provider
let signer
let uniswap



const ACCOUNT = process.env.ACCOUNT
const EXCHANGE_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' // UniswapV2 address
const GAS_LIMIT_BUY = process.env.GAS_LIMIT_BUY // Is this gasPrice Limit?
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;  // Is it our token address?
const ETH_AMOUNT = process.env.AMOUNT_TO_BUY; // Isn't this limited?
const METHOD_SNIPE = process.env.METHOD_SNIPE;  // Which methods should I support?


const web3 = new Web3(process.env.RPC_URL_WSS)
provider = new ethers.providers.getDefaultProvider(process.env.RPC_URL)

const privateKey = new Buffer.from(process.env.PRIVATE_KEY, 'hex')  // Private key for account
signer = new ethers.Wallet(privateKey, provider)

let minABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },

  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'amountETHMin',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'amountTokenDesired',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
]
uniswap = new ethers.Contract(
  EXCHANGE_ADDRESS,
  [
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
    'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    'function approve(address spender, uint value) external returns (bool)',
    "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",

  ],
  signer,
)

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function run() {

  if (true) {
    subscription = web3.eth
      .subscribe('pendingTransactions', function (error, result) { })
      .on('data', function (transactionHash) {
        web3.eth
          .getTransaction(transactionHash)
          .then(function (transaction) {
            if (transaction) {
              parseTransactionData(transaction)
            }

          })
          .catch((error) => { })
      })


    async function parseTransactionData(transactionDetails) {
      if (transactionDetails.input) {
        process.stdout.write("Finding Liquidity in mempool: " + transactionDetails.hash);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("");

        var contractTo = transactionDetails.to
        var trx = transactionDetails.input
        var trxs = trx.toString()
        var res = trxs.substring(0, 10)
        var resu = trxs.substring(0, 100)
        var rem2 = '0x2d4103d6'
        var rem3 = '0x8f70ccf7'
        var rem4 = '0xc9567bf9'
        var rem5 = '0x0d295980'
        var rem6 = '0xb3ac8537'
        var rem7 = '0x8a8c523c'
        var rem8 = '0x0bd05b69'
        var rem9 = '0x8a8c523c'
        var rem10 = '0x94ceecef'
        var rem11 = '0xa6334231'
        var rem12 = '0x82aa7c68'
        var check_token = res.includes(rem2)    // openTrading
        var check_token2 = res.includes(rem3)   // setTrading
        var check_token3 = res.includes(rem4)   // openTrading
        var check_token4 = res.includes(rem5)   // tradingstatus
        var check_token5 = res.includes(rem6)   // activeTrading
        var check_token6 = res.includes(rem7)   // enableTrading
        var check_token7 = res.includes(rem8)   // activateTrading
        var check_token8 = res.includes(rem9)   // enableTrading
        var check_token9 = res.includes(rem10)  // enableTrading
        var check_token10 = res.includes(rem11) // allowTrading
        var check_token11 = res.includes(rem12) // enableTrading
        var split_add = TOKEN_ADDRESS.replace("0x", '');
        var the_trig = "0xf305d719000000000000000000000000" + split_add;  // What is it?
        var check_token_snipe = resu.includes(the_trig.toLowerCase());



        // 0x8f70ccf7 setTrading
        // 0x2d4103d6 openTrading
        // 0xc9567bf9 openTrading
        // 0x0d295980 tradingstatus
        // 0xb3ac8537 activeTrading
        // 0x0bd05b69 activateTrading
        // 0x8a8c523c enableTrading
        // 0x94ceecef enableTrading
        // 0x82aa7c68 enableTrading
        // 0xa6334231 allowTrading 

        if (check_token || check_token2 || check_token3 || check_token4 || check_token5 ||
          check_token6 || check_token7 || check_token8 || check_token9 || check_token10 || check_token11) {
          if (contractTo == TOKEN_ADDRESS) {
            if (METHOD_SNIPE == "YES") {


              try {
                subscription.unsubscribe(function (error, success) {

                })
                bnbamt = web3.utils.fromWei(transactionDetails.value, 'ether')
                trans_hash = transactionDetails.hash
                dev_address = transactionDetails.from
                var trans = trx.substring(10)


                console.log('BUYING NOW!')

                buyTokensSnipe(transactionDetails)



              } catch { }
            }
          }
        } else {
          if (contractTo == EXCHANGE_ADDRESS) {
            if (check_token_snipe) {

              subscription.unsubscribe(function (error, success) {
              });


              console.log("BUYING NOW!");
              buyTokens(contract_add, transactionDetails);

            }
          }
        }
      }
    }
  }
}


async function buyTokensSnipe(dev_address, transactionDetails) {
  await sleep(500);
  token = await Fetcher.fetchTokenData(chainId, TOKEN_ADDRESS, provider)
  weth = WETH[chainId]
  let nonc = Math.floor(100 + Math.random() * 900)
  const maxFeePriority = parseInt(transactionDetails.maxPriorityFeePerGas);
  const maxFeeGas = parseInt(transactionDetails.maxFeePerGas);
  const gasLimit = Math.floor(GAS_LIMIT_BUY)

  try {
    const _ethAmount = ethers.utils.parseEther(ETH_AMOUNT)
    const pair = await Fetcher.fetchPairData(token, weth, provider)
    const route = new Route([pair], weth)
    const trade = new Trade(
      route,
      new TokenAmount(weth, _ethAmount),
      TradeType.EXACT_INPUT,
    )
    const path = [weth.address, token.address]

    const amountOutMin = 0;
    const amountOutMinHex = ethers.BigNumber.from(
      amountOutMin.toString(),
    ).toHexString()

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20  // Is this for 20 mins?
    const deadlineHex = ethers.BigNumber.from(deadline.toString()).toHexString()

    const inputAmount = trade.inputAmount.raw
    const inputAmountHex = ethers.BigNumber.from(
      inputAmount.toString(),
    ).toHexString()

    console.log('\x1b[42m%s\x1b[0m', 'BUYING TOKEN')

    const tx = await uniswap.swapExactETHForTokensSupportingFeeOnTransferTokens(
      amountOutMinHex,
      path,
      ACCOUNT,
      deadlineHex,
      {
        value: inputAmountHex,
        maxPriorityFeePerGas: ethers.BigNumber.from(maxFeePriority).toHexString(),
        maxFeePerGas: ethers.BigNumber.from(maxFeeGas).toHexString(),
        gasLimit: ethers.BigNumber.from(gasLimit).toHexString(),
      },
    )

    console.log('BUY TRANSACTION HASH: ', tx.hash)

    let trxReceipt = null
    while (trxReceipt == null) {
      trxReceipt = await web3.eth.getTransactionReceipt(tx.hash)
      await sleep(100)
    }

    if (trxReceipt.status == 1) {
      console.log('\x1b[1m%s\x1b[0m', 'BUY COMPLETE!')
      setTimeout(function () {
        //get the price
        let Pprice = 0
        Pprice = route.midPrice.invert().toSignificant(6)

        approve(Pprice, dev_address)
      }, 1000)
    } else {
      console.log('\x1b[1m%s\x1b[0m', 'BUY IS UNSUCCESSFUL!')
      run()
    }
  } catch (err) {
    console.log(err)
    run()
  }
}

async function approve(Pprice, dev_address) {
  let contracts = new web3.eth.Contract(minABI, TOKEN_ADDRESS)
  let balance = await contracts.methods.balanceOf(ACCOUNT).call()

  let amountInHex = balance.toString(16)
  const currentGasPriceApprove = await web3.eth.getGasPrice();

  const currentGasApprove = ethers.BigNumber.from(currentGasPriceApprove).toString();
  const approveGas = Math.floor(currentGasApprove * 1.05)

  console.log('\x1b[1m%s\x1b[0m', 'APPROVING TOKEN')

  let abi = [
    'function approve(address _spender, uint256 _value) public returns (bool success)',
  ]
  let contract = new ethers.Contract(TOKEN_ADDRESS, abi, signer)
  let aproveResponse = await contract.approve(EXCHANGE_ADDRESS, amountInHex, {
    gasLimit: 500000,
    gasPrice: approveGas,
  })

  let trxReceipt = null
  while (trxReceipt == null) {
    trxReceipt = await web3.eth.getTransactionReceipt(aproveResponse.hash)
    await sleep(1000)
  }

  if (trxReceipt.status == 1) {
    console.log('\x1b[1m%s\x1b[0m', 'APPROVE COMPLETE!')
    console.log('\x1b[1m%s\x1b[0m', 'RUG PROOF ACTIVATED.')
    console.log(
      '\x1b[1m%s\x1b[0m',
      'WAITING TO SELL at: ' + SELL_AT_X_TIMES + ' %',
    )
    check_rug(Pprice, TOKEN_ADDRESS, dev_address)
  } else {
    console.log('\x1b[1m%s\x1b[0m', 'APPROVE IS UNSUCCESSFUL!')
    run()
  }
}



console.log("                                                                                           ");
console.log("                                                                                           ");
console.log("************************ SNIPER ******************************")
console.log(``)
console.log("")
console.log("ETH Buy Amount:", process.env.AMOUNT_TO_BUY)
console.log("Sell At :", process.env.SELL_AT_PERCENT + " %")
console.log("");



pressAnyKey("************************ NOTE: DO YOUR OWN DUE DILIGENCE, PRESS ANY KEY TO START ******************************", {
  ctrlC: "reject"
})
  .then(() => {
    console.log("\x1b[5m%s\x1b[0m", "MEMPOOL SCANNING STARTED, PLEASE BE PATIENT.......")
    run();
  })
  .catch(() => {
    console.log('Restart the app')
  })
