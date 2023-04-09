import axios from "axios";

export default class UserService
{
    static async getAll()
    {
        return axios.get('/users')
    }

    static async storeUser(params)
    {
        return axios.post('users/', params)
    }

    static async getUser(id)
    {
        return axios.get(`users/${id}`)
    }

    static async editUser(id, params)
    {
        return axios.put(`users/${id}`, params)
    }

    static async deleteUser(id)
    {
        return axios.delete(`users/${id}`)
    }
}