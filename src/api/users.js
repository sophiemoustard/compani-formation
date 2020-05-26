import axios from 'axios';

const baseURL = 'http://c7105f53.ngrok.io';

export default {
  authenticate: async (payload) => {
    const response = await axios.post(`${baseURL}/users/authenticate`, payload);
    
    console.log(response.data.data);  
    return response.data.data
  },
};
