import * as tasksAPI from './task-api'

export async function getTasks(data){
    try{
        const resp = await tasksAPI.index(data);
        return resp;
    }catch(err){
        return err
    }
}

export async function createTask(newData){
    try {
        const data = await tasksAPI.create(newData)
        return data
    }catch(err){
        return err
    }
}