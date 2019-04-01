import axios from 'axios';

/**
 * @type {AxiosInstance}
 */
const HttpService = axios.create({baseURL: 'https://quiet-dawn-70829.herokuapp.com'});

export default HttpService;
