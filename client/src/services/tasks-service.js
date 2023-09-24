import * as tasksAPI from '../api/tasks-api'

export async function getAllTasks(){
    try {
        const data = await tasksAPI.index()
        return data
    }catch(err){
        return err
    }
}

export async function updateAllTasks(task){
    try {
        const data = await tasksAPI.update(task)
        return data
    }catch(err){
        return err
    }
}