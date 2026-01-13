import { useState, useEffect } from 'react'
import { today, currentMeal } from './utils/date'

export default function App() {
  const [lang, setLang] = useState(localStorage.lang || 'th')
  const [date, setDate] = useState(today())
  const [meal, setMeal] = useState(currentMeal())
  const [data, setData] = useState({})

  useEffect(() => {
    fetch(`./data/2026-01.json`).then(r=>r.json()).then(setData)
  }, [])

  useEffect(() => {
    localStorage.lang = lang
  }, [lang])

  const items = data[date]?.[meal] || []

  return (
    <div className="app">
      <header className="hero">
        <h1>The Diva’s</h1>
        <div className="lang">
          <button onClick={()=>setLang('th')}>TH</button>
          <button onClick={()=>setLang('en')}>EN</button>
        </div>
      </header>

      <h2 className="date">{date}</h2>

      <div className="meals">
        {['breakfast','lunch','dinner','supper'].map(m=>(
          <button key={m} className={meal===m?'active':''} onClick={()=>setMeal(m)}>{m}</button>
        ))}
      </div>

      <ul className="menu">
        {items.map((i,idx)=>(
          <li key={idx}>{i[lang]}</li>
        ))}
      </ul>
    </div>
  )
}
