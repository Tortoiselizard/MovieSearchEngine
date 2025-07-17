import { MyProvider } from './context/MyContext.jsx'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import './App.css'

function App () {
  return (
    <MyProvider>
      <Header />
      <Home />
    </MyProvider>
  )
}

export default App
