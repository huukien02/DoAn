import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import './Class.scss'
import Footer from '../Footer/Footer'
import jwt_decode from "jwt-decode";
import NotFound from '../NotFound/NotFound'

function Class() {
    const [dataTeacher, setDataTeacher] = useState([])
    const [dataGrades, setDataGrades] = useState([])
    const [dataClass, setDataClass] = useState([])


    const [grades, setGrades] = useState('')
    const [clas, setClass] = useState('')
    const [teacher, setTeacher] = useState('')

    const [change, setChange] = useState(true)

    const [modalAddClass, setModalAddClass] = useState(false)
    const [modalDeleteClass, setModalDeleteClass] = useState(false)
    const [modalUpdateClass, setModalUpdateClass] = useState(false)

    const [currentId, setCurrentId] = useState('')
    const [currentGrades, setCurrentGrades] = useState('')
    const [currentClass, setCurrentClass] = useState('')
    const [currentTeacher, setCurrentTeacher] = useState('')

    const [searchNameClass, setSearchNameClass] = useState('')
    const [searchNameTeacher, setSearchNameTeacher] = useState('')




    const token = localStorage.getItem("token");
    if (token != null) {
        const decoded = jwt_decode(token);
        var role = decoded.role
    }

    useEffect(() => {

        async function getData() {
            const res = await axios.get(`http://localhost:4000/api/class`)
            return res;
        }
        getData()
            .then((res) => setDataClass(res.data))
            .catch(err => {
                console.log(err)
            })
    }, [change])


    useEffect(() => {
        let token = localStorage.getItem("token");

        async function getData() {
            const res = await axios.get(`http://localhost:4000/api/teacher`)
            return res;
        }
        getData()
            .then((res) => setDataTeacher(res.data))
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
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
    }, [])


    // Add class
    const handleAddClass = () => {
        let payload = { grades, clas, teacher }

        if (grades == '' || clas == '' || teacher == '') {
            alert('Empty input')
        }
        else {
            axios.post(`http://localhost:4000/api/class/register`, {
                data: payload
            })
                .then(res => {
                    if (res.status == 200) {
                        setChange(prev => !prev)
                        setGrades('')
                        setClass('')
                        setTeacher('')
                        setModalAddClass(false)
                    }


                })
                .catch(err => {
                    console.log(err)
                    alert(err.response.data.msg)
                    setModalAddClass(false)
                });

        }
        setChange(prev => !prev)
        setModalAddClass(true)



    }

    // Delete Class
    const handleOpenModalDeleteClass = (id) => {
        setCurrentId(id)
        setModalDeleteClass(true)
    }
    const deleteClass = () => {
        let token = localStorage.getItem("token");
        axios.delete(`http://localhost:4000/api/class/delete/${currentId}`, { headers: { Authorization: token } })
            .then(res => {
                if (res.status == 200) {
                    setChange(prev => !prev)
                    setModalDeleteClass(false)
                }
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.msg)
                setModalDeleteClass(false)
            });
    }

    // Update class
    const handleOpenModalUpdateClass = (item) => {
        setModalUpdateClass(true)
        setCurrentId(item._id)
        setCurrentGrades(item.nameGrade)
        setCurrentClass(item.nameClass)
        setCurrentTeacher(item.nameTeacher)
    }
    const updateClass = () => {

        let payload = {
            currentId, currentGrades, currentClass, currentTeacher,
        }
        axios.put(`http://localhost:4000/api/class/update`, {
            data: payload
        })
            .then(res => {
                setChange(prev => !prev)
                setModalUpdateClass(false)
            })
            .catch(err => {
                setModalUpdateClass(false)
                alert(err.response.data.msg)
                console.log(err)
            });
    }

    //search 
    let boxSearchNameCLass = []
    for (let i = 0; i < dataClass.length; i++) {
        if (dataClass[i].nameClass.toUpperCase().includes(searchNameClass.toUpperCase()))
            boxSearchNameCLass.push(dataClass[i])
    }

    let boxSearchNameTeacher = []
    for (let i = 0; i < dataClass.length; i++) {
        if (dataClass[i].nameTeacher.toUpperCase().includes(searchNameTeacher.toUpperCase()))
            boxSearchNameTeacher.push(dataClass[i])
    }






    return (
        <>
            {token && role != 'student' ? (
                <>
                    <div className='qlClass'>
                        <Header />
                        <div className='right'>

                            <button onClick={() => { setModalAddClass(true) }} className='addUser'>
                                <i className="fa-solid fa-plus"></i>
                                <span>Thêm mới</span>
                            </button> <br />

                            <div className='search'>
                                <input
                                    placeholder='Enter name class ??'
                                    onChange={e => { setSearchNameClass(e.target.value) }}
                                />

                                <input
                                    placeholder='Enter teacher ??'
                                    onChange={e => { setSearchNameTeacher(e.target.value) }}
                                />

                                {boxSearchNameCLass.length > 0 && boxSearchNameCLass.length < dataClass.length ? (
                                    <ul className='boxName'>
                                        {boxSearchNameCLass.map((item, index) => {
                                            return (
                                                <>
                                                    {index <= 4 ? (
                                                        <li>
                                                            <p>
                                                                <p><strong>{item.nameClass}</strong> - {item.nameGrade} - {item.nameTeacher}</p>
                                                                <i onClick={() => handleOpenModalDeleteClass(item._id)} style={{ color: 'red' }} className="fa-solid fa-trash-can"></i>
                                                                <i onClick={() => handleOpenModalUpdateClass(item)} style={{ color: 'green' }} className="fa-solid fa-pen-to-square"></i>
                                                            </p>
                                                        </li>
                                                    ) : ('')}
                                                </>
                                            )
                                        })}
                                    </ul>
                                ) : ('')}

                                {boxSearchNameTeacher.length > 0 && boxSearchNameTeacher.length < dataClass.length ? (
                                    <ul className='boxClass'>
                                        {boxSearchNameTeacher.map((item, index) => {
                                            return (
                                                <>
                                                    {index <= 4 ? (
                                                        <li>
                                                            <p>
                                                                <p><strong>{item.nameTeacher}</strong> - {item.nameClass} - {item.nameGrade}</p>
                                                                <i onClick={() => handleOpenModalDeleteClass(item._id)} style={{ color: 'red' }} className="fa-solid fa-trash-can"></i>
                                                                <i onClick={() => handleOpenModalUpdateClass(item)} style={{ color: 'green' }} className="fa-solid fa-pen-to-square"></i>
                                                            </p>
                                                        </li>
                                                    ) : ('')}
                                                </>
                                            )
                                        })}
                                    </ul>
                                ) : ('')}




                            </div> <br /> <br /><br />


                            <div className='table'>
                                <table>
                                    <tr>
                                        <th>STT</th>
                                        <th>CLASS</th>
                                        <th>GRADES</th>
                                        <th>TEACHER</th>
                                        <th>OTHER</th>
                                    </tr>
                                    {dataClass.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.nameClass}</td>
                                                <td>{item.nameGrade}</td>
                                                <td>{item.nameTeacher}</td>
                                                <td>
                                                    <i onClick={() => handleOpenModalDeleteClass(item._id)} className="fa-solid fa-trash-can"></i>
                                                    <i onClick={() => handleOpenModalUpdateClass(item)} className="fa-solid fa-pen-to-square"></i>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </table>
                            </div>

                            {/* Modal add Class */}
                            {modalAddClass ? (
                                <div className='form'>
                                    <div className='modal'>
                                        <button onClick={() => { setModalAddClass(false) }} className='btnClose'>X</button>
                                        {/* grade */}
                                        <div className='item'>
                                            <p>Khoa: </p>
                                            <select onChange={e => { setGrades(e.target.value) }} >
                                                <option value={''}>Chọn</option>
                                                {dataGrades.map((item, index) => {
                                                    return (
                                                        <option value={`${item.name}`}>{item.name}</option>
                                                    )
                                                })}

                                            </select>
                                        </div>

                                        {/* class */}
                                        <div className='item'>
                                            <p>Lớp: </p>
                                            <input
                                                placeholder='Enter class'
                                                onChange={e => setClass(e.target.value)}
                                            />
                                        </div>

                                        {/* teacher */}
                                        <div className='item'>
                                            <p>Chủ nhiệm: </p>
                                            <select onChange={e => { setTeacher(e.target.value) }} >
                                                <option value={''}>Chọn</option>
                                                {dataTeacher.map((item, index) => {
                                                    return (
                                                        <option value={`${item._id}`}>{item.name}</option>
                                                    )
                                                })}

                                            </select>
                                        </div>
                                        <button className='btnAdd' onClick={handleAddClass}>ADD</button>
                                    </div>
                                </div>
                            ) : ('')}
                            {/* Modal update Class */}
                            {modalUpdateClass ? (
                                <div className='form'>
                                    <div className='modal'>
                                        <button onClick={() => { setModalUpdateClass(false) }} className='btnClose'>X</button>
                                        {/* grade */}
                                        <div className='item'>
                                            <p>Khoa: </p>
                                            <select value={currentGrades} onChange={e => { setCurrentGrades(e.target.value) }} >
                                                <option value={''}>Chọn</option>
                                                {dataGrades.map((item, index) => {
                                                    return (
                                                        <option value={`${item.name}`}>{item.name}</option>
                                                    )
                                                })}

                                            </select>
                                        </div>

                                        {/* class */}
                                        <div className='item'>
                                            <p>Lớp: </p>
                                            <input
                                                value={currentClass}
                                                placeholder='Enter class'
                                                onChange={e => setCurrentClass(e.target.value)}
                                            />
                                        </div>

                                        {/* teacher */}
                                        <div className='item'>
                                            <p>Chủ nhiệm: </p>
                                            <select value={currentTeacher} onChange={e => { setCurrentTeacher(e.target.value) }} >
                                                <option value={''}>Chọn</option>
                                                {dataTeacher.map((item, index) => {
                                                    return (
                                                        <option value={`${item._id}`}>{item.name}</option>
                                                    )
                                                })}

                                            </select>
                                        </div>
                                        <button onClick={updateClass} className='btnAdd'>UPDATE</button>
                                    </div>
                                </div>
                            ) : ('')}

                            {modalDeleteClass ? (
                                <div className='handleUser'>
                                    <div style={{ height: 180 }} className='modal'>
                                        <p>Are you detele Class ??</p><br />
                                        <div className='listBtn'>
                                            <button onClick={deleteClass} className='btnDelete'>Yes</button>
                                            <button onClick={() => { setModalDeleteClass(false) }} className='btnNo'>No</button>
                                        </div>
                                    </div>
                                </div>) : ('')}

                        </div>
                        <Footer />
                    </div>
                </>
            ) : (
                <NotFound />
            )}
        </>


    )
}

export default Class