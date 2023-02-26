import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './Login.scss'

import axios from 'axios'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [messageErr, setMessageErr] = useState(false)
    const [messageSuccess, setMessageSuccess] = useState(false)


    const handleLogin = () => {

        axios.post(`http://localhost:4000/api/login/post`, {
            gmail: username,
            password: password
        })
            .then(response => {
                if (response.status == 200) {

                    setMessageSuccess(true)
                    document.querySelector('.login').addEventListener('click', () => {
                        setMessageSuccess(false)
                        localStorage.setItem('token', response.data.token);
                        window.location = '/'
                    })
                }
            })
            .catch(error => {
                setMessageErr(true)
                document.querySelector('.login').addEventListener('click', () => {
                    setMessageErr(false)
                })
            });
    }
    return (
        <>
            <Header />
            <div className='login'>
                <div className='form'>
                    <h3>QUẢN LÝ SINH VIÊN</h3><br />
                    <div>
                        <p>Gmail</p>
                        <i className="fa-solid fa-user"></i>
                        <input
                            placeholder='Enter gmail'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <br></br>
                    <div>
                        <p>Password</p>
                        <i className="fa-solid fa-lock"></i>
                        <input
                            type={'password'}
                            placeholder='Enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        {username == '' || password == '' ? (<button style={{ backgroundColor: 'gray', }}>LOGIN</button>) : (
                            <button onClick={handleLogin}>LOGIN</button>
                        )}

                    </div>
                    <br></br>
                    <span>You forgot your password ?? <strong> <Link to={'/resetpass'}>click here</Link></strong></span>

                </div>
                {messageErr ? (
                    <div className='notification'>
                        <div className='modal'>
                            <i style={{ color: 'red' }} className="fa-solid fa-circle-exclamation fa-2x"></i>
                            <p style={{ color: 'red' }}>Login Error</p>
                        </div>
                    </div>
                ) : ('')}
                {messageSuccess ? (
                    <div className='notification'>
                        <div className='modal'>
                            <i class="fa-solid fa-circle-check fa-2x success"></i>
                            <p>Login success </p>
                        </div>
                    </div>
                ) : ('')}
            </div>
            <Footer />
        </>

    )
}