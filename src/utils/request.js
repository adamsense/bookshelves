import axios from 'axios'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
// create an axios instance
const service = axios.create({
    baseURL: 'https://gutendex.com/',
    timeout: 3600 * 10 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // if 

        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    //   Determine the request status by custom code

    response => {
        const res = response.data

        if (res.code == 20000) {
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // do something 

            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export default service