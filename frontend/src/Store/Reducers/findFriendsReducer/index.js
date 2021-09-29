const findFriendsReducer = (state = {}, action) => {
    switch (action.type) {
        case "getUsers":{
            return  action.payload;
        }
        default: {
            return state;
        }
    }    
}

export default findFriendsReducer;