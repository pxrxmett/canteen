export async function loadMonth(date){
 const f=date.slice(0,7)+'.json'
 const r=await fetch(import.meta.env.BASE_URL+'data/'+f)
 return r.ok? r.json():{}
}
