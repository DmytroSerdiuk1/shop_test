const setProduct = (dataProduct: object[]) => {
    return {
        type: "IS_SET_PRODUCT",
        payload: {
            product: dataProduct
        }
    }
}

export {setProduct}