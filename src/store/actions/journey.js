import trackingApi from '../../services/tracking';
export const loadJourneysSuccess = (journeys) => {
    return {
        type: 'LOAD_JOURNEYS_SUCCESS',
        payload: {
            journeys,
        },
    };
};

export const selectJourneySuccess = (journey, key) => ({
    type: 'SELECT_JOURNEY',
    payload: {
        selectedJourney: journey,
        selectedKey: key,
    },
});

export const selectJourneyMarker = (marker) => ({
    type: 'SELECT_JOURNEY_MARKER',
    payload: {
        selectedJourneyMarker: marker,
    },
});

export const selectJourneyDisplayMode = () => ({
    type: 'SELECT_JOURNEY_DISPLAY_MODE'
});

/**
 * Action to fetch journeys from API, then dispatch it to the reducer
 * todo error action
 */
export const selectJourney = (journey, key) =>
    async (dispatch) => {
        try {
            if (!journey.records)
                journey = await trackingApi.getJourneyById(journey._id);
            return dispatch(selectJourneySuccess(journey, key))
        } catch (e) {
            console.log(e)
        }
    };

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

