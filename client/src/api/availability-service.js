import * as availabilityAPI from './availability-api'

export async function createAvailability(data){
    try{
       const resp = await availabilityAPI.create(data)
       return resp
    }catch(err){
        return err
    }
}

export async function updateAvailability(id,data){
    try{
       const resp = await availabilityAPI.update(id,data)
       return resp
    }catch(err){
        return err
    }
}

export async function deleteAvailability(id){
    try{
       const resp = await availabilityAPI.destroy(id)
       return resp
    }catch(err){
        return err
    }
}
