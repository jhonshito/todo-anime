import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Manga from './components/Manga'
import Navbar from './components/Navbar'
import Mangas from './components/Mangas'
import DatosMangas from './components/DatosMangas'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<App />} />
        <Route path='manga/:id' element={<Manga />} />
        <Route path='mangas/' element={<Mangas />} />
        <Route path='dataManga/:id' element={<DatosMangas />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
