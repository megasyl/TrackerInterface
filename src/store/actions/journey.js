import trackingApi from '../../services/tracking';
export const loadJourneysSuccess = (journeys) => {
    return {
        type: 'LOAD_JOURNEYS_SUCCESS',
        payload: {
            journeys,
        },
    };
};

export const selectJourney = (journey, key) => ({
    type: 'SELECT_JOURNEY',
    payload: {
        selected: journey,
        selectedKey: key,
    },
});

/**
 * Action to fetch journeys from API, then dispatch it to the reducer
 * todo error action
 */
export const loadJourneys = (filters) =>
    async (dispatch) => {
        try {
            const journeys = await trackingApi.getAllJourneys(filters);
            return dispatch(loadJourneysSuccess(journeys))
        } catch (e) {
            console.log(e)
        }
    };

