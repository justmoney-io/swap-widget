var widgetLib10_bsc = widgetLib10_bsc || {
    connected: false,
    name: null,
    address: null,
    POLLING_INTERVAL: 100,
    cachedContracts: [],
    iframeElement: null,
    initialized: false,
    MAX_APPROVAL_VALUE:
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    minABI: [
        // balanceOf
        {
            "constant":true,
            "inputs":[{"name":"_owner","type":"address"}],
            "name":"balanceOf",
            "outputs":[{"name":"balance","type":"uint256"}],
            "type":"function"
        },
        // decimals
        {
            "constant":true,
            "inputs":[],
            "name":"decimals",
            "outputs":[{"name":"","type":"uint8"}],
            "type":"function"
        },
        {
            "constant":true,
            "inputs":[
                {"name":"_owner","type":"address"},
                {"name":"_spender","type":"address"}
            ],
            "name":"allowance",
            "outputs":[
                {"name":"remaining","type":"uint256"}
            ],
            "payable":false,
            "type":"function"
        },
        {
            "constant":false,
            "inputs":[
                {"name":"spender","type":"address"},
                {"name":"tokens","type":"uint256"}
            ],
            "name":"approve",
            "outputs":[
                {"name":"success","type":"bool"}
            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
        }
    ],
    routerABI: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_factory",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_WBASE",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "WBASE",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amountADesired",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBDesired",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountAMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "addLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenDesired",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBaseMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "addLiquidityBase",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountToken",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBase",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "reverse",
                    "type": "bool"
                }
            ],
            "name": "calcPairLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "share",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },

        {
            "inputs": [],
            "name": "factory",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveOut",
                    "type": "uint256"
                }
            ],
            "name": "getAmountIn",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveOut",
                    "type": "uint256"
                }
            ],
            "name": "getAmountOut",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                }
            ],
            "name": "getAmountsIn",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "taxes",
                    "type": "bytes32[]"
                }
            ],
            "name": "getAmountsInTaxed",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                }
            ],
            "name": "getAmountsOut",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "taxes",
                    "type": "bytes32[]"
                }
            ],
            "name": "getAmountsOutTaxed",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "taxes",

                    "type": "bytes32[]"
                }
            ],
            "name": "getAmountsOutTaxedExactBaseForTokens",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                }
            ],
            "name": "getPairBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "balanceTokenA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "balanceTokenB",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                }
            ],
            "name": "getUserLP",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "totalSupply",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userSupply",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userShare",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "pair",
                    "type": "address"
                }
            ],
            "name": "getUserLPwithPair",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "totalSupply",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userSupply",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userShare",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reserveB",
                    "type": "uint256"
                }
            ],
            "name": "quote",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountAMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "removeLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBaseMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "removeLiquidityBase",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountToken",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBase",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBaseMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "removeLiquidityBaseSupportingFeeOnTransferTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountBase",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBaseMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "approveMax",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "removeLiquidityBaseWithPermit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountToken",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBase",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBaseMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "approveMax",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "removeLiquidityBaseWithPermitSupportingFeeOnTransferTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountBase",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountAMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "approveMax",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "removeLiquidityWithPermit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "taxes",
                    "type": "bytes32[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapBaseForExactTokens",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOutMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "taxes",
                    "type": "bytes32[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapExactBaseForTokens",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountOutMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "taxes",
                    "type": "bytes32[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapExactTokensForBase",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountOutMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "taxes",
                    "type": "bytes32[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapExactTokensForTokens",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountInMax",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "taxes",
                    "type": "bytes32[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapTokensForExactBase",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountOut",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountInMax",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "path",
                    "type": "address[]"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "taxes",
                    "type": "bytes32[]"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "swapTokensForExactTokens",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "pair",
                    "type": "address"
                }
            ],
            "name": "syncPair",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ],
    liquidityRouterABI: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_factory",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_WBASE",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "WBASE",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amountADesired",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBDesired",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountAMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "addLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenDesired",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBaseMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "addLiquidityBase",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountToken",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBase",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "factory",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountAMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "removeLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBaseMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "removeLiquidityBase",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountToken",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBase",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBaseMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "removeLiquidityBaseSupportingFeeOnTransferTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountBase",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBaseMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "approveMax",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "removeLiquidityBaseWithPermit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountToken",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBase",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountTokenMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBaseMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "approveMax",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "removeLiquidityBaseWithPermitSupportingFeeOnTransferTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountBase",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenA",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenB",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "liquidity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountAMin",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountBMin",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "approveMax",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "removeLiquidityWithPermit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountA",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountB",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ],

    init: function () {
        if (this.initialized) return;
        window.JMSwapOptions.host = window.top.location.host || window.location.host;
        window.addEventListener(
            'message',
            function (event) {
                if (event.data && event.data.name == 'JMSwapLoading') {
                    this.iframeElement = this.iframeElement && this.iframeElement.contentWindow ? this.iframeElement : window.document.getElementById('jmSwapFrame');
                    this.iframeElement.contentWindow.postMessage(
                        {
                            name: 'JMSetOptions',
                            options: window.JMSwapOptions,
                        },
                        '*'
                    );
                }
            },
            false
        );


        window.addEventListener('message', (e) => {
            if (
                e.data &&
                e.data.message &&
                e.data.message.action == 'accountChanged'
            ) {
                if (this.address && e.data.message.data.address != this.address) {
                    window.location.reload();
                }
            }

            if (e.data && e.data.name == 'JMSwapFunctionBSC') {
                this[e.data.functionName].apply(this, e.data.functionParams);
            }
        });
    },

    resizeIframe: function (height) {
        this.iframeElement = this.iframeElement && this.iframeElement.contentWindow ? this.iframeElement : window.document.getElementById('jmSwapFrame');
        this.iframeElement.style.height = height + 'px';
    },

    post: function (name, data) {
        let finalData = {
            name: 'JMSwapResponseBSC',
            functionName: name,
            data: data,
        };
        this.iframeElement = this.iframeElement && this.iframeElement.contentWindow ? this.iframeElement : window.document.getElementById('jmSwapFrame');
        this.iframeElement.contentWindow.postMessage(finalData, '*');
    },

    connect: function (wallet) {

        if (!window.ethereum && !window.top.ethereum) {
            console.error(
                "No wallet detected or not inside the wallet's browser"
            );
            return;
        }


        async function addNetwork() {
            try {
                await changeChain(56);
            } catch (error) {
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: `0x${parseInt(56, 10).toString(
                                        16
                                    )}`, // Hexadecimal version of 56, prefixed with 0x
                                    chainName: 'Binance Smart Chain',
                                    nativeCurrency: {
                                        name: 'BNB',
                                        symbol: 'BNB',
                                        decimals: 18,
                                    },
                                    rpcUrls: [
                                        'https://bsc-dataseed.binance.org',
                                    ],
                                    blockExplorerUrls: ['https://bscscan.com/'],
                                    iconUrls: [''],
                                },
                            ],
                        });
                    } catch (addError) {
                        console.log('Did not add network');
                    }
                }
            }
        }

        async function changeChain(chainID) {
            return window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${parseInt(chainID, 10).toString(16)}` }], // Hexadecimal version of chain id, prefixed with 0x
            });
        }

        async function connectMetamask() {
            let eth = window.ethereum || window.top.ethereum;
            if (eth) {
                await addNetwork().catch(() => {});
                this.accounts = await eth.request({method: 'eth_requestAccounts'});
                this.web3 = new Web3(eth);
                this.update();
                this.connected = true;
                this.post('connected');

                eth.on('chainChanged', (chainId) => {
                    //window.location.reload();
                });
            } else {
                setTimeout(connectMetamask, this.POLLING_INTERVAL);
            }
        }
        async function connectBinanceWallet() {
            let eth = window.BinanceChain || window.top.BinanceChain;
            if (eth) {
                this.accounts = await window.BinanceChain.request({ method: 'eth_requestAccounts' });
                this.web3 = new Web3(window.BinanceChain);
                this.update();
                this.connected = true;
                this.post('connected');

                eth.on('chainChanged', (chainId) => {
                    window.location.reload();
                });
            } else {
                setTimeout(connectBinanceWallet, this.POLLING_INTERVAL);
            }
        }

        if (wallet == 'MetaMask' || wallet == 'TrustWallet') {
            connectMetamask.call(this);
        }
        if (wallet == 'BinanceWallet') {
            connectBinanceWallet.call(this);
        }
    },


    updateAddress: async function () {
        let newAddress = this.getAddress();
        if (
            this.addressOnLastUpdate &&
            newAddress != this.addressOnLastUpdate
        ) {
            window.location.reload();
        }
        this.addressOnLastUpdate = newAddress;
        this.name = await this.getName();
    },

    update: async function () {
        this.address = this.getAddress();
        this.name = this.getName();
        this.balance = await this.getBalanceForBase();
        this.post('updated', {
            address: this.address,
            name: this.name,
            balance: this.balance,
        });
    },
    getBalanceForBase: async function () {

        this.web3.eth.getBalance(this.getAddress()).then((balance) => {
            this.tempbalance = balance;
            let b = this.web3.utils.fromWei(balance);
            this.post('balanceForBaseResponse', b);
        });
    },

    getBalanceForToken: async function (token) {
        this.cachedContracts[token.address] = this.cachedContracts[token.address] || new this.web3.eth.Contract(this.minABI, token.address);
        const contract = this.cachedContracts[token.address];
        const balance = await contract.methods.balanceOf(this.getAddress()).call();
        this.post(
            'balanceForTokenResponse' + token.symbol,
            this.fromBigNumber(balance, token.decimals)
        );
    },

    getAddress: function () {
        return this.accounts[0];
    },
    getName: function () {
        return this.web3.name;
    },

    getAllowance: async function (token, routerAddress) {
        this.cachedContracts[token] = this.cachedContracts[token] || new this.web3.eth.Contract(this.minABI, token.address);
        const contract = this.cachedContracts[token];
        const allowance = await contract.methods.allowance(
            this.getAddress(),
            routerAddress
        ).call();
        this.post('allowanceResponse', allowance.toString());
    },

    approve: async function (tokenAddress, router_address) {
        this.cachedContracts[tokenAddress] = this.cachedContracts[tokenAddress] || new this.web3.eth.Contract(this.minABI, tokenAddress);
        const contract = this.cachedContracts[tokenAddress];
        await contract.methods
            .approve(
                router_address,
                this.MAX_APPROVAL_VALUE
            )
            .send({from: this.getAddress()})
            .then((res) => {
                this.post('approvalResponse', res);
            })
            .catch(() => {
                this.post('approvalResponse', false);
            });
    },

    approveSigned: async function (tokenAddress, routerAddress) {
        const parameters = [
            {
                type: 'address',
                value: routerAddress,
            },
            {
                type: 'uint256',
                value: this.MAX_APPROVAL_VALUE,
            },
        ];

        let transaction = await this.send(
            tokenAddress,
            'approve(address,uint256)',
            {},
            parameters,
            this.minABI
        );
        this.post('approvalSignedResponse', transaction);
    },

    async execute(address, method, options, parameters, abi) {
        if (parameters) {
            for (let i = 0; i < parameters.length; i++) {
                if (parameters[i].type == 'address' && !parameters[i].value) {
                    parameters[i].value = this.address;
                }
            }
        }

        let paramsArr = parameters.map((val) => {
            return val.value;
        });
        this.cachedContracts[address] = this.cachedContracts[address] || new this.web3.eth.Contract(abi, address);
        const contract = this.cachedContracts[address];
        let result = await contract
            .methods[method].apply(this, paramsArr)
            .call();
        this.post('executeResponse', result);
    },

    async send(address, method, options, parameters, abi) {
        const swapApi = new this.web3.eth.Contract(abi, address);
        let paramsArr = parameters.map((val) => {
            return val.value;
        });
        let ret = await swapApi.methods[method].apply(this, paramsArr).send({
            value: options.value,
            from: this.getAddress()
        }).catch(() => {
            this.post('sendResponse', false);
        });
        this.post('sendResponse', ret);
    },

    fromBigNumber(amount, decimals) {
        return amount / Math.pow(10, decimals);
    },
};
widgetLib10_bsc.init();
