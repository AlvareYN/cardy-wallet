
function removeUnesesaryParameters(objects) {
    if (objects.config) {
        delete objects.config;
    }
    if (objects.addressesApi) {
        delete objects.addressesApi;
    }
    if (objects.transactionsApi) {
        delete objects.transactionsApi;
    }
    if (objects.walletsApi) {
        delete objects.walletsApi;
    }
    if (objects.coinSelectionsApi) {
        delete objects.coinSelectionsApi;
    }
    if (objects.keysApi) {
        delete objects.keysApi
    }
    if (objects.stakePoolApi) {
        delete objects.stakePoolApi;
    }
    return objects;
}

module.exports = {
    removeUnesesaryParameters
}