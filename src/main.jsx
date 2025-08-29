import Layout from './components/Layout/Layout.jsx'
import App from './App.jsx'
import MovieDetails from './components/MovieDetails/MovieDetails.jsx'
import ActorDetails from './components/ActorDetails/ActorDetails.jsx'
import Favorites from './components/Favorites/Favorites.jsx'
import FullDataMovies from './components/FullDataMovies/FullDataMovies.jsx'
import Cast from './components/Cast/Cast.jsx'
import ActorFilms from './components/ActorFilms/ActorFilms.jsx'
import NotFound from './components/NotFound/NotFound.jsx'

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
            <Route path='search' element={<FullDataMovies />} />
            <Route path='actors/:id' element={<ActorDetails />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='cast/:id' element={<Cast />} />
            <Route path='actor-films/:id' element={<ActorFilms />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MyProvider>
  </StrictMode>
)
