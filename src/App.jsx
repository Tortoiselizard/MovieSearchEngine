import { MyProvider } from './context/MyContext.jsx'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import './App.css'

export default function App () {
  return (
    <MyProvider>
      <Header />
      <Home />
    </MyProvider>
  )
}
