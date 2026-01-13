import {useState,useEffect} from 'react'
import {today,getMeal} from '../utils/date'
import {loadMonth} from '../utils/load'

export default function Menu(){
  const [lang,setLang]=useState('th')
  const [date,setDate]=useState(today())
  const [meal,setMeal]=useState(getMeal())
  const [data,setData]=useState({})

  useEffect(()=>{ loadMonth(date).then(setData)},[date])
  const m=data[date]?.[meal]||[]

  return (
    <div className="wrap">
      <header className="hero">
        <h1>The Diva’s</h1>
        <button onClick={()=>setLang(lang==='th'?'en':'th')}>{lang.toUpperCase()}</button>
      </header>
      <nav className="tabs">
        {['breakfast','lunch','dinner','supper'].map(x=>(
          <button key={x} className={meal===x?'active':''} onClick={()=>setMeal(x)}>{x}</button>
        ))}
      </nav>
      <main>
        {m.map((i,idx)=>(
          <div className="card" key={idx}>{i[lang]}</div>
        ))}
      </main>
    </div>
  )
}
