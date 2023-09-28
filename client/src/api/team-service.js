import * as teamAPI from './team-api'

export async function createTeam(data){
    try{
       const resp = await teamAPI.create(data)
       return resp
    }catch(err){
        return err
    }
}

export async function updateTeam(data){
    try{
       const resp = await teamAPI.update(data)
       return resp
    }catch(err){
        return err
    }
}