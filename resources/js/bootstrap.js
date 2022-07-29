import _, { reject } from 'lodash';
window._ = _;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true
// window.axios.create({
//     baseURL: 'http://vu3lara9.test',
//     withCredentials: true
// });
window.axios.interceptors.request.use(
   config => {
      if(localStorage.getItem('token') !== null) {
        let tok = localStorage.getItem('token')
         config.headers['Authorization'] = `Bearer ${tok}`;
      }
      return config;
   },
   error => {
    
      Promise.reject(error);
   }
);
window.axios.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401 || error.response?.status === 419){
            // console.log(error.response)
            if(localStorage.getItem('token') !== null){
                localStorage.removeItem('token')
                location.assign('/login')
            }
            
        }
        return Promise.reject(error)
    }
)
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
