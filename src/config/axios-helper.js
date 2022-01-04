import axios from "axios"
import { getNewToken } from "../services/auth-services";
import { getLocalStorageValue, removeStorage, setLocalStorage } from "./localstorage-helper";

const postRequest = async (data, url) => {
    const token = getLocalStorageValue("token")
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(function (response) {
                resolve(response.data)
            })
            .catch(async (error) => {
                // resolve(error)
                console.log(error.response)
                if (error?.response.status === 401) {
                    removeStorage("token")
                    removeStorage("refreshToken")
                    resolve(error.response)
                }
                resolve(error.response)
            });
    })

}

const getRequest = async (url) => {
    const token = getLocalStorageValue("token")
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch(async (error) => {
                // resolve(error)
                if (error.response?.status === 401) {
                    removeStorage("token")
                    removeStorage("refreshToken")
                    resolve(error.response)
                }
                resolve(error)
            })
    })
}

const tokenPostRequest = async (data, url) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ''
            }
        })
            .then(function (response) {
                resolve(response.data)
            }).catch(async (error) => {

            })
    })

}

export { postRequest, getRequest, tokenPostRequest }