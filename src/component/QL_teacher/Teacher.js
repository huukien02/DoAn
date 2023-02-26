import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Header/Header'

import './Teacher.scss'
import Footer from '../Footer/Footer'
import jwt_decode from "jwt-decode";
import NotFound from '../NotFound/NotFound'


function Teacher() {
  const [dataTeacher, setDataTeacher] = useState([])
  const [paginationDataTeacher, setPaginationDataTeacher] = useState([])

  const [showPass, setShowPass] = useState(false)

  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [date, setDate] = useState('')
  const [address, setAddress] = useState('')
  const [code, setCode] = useState('')
  const [phone, setPhone] = useState('')
  const [nation, setNation] = useState('')
  const [religion, setReligion] = useState('Không')
  const [level, setLevel] = useState('')
  const [gmail, setGmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('teacher')


  const [formDetail, setFormDetail] = useState(false)

  const [currentId, setCurrentId] = useState('')
  const [currentName, setCurrentName] = useState('')
  const [currentGender, setCurrentGender] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [currentCode, setCurrentCode] = useState('')
  const [currentRole, setCurrentRole] = useState('')
  const [currentPhone, setCurrentPhone] = useState('')
  const [currentNation, setCurrentNation] = useState('')
  const [currentReligion, setCurrentReligion] = useState('')
  const [currentLevel, setCurrentLevel] = useState('')
  const [currentGmail, setCurrentGmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')


  const [paginaton, setPagination] = useState(1)
  const [modalAddlTeacher, setModalAddlTeacher] = useState(false)
  const [modalDetailTeacher, setModalDetailTeacher] = useState(false)
  const [modalDeleteTeacher, setModalDeleteTeacher] = useState(false)
  const [modalUpdatelTeacher, setModalUpdatelTeacher] = useState(false)

  const [change, setChange] = useState(true)

  const [searchName, setSearchName] = useState('')
  const [searchClass, setSearchClass] = useState('')
  const [searchGrade, setSearchGrade] = useState('')

  const token = localStorage.getItem("token");
  if (token != null) {
    const decoded = jwt_decode(token);
    var Role = decoded.role
    console.log(role)
  }



  // Get All Teacher
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
  }, [change])

  // Pagination Teacher
  useEffect(() => {
    let token = localStorage.getItem("token");
    async function getData() {
      const res = await axios.get(`http://localhost:4000/api/teacher/page/${paginaton}`)
      return res;
    }
    getData()
      .then((res) => setPaginationDataTeacher(res.data))
      .catch(err => {
        console.log(err)
      })
  }, [paginaton, change])


  // Detail Teacher
  const handleOpenModalDetailTeacher = (id) => {
    setModalDetailTeacher(true)
    setCurrentId(id)
  }
  const detailUser = () => {

    axios.get(`http://localhost:4000/api/teacher/detail/${currentId}`)
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
        setCurrentLevel(res.data.level)
        setCurrentGmail(res.data.gmail)
        setCurrentPassword(res.data.password)
      })
      .catch(error => console.log(error));

    setFormDetail(true)
    setModalDetailTeacher(false)
  }



  // Register Teacher
  const hanldeOpenModalAddTeacher = () => {
    setModalAddlTeacher(true)
  }
  const hanldeCloseModalAddTeacher = () => {
    setModalAddlTeacher(false)
  }
  const handlePostTeacher = () => {
    let payload = {
      name, gender, date,
      level, gmail, password, role,
      address, code, phone, nation, religion
    }

    if (name == '' || gender == '', date == '',
      level == '' || gmail == '' || password == '' ||
      address == '' || code == '' || phone == '' || nation == '' || religion == '') {
      alert("input Empty")
    }
    else {
      axios.post(`http://localhost:4000/api/teacher/register`, {
        data: payload
      })
        .then(res => {
          setModalAddlTeacher(false)
          setChange(prev => !prev)
          setName('')
          setGender('')
          setDate('')
          setAddress('')
          setCode('')
          setPhone('')
          setNation('')
          setReligion('')
          setLevel('')
          setGmail('')
          setPassword('')
        })
        .catch(err => {
          setModalAddlTeacher(false)
          alert(err.response.data)
        });
      setChange(prev => !prev)
    }



  }

  //Delete Teacher
  const handleOpenModalDeleteTeacher = (id) => {
    setCurrentId(id)
    setModalDeleteTeacher(true)
  }
  const deleteTeacher = () => {
    let token = localStorage.getItem("token");
    axios.delete(`http://localhost:4000/api/teacher/delete/${currentId}`, { headers: { Authorization: token } })
      .then(res => {
        if (res.status == 200) {
          setModalDeleteTeacher(false)
          setPagination(1)
          setChange(prev => !prev)
        }
      })
      .catch(err => {
        console.log(err)
      });

    setChange(prev => !prev)
  }

  // Update Teacher
  const handleOpenModalUpdatelTeacher = (user) => {
    setCurrentName(user.name)
    setCurrentGender(user.gender)
    setCurrentDate(user.date)
    setCurrentAddress(user.address)
    setCurrentCode(user.code)
    setCurrentPhone(user.phone)
    setCurrentNation(user.nation)
    setCurrentReligion(user.religion)
    setCurrentRole(user.role)
    setCurrentGmail(user.gmail)
    setCurrentPassword(user.password)
    setCurrentId(user._id)

    setModalUpdatelTeacher(true)
  }
  const handleUpdate = () => {
    let payload = {
      currentId, currentName, currentGender, currentDate,
      currentGmail, currentPassword, currentRole, currentLevel,
      currentAddress, currentCode, currentPhone, currentNation, currentReligion
    }

    if (currentId == '' || currentName == '', currentGender == '' ||
      currentDate == '' || currentGmail == '' || currentPassword == '' ||
      currentLevel == '' || currentAddress == '' || currentPhone == '' || currentNation == '' || currentReligion == '') {
      alert("input Empty")
    }
    else {
      axios.put(`http://localhost:4000/api/teacher/update`, {
        data: payload
      })
        .then(res => {
          setChange(prev => !prev)

          setCurrentName('')
          setCurrentGender('')
          setCurrentDate('')
          setCurrentAddress('')
          setCurrentCode('')
          setCurrentPhone('')
          setCurrentNation('')
          setCurrentReligion('')
          setCurrentLevel('')
          setCurrentGmail('')
          setCurrentPassword('')

          console.log(res)
        })
        .catch(err => {
          console.log(err)
        });
      setChange(prev => !prev)
      setModalUpdatelTeacher(false)
    }

  }


  let boxSearchName = []
  for (let i = 0; i < dataTeacher.length; i++) {
    if (dataTeacher[i].name.toUpperCase().includes(searchName.toUpperCase()))
      boxSearchName.push(dataTeacher[i])
  }



  let boxSearchClass = []
  for (let i = 0; i < dataTeacher.length; i++) {
    if (dataTeacher[i].level.toUpperCase().includes(searchClass.toUpperCase()))
      boxSearchClass.push(dataTeacher[i])
  }


  let boxSearchGrade = []
  for (let i = 0; i < dataTeacher.length; i++) {
    if (dataTeacher[i].gmail.toUpperCase().includes(searchGrade.toUpperCase()))
      boxSearchGrade.push(dataTeacher[i])
  }





  return (
    <>
      {token && Role != 'student' ? (
        <div className='qlTeacher'>
          <Header />
          <div className='right'>
            <button onClick={hanldeOpenModalAddTeacher} className='addUser'>
              <i className="fa-solid fa-plus"></i>
              <span>Thêm mới</span>
            </button> <br />

            <div className='search'>
              <input
                placeholder='Enter name ??'
                onChange={e => { setSearchName(e.target.value) }}
              />

              <input
                placeholder='Enter level ??'
                onChange={e => { setSearchClass(e.target.value) }}
              />

              <input
                placeholder='Enter gmail ??'
                onChange={e => { setSearchGrade(e.target.value) }}
              />
              {boxSearchName.length > 0 && boxSearchName.length < dataTeacher.length ? (
                <ul className='boxName'>
                  {boxSearchName.map((item, index) => {
                    return (
                      <>
                        {index <= 4 ? (
                          <li>
                            <p>
                              <p><strong>{item.name} </strong>  - {item.level}</p>
                              <i onClick={() => handleOpenModalDetailTeacher(item._id)} style={{ color: '#1da1f2' }} className="fa-solid fa-eye"></i>
                              <i onClick={() => { handleOpenModalDeleteTeacher(item._id) }} style={{ color: 'red' }} className="fa-solid fa-trash-can"></i>
                              <i onClick={() => { handleOpenModalUpdatelTeacher(item) }} style={{ color: '#04aa6d' }} className="fa-solid fa-pen-to-square"></i>
                            </p>
                          </li>
                        ) : ('')}
                      </>

                    )
                  })}
                </ul>
              ) : ('')}
              {boxSearchClass.length > 0 && boxSearchClass.length < dataTeacher.length ? (
                <ul className='boxClass'>
                  {boxSearchClass.map((item, index) => {
                    return (
                      <>
                        {index <= 4 ? (
                          <li>
                            <p>
                              <p><strong>{item.level} </strong>  - {item.name}</p>
                              <i onClick={() => handleOpenModalDetailTeacher(item._id)} style={{ color: '#1da1f2' }} className="fa-solid fa-eye"></i>
                              <i onClick={() => { handleOpenModalDeleteTeacher(item._id) }} style={{ color: 'red' }} className="fa-solid fa-trash-can"></i>
                              <i onClick={() => { handleOpenModalUpdatelTeacher(item) }} style={{ color: '#04aa6d' }} className="fa-solid fa-pen-to-square"></i>
                            </p>
                          </li>
                        ) : ('')}
                      </>

                    )
                  })}
                </ul>
              ) : ('')}
              {boxSearchGrade.length > 0 && boxSearchGrade.length < dataTeacher.length ? (
                <ul className='boxGrade'>
                  {boxSearchGrade.map((item, index) => {
                    return (
                      <>
                        {index <= 4 ? (
                          <li>
                            <p>
                              <p><strong>{item.gmail} </strong>  - {item.name}</p>
                              <i onClick={() => handleOpenModalDetailTeacher(item._id)} style={{ color: '#1da1f2' }} className="fa-solid fa-eye"></i>
                              <i onClick={() => { handleOpenModalDeleteTeacher(item._id) }} style={{ color: 'red' }} className="fa-solid fa-trash-can"></i>
                              <i onClick={() => { handleOpenModalUpdatelTeacher(item) }} style={{ color: '#04aa6d' }} className="fa-solid fa-pen-to-square"></i>
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
                  <th>NAME</th>
                  <th>ADRRESS</th>
                  <th>DATE</th>
                  <th>LEVEL</th>
                  <th>PHONE</th>
                  <th>OTHER</th>
                </tr>
                {paginationDataTeacher.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>{item.date}</td>
                      <td>{item.level}</td>
                      <td>{item.phone}</td>
                      <td>
                        <i onClick={() => handleOpenModalDetailTeacher(item._id)} className="fa-solid fa-eye"></i>
                        <i onClick={() => { handleOpenModalDeleteTeacher(item._id) }} className="fa-solid fa-trash-can"></i>
                        <i onClick={() => { handleOpenModalUpdatelTeacher(item) }} className="fa-solid fa-pen-to-square"></i>
                      </td>
                    </tr>
                  )
                })}

              </table>
            </div>
            <div className='page'>
              {dataTeacher.map((item, index) => {
                return (
                  <>
                    {index < (dataTeacher.length / 5) ? (
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

            {modalAddlTeacher ? (
              <div className='form'>
                <div className='modal'>
                  <button onClick={hanldeCloseModalAddTeacher} className='btnClose'>X</button>
                  <h3>ADD TEACHER</h3>
                  {/* name */}
                  <div className='item'>
                    <p>Họ và tên: </p>
                    <input
                      onChange={e => setName(e.target.value)}
                      placeholder='Họ và tên'
                    />
                  </div>

                  {/* gender */}
                  <div className='item'>
                    <p>Giới tính: </p>
                    <select onChange={e => { setGender(e.target.value) }}>
                      <option value="">Chọn</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>

                  {/* date */}
                  <div className='item'>
                    <p>Ngày sinh:</p>
                    <input
                      onChange={e => setDate(e.target.value)}
                      type={'date'}
                    />
                  </div>

                  {/* address */}
                  <div className='item'>
                    <p>Địa chỉ: </p>
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
                    <p>regilion</p>
                    <select onChange={e => { setReligion(e.target.value) }}>
                      <option value={'Không'}>Không</option>
                      <option value={'Có'}>Có</option>
                    </select>
                  </div>

                  {/* level */}
                  <div className='item'>
                    <p>Level: </p>
                    <select onChange={e => { setLevel(e.target.value) }} >
                      <option value={''}>Chọn</option>
                      <option value={'Tiến sĩ'}>Tiến sĩ</option>
                      <option value={'Thạc sĩ'}>Thạc sĩ</option>
                      <option value={'Giáo sư'}>Giáo sư</option>
                    </select>
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
                  </div> <br /> <br />
                  <button className='btnAdd' onClick={handlePostTeacher}>ADD TEACHER</button>
                </div>
              </div>
            ) : ('')}

            {modalDetailTeacher ? (
              <div className='handleUser'>
                <div style={{ height: 180 }} className='modal'>
                  <p>Want to see information ??</p><br />
                  <div className='listBtn'>
                    <button onClick={detailUser} >Yes</button>
                    <button onClick={() => { setModalDetailTeacher(false) }} className='btnNo'>No</button>
                  </div>
                </div>
              </div>) : ('')}

            {modalDeleteTeacher ? (
              <div className='handleUser'>
                <div className='modal'>
                  <p>Are you detele Teacher ??</p><br />
                  <div className='listBtn'>
                    <button onClick={deleteTeacher} className='btnDelete'>Yes</button>
                    <button onClick={() => { setModalDeleteTeacher(false) }} className='btnNo'>No</button>
                  </div>
                </div>
              </div>) : ('')}


            {formDetail ? (
              <div className='handleUser'>
                <div className='modal'>
                  <button onClick={() => { setFormDetail(false) }} className='btnCLose'>X</button>
                  <h3>DETAIL TEACHER</h3>
                  <div className='item'><p>Name:</p><span> {currentName} </span></div>
                  <div className='item'><p>Address:</p><span> {currentAddress} </span></div>
                  <div className='item'><p>Code:</p><span> {currentCode}</span></div>
                  <div className='item'><p>Date:</p><span> {currentDate}</span></div>
                  <div className='item'><p>Gender:</p><span> {currentGender}</span></div>
                  <div className='item'><p>Nation:</p><span> {currentNation}</span></div>
                  <div className='item'><p>Religion:</p><span> {currentReligion}</span></div>
                  <div className='item'><p>Level:</p><span> {currentLevel}</span></div>
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
                </div>
              </div>
            ) : ('')}

            {modalUpdatelTeacher ? (
              <div className='form'>
                <div className='modal'>
                  <button onClick={() => { setModalUpdatelTeacher(false) }} className='btnClose'>X</button>
                  <h3>UPDATE TEACHER</h3>
                  {/* name */}
                  <div className='item'>
                    <p>Họ và tên: </p>
                    <input
                      onChange={e => setCurrentName(e.target.value)}
                      placeholder='Họ và tên'
                      value={currentName}
                    />
                  </div>

                  {/* gender */}
                  <div className='item'>
                    <p>Giới tính: </p>
                    <select onChange={e => { setCurrentGender(e.target.value) }}>
                      <option value="">Chọn</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>

                  {/* date */}
                  <div className='item'>
                    <p>Ngày sinh:</p>
                    <input
                      value={currentDate}
                      onChange={e => setCurrentDate(e.target.value)}
                      type={'date'}
                    />
                  </div>

                  {/* address */}
                  <div className='item'>
                    <p>Địa chỉ: </p>
                    <input
                      value={currentAddress}
                      onChange={e => setCurrentAddress(e.target.value)}
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
                    <p>regilion</p>
                    <select onChange={e => { setCurrentReligion(e.target.value) }}>
                      <option value={'Chọn'}>Chọn</option>
                      <option value={'Không'}>Không</option>
                      <option value={'Có'}>Có</option>
                    </select>
                  </div>

                  {/* level */}
                  <div className='item'>
                    <p>Level: </p>
                    <select onChange={e => { setCurrentLevel(e.target.value) }} >
                      <option value={'Chọn'}>Chọn</option>
                      <option value={'Tiến sĩ'}>Tiến sĩ</option>
                      <option value={'Thạc sĩ'}>Thạc sĩ</option>
                      <option value={'Giáo sư'}>Giáo sư</option>
                    </select>
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
                  <button onClick={handleUpdate} className='btnAdd'>UPDATE TEACHER</button>

                </div>
              </div>
            ) : ('')}


          </div>
          <Footer />


        </div>
      ) : (<NotFound />)}
    </>

  )
}

export default Teacher