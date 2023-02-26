import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import './Student.scss'
import NotFound from '../NotFound/NotFound'
import jwt_decode from "jwt-decode";

function Student() {
  // Get all Grades and Class
  const [dataGrades, setDataGrades] = useState([])
  const [dataClass, setDataClass] = useState([])
  const [dataStudent, setDataStudent] = useState([])
  const [paginationDataStudent, setPaginationDataStudent] = useState([])
  const [paginaton, setPagination] = useState(1)

  const [showPass, setShowPass] = useState(false)

  // ============= //
  const [checkClass, setCheckClass] = useState([])


  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [date, setDate] = useState('')
  const [address, setAddress] = useState('')
  const [code, setCode] = useState('')
  const [phone, setPhone] = useState('')
  const [nation, setNation] = useState('')
  const [religion, setReligion] = useState('Không')
  const [grades, setGrades] = useState('')
  const [clas, setClass] = useState('')
  const [score, setScore] = useState('')
  const [gmail, setGmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [change, setChange] = useState(true)

  // Current User
  const [formDetail, setFormDetail] = useState(false)

  const [currentName, setCurrentName] = useState('')
  const [currentGender, setCurrentGender] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [currentCode, setCurrentCode] = useState('')
  const [currentRole, setCurrentRole] = useState('')
  const [currentPhone, setCurrentPhone] = useState('')
  const [currentNation, setCurrentNation] = useState('')
  const [currentReligion, setCurrentReligion] = useState('')
  const [currentGrades, setCurrentGrades] = useState('')
  const [currentClass, setCurrentClass] = useState('')
  const [currentScore, setCurrentScore] = useState('')
  const [currentGmail, setCurrentGmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')

  const [currentId, setCurrentId] = useState('')
  const [modalDetailUser, setModalDetailUser] = useState(false)

  const [modalDeletelUser, setModalDeletelUser] = useState(false)
  const [modalAddlUser, setModalAddlUser] = useState(false)
  const [modalUpdatelUser, setModalUpdatelUser] = useState(false)

  const [searchName, setSearchName] = useState('')
  const [searchClass, setSearchClass] = useState('')
  const [searchGrade, setSearchGrade] = useState('')


  const token = localStorage.getItem("token");
  if (token != null) {
    const decoded = jwt_decode(token);
    var Role = decoded.role
    console.log(role)
  }





  // Pagination Student
  useEffect(() => {
    let token = localStorage.getItem("token");
    async function getData() {
      const res = await axios.get(`http://localhost:4000/api/student/page/${paginaton}`)
      return res;
    }
    getData()
      .then((res) => setPaginationDataStudent(res.data))
      .catch(err => {
        console.log(err)
      })
  }, [paginaton, change])

  // All STudent
  useEffect(() => {
    let token = localStorage.getItem("token");

    async function getData() {
      const res = await axios.get(`http://localhost:4000/api/student`)
      return res;
    }
    getData()
      .then((res) => setDataStudent(res.data))
      .catch(err => {
        console.log(err)
      })
  }, [change])

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

  useEffect(() => {
    let token = localStorage.getItem("token");

    async function getData() {
      const res = await axios.get(`http://localhost:4000/api/class`)
      return res;
    }
    getData()
      .then((res) => setDataClass(res.data))
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    let token = localStorage.getItem("token");

    async function getData() {
      const res = await axios.get(`http://localhost:4000/api/class/${grades}`)
      return res;
    }
    getData()
      .then((res) => setCheckClass(res.data))
      .catch(err => {
        console.log(err)
      })
  }, [grades])

  // Register User
  const handlePostStudent = () => {
    let payload = {
      name, gender, date,
      grades, clas, score,
      gmail, password, role,
      address, code, phone, nation, religion
    }
    axios.post(`http://localhost:4000/api/student/register`, {
      data: payload
    })
      .then(res => {
        console.log(res)
        if (res.status == 200) {
          setChange(prev => !prev)
          setModalAddlUser(false)
        }
      })
      .catch(err => {
        console.log(err)
      });
    setChange(prev => !prev)
  }
  const hanldeOpenModalAddUser = () => {
    setModalAddlUser(true)
  }
  const hanldeCloseModalAddUser = () => {
    setModalAddlUser(false)
  }

  // Detail User
  const handleOpenModalDetailUser = (id) => {
    setCurrentId(id)
    setModalDetailUser(true)
  }
  const detailUser = () => {
    setModalDetailUser(false)

    axios.get(`http://localhost:4000/api/student/detail/${currentId}`)
      .then(res => {
        console.log(res.data)
        setCurrentName(res.data.name)
        setCurrentGender(res.data.gender)
        setCurrentDate(res.data.date)
        setCurrentAddress(res.data.address)
        setCurrentCode(res.data.code)
        setCurrentPhone(res.data.phone)
        setCurrentNation(res.data.nation)
        setCurrentReligion(res.data.religion)
        setCurrentGrades(res.data.grade)
        setCurrentClass(res.data.class)
        setCurrentScore(res.data.score)
        setCurrentGmail(res.data.gmail)
        setCurrentPassword(res.data.password)
      })
      .catch(error => console.log(error));
    setFormDetail(true)
  }

  //Delete User
  const handleOpenModalDeletelUser = (id) => {
    setCurrentId(id)
    setModalDeletelUser(true)
  }
  const deleteUser = () => {
    let token = localStorage.getItem("token");
    axios.delete(`http://localhost:4000/api/student/delete/${currentId}`, { headers: { Authorization: token } })
      .then(res => {
        if (res.status == 200) {
          setChange(prev => !prev)
          setPagination(1)
          setModalDeletelUser(false)
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  // Update User
  const handleOpenModalUpdatelUser = (user) => {
    setCurrentName(user.name)
    setCurrentGender(user.gender)
    setCurrentDate(user.date)
    setCurrentAddress(user.address)
    setCurrentCode(user.code)
    setCurrentPhone(user.phone)
    setCurrentNation(user.nation)
    setCurrentReligion(user.religion)
    setCurrentRole(user.role)
    setCurrentGrades(user.grade)
    setCurrentClass(user.class)
    setCurrentScore(user.score)
    setCurrentGmail(user.gmail)
    setCurrentPassword(user.password)
    setCurrentId(user._id)
    setModalUpdatelUser(true)
  }
  const handleCloseModalUpdatelUser = () => {
    setModalUpdatelUser(false)
  }
  const handleUpdate = () => {
    let payload = {
      currentId, currentName, currentGender, currentDate,
      currentGrades, currentClass, currentScore,
      currentGmail, currentPassword, currentRole,
      currentAddress, currentCode, currentPhone, currentNation, currentReligion
    }
    axios.put(`http://localhost:4000/api/student/update`, {
      data: payload
    })
      .then(res => {
        setChange(prev => !prev)

        setCurrentId('')
        setCurrentName('')
        setCurrentGender('')
        setCurrentDate('')
        setCurrentAddress('')
        setCurrentCode('')
        setCurrentPhone('')
        setCurrentNation('')
        setCurrentReligion('')
        setCurrentGmail('')
        setCurrentPassword('')
        setCurrentRole('')
        setCurrentGrades('')

        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
    setChange(prev => !prev)
    setModalUpdatelUser(false)

  }





  let boxSearchName = []
  for (let i = 0; i < dataStudent.length; i++) {
    if (dataStudent[i].name.toUpperCase().includes(searchName.toUpperCase()))
      boxSearchName.push(dataStudent[i])
  }

  let boxSearchClass = []
  for (let i = 0; i < dataStudent.length; i++) {
    if (dataStudent[i].class.toUpperCase().includes(searchClass.toUpperCase()))
      boxSearchClass.push(dataStudent[i])
  }


  let boxSearchGrade = []
  for (let i = 0; i < dataStudent.length; i++) {
    if (dataStudent[i].grade.toUpperCase().includes(searchGrade.toUpperCase()))
      boxSearchGrade.push(dataStudent[i])
  }

  return (
    <>
      {token && Role != 'student' ? (
        <div className='qlStudent'>
          <Header />
          <div className='right'>

            <button onClick={hanldeOpenModalAddUser} className='addUser'>
              <i className="fa-solid fa-plus"></i>
              <span>Thêm mới</span>
            </button>

            <div className='search'>
              <input
                placeholder='Enter name ??'
                onChange={e => { setSearchName(e.target.value) }}
              />

              <input
                placeholder='Enter Class ??'
                onChange={e => { setSearchClass(e.target.value) }}
              />

              <input
                placeholder='Enter Grade ??'
                onChange={e => { setSearchGrade(e.target.value) }}
              />


              {boxSearchName.length > 0 && boxSearchName.length < dataStudent.length ? (
                <ul className='boxName'>
                  {boxSearchName.map((item, index) => {
                    return (
                      <>
                        {index <= 4 ? (
                          <li>
                            <p>
                              <p><strong>{item.name}</strong> - {item.grade} - {item.class}</p>
                              <i style={{ color: '#1da1f2' }} onClick={() => handleOpenModalDetailUser(item._id)} className="fa-solid fa-eye"></i>
                              <i style={{ color: 'red' }} onClick={() => { handleOpenModalDeletelUser(item._id) }} className="fa-solid fa-trash-can"></i>
                              <i style={{ color: '#04aa6d' }} onClick={() => { handleOpenModalUpdatelUser(item) }} className="fa-solid fa-pen-to-square"></i>
                            </p>
                          </li>
                        ) : ('')}
                      </>

                    )
                  })}
                </ul>
              ) : ('')}

              {boxSearchClass.length > 0 && boxSearchClass.length < dataStudent.length ? (
                <ul className='boxClass'>
                  {boxSearchClass.map((item, index) => {
                    return (
                      <>
                        {index <= 4 ? (
                          <li>
                            <p>
                              <p><strong>{item.class}</strong> - {item.grade} - {item.name}</p>
                              <i style={{ color: '#1da1f2' }} onClick={() => handleOpenModalDetailUser(item._id)} className="fa-solid fa-eye"></i>
                              <i style={{ color: 'red' }} onClick={() => { handleOpenModalDeletelUser(item._id) }} className="fa-solid fa-trash-can"></i>
                              <i style={{ color: '#04aa6d' }} onClick={() => { handleOpenModalUpdatelUser(item) }} className="fa-solid fa-pen-to-square"></i>
                            </p>
                          </li>
                        ) : ('')}
                      </>

                    )
                  })}
                </ul>
              ) : ('')}

              {boxSearchGrade.length > 0 && boxSearchGrade.length < dataStudent.length ? (
                <ul className='boxGrade'>
                  {boxSearchGrade.map((item, index) => {
                    return (
                      <>
                        {index <= 4 ? (
                          <li>
                            <p>
                              <p><strong>{item.grade}</strong> - {item.class} - {item.name}</p>
                              <i style={{ color: '#1da1f2' }} onClick={() => handleOpenModalDetailUser(item._id)} className="fa-solid fa-eye"></i>
                              <i style={{ color: 'red' }} onClick={() => { handleOpenModalDeletelUser(item._id) }} className="fa-solid fa-trash-can"></i>
                              <i style={{ color: '#04aa6d' }} onClick={() => { handleOpenModalUpdatelUser(item) }} className="fa-solid fa-pen-to-square"></i>
                            </p>
                          </li>
                        ) : ('')}
                      </>

                    )
                  })}
                </ul>
              ) : ('')}

            </div>

            <div className='table'>
              <table>
                <tr>
                  <th>STT</th>
                  <th>NAME</th>
                  <th>DATE</th>
                  <th>CLASS</th>
                  <th>GRADES</th>
                  <th>GMAIL</th>
                  <th>OTHER</th>
                </tr>
                {paginationDataStudent.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>{item.class}</td>
                      <td>{item.grade}</td>
                      <td>{item.gmail}</td>
                      <td>
                        <i onClick={() => handleOpenModalDetailUser(item._id)} className="fa-solid fa-eye"></i>
                        <i onClick={() => { handleOpenModalDeletelUser(item._id) }} className="fa-solid fa-trash-can"></i>
                        <i onClick={() => { handleOpenModalUpdatelUser(item) }} className="fa-solid fa-pen-to-square"></i>
                      </td>
                    </tr>
                  )
                })}

              </table>
            </div>

            <div className='page'>
              {dataStudent.map((item, index) => {
                return (
                  <>
                    {index < (dataStudent.length / 5) ? (
                      <>
                        {paginaton == index + 1 ? (
                          <button style={{ background: 'red' }} onClick={() => setPagination(index + 1)}>{index + 1}</button>
                        ) : (
                          <button onClick={() => setPagination(index + 1)}>{index + 1}</button>
                        )}
                      </>

                    ) : ('')}

                  </>
                )
              })}
            </div>


            {modalAddlUser ? (
              <div className='form'>
                <div className='modal'>
                  <button onClick={hanldeCloseModalAddUser} className='btnClose'>X</button>
                  {/* name */}
                  <div className='item'>
                    <p>Full name: </p>
                    <input
                      onChange={e => setName(e.target.value)}
                      placeholder='Họ và tên'
                    />
                  </div>

                  {/* gender */}
                  <div className='item'>
                    <p>Gender: </p>
                    <select onChange={e => { setGender(e.target.value) }}>
                      <option value="">Chọn</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>

                  {/* date */}
                  <div className='item'>
                    <p>Date:</p>
                    <input
                      onChange={e => setDate(e.target.value)}
                      type={'date'}
                    />
                  </div>

                  {/* address */}
                  <div className='item'>
                    <p>Address: </p>
                    <input
                      onChange={e => setAddress(e.target.value)}
                    />
                  </div>

                  {/* code */}
                  <div className='item'>
                    <p>Code: </p>
                    <input
                      onChange={e => setCode(e.target.value)}
                    />
                  </div>

                  {/* phone */}
                  <div className='item'>
                    <p>Phone: </p>
                    <input
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>

                  {/* nation */}
                  <div className='item'>
                    <p>Nation: </p>
                    <input
                      onChange={e => setNation(e.target.value)}
                    />
                  </div>

                  {/* regilion */}
                  <div className='item'>
                    <p>Regilion</p>
                    <select onChange={e => { setReligion(e.target.value) }}>
                      <option value={'Không'}>Không</option>
                      <option value={'Có'}>Có</option>
                    </select>
                  </div>

                  {/* grade */}
                  <div className='item'>
                    <p>Grade: </p>
                    <select onChange={e => { setGrades(e.target.value) }} >
                      <option value={''}>chọn</option>
                      {dataGrades.map((item, index) => {
                        return (
                          <option value={`${item.name}`}>{item.name}</option>
                        )
                      })}
                    </select>
                  </div>

                  {/* class */}
                  <div className='item'>
                    <p>Class</p>
                    <select onChange={e => { setClass(e.target.value) }}>
                      <option value={''}>chọn</option>
                      {checkClass.map((item, index) => {
                        return (
                          <option value={`${item.nameClass}`}>{item.nameClass}</option>
                        )
                      })}
                    </select>
                  </div>

                  {/* score */}
                  <div className='item'>
                    <p>Score: </p>
                    <input
                      onChange={e => setScore(e.target.value)}
                      placeholder='Điểm'
                    />
                  </div>

                  {/* gmail */}
                  <div className='item'>
                    <p>Gmail: </p>
                    <input
                      onChange={e => setGmail(e.target.value)}
                      placeholder='Gmail'
                    />
                  </div>

                  {/* password */}
                  <div className='item'>
                    <p>Password: </p>
                    <input
                      onChange={e => setPassword(e.target.value)}
                      placeholder='Password'
                    />
                  </div> <br />
                  <button className='btnAdd' onClick={handlePostStudent}>ADD STUDENT</button>
                </div>
              </div>
            ) : ('')}

            {modalDetailUser ? (
              <div className='handleUser'>
                <div style={{ height: 180 }} className='modal'>
                  <p>Want to see information ??</p><br />
                  <div className='listBtn'>
                    <button onClick={detailUser}>Yes</button>
                    <button onClick={() => { setModalDetailUser(false) }} className='btnNo'>No</button>
                  </div>
                </div>
              </div>
            ) : ('')}

            {modalDeletelUser ? (
              <div className='handleUser'>
                <div style={{ height: 180 }} className='modal'>
                  <p>Are you detele student ??</p><br />
                  <div className='listBtn'>
                    <button className='btnDelete' onClick={deleteUser}>Yes</button>
                    <button onClick={() => { setModalDeletelUser(false) }} className='btnNo'>No</button>
                  </div>
                </div>
              </div>
            ) : ('')}

            {modalUpdatelUser ? (
              <div className='form'>
                <div className='modal'>
                  <button onClick={handleCloseModalUpdatelUser} className='btnClose'>X</button><br />
                  <h3>UPDATE STUDENT</h3> <br />
                  {/* name */}
                  <div className='item'>
                    <p>Full name:</p>
                    <input
                      value={currentName}
                      onChange={e => setCurrentName(e.target.value)}
                      placeholder='Họ và tên'
                    />
                  </div>
                  {/* gender */}
                  <div className='item'>
                    <p>Gender: </p>
                    <select onChange={e => { setCurrentGender(e.target.value) }}>
                      <option value="">Chọn</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>

                  {/* date */}
                  <div className='item'>
                    <p>Date:</p>
                    <input
                      value={currentDate}
                      onChange={e => setCurrentDate(e.target.value)}
                      type={'date'}
                    />
                  </div>

                  {/* address */}
                  <div className='item'>
                    <p>Address: </p>
                    <input
                      onChange={e => setCurrentAddress(e.target.value)}
                      value={currentAddress}
                    />
                  </div>

                  {/* code */}
                  <div className='item'>
                    <p>Code: </p>
                    <input
                      value={currentCode}
                      onChange={e => setCurrentCode(e.target.value)}
                    />
                  </div>

                  {/* phone */}
                  <div className='item'>
                    <p>Phone: </p>
                    <input
                      value={currentPhone}
                      onChange={e => setCurrentPhone(e.target.value)}
                    />
                  </div>

                  {/* nation */}
                  <div className='item'>
                    <p>Nation: </p>
                    <input
                      value={currentNation}
                      onChange={e => setCurrentNation(e.target.value)}
                    />
                  </div>

                  {/* regilion */}
                  <div className='item'>
                    <p>Regilion</p>
                    <select onChange={e => { setCurrentReligion(e.target.value) }}>
                      <option value={'Không'}>Không</option>
                      <option value={'Có'}>Có</option>
                    </select>
                  </div>

                  {/* grade */}
                  {/* <div className='item'>
                <p>Grade: </p>
                <select onChange={e => { setCurrentGrades(e.target.value) }} >
                  <option value={''}>chọn</option>
                  {dataGrades.map((item, index) => {
                    return (
                      <option value={`${item.name}`}>{item.name}</option>
                    )
                  })}
                </select>
              </div> */}

                  {/* class */}
                  {/* <div className='item'>
                <p>Class</p>
                <select onChange={e => { setCurrentClass(e.target.value) }}>
                  <option value={''}>chọn</option>
                  {checkClass.map((item, index) => {
                    return (
                      <option value={`${item.nameClass}`}>{item.nameClass}</option>
                    )
                  })}
                </select>
              </div> */}

                  {/* score */}
                  <div className='item'>
                    <p>Score: </p>
                    <input
                      value={currentScore}
                      onChange={e => setCurrentScore(e.target.value)}
                      placeholder='Điểm'
                    />
                  </div>
                  {/* gmail */}
                  <div className='item'>
                    <p>Gmail: </p>
                    <input
                      value={currentGmail}
                      onChange={e => setCurrentGmail(e.target.value)}
                      placeholder='Gmail'
                    />
                  </div>

                  {/* password */}
                  <div className='item'>
                    <p>Password: </p>
                    <input
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      placeholder='Password'
                    />
                  </div> <br /> <br />
                  <button className='btnAdd' onClick={handleUpdate}>UPDATE STUDENT</button>

                </div>


              </div>
            ) : ('')}

            {formDetail ? (
              <div className='handleUser'>
                <div className='modal'>
                  <button onClick={() => { setFormDetail(false) }} className='btnCLose'>X</button>
                  <h3>DETAIL STUDENT</h3>
                  <div className='item'><p>Name:</p><span> {currentName} </span></div>
                  <div className='item'><p>Address:</p><span> {currentAddress} </span></div>
                  <div className='item'><p>Code:</p><span> {currentCode}</span></div>
                  <div className='item'><p>Date:</p><span> {currentDate}</span></div>
                  <div className='item'><p>Gender:</p><span> {currentGender}</span></div>
                  <div className='item'><p>Nation:</p><span> {currentNation}</span></div>
                  <div className='item'><p>Religion:</p><span> {currentReligion}</span></div>
                  <div className='item'><p>Grade:</p><span> {currentGrades}</span></div>
                  <div className='item'><p>Class:</p><span> {currentClass}</span></div>
                  <div className='item'><p>Gmail:</p><span> {currentGmail}</span></div>

                  <div className='item'>
                    <p>Password:</p>
                    {showPass ? (
                      <>
                        <span>{currentPassword} </span>
                        <i onClick={() => { setShowPass(prev => !prev) }} className="fa-solid fa-eye-slash"></i>
                      </>
                    ) : (
                      <>
                        <span>* * * * * * * </span>
                        <i onClick={() => { setShowPass(prev => !prev) }} className="fa-solid fa-eye"></i>
                      </>
                    )}

                  </div>

                  <div className='item'><p>Phone:</p><span> {currentPhone}</span></div>
                  <div className='item'><p>Score:</p><span> {currentScore}</span></div>
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

export default Student