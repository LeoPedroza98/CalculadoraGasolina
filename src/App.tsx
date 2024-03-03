import { useState, FormEvent } from 'react'
import logoImg from './assets/logo.png'
import './App.css'


interface InfoProps{
  title: string,
  gasolina: string | number,
  alcool: string | number
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState<number>(0)
  const [alcoolInput, setAlcoolInput]  = useState<number>(0)
  const [info,setInfo] = useState<InfoProps>()


 

  function calcular(event: FormEvent ){
    event.preventDefault()
    let calculo = (alcoolInput / gasolinaInput)

    if (calculo <= 0.7){
      setInfo({
        title : "Compensa usar Álcool",
        alcool: formatarMoeda(alcoolInput),
        gasolina: formatarMoeda(gasolinaInput)
      })
    }else{
      setInfo({
        title : "Compensa usar Gasolina",
        alcool: formatarMoeda(alcoolInput),
        gasolina: formatarMoeda(gasolinaInput)
      })
    }
  }
  function formatarMoeda(valor:number){
    let valorFormatado = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado
  }
  return (
    <div>
      <main className='container'>
        <img className='logo' src={logoImg} alt="Logo da Calculadora" />
        <h1 className='title'>Qual a melhor opção ?</h1>

        <form className='form' onSubmit={calcular}>
          <label> Alcool (preço por litro):</label>
          <input type="number" className='input' placeholder='3.64' min="1" step="0.01" required value={alcoolInput} 
          onChange={(e) => setAlcoolInput(Number(e.target.value))}/>

          <label> Gasolina (preço por litro):</label>
          <input type="number" className='input' placeholder='5.63' min="1" step="0.01" required
          value={gasolinaInput} 
          onChange={(e) => setGasolinaInput(Number(e.target.value))}/>

          <input type="submit" value="Calcular" className='button' />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className='result'>
          <h2 className='titleResult'>{info.title}</h2>
          <span>Álcool  {info.alcool}</span>
          <span>Gasolina {info.gasolina}</span>
        </section>
        )}
      </main>
    </div>
  )
}

export default App
