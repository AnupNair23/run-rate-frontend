import { deleteRequest, getRequest, postRequest, tokenPostRequest } from "../config/axios-helper"
import { ADD_CONTACT_URL, DELETE_CONTACT_URL, GET_CONTACTS_URL } from "../routes/api-routes"

const getAllContacts = async () => {
    return new Promise(async (resolve, reject) => {
        const response = await getRequest(GET_CONTACTS_URL)
        resolve(response)
    })
}

const addUserContact = async(data) => {
    return new Promise(async (resolve, reject) => {
        const response = await postRequest(data, ADD_CONTACT_URL)
        resolve(response)
    })
}

const deleteUserContact = async(data) => {
    return new Promise(async (resolve, reject) => {
        const response = await postRequest(data, DELETE_CONTACT_URL)
        resolve(response)
    })
}

export { getAllContacts, addUserContact, deleteUserContact }
