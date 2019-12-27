const deviceReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_RECORDS_SUCCESS':
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default deviceReducer;
