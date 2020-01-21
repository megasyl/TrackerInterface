import qs from 'qs';
const trackingApiUrl = 'http://server.lasjunies.fr:8080';

export default class TrackingAPI {
    static async getAllRecords(filters) {
        try {
            const response = await fetch(`${trackingApiUrl}/v1/records`, {
                method: 'GET',
            });
            return response.json();
        } catch (e) {
            console.log(e)
        }
    }

    static async getLastRecords(filters) {
        try {
            const response = await fetch(`${trackingApiUrl}/v1/records/last-by-imei`, {
                method: 'GET',
            });
            return response.json();
        } catch (e) {
            console.log(e)
        }
    }

    static async getAllJourneys(filters) {
        try {
            const params = qs.stringify(filters);
            const response = await fetch(`${trackingApiUrl}/v1/journeys?${params}`, {
                method: 'GET',
            });
            return response.json();
        } catch (e) {
            console.log(e)
        }
    }

    static async getJourneyById(id) {
        try {
            const response = await fetch(`${trackingApiUrl}/v1/journeys/${id}`, {
                method: 'GET',
            });
            return response.json();
        } catch (e) {
            console.log(e)
        }
    }

    static async login(login, password) {
        const response = await fetch(`${trackingApiUrl}/v1/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login,
                password
            })
        });
        if (response.ok)
            return response.json();
        throw { status: response.status, message: response.statusText }

    }
}
