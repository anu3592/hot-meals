let initialState = "";

const searchValue = (state=initialState, action)=>{
    switch(action){
        case "SEARCH_KEY":
            return state = action.payload;
        default:
            return state;
    }
}

export default searchValue;