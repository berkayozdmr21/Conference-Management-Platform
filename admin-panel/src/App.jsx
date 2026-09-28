import { useState } from 'react'

import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'


import Giris from './pages/Giris'
import Dashboard from './pages/Dashboard'
import Konferanslar from './pages/Konferanslar'
import Konular from './pages/Konular'
import Konusmacilar from './pages/Konusmacilar'
import OnemliTarihler from './pages/OnemliTarihler'
import Basvurular from './pages/Basvurular';



function App() {
  return (
    <div>
 <BrowserRouter>
 
 <Routes>
   <Route path='/' element={<Giris/>} />
   <Route path='/giris' element={<Giris/>} />
   <Route path='/dashboard' element={<Dashboard/>} />
   <Route path='/konferanslar' element={<Konferanslar/>} />
   <Route path='/konular' element={<Konular/>} />
    <Route path='/onemli-tarihler' element={<OnemliTarihler/>} />
    <Route path='/konusmacilar' element={<Konusmacilar/>} />
    <Route path='/basvurular' element={<Basvurular/>} />
   

</Routes>
 </BrowserRouter> 
 
    </div>
  )
}

export default App
