const trackingApiUrl = 'http://server.lasjunies.fr:8080';

export default class TrackingAPI {
    static async getAll(filters) {
        try {
            const response = await fetch(`${trackingApiUrl}/v1/records`, {
                method: 'GET',
            });
            return response.json();
        } catch (e) {
            console.log(e)
        }
    }
}
