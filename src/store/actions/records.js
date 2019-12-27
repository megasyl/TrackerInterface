import trackingApi from '../../services/tracking';
export const loadRecordsSuccess = (records) => {
    console.log('success', records)
    const geoPoints = Object.values(records).map(record => ({
        coordinates:[
            parseFloat(record.latitude),
            parseFloat(record.longitude),
        ]})
    );
    return {
        type: 'LOAD_RECORDS_SUCCESS',
        payload: {
            records,
            geoPoints,
        },
    };
};

/**
 * Action to fetch records from API, then dispatch it to the reducer
 * todo error action
 */
export const loadRecords = () =>
    async (dispatch) => {
        try {
            const records = await trackingApi.getAll();
            return dispatch(loadRecordsSuccess(records))
        } catch (e) {
            console.log(e)
        }
    };

