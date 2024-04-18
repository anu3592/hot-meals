import addInCart from './GetDetails';
import locAddress from './GetAddress';
import sendCartDetails from './SendCart';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    addInCart,
    locAddress,
    sendCartDetails
});

export default rootReducer;