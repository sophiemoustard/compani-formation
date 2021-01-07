import axios from 'axios';
import getEnvVars from '../../environment';

export default {
  shouldUpdate: async (payload) => {
    const { baseURL } = getEnvVars();
    const response = await axios.get(`${baseURL}/version/should-update?mobileVersion=${payload.mobileVersion}`);
    return response.data.data;
  },
};
