import * as usersAPI from './users-api'

export async function signupService(data){
    try{
       const resp = await usersAPI.signup(data)
       return resp
    }catch(err){
        return err
    }
}