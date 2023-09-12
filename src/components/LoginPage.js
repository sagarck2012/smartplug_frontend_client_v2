import React, {useState} from 'react';
import {json} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { loginHandler, error } = useAuth();

    const handleBtn= (e) => {
        const pass = btoa(password)
        // console.log(pass)
        loginHandler(e, username, pass)
        // e.preventDefault()
        // fetch(`http://127.0.0.1:8000/api/users/token/`,{
        //     method: 'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({username,password})
        // })
        //     .then(response => response.json())
        //     .then(data => setAuthTokens(data))
    }
    return (
        <div className='d-flex justify-content-center align-content-center'>
            <div className='border border-2 p-3 mt-5 rounded w-md-25'>
                <h3>LOGIN</h3>
                <form onSubmit={event => handleBtn(event)}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label" >Username</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                               onChange={event => setUsername(event.target.value)}
                        />
                            {/*<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={event => setPassword(event.target.value)}/>
                    </div>
                    {/*<div className="mb-3 form-check">*/}
                    {/*    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>*/}
                    {/*    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
                    {/*</div>*/}
                    <button type="submit" className="btn btn-primary" onClick={handleBtn}>Submit</button>
                </form>
                <div className={`${error || 'd-none'} alert alert-danger mt-3`} role="alert">
                    {error}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;