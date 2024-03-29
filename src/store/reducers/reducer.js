import * as actionTypes from '../actions/actions';
import config from '../../config';

const initialState = {
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change
    experimentalJourneyDisplay: true,
};

const reducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];

    console.log(action.type, {
        ...state,
        ...action.payload
    })
    switch (action.type) {
        case 'LOAD_RECORDS_SUCCESS':
            return {
                ...state,
                ...action.payload
            };
        case 'LOAD_JOURNEYS_SUCCESS':
            return {
                ...state,
                ...action.payload
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                ...action.payload
            };
        case 'LOGIN_COOKIE_SUCCESS':
            return {
                ...state,
                ...action.payload,
            };
        case 'LOGIN_COOKIE_ERROR':
            return {
                ...state,
                ...action.payload,
            };
        case 'LOGIN_COOKIE_REMOVE':
            return {
                ...state,
                ...action.payload,
            };
        case 'SELECT_JOURNEY':
            const { selectedJourney } = action.payload;
            return {
                ...state,
                ...action.payload,
                journeys: state.journeys.map(j => j._id === selectedJourney._id ? selectedJourney : j),
                center: { lat: selectedJourney.records[0].latitude, lng: selectedJourney.records[0].longitude },
            };
        case 'SELECT_JOURNEY_MARKER':
            return {
                ...state,
                ...action.payload
            };
        case 'SELECT_JOURNEY_DISPLAY_MODE':
            return {
                ...state,
                experimentalJourneyDisplay: !state.experimentalJourneyDisplay
            };
        case 'SELECT_RECORD':
            const record = action.payload.selectedRecord;
            return {
                ...state,
                center: { lat: record.latitude, lng: record.longitude },
                ...action.payload
            };
        case 'UPDATE_RECORD':
            const records = state.records.map(record => {
                if (action.payload.record.imei === record.imei)
                    return action.payload.record;
                return record;
            });
            return {
                ...state,
                center: state.selected ? [state.selected .latitude, state.selected .longitude] : state.center,
                records
            };
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.isOpen;
                const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return {
                ...state,
                isOpen: open,
                isTrigger: trigger
            };
        case actionTypes.NAV_CONTENT_LEAVE:
            return {
                ...state,
                isOpen: open,
                isTrigger: trigger,
            };
        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger,
                };
            }
            return {...state};
        case actionTypes.FULL_SCREEN :
            return {
                ...state,
                isFullScreen: !state.isFullScreen
            };
        case actionTypes.FULL_SCREEN_EXIT:
            return {
                ...state,
                isFullScreen: false
            };
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            };
        default:
            return state;
    }
};

export default reducer;
