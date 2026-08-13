import { request } from "./client";

export function getCurrentUser(){
    return request(`/auth`);
}
export function logIn(data){
   return request('/auth/log-in',{
        method : 'POST',
        body : JSON.stringify(data)
    })
}
export function signUp(data){
   return request('/auth/sign-up',{
        method: 'POST',
        body: JSON.stringify(data)
    })
}
export function logOut(){
    return request('/auth/log-out',{
        method: 'POST'
    })
}
