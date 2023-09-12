import React, { useState} from 'react';
import { createContext } from 'react';
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import {json} from "react-router-dom";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const tokens = JSON.parse(localStorage.getItem('authTokens')) || ''
    const users = tokens ? jwtDecode(tokens?.access ) : ''
    const [authTokens, setAuthTokens] = useState(tokens)
    const [user, setUser] = useState(users)
    const [error, setError] = useState('')
    // const [context, setContext] = useState({user, authTokens})
    const navigate = useNavigate()

    const logout = () => {
        setUser('')
        setAuthTokens('')
        localStorage.removeItem('authTokens')
        navigate('/')
        setError('')
        clearInterval(interval)
    }

    const loginHandler = (e, username, password) => {
        e.preventDefault()
        fetch(`http://182.163.112.102:8006/api/users/token/`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({username,password})
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                if(data.detail){
                    setError(data?.detail)
                }else{
                    const user = jwtDecode(data?.access)
                    setAuthTokens(data)
                    setUser(user)
                    localStorage.setItem('authTokens', JSON.stringify(data))
                    navigate('/home')
                    setError('')
                }
            })
    }

    const interval = setInterval(()=>{
        fetch(`http://182.163.112.102:8006/api/users/token/refresh/`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({refresh: authTokens.refresh})
        }).then(response => response.json())
            .then(data => {
                const user = jwtDecode(data?.access)
                setAuthTokens(data)
                setUser(user)
                localStorage.setItem('authTokens', JSON.stringify(data))
        })
    }, 1000 * 60 * 55)

    // useEffect(()=>{
    //     setUser(jwtDecode(authTokens?.access))
    //     localStorage.setItem('authTokens',JSON.stringify(authTokens))
    //     console.log( authTokens)
    // },[authTokens])

    const checkJWT = () => {
        const tokens_local = localStorage.getItem('authTokens')
        if(tokens_local){
            const tokens = JSON.parse(localStorage.getItem('authTokens'))
            const access = jwtDecode(tokens?.access)
            if (access.exp * 1000 < Date.now()) {
                logout()
                return false
            }
        }
        return true
    }

    checkJWT()

    return (
        <AuthContext.Provider value={{loginHandler, user, logout, authTokens, error, setError, checkJWT}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;