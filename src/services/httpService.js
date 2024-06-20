import axios from 'axios'
// import appConfig from 'configs/app.config'
// import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from 'constants/api.constant'
// import { PERSIST_STORE_NAME } from 'constants/app.constant'
// import deepParseJson from 'utils/deepParseJson'
// import store from '../store'
// import { onSignOutSuccess } from '../store/auth/sessionSlice'

const unauthorizedCode = [401]
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const BaseService = axios.create({
    timeout: 60000,
    baseURL: baseUrl,
})
BaseService.defaults.headers = {
    'Content-Type': 'application/json',
}
// BaseService.interceptors.request.use(
//     (config) => {
//         config.headers["Content-Type"]="application/json"
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error
        return Promise.reject(error)
    }
)

export default BaseService
