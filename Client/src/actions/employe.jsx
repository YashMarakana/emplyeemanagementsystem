import axios from 'axios'
import { base_url } from "../config/config ";

export const getEmp = (token) => {
    return new Promise((resolve,reject) => {
    return axios.get(`http://localhost:3001/api/emp/getemp`,{headers:{
        'Authorization':`Bearer ${token}`
    }}).then((res) => {
        console.log("ressd",res);
            if(res.status === 200)
               resolve({type: 'FETCH_ITEMS', payload: res.data.data})
        }).catch((err) => {
            reject(err)
        })
    })     
}

export const AddEmp = (data,token) => {
    debugger
    return new Promise((resolve,reject) => {
        debugger
        return axios.post(`${base_url}/emp/add`,data,{headers:{
            'Authorization':`Bearer ${token}`
        }}).then((res) => {
            if(res.status === 200)
               resolve({ type: "ADD_ITEM", payload: res.data.data})
        }).catch((err) => {
            reject(err)
        })

    })
}

export const EditEmp = (id,data,token) => {
     return new Promise((resolve,reject) => {
         debugger
         return axios.put(`${base_url}/emp/edit/${id}`,data,{headers:{
            'Authorization':`Bearer ${token}`
        }}).then((res) => {
              if(res.status === 200){
                  debugger
                  resolve({ type: "EDIT_ITEM", payload:res.data.data})
              }
           }).catch((err) =>{
             reject(err)
         })
     })
}

export const DeleteItem = (id) => {
 
    return new Promise((resolve,reject) => {
        axios.delete(`${base_url}/emp/delete/${id}`).then((res) => {
            if(res.status === 200)
                resolve({ type: "DELETE_ITEM", payload:id})
        }).catch((err) => {
            reject(err);
        })
    })
}