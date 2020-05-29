import axios from 'axios';

const baseURL = 'http://11a7d8587123.ngrok.io';

export default {
  authenticate: async (payload) => {
    const response = await axios.post(`${baseURL}/users/authenticate`, payload);
    return response.data.data
  },
};
