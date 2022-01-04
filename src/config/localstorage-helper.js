const setLocalStorage = async (item, value) => {
    localStorage.setItem(item, value)
}

const removeStorage = async (item) => {
    localStorage.removeItem(item);
}

const getLocalStorageValue = (item) => {
    return localStorage.getItem(item)
}

export { setLocalStorage, removeStorage, getLocalStorageValue }