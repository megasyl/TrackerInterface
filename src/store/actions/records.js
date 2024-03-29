import trackingApi from '../../services/tracking';
export const loadRecordsSuccess = (records) => {
    return {
        type: 'LOAD_RECORDS_SUCCESS',
        payload: {
            records,
        },
    };
};

export const selectRecord = (record, key) => ({
    type: 'SELECT_RECORD',
    payload: {
        selectedRecord: record,
        selectedKey: key,
    },
});

export const updateRecord = (record) => ({
    type: 'UPDATE_RECORD',
    payload: {
        record,
    },
});

/**
 * Action to fetch records from API, then dispatch it to the reducer
 * todo error action
 */
export const loadLastRecords = () =>
    async (dispatch) => {
        try {
            let records = await trackingApi.getLastRecords();
            records = records.map(({record}) => record);
            return dispatch(loadRecordsSuccess(records))
        } catch (e) {
            console.log(e)
        }
    };
