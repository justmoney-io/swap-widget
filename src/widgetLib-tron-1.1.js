var Widget11_tron=function(a){let b=["5cd40795-a262-4d82-8b80-a3284fc7f56b","9865a6aa-6276-4e93-af27-00a0fb7eafda","3d3546d3-704b-4eb6-b44d-3b0eeebed5de","590fdac7-8a8b-4e1c-ba75-6e3ad0be34eb","aad36c24-eff1-4ccb-a0bc-890631d5367b","681e7e52-9598-4437-9373-b6202042ecab"],c="0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";return this.widgetOptions=a,a.host=window.top.location.host||window.location.host,({frameId:a&&a.iframeID?a.iframeID:"jmSwapFrame",iframeElement:window.document.getElementById(a&&a.iframeID?a.iframeID:"jmSwapFrame"),connected:!1,name:null,address:null,cachedContracts:[],init:function(){window.addEventListener("message",b=>{if(b.data&&"JMSwapLoading"==b.data.name){let c=a&&a.iframeID?a.iframeID:"jmSwapFrame";this.iframeElement=this.iframeElement&&this.iframeElement.contentWindow?this.iframeElement:window.document.getElementById(c),this.iframeElement.contentWindow.postMessage({name:"JMSetOptions",options:a},"*")}},!1),window.addEventListener("message",a=>{a.data&&a.data.message&&"setAccount"==a.data.message.action&&this.address&&a.data.message.data.address!=this.address&&window.location.reload(),a.data&&a.data.message&&"setNode"==a.data.message.action&&window.location.reload(),a.data&&"JMSwapFunctionTRON"==a.data.name&&a.data.iframeID==this.frameId&&this[a.data.functionName].apply(this,a.data.functionParams)})},getRandomApiKey:function(){return b[Math.floor(Math.random()*b.length)]},resizeIframe:function(a){let b=this.widgetOptions&&this.widgetOptions.iframeID?this.widgetOptions.iframeID:"jmSwapFrame";this.iframeElement=this.iframeElement&&this.iframeElement.contentWindow?this.iframeElement:window.document.getElementById(b),this.iframeElement.style.height=a+"px"},post:function(a,b){let c=this.widgetOptions&&this.widgetOptions.iframeID?this.widgetOptions.iframeID:"jmSwapFrame";this.iframeElement=this.iframeElement&&this.iframeElement.contentWindow?this.iframeElement:window.document.getElementById(c),this.iframeElement.contentWindow.postMessage({name:"JMSwapResponseTRON",functionName:a,data:b},"*")},connect:function(){if(!window.tronWeb&&!window.top.tronWeb){console.error("No wallet detected or not inside the wallet's browser");return}let a=setInterval(()=>{(window.tronWeb||window.top.tronWeb)&&(this.tronlink=window.tronLink||window.top.tronLink,this.tronweb=window.tronWeb||window.top.tronWeb,clearInterval(a),this.tronlink?this.tronlink.request({method:"tron_requestAccounts"}).then(()=>{this.tronweb&&this.tronweb.defaultAddress&&this.tronweb.defaultAddress.base58&&(this.address=this.tronweb.defaultAddress.base58,this.tronlink&&this.tronweb&&this.tronweb.setHeader({"TRON-PRO-API-KEY":this.getRandomApiKey()}),this.update(),this.connected=!0,this.post("connected"))}):this.tronweb&&this.tronweb.defaultAddress&&this.tronweb.defaultAddress.base58&&(this.address=this.tronweb.defaultAddress.base58,this.update(),this.connected=!0,this.post("connected")))},100)},updateAddress:function(){let a=this.getAddress();this.addressOnLastUpdate&&a!=this.addressOnLastUpdate&&window.location.reload(),this.addressOnLastUpdate=a,this.name=this.getName()},update:function(){this.address=this.getAddress(),this.name=this.getName(),this.getBalanceForBaseLocal().then(a=>{this.post("updated",{address:this.address,name:this.name,balance:a})})},getBalanceForBase:function(){this.tronweb.trx.getUnconfirmedBalance().then(a=>{this.post("balanceForBaseResponse",a/1e6)}).catch(a=>{this.post("balanceForBaseResponse",null)})},getBalanceForBaseLocal:function(){return this.tronweb.trx.getUnconfirmedBalance().then(a=>a/1e6)},getBalanceForToken:async function(a){this.cachedContracts[a.address]=this.cachedContracts[a.address]||await this.tronweb.contract().at(a.address);let b=this.cachedContracts[a.address],c=await b.balanceOf(this.getAddress()).call();this.post("balanceForTokenResponse"+a.symbol,c.toString())},getAddress:function(){return this.address=this.tronweb.defaultAddress.base58,this.address},getName:function(){return this.tronweb.defaultAddress.name},getResources:async function(){let a=0,b=0;b=await this.tronweb.trx.getBandwidth(this.getAddress()).then(a=>Number(a)),a=await this.tronweb.trx.getAccountResources(this.getAddress()).then(a=>void 0===a.EnergyUsed&&a.EnergyLimit?a.EnergyLimit:a.EnergyLimit?a.EnergyLimit-a.EnergyUsed:0),console.log("energy: "+a),console.log("bandwidth: "+b),this.post("energyResponse",{energy:a,bandwidth:b})},getAllowance:async function(a,c){this.cachedContracts[a]=this.cachedContracts[a]||await this.tronweb.contract().at(a);let d=this.cachedContracts[a],b=await d.allowance(this.getAddress(),c).call();b.hasOwnProperty("remaining")?this.post("allowanceResponse",b.remaining.toString()):this.post("allowanceResponse",b.toString())},approve:async function(a,b){this.cachedContracts[a]=this.cachedContracts[a]||await this.tronweb.contract().at(a);let d=this.cachedContracts[a];await d.approve(b,c).send().then(a=>{this.post("approvalResponse",a)}).catch(()=>{this.post("approvalResponse",!1)})},approveSigned:async function(a,b){let d=await this.send(a,"approve(address,uint256)",{},[{type:"address",value:b},{type:"uint256",value:c},],["address","uint256"]);this.post("approvalSignedResponse",d)},async execute(c,d,i,a,j){if(a)for(let b=0;b<a.length;b++)"address"!=a[b].type||a[b].value||(a[b].value=this.address);let e=a.map(a=>a.value),f=this.tronweb;this.cachedContracts[c]=this.cachedContracts[c]||await f.contract().at(c);let g=this.cachedContracts[c],h=await g.methods[d].apply(this,e).call();this.post("executeResponse",h)},async send(d,e,b,f){let a={};b.value&&(a.callValue=b.value),a.feeLimit=1e8,a.shouldPollResponse=!0;let g=await this.tronweb.transactionBuilder.triggerSmartContract(d,e,a,f),c=await this.tronweb.trx.sign(g.transaction).catch(a=>!1);if(!1==c){this.post("sendResponse",!1);return}let h=await this.tronweb.trx.sendRawTransaction(c);this.post("sendResponse",h)},validateResult(a){if(!a||!a.result||!a.result.result)throw new Error("Transaction failed")}}).init()}