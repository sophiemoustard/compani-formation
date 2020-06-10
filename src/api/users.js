import axios from 'axios';
import getEnvVars from '../../environment';

export default {
  authenticate: async (payload) => {
    const { baseURL } = getEnvVars();
    const response = await axios.post(`${baseURL}/users/authenticate`, payload);
    return response.data.data;
  },
};
