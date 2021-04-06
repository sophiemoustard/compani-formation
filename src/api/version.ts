import axios from 'axios';
import getEnvVars from '../../environment';

export default {
  shouldUpdate: async (params) => {
    const { baseURL } = getEnvVars();
    const response = await axios.get(`${baseURL}/version/should-update`, { params });
    return response.data.data;
  },
};
