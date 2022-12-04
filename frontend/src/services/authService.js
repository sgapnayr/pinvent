import axios from 'axios'
import { toast } from 'react-toastify'

export const BACKEND_URL = process.env.REACT_BACKEND_URL

export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/users/register`, userData)
        if (response.statusText === "OK") {
            toast.success("User Registered Successfully.")
        }
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
        toast.error(message)
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/users/login`, userData)
        if (response.statusText === "OK") {
            toast.success("Login Successful.")
        }
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
        toast.error(message)
    }
}

export const logoutUser = async () => {
    try {
        axios.get(`http://localhost:4000/api/users/logout`)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
        toast.error(message)
    }
}

export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/users/forgotpassword`, userData)
        if (response.statusText === "OK") {
            toast.success(response.data.message)
        }
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
        toast.error(message)
    }
}
