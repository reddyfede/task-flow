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