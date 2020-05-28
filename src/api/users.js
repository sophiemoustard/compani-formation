import axios from 'axios';

const baseURL = 'http://e30e1879a750.ngrok.io';

export default {
  authenticate: async (payload) => {
    const response = await axios.post(`${baseURL}/users/authenticate`, payload);
    return response.data.data
  },
};
