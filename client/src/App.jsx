import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AppointmentForm from './pages/AppointmentForm'
import DoctorsDashboard from './pages/DoctorsDashboard'
import Login from './pages/Login'
import DoctorsList from './components/DoctorsList'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/appointment-form/:doctorId" element={<AppointmentForm />} />
        <Route path='/doctor-dashboard' element={<DoctorsDashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/doctors' element={<DoctorsList/>}/>
      </Routes>
    </div>
  )
}

export default App