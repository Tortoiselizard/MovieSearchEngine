import Layout from './components/Layout/Layout.jsx'
import App from './App.jsx'
import MovieDetails from './components/MovieDetails/MovieDetails.jsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import { MyProvider } from './context/MyContext.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<App />} />
            <Route path='movies/:id' element={<MovieDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MyProvider>
  </StrictMode>
)
