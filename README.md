# Justmoney Swap widget 

A widget that can be placed on any website. It gives a functionality 
to swap tokens and add/remove liquidity to/from liquidity pairs that are in Justmoney.exchange.


![Widget sample](widget-sample.png)

## USAGE:

### Bittorrent Chain

```
<iframe id="jmSwapFrame" src="https://bttc.justmoney.exchange/widget" style="width:500px;height:500px;margin:auto;display:block;" allowtransparency="true" frameborder="0" scrolling="no"></iframe>
<script type="application/javascript">
    var JMSwapOptions = {
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
</script>
<script src="https://bttc.justmoney.exchange/assets/js/widgetLib-bttc-1.0.js"></script>
```

You can customize the options inside JMSwapOptions object e.g. change the background color, button colors or
tokens that will be visible.

If you want to show all the tokens and not limit the tokens, use empty array (tokens: [])

If you do not wish to show liquidity tab and allow liquidity operations for users set liquidityTab property to false.


### Multi-Chain

![Widget sample](widget-sample-multi.png)

```
<iframe id="jmSwapFrame" class="jmSwapFrame" src="https://justmoney.exchange/widget"  style="width: 500px; margin:auto" allowtransparency="true" frameborder="0" scrolling="no"></iframe>
<script type="application/javascript">
    var JMSwapOptions = {
        network: ['TRON','BSC','POLY','BTTC','ZENITH'],
        slippage: 0.05,
        liquidityTab: true,
        shadow: false,
        backgroundColor: '#FFF',
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
            TRON:"WOX",
            BSC:"BNB",
            POLY:"USDT",
            BTTC:"BTT",
            ZENITH: "ZENITH"
        },
    }

</script>
<script src="https://tron.justmoney.exchange/assets/js/widgetLib-1.0.js"></script>
<script src="https://bsc.justmoney.exchange/assets/js/widgetLib-bsc-1.0.js"></script>
<script src="https://poly.justmoney.exchange/assets/js/widgetLib-poly-1.0.js"></script>
<script src="https://bttc.justmoney.exchange/assets/js/widgetLib-bttc-1.0.js"></script>
<script src="https://zenith.justmoney.exchange/assets/js/widgetLib-zenith-1.0.js"></script>
```


Instead of having single network in "network" parameter you can use an array of networks. You need to also in this
case specify tokens, fromToken and toToken parameters for each network like shown in the example above.