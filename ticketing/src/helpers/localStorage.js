
export const setLocalStorage =(token , doesExist)=>{

    localStorage.setItem('token',JSON.stringify(token));
    localStorage.setItem('user',JSON.stringify(doesExist))
}


export const getLocalStorage =(key)=>{
  
    return JSON.parse(localStorage.getItem(key))
}


export const removeLocalStorage = (key)=>{
    localStorage.removeItem(key)
}