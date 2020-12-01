import axios from 'axios';
// https://www.coingecko.com/en/api#explore-api
const baseURL = 'https://api.coingecko.com/api/v3';

const axiosInstance = axios.create({
  baseURL,
});

export function getCurrencyApiStatus() {
  return axiosInstance.get('/ping');
}

export function getCoinsList() {
  return axiosInstance.get('/coins/list');
}

export default {
  getCurrencyApiStatus,
  getCoinsList,
};
