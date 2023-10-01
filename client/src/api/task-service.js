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
        const resp = await tasksAPI.create(newData)
        return resp
    }catch(err){
        return err
    }
}

export async function showTask(id){
    try{
       const resp = await tasksAPI.show(id)
       return resp
    }catch(err){
        return err
    }
}

export async function getTasksByTeam(id){
    try{
       const resp = await tasksAPI.showTeam(id)
       return resp
    }catch(err){
        return err
    }
}


export async function updateTask(id, data) {
    try{
       const resp = await tasksAPI.update(id, data)
       return resp
    }catch(err){
        return err
    }
}



export async function deleteTask(id){
    try{
       const data = await tasksAPI.destroy(id)
       return data
    }catch(err){
        return err
    }
}

export async function updateTaskAssignment(taskId,empId, data) {
    try{
       const resp = await tasksAPI.updateAssignment(taskId,empId, data)
       return resp
    }catch(err){
        return err
    }
}
