import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getConsumerList = params => { return axios.get(`${base}/consumer/list`, { params: params }); };

export const getConsumerListPage = params => { return axios.get(`${base}/consumer/listpage`, { params: params }); };

export const removeConsumer = params => { return axios.get(`${base}/consumer/remove`, { params: params }); };

export const batchRemoveConsumers = params => { return axios.get(`${base}/consumer/batchremove`, { params: params }); };

export const editConsumer = params => { return axios.get(`${base}/consumer/edit`, { params: params }); };

export const addConsumer = params => { return axios.get(`${base}/consumer/add`, { params: params }); };