
export function loadLocalStorage() {
    const localStorageKey = 'cardano-wallet-v1';
    const localStorageValue = localStorage.getItem(localStorageKey);
    if (localStorageValue) {
        return JSON.parse(localStorageValue);
    }
    return null;
}