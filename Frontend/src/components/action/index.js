
export const addItem = (itemData)=>{
    return {
        type: 'ADD_ITEM',
        payload: itemData
    }
}

export const Address = (itemAdd)=>{
    return{
        type: 'ADD_ADDRESS',
        payload:itemAdd
    }
}

export const sendCart = (cartItem)=>{
    return{
        type: 'ADD_INFO',
        payload:cartItem
    }
}

export const keyValue = (search)=>{
    return{
        type: 'SEARCH_KEY',
        payload:search
    }
}