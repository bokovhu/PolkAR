const { ApiPromise, WsProvider } = require('@polkadot/api');
const WALLET = '16GDRhRYxk42paoK6TfHAqWej8PdDDUwdDazjv4bAn4KGNeb';
const RPC_URI = 'wss://1rpc.io/dot';

async function currentWalletBalance(api) {

    const account = await api.query.system.account(WALLET);
    const totalBalance = account.data.free.add(account.data.reserved).add(account.data.frozen);

    console.log(`${WALLET} ---`);
    console.log(`Free balance: ${account.data.free.toNumber()}`);
    console.log(`Reserved balance: ${account.data.reserved.toNumber()}`);
    console.log(`Frozen balance: ${account.data.frozen.toNumber()}`);
    console.log(`Total balance: ${totalBalance}`);

}

async function walletBalanceOverTime(api) {
    
}

async function main() {
    const apiProvider = new WsProvider(RPC_URI);
    const api = await ApiPromise.create({
        provider: apiProvider,
    });

    await currentWalletBalance(api);
}

main().then(
    () => process.exit(0)
).catch(
    error => {
        console.error(error);
        process.exit(1);
    }
);