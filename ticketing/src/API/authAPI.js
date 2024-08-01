import axios from 'axios'

export const signUp = async (user)=> {
     
    let {data} = await axios.post(`${process.env.REACT_APP_URI}/auth/register`,user)
    return data;
}

export const signIn = async (user)=> {
    let {data}= await axios.post(`${process.env.REACT_APP_URI}/auth/login`,user)
    return data
}