const itGetProduct = (dataProduct) => {
    return {
        type: "IS_GET_PRODUCT",
        payload: {
            product: dataProduct
        }
    }
}

const filter = (text) => {
    return {
        type: "FILTER",
        payload: {
            text
        }
    }
}

export {itGetProduct, filter}