import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const login = (token, userData) => {
        setToken(token)
        setUser(userData)

        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setToken(null)
        setUser(null)

        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }


    return (
        <AuthContext.Provider value={{ login, logout, token, user }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

