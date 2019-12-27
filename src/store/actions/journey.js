import trackingApi from '../../services/tracking';
export const loadJourneysSuccess = (journeys) => {
    return {
        type: 'LOAD_JOURNEYS_SUCCESS',
        payload: {
            journeys,
        },
    };
};

export const selectJourney = journey => ({
    type: 'SELECT_JOURNEY',
    payload: {
        selected: journey,
    },
});

/**
 * Action to fetch journeys from API, then dispatch it to the reducer
 * todo error action
 */
export const loadJourneys = () =>
    async (dispatch) => {
        try {
            const journeys = await trackingApi.getAllJourneys();
            return dispatch(loadJourneysSuccess(journeys))
        } catch (e) {
            console.log(e)
        }
    };

