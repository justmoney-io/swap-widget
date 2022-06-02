# Justmoney Swap widget 

A widget that can be placed on any website. It gives a functionality 
to swap tokens and add/remove liquidity to/from liquidity pairs that are in Justmoney.exchange.


![Widget sample](widget-sample.png)

## USAGE:

### Single chain EVM (POLY,BSC,BTTC,ZENITH)

```
<script src="https://just.money/assets/js/widgetLib-web3-1.1.js"></script>
<script type="application/javascript">
    var swapOptions = {
        iframeID: 'jmSwapFrame',
        network: 'BTTC',
        slippage: 0.05,
        liquidityTab: true,
        shadow: false,
        backgroundColor: '#F3F3F3',
        backgroundImage: 'url(/assets/img/swap-form-bg-lighter.svg);',
        textColor: '#000',
        buttonStyle: 'background:#000;color:#FFF;',
        maxButtonStyle: 'background:#FFF;color:#000;',
        headingStyle: 'color:#353840;text-shadow:none',
        lightBranding: false,
        tokens: ['TRX', 'BTT'],
        fromToken: "TRX",
        toToken: "BTT",
    }
    new Widget11_web3(swapOptions);
</script>

<iframe id="jmSwapFrame" src="https://just.money/widget" style="width:500px;height:500px;margin:auto;display:block;" allowtransparency="true" frameborder="0" scrolling="no"></iframe>
```

### Single chain (TRON)

```
<script src="https://just.money/assets/js/widgetLib-tron-1.1.js"></script>
<script type="application/javascript">
    var swapOptions = {
        iframeID: 'jmSwapFrame',
        network: 'TRON',
        slippage: 0.05,
        liquidityTab: true,
        shadow: false,
        backgroundColor: '#F3F3F3',
        backgroundImage: 'url(/assets/img/swap-form-bg-lighter.svg);',
        textColor: '#000',
        buttonStyle: 'background:#000;color:#FFF;',
        maxButtonStyle: 'background:#FFF;color:#000;',
        headingStyle: 'color:#353840;text-shadow:none',
        lightBranding: false,
        tokens: ['TRX', 'JM'],
        fromToken: "TRX",
        toToken: "JM",
    }
    new Widget11_tron(swapOptions);
</script>

<iframe id="jmSwapFrame" src="https://just.money/widget" style="width:500px;height:500px;margin:auto;display:block;" allowtransparency="true" frameborder="0" scrolling="no"></iframe>
```

You can customize the options inside JMSwapOptions object e.g. change the background color, button colors or
tokens that will be visible.

If you want to show all the tokens and not limit the tokens, use empty array (tokens: [])

If you do not wish to show liquidity tab and allow liquidity operations for users set liquidityTab property to false.


### Multi-Chain

![Widget sample](widget-sample-multi.png)

```
<script src="https://just.money/assets/js/widgetLib-tron-1.1.js"></script>
<script src="https://just.money/assets/js/widgetLib-web3-1.1.js"></script>
<script type="application/javascript">
    var swapOptions = {
        iframeID: 'jmSwapFrame',
        network: ['TRON','BSC','POLY','BTTC','ZENITH'],
        slippage: 0.05,
        liquidityTab: true,
        shadow: false,
        backgroundColor: '#7f8588',
        backgroundImage: 'url(/assets/img/swap-form-bg-lighter.svg);',
        textColor: '#000',
        buttonStyle: 'background:#0057f6;color:#FFF;',
        maxButtonStyle: 'background:#0057f6;color:#FFF;',
        chartBackgroundColor: '#0057f6',
        headingStyle: 'color:#0057f6;text-shadow:none',
        lightBranding: false,
        tokens: {
            TRON:[],
            BSC:[],
            POLY:[],
            BTTC:[],
            ZENITH:[],
        },
        fromToken: {
            TRON: "TRX",
            BSC:"USDT",
            POLY:"MATIC",
            BTTC:"TRX",
            ZENITH: "BUSD"
        },
        toToken: {
            TRON:"JM",
            BSC:"BNB",
            POLY:"USDT",
            BTTC:"BTT",
            ZENITH: "ZENITH"
        },
    }
    new Widget11_tron(swapOptions);
    new Widget11_web3(swapOptions);
</script>

<iframe id="jmSwapFrame" src="https://just.money/widget" style="width:500px;height:500px;margin:auto;display:block;" allowtransparency="true" frameborder="0" scrolling="no"></iframe>
```


Instead of having single network in "network" parameter you can use an array of networks. You need to also in this
case specify tokens, fromToken and toToken parameters for each network like shown in the example above.



### Cross-Chain

![Widget sample](widget-cc-sample.png)


```
<script src="https://just.money/assets/js/widgetLib-tron-1.1.js"></script>
<script src="https://just.money/assets/js/widgetLib-web3-1.1.js"></script>
<script type="application/javascript">
    var swapOptions = {
        iframeID: 'jmCCSwapFrame',
        shadow: false,
        backgroundColor: '#00ebff',
        backgroundImage: 'url(/assets/img/swap-form-bg-lighter.svg);',
        textColor: '#000',
        buttonStyle: 'background:#FFF;color:#2E3344;',
        maxButtonStyle: 'background:#FFF;color:#2E3344;',
        headingStyle: 'color:#FFF;',
        lightBranding: true,
        tokens: {TRON:[], BSC:[], POLY:[], BTTC:[]},
        fromNetwork: "BSC",
        toNetwork: "TRON",
        fromToken: "BNB",
        toToken: "JM",
    }
    new Widget11_tron(swapOptions);
    new Widget11_web3(swapOptions);
</script>

<iframe id="jmCCSwapFrame" src="https://just.money/ccwidget" style="width:500px;height:500px;margin:auto;display:block;" allowtransparency="true" frameborder="0" scrolling="no"></iframe>
```

