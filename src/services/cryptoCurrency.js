import axios from "axios"
const baseURL = 'https://api.coingecko.com/api/v3'
const axiosInstance = axios.create({
    baseURL
})
export const getCurrencyApiStatus = function () {
    return axiosInstance.get('/ping');
}
export const getCoinsList = function () {
    return axiosInstance.get('/coins/list');
}

export default {
    getCurrencyApiStatus,
    getCoinsList
}