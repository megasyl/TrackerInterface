const deviceReducer = (state = {}, action) => {
    switch (action.type) {
        case 'test':
            return {
                ...action.payload
            };
        case 'test2':
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default deviceReducer;
