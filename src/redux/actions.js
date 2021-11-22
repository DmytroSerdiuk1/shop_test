const setProduct = (dataProduct) => {
    return {
        type: "IS_SET_PRODUCT",
        payload: {
            product: dataProduct
        }
    }
}

const setFilter = (text) => {
    return {
        type: "FILTER",
        payload: {
            text
        }
    }
}

export {setProduct, setFilter}