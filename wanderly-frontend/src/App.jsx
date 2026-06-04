import { AuthProvider } from "./context/Authcontext"
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from "react"
import Home from './pages/Home.jsx'
import Booking from './pages/Booking'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Packages from './pages/Packages'
import PackageDetails from './pages/PackageDetails'
import Contact from "./pages/Contact.jsx"
import gsap from 'gsap'

function PageTransition({ children }) {
  const el = useRef()
  const location = useLocation()

  useEffect(() => {
    gsap.fromTo(el.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
    )
  }, [location.pathname])

  return <div ref={el} style={{ width: "100%" }} >{children}</div>
}


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/packages" element={<Packages />}></Route>
            <Route path="/packages/:id" element={<PackageDetails />}></Route>
            <Route path="/booking/:id" element={<Booking />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
          </Routes>
        </PageTransition>

      </BrowserRouter>
    </AuthProvider>
  )
}