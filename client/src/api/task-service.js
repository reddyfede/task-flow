import * as tasksAPI from './task-api'

export async function getTasks(data){
    try{
       const resp = await tasksAPI.index(data)
       return resp
    }catch(err){
        return err
    }
}

