import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
  paramsSerializer: params => qs.stringify(params, { indices: false }),
});

export default instance;
