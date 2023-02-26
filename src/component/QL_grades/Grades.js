import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Header/Header'

import './Grades.scss';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';

import jwt_decode from "jwt-decode";

function Grades() {
    const [dataGrade, setDataGrades] = useState([])
    const [grade, setGrade] = useState('')

    const [msgErr, setMsgErr] = useState(false)
    const [msgSucces, setMsgSuccess] = useState(false)

    const [change, setChange] = useState(true)

    const [currentId, setCurrentId] = useState('')
    const [currentGrade, setCurrentGrade] = useState('')

    const [modalUpdate, setModalUpdate] = useState(false)


    const token = localStorage.getItem("token");
    if (token != null) {
        const decoded = jwt_decode(token);
        var role = decoded.role
        console.log(role)
    }

    useEffect((() => {
        let token = localStorage.getItem("token");

        async function getData() {
            const res = await axios.get(`http://localhost:4000/api/grades`)
            return res;
        }
        getData()
            .then((res) => setDataGrades(res.data))
            .catch(err => {
                console.log(err)
            })
    }), [change])

    const handleAddGrades = () => {
        let payload = {
            grade
        }
        axios.post(`http://localhost:4000/api/grades/register`, {
            data: payload
        })
            .then(res => {
                setChange(prev => !prev)
                setMsgSuccess(true)
                document.querySelector('.qlGrades').addEventListener('click', () => {
                    setMsgSuccess(false)
                    setChange(prev => !prev)
                })
            })
            .catch(err => {
                setChange(prev => !prev)
                setMsgErr(true)
                document.querySelector('.qlGrades').addEventListener('click', () => {
                    setMsgErr(false)
                })
            });


    }
    const handleDeleteGrade = (id) => {

        let token = localStorage.getItem("token");
        axios.delete(`http://localhost:4000/api/grades/delete/${id}`, { headers: { Authorization: token } })
            .then(res => {
                console.log(res)
                setChange(prev => !prev)
            })
            .catch(err => {
                console.log(err)
                setChange(prev => !prev)
            });
    }

    const handleUpdateGrade = (item) => {
        const id = item._id
        const grade = item.name

        setCurrentId(id)
        setCurrentGrade(grade)
        setModalUpdate(true)
    }

    const updateGrade = () => {

        let payload = { currentGrade, currentId }

        axios.put(`http://localhost:4000/api/grades/update`, {
            data: payload
        })
            .then(res => {
                console.log(res)
                setChange(prev => !prev)
            })
            .catch(err => {
                console.log(err)
                setChange(prev => !prev)
            });

        setModalUpdate(false)

    }


    return (
        <>
            {token && role != 'student' ? (
                <div className='qlGrades'>
                    <Header />
                    <div className='right'>
                        <div className='formAdd'>
                            <input
                                onChange={e => (setGrade(e.target.value))}
                                placeholder='Enter grades'
                            />
                            <button onClick={handleAddGrades}>ADD</button>
                        </div> <br /><br />
                        <div className='table'>
                            <table>
                                <tr>
                                    <th>STT</th>
                                    <th>NAME</th>
                                    <th>OTHER</th>
                                </tr>
                                {dataGrade.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>

                                            <td>
                                                <i onClick={() => handleDeleteGrade(item._id)} className="fa-solid fa-trash-can"></i>
                                                <i onClick={() => handleUpdateGrade(item)} className="fa-solid fa-pen-to-square"></i>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </table>
                        </div>

                        {msgErr ? (
                            <div className='notification'>
                                <div className='modal'>
                                    <i className="fa-solid fa-circle-exclamation fa-2x"></i>
                                    <p>Handle fail !!</p>
                                </div>
                            </div>
                        ) : ('')}

                        {msgSucces ? (
                            <div className='notification'>
                                <div className='modal'>
                                    <i style={{ color: 'yellowgreen' }} class="fa-solid fa-circle-check fa-2x"></i>
                                    <p style={{ color: 'yellowgreen' }}>Handle Success</p>
                                </div>
                            </div>
                        ) : ('')}

                        {modalUpdate ? (
                            <div className='form'>
                                <div className='modal'>
                                    <button onClick={() => { setModalUpdate(false) }} className='btnClose'>X</button> <br /><br />
                                    <input
                                        value={currentGrade}
                                        onChange={e => setCurrentGrade(e.target.value)}
                                        placeholder='Enter grades'
                                    /><br /><br />
                                    <button className='btnAdd' onClick={updateGrade}>UPDATE</button>
                                </div>
                            </div>
                        ) : ('')}


                    </div>
                    <Footer />

                </div>
            ) : (
                <NotFound />
            )}
        </>

    )
}

export default Grades