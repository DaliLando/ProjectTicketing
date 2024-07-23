import axios from 'axios'

export const signUp = async (user)=> {
     
    let {data} = await axios.post('http://localhost:7000/auth/register',user)
    return data;
}

export const signIn = async (user)=> {
    let {data}= await axios.post('http://localhost:7000/auth/login',user)
    return data
}