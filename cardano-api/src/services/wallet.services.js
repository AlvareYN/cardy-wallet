const { Seed, WalletServer } = require('cardano-wallet-js');

const walletServer = WalletServer.init('http://localhost:8090/v2');

function getNmonicSentence() {
    const recovery = Seed.generateRecoveryPhrase();
    return Seed.toMnemonicList(recovery);
}
/**
 * 
 * @param {string} name 
 * @param {Array} nmonicSentence 
 * @param {string} passphrase 
 * @returns wallet
 */
async function createWallet(name, nmonicSentence, passphrase) {
    return await walletServer.createOrRestoreShelleyWallet(name, nmonicSentence, passphrase);
}


async function getWallet(walletId){
    return await walletServer.getShelleyWallet(walletId);
}

module.exports = {
    createWallet,
    getNmonicSentence,
    getWallet
}