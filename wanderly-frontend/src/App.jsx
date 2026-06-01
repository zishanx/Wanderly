import { AuthProvider } from "./context/Authcontext"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Booking from './pages/Booking'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Packages from './pages/Packages'
import PackageDetails from './pages/PackageDetails'




export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/Package" element={<Packages />}></Route>
          <Route path="/packages/:id" element={<PackageDetails />}></Route>
          <Route path="/booking/:id" element={<Booking />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  )
}