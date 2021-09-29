import { combineReducers, createStore } from 'redux';
import authReducer from './Reducers/authReducer';
import findFriendsReducer from "./Reducers/findFriendsReducer";
import notificationsReducer from "./Reducers/notificationsReducer"

const appReducer = combineReducers({authReducer, findFriendsReducer, notificationsReducer});

const rootReducer = (state, action) => {
    if (action.type === "USER_LOGOUT") {
        return appReducer(undefined, action)
    }    
    return appReducer(state, action)
}

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;