const notificationsReducer = (state = {}, action) => {
    switch (action.type) {
        case "getRequests":{
            return  action.payload;
        }
        default: {
            return state;
        }
    }    
}

export default notificationsReducer;