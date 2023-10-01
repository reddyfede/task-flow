const days = ["Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday","Sunday"]

export function getDay(num){
    return days[num]
}

export function todayDate(){
    const date = new Date()
    const y = date.getFullYear()

    let m = date.getMonth()
    m = m + 1 
    m.toString().length === 1 ? m = "0"+m : null

    let d = date.getDate()
    d.toString().length === 1 ? d = "0"+d : null

    return `${y}-${m}-${d}`
}

export function fullDateDisplay(date){
    return(
        new Date(date).toLocaleTimeString([],{
            year: 'numeric',
            month: 'numeric',
            day:'numeric', hour: '2-digit',
            minute: '2-digit'})
    )           
} 

export function dateDisplay(date){
    return new Date(date).toLocaleDateString()
}

export function timeToZ(str) {
    const hh = str.slice(0, 2);
    const mm = str.slice(-2);
    const zTime = new Date(new Date().setHours(hh, mm)).toISOString().slice(11, 16)
    return zTime;
}

export function timeToLocal(str){
    const test_hh = 12;
    const z_hh = parseInt(new Date(new Date().setHours(test_hh,"00")).toISOString().slice(11, 13))
    const diff = test_hh - z_hh
    const hh = parseInt(str.slice(0,2))
    let new_hh = hh + diff
    if (new_hh === 24){
        new_hh = 0
    }else if(new_hh < 0){
        new_hh = 24-new_hh
    }else if (new_hh > 24){
        let df = new_hh - 24
        new_hh = df
    }
    new_hh = "00"+ new_hh.toString()
    new_hh = new_hh.slice(-2)
    const mm = str.slice(3,5)
    return new_hh+":"+ mm
}


