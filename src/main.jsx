import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import MovieDetails from './components/MovieDetails/MovieDetails.jsx'
import { MyProvider } from './context/MyContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path=':id' element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  </StrictMode>
)
