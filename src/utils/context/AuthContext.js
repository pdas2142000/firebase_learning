/** React Imports */
import { createContext, useContext, useEffect, useState } from "react";

/** Local Imports */
import { GetUserData, RemoveAuthUser, SetAuthToken } from "../storage/index";

const AuthContext = createContext()

/** Main Export */
export const AuthProvider = ({ children }) => {
    const [Token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isemailVerified, setIsEmailVerified] = useState(true)

    const login = (data) => {
        setToken(data.Token);
        setUser(data.user);
        SetAuthToken(data.Token, data.user)
        setIsEmailVerified(data.isemailVerified)
    };

    const logout = () => {
        setToken(null)
        setUser(null)
        setIsEmailVerified()
        RemoveAuthUser()
    }

    useEffect(() => {
        GetUserData().then((storedToken) => {
            setToken(storedToken?.token ? JSON.parse(storedToken?.token) : null)
            setUser(storedToken?.user || null)
            setIsEmailVerified(storedToken.email || null)
        })
    }, []);

    return (
        <AuthContext.Provider value={{ Token, user, login, logout, isemailVerified }}>
            {children}
        </AuthContext.Provider>
    )
}

/** Main Export */
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvideo");
    }

    return context;
}

