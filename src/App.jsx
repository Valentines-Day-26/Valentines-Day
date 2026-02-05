import { useState, useRef } from 'react'
import reactLogo from './assets/flork-heart.png'
import dance from './assets/dance.gif'
import './App.css'
import EvilButton from './evil_button'
import { HashRouter, Link, Routes, Route} from 'react-router';


function FirstPage() {

  return (
    <div id="div1">
      <img style={{ maxWidth: '100px', top: 0, position: 'relative' }} src={reactLogo} />
      <h1>Lara, willst du mein Valentin sein?</h1>
      <div style={{ display: 'flex', paddingLeft: '20%'}} >
        <Link to="/hype" id="jaa-button" className='jaa' style={{textDecoration: 'none', scale: 1.25}}>
          Yes
        </Link>
        <EvilButton></EvilButton>
      </div>
      <div id='lowest_paragraph'>Nein wäre schon mega cringe...</div>
    </div>
  )
}

function ResultWindow() {

  return (
    <div>
    <div className='background-middle' style={{padding: "20px 150px"}}>
      <img style={{ width: '300px'}} src={dance} />
      <h1>LETS GOOO, bin hyped 🥰</h1>
    </div>
    </div>
  )
}

function MainWindow() {
  return (
    <div id="main-window" className='background-middle'>
      <FirstPage />
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <HashRouter>
          <Routes>
            <Route path="/" element={<MainWindow />} />
            <Route path="/hype" element={<ResultWindow />} />
          </Routes>
        </HashRouter>
      </section>
    </>
  )
}

export default App
