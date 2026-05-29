import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
    baseURL: 'http://localhost:8081',
    //withCredentials: true
});

instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return response.data;
    }
);

export default instance;
