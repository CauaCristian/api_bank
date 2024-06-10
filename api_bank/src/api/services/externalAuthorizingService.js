const axios = require('axios');
const config = require('../../config');

const apiAuthorization = axios.create({
    baseURL: config.externalApiUrl,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

exports.getAuthorization = async () => {
    try {
        const response = await apiAuthorization.get('/authorize');
        if(!response){
            throw new Error('Authorization failed');
        }
        if (response.data.status === 'fail' && !response.data.data.authorization) {
            throw new Error('Authorization failed');
        }
        return true;
    } catch (error) {
        throw new Error('Authorization failed');
    }
};