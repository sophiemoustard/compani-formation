import axios from 'axios';

const baseURL = 'http://36559f22.ngrok.io';

export default {
  authenticate: async (payload) => {
    const response = await axios.post(`${baseURL}/users/authenticate`, payload);
    
    console.log(response.data.data);  
    return response.data.data
  },
};
