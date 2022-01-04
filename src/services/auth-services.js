import { getRequest, postRequest } from "../config/axios-helper"
import { getLocalStorageValue } from "../config/localstorage-helper"
import { BASE_URL, LOGIN_URL, REGISTER_URL, GET_NEW_TOKEN_URL } from "../routes/api-routes"

const registerUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        const response = await postRequest(data, REGISTER_URL)
        console.log('resp == ', response)
        resolve(response)
    })
}

const verifyUser = async (code) => {
    return new Promise(async (resolve, reject) => {
        console.log('code -- ', code)
        const response = await getRequest(BASE_URL + "/auth/confirm/" + code)
        console.log('resp == ', response)
        resolve(response)
    })
}

const loginUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        const response = await postRequest(data, LOGIN_URL)
        console.log('resp == ', response)
        resolve(response)
    })
}

const getNewToken = async () => {
    console.log('coming here -- ')
    const data = {
        request_token: getLocalStorageValue('refreshToken')
    };
    const response = await postRequest(data, GET_NEW_TOKEN_URL);
    console.log('response -- ', response)
    return response;
};

export { registerUser, verifyUser, loginUser, getNewToken }