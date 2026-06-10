import { AuthProvider } from "./context/Authcontext.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Booking from './pages/Booking'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Packages from './pages/Packages'
import PackageDetails from './pages/PackageDetails'
import Contact from "./pages/Contact.jsx"
import ProtectedRoute from "./components/ProtectedRoutes.jsx"
import MyBookings from "./pages/MyBooking.jsx"
import HowToBook from "./components/Howto.jsx"




export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/packages" element={<Packages />}></Route>
          <Route path="/packages/:id" element={<PackageDetails />}></Route>
          <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>}></Route>
          <Route path="/dashboard" element={<ProtectedRoute adminOnly={true}><Dashboard /></ProtectedRoute>}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/hiw" element={<HowToBook />}></Route>
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>}></Route>
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  )
}