import * as usersAPI from './users-api'

export async function signupService(data){
    try{
       const resp = await usersAPI.signup(data)
       return resp
    }catch(err){
        return err
    }
}

export async function loginService(data){
    try{
       const resp = await usersAPI.login(data)
       return resp
    }catch(err){
        return err
    }
}

export async function userDetails(data){
    try{
       const resp = await usersAPI.details(data)
       return resp
    }catch(err){
        return err
    }
}