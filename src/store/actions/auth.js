import trackingApi from '../../services/tracking';
import { setCookie } from 'redux-cookie';
import { get, remove } from 'js-cookie';
import jwt from 'jsonwebtoken';

export const loginSuccess = ({data, token}) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            user: data,
            token
        },
    };
};

export const loginCookieSuccess = ({data, token}) => {
    return {
        type: 'LOGIN_COOKIE_SUCCESS',
        payload: {
            user: data,
            token,
            loadedCookie: true,
        },
    };
};

export const loginCookieError = (pathname) => {
    return {
        type: 'LOGIN_COOKIE_ERROR',
        payload: {
            loadedCookie: true,
            requestedUrl: pathname
        },
    };
};

export const loginCookieRemove = () => {
    return {
        type: 'LOGIN_COOKIE_REMOVE',
        payload: {
            loadedCookie: true,
            user: null
        },
    };
};

/**
 * Action to load auth token into store
 */
export const loadAuthCookie = (pathname) =>
    async (dispatch) => {
        try {
            const token = get('AUTH_TOKEN');
            if (!token) {
                return dispatch(loginCookieError(pathname))
            }
            const { data } = jwt.decode(token);
            if (!data) {
                return dispatch(loginCookieError(pathname))
            }
            dispatch(loginCookieSuccess({data, token}))
        } catch (e) {
            console.log(e)
        }
    };

export const removeAuthCookie = () =>
    async (dispatch) => {
        try {
            remove('AUTH_TOKEN');
            dispatch(loginCookieRemove())
        } catch (e) {
            console.log(e)
        }
    };

/**
 * Action to fetch journeys from API, then dispatch it to the reducer
 * todo error action
 */
export const login = (login, password) =>
    async (dispatch) => {
        try {
            const response = await trackingApi.login(login, password);
            dispatch(loginSuccess(response));
            dispatch(setCookie('AUTH_TOKEN', response.token))

        } catch (e) {
            console.log(e.status)
            if (e.status === 403) {
                console.log('WRONG CREDS')
            }
        }
    };

