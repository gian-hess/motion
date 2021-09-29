const initialState = {
    userToken: '',
    userData: {},
}

const authReducer = (state, action) => {
    if (state === undefined) {
        return initialState
    }
    if (action.type === 'auth/login'){
        return { ...state, userToken: action.payload.access, userData: action.payload.user}
    }
    if (action.type === 'userData'){
        console.log('in userData reducer')
        return { ...state, userData: action.payload}
    }
    if (action.type === "setToken") {
        const newState = {...state};
        newState.userToken = action.payload;
        return newState;
    }
    return state
}

export default authReducer;