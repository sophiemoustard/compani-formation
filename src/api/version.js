import axios from 'axios';
import getEnvVars from '../../environment';

export default {
  checkUpdate: async payload => {
    const { baseURL } = getEnvVars();
    const response = await axios.get(`${baseURL}/version/check-update?apiVersion=${payload.apiVersion}`);
    return response.data.data;
  },
};
