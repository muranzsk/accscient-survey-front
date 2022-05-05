import axios from 'axios';

const AKAGI_API_BASE_URL = "http://localhost:8080/api/v1/";


class AkagiService {

    verifyAccess(data, config) {
        return axios.post(AKAGI_API_BASE_URL + "accessDashboard", data, config);
    }

    getDashboard(code) {
        return axios.get(AKAGI_API_BASE_URL + "dashboard?code=" + code);
    }

    getUniqueForm(code) {
        return axios.get(AKAGI_API_BASE_URL + "getRecord?code=" + code);
    }

    uploadFile(formData, config) {
        return axios.post(AKAGI_API_BASE_URL + "storeFile", formData, config);
        
    }

    updateRecord(data, config) {
        return axios.post(AKAGI_API_BASE_URL + "updateRecord", data, config);
        
    }

    sendReminderToAll(idUser) {
        return axios.get(AKAGI_API_BASE_URL + "sendReminder?idUser=" + idUser);
    }

    sendIndivReminder(email) {
        return axios.get(AKAGI_API_BASE_URL + "individualReminder?email=" + email);
    }

}

export default new AkagiService()