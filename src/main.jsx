import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Manga from './components/Manga'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path='manga/:id' element={<Manga />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
