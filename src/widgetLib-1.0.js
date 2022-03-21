var widgetLib10_tron = widgetLib10_tron || {
    connected: false,
    name: null,
    address: null,
    POLLING_INTERVAL: 100,
    cachedContracts: [],
    iframeElement: null,
    initialized: false,
    MAX_APPROVAL_VALUE:
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    apiKeys: [
        '5cd40795-a262-4d82-8b80-a3284fc7f56b',
        '9865a6aa-6276-4e93-af27-00a0fb7eafda',
        '3d3546d3-704b-4eb6-b44d-3b0eeebed5de',
        '590fdac7-8a8b-4e1c-ba75-6e3ad0be34eb',
        'aad36c24-eff1-4ccb-a0bc-890631d5367b',
        '681e7e52-9598-4437-9373-b6202042ecab',
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
                e.data.message.action == 'setAccount'
            ) {
                if (this.address && e.data.message.data.address != this.address) {
                    window.location.reload();
                }
            }
            if (
                e.data &&
                e.data.message &&
                e.data.message.action == 'setNode'
            ) {
                window.location.reload();
            }

            if (e.data && e.data.name == 'JMSwapFunctionTRON') {
                this[e.data.functionName].apply(this, e.data.functionParams);
            }
        });
    },
    getRandomApiKey: function () {
        return this.apiKeys[Math.floor(Math.random() * this.apiKeys.length)];
    },


    resizeIframe: function (height) {
        this.iframeElement = this.iframeElement && this.iframeElement.contentWindow ? this.iframeElement : window.document.getElementById('jmSwapFrame');
        this.iframeElement.style.height = height + 'px';
    },

    post(name, data) {
        let finalData = {
            name: 'JMSwapResponseTRON',
            functionName: name,
            data: data,
        };
        this.iframeElement = this.iframeElement && this.iframeElement.contentWindow ? this.iframeElement : window.document.getElementById('jmSwapFrame');
        this.iframeElement.contentWindow.postMessage(finalData, '*');
    },

    connect: function () {
        if (!window.tronWeb && !window.top.tronWeb) {
            console.error(
                "No wallet detected or not inside the wallet's browser"
            );
            return;
        }

        const tronLinkInterval = setInterval(() => {
            if (window.tronWeb || window.top.tronWeb) {
                this.tronlink = window.tronLink || window.top.tronLink;
                this.tronweb = window.tronWeb || window.top.tronWeb;
                clearInterval(tronLinkInterval);
                if (this.tronlink) {
                    this.tronlink.request({ method: 'tron_requestAccounts' }).then(() => {
                        if (this.tronweb && this.tronweb.defaultAddress && this.tronweb.defaultAddress.base58) {
                            this.address = this.tronweb.defaultAddress.base58;
                            if (this.tronlink && this.tronweb) this.tronweb.setHeader({'TRON-PRO-API-KEY': this.getRandomApiKey()});
                            this.update();
                            this.connected = true;
                            this.post('connected');
                        }
                    });
                } else {
                    if (this.tronweb && this.tronweb.defaultAddress && this.tronweb.defaultAddress.base58) {
                        this.address = this.tronweb.defaultAddress.base58;
                        this.update();

                        this.connected = true;
                        this.post('connected');
                    }
                }
            }
        }, this.POLLING_INTERVAL);

    },

    updateAddress: function () {
        let newAddress = this.getAddress();
        if (
            this.addressOnLastUpdate &&
            newAddress != this.addressOnLastUpdate
        ) {
            window.location.reload();
        }
        this.addressOnLastUpdate = newAddress;
        this.name = this.getName();

    },

    update: function () {
        this.address = this.getAddress();
        this.name = this.getName();
        this.getBalanceForBaseLocal().then((balance) => {
            this.post('updated', {
                address: this.address,
                name: this.name,
                balance: balance,
            });
        });
    },
    getBalanceForBase: function () {
        this.tronweb.trx.getUnconfirmedBalance().then((balance) => {
            this.post('balanceForBaseResponse', balance / Math.pow(10, 6));
        }).catch((e) => {
            this.post('balanceForBaseResponse', null);
        });

    },

    getBalanceForBaseLocal: function () {
        return this.tronweb.trx.getUnconfirmedBalance().then((balance) => {
            return balance / Math.pow(10, 6);
        });
    },

    getBalanceForToken: async function (token) {
        this.cachedContracts[token.address] = this.cachedContracts[token.address] || await this.tronweb.contract().at(token.address);
        const contract = this.cachedContracts[token.address];
        const balance = await contract
            .balanceOf(this.getAddress())
            .call();
        this.post(
            'balanceForTokenResponse' + token.symbol,
            balance.toString()
        );
    },

    getAddress: function () {
        this.address = this.tronweb.defaultAddress.base58;
        return this.address;
    },
    getName: function () {
        return this.tronweb.defaultAddress.name;
    },
    getResources: async function () {
        let energy = 0;
        let bandwidth = 0;
        bandwidth = await this.tronweb.trx
            .getBandwidth(this.getAddress())
            .then((meta) => {
                return Number(meta);
            });
        energy = await this.tronweb.trx
            .getAccountResources(this.getAddress())
            .then((res) => {
                if (typeof res.EnergyUsed === 'undefined' && res.EnergyLimit) {
                    return res.EnergyLimit;
                } else if (res.EnergyLimit) {
                    return (res.EnergyLimit - res.EnergyUsed);
                } else {
                    return 0;
                }
            });
        console.log('energy: ' + energy);
        console.log('bandwidth: ' + bandwidth);

        this.post('energyResponse', { energy, bandwidth });
    },

    getAllowance: async function (token, routerAddress) {
        this.cachedContracts[token] = this.cachedContracts[token] || await this.tronweb.contract().at(token);
        const contract = this.cachedContracts[token];
        const allowance = await contract
            .allowance(this.getAddress(), routerAddress)
            .call();
        if (allowance.hasOwnProperty('remaining')) {
            this.post('allowanceResponse', allowance.remaining.toString());
        } else {
            this.post('allowanceResponse', allowance.toString());
        }

    },

    approve: async function (tokenAddress, router_address) {
        this.cachedContracts[tokenAddress] = this.cachedContracts[tokenAddress] || await this.tronweb.contract().at(tokenAddress);
        const contract = this.cachedContracts[tokenAddress];
        await contract
            .approve(router_address, this.MAX_APPROVAL_VALUE)
            .send()
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
            ['address', 'uint256']
        );
        this.post('approvalSignedResponse', transaction);
    },

    async execute(address, method, options, parameters, outputParamTypes) {

        if (parameters) {
            for (let i=0;i<parameters.length;i++) {
                if (parameters[i].type == 'address' && !parameters[i].value) {
                    parameters[i].value = this.address;
                }
            }
        }

        let paramsArr = parameters.map((val) => {
            return val.value;
        });
        const tronWeb = this.tronweb;
        this.cachedContracts[address] = this.cachedContracts[address] || await tronWeb.contract().at(address);
        const contract = this.cachedContracts[address];
        let result = await contract
            .methods[method].apply(this, paramsArr)
            .call();
        this.post('executeResponse', result);
    },

    async send(address, method, options, parameters) {
        let params = {};
        if (options.value) {
            params.callValue = options.value;
        }
        params.feeLimit = 100000000;
        params.shouldPollResponse = true;
        const transaction =
            await this.tronweb.transactionBuilder.triggerSmartContract(
                address,
                method,
                params,
                parameters
            );
        const signedTransaction = await this.tronweb.trx
            .sign(transaction.transaction)
            .catch((e) => {
                return false;
            });
        if (signedTransaction == false) {
            this.post('sendResponse', false);
            return;
        }
        const result = await this.tronweb.trx.sendRawTransaction(
            signedTransaction
        );
        this.post('sendResponse', result);
    },
    validateResult(transaction) {
        if (!transaction || !transaction.result || !transaction.result.result) {
            throw new Error(`Transaction failed`);
        }
    },
};
widgetLib10_tron.init();
