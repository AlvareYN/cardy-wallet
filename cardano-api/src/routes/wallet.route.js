const express = require('express');
const { getNmonicSentence, createWallet, getWallet } = require('../services/wallet.services');
const { removeUnesesaryParameters } = require('../utils/utils');

const router = express.Router();

router.get('/nmonic', (req, res) => {
    res.status(200).json(getNmonicSentence());
});


router.post('/create_wallet', async (req, res) => {
    try {
        const { name, nmonicSentence, passphrase } = req.body;
        const wallet = await createWallet(name, nmonicSentence, passphrase);
        res.status(200).json(removeUnesesaryParameters(wallet));
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
})


router.get('/wallet_info/:wallet_id', async (req, res) => {
    try {
        const { wallet_id } = req.params;
        const wallet = await getWallet(wallet_id);
        const addresses = await wallet.getAddresses()
        res.status(200).json({ ...removeUnesesaryParameters(wallet), addresses });
    } catch (error) {
        console.log(error)
        res.status(error.response.status).json(error.response.data);
    }
})


module.exports = router;
