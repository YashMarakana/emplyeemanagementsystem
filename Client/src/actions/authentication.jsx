import axios from 'axios'
import { useHistory } from "react-router-dom";
import { base_url } from "../config/config ";

export const Updateuser = (id, data) => {
    
    return new Promise((resolve, reject) => {
        axios.put(`${base_url}/userupdate/${id}`, data).then((res) => {
            console.log("Redsds", res);
            if (res.status === 200)
                resolve({ type: "USER_UPDATE", payload: res.data })
            localStorage.setItem("user", JSON.stringify(res.data))
        }).catch((err) => {
            reject(err)
        })
    })
}

export const Signin = (data) => {

    return new Promise((resolve, reject) => {
        axios.post(`${base_url}/login`, data).then((res) => {

            console.log("res))))", res);
            if (res.status === 200)
                resolve({ type: "LOGIN", payload: { data:res.data.data, token: res.data.token } })
                localStorage.setItem("user", JSON.stringify(res.data.data))

        }).catch((err) => {
            reject(err);
        })

    })
}

export const Register =(data) => {

    return new Promise((resolve, reject) => {
        axios.post(`${base_url}/register`, data).then((res) => {
         
            console.log("res@@@---", res.data);
            if (res.status === 200)
                resolve({ type: "SIGN_UP", payload: { data:res.data, token: res.data.token } })
            console.log("editdata", res.data);
            localStorage.setItem("user", JSON.stringify(res.data))
        }).catch((err) => {
            reject(err);
        })
    })
}

export const ResetPassword = (items, token) => {

    console.log("items", items);
    return new Promise((resolve, reject) => {
        axios.post(`${base_url}/change-password`, items, {
            headers: {
                'Authorization': `Bearer ${token} `
            }
        }).then((res) => {
            items.token = ''
            console.log("####", items);
            console.log("redsd===>", res);
            if (res.status === 200) {
                resolve({ type: "RESET_PASS", payload: items })
                localStorage.removeItem("token")

            }
        }).catch((err) => {
            reject(err)
        })
    })
}