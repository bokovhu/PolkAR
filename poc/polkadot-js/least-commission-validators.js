const { ApiPromise, WsProvider } = require('@polkadot/api');

async function getValidatorsSortedByCommission() {
    // Connect to a Polkadot node
    const provider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });

    // Fetch validators
    const validatorPrefs = await api.query.staking.validators(null);
    const validatorAddresses = await api.query.session.validators();

    console.log('validatorPrefs', validatorPrefs.toJSON());
    // console.log('validatorAddresses', validatorAddresses);

    // Combine addresses with preferences and sort by commission
    const sortedValidators = validatorAddresses.map((address, index) => {
        const commission = validatorPrefs[index].commission.unwrap().toNumber();
        return { validatorAddress: address.toString(), commission };
    })
        .sort((a, b) => a.commission - b.commission)
        .slice(0, 10); // Get only the first 10 results

    // Disconnect from the node
    await api.disconnect();

    return sortedValidators;
}

// Usage
getValidatorsSortedByCommission()
    .then(validators => {
        console.log(validators);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
