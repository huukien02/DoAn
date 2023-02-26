import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './Home.scss'

import axios from 'axios'
import NotFound from '../NotFound/NotFound'
import jwt_decode from "jwt-decode";

export default function Home() {
  const arrStar = [1, 2, 3, 4, 5]

  const [dataCmtAll, setDataCmtAll] = useState([])

  const [dataTeacher, setDataTeacher] = useState([])
  const [dataStudents, setDataStudents] = useState([])
  const [dataGrades, setDataGrades] = useState([])
  const [dataClass, setDataClass] = useState([])
  const [dataCmt, setDataCmt] = useState([])

  const [star, setStar] = useState(5)
  const [msgReview, setMsgReview] = useState('')
  const [paginaton, setPagination] = useState(1)

  const token = localStorage.getItem("token");

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
      const res = await axios.get(`http://localhost:4000/api/student`)
      return res;
    }
    getData()
      .then((res) => setDataStudents(res.data))
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
    axios
      .get(`http://localhost:4000/api/comment/page/${paginaton}`)
      .then(res => setDataCmt(res.data))
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/comment`)
      .then(res => setDataCmtAll(res.data))
      .catch((err) => {
        console.log(err);
      })
  }, [])




  // vote Start
  const handleStar_1 = () => {
    const listStar = document.querySelectorAll('.vote i')
    listStar[0].style.color = 'orange'
    listStar[1].style.color = 'gray'
    listStar[2].style.color = 'gray'
    listStar[3].style.color = 'gray'
    listStar[4].style.color = 'gray'

    setStar(1)


  }

  const handleStar_2 = () => {
    const listStar = document.querySelectorAll('.vote i')
    listStar[0].style.color = 'orange'
    listStar[1].style.color = 'orange'
    listStar[2].style.color = 'gray'
    listStar[3].style.color = 'gray'
    listStar[4].style.color = 'gray'

    setStar(2)

  }

  const handleStar_3 = () => {
    const listStar = document.querySelectorAll('.vote i')
    listStar[0].style.color = 'orange'
    listStar[1].style.color = 'orange'
    listStar[2].style.color = 'orange'
    listStar[3].style.color = 'gray'
    listStar[4].style.color = 'gray'

    setStar(3)
  }

  const handleStar_4 = () => {
    const listStar = document.querySelectorAll('.vote i')
    listStar[0].style.color = 'orange'
    listStar[1].style.color = 'orange'
    listStar[2].style.color = 'orange'
    listStar[3].style.color = 'orange'
    listStar[4].style.color = 'gray'

    setStar(4)
  }

  const handleStar_5 = () => {
    const listStar = document.querySelectorAll('.vote i')
    listStar[0].style.color = 'orange'
    listStar[1].style.color = 'orange'
    listStar[2].style.color = 'orange'
    listStar[3].style.color = 'orange'
    listStar[4].style.color = 'orange'

    setStar(5)
  }

  const handleSend = () => {
    const token = localStorage.getItem("token");
    if (token != null) {
      const decoded = jwt_decode(token);
      const name = decoded.name

      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const d = new Date();
      let day = d.getDay();
      let year = d.getFullYear()
      let month = months[d.getMonth()]
      let hour = d.getHours();
      let minutes = d.getMinutes();

      if (hour <= 12) {
        var today = month + ' ' + day + '' + ', ' + year + ' at ' + hour + ':' + minutes + ' am'

      }
      else if (hour > 12) {
        hour = hour - 12;
        var today = month + ' ' + day + '' + ', ' + year + ' at ' + hour + ':' + minutes + ' pm'

      }
      const payload = { star, msgReview, name, today }

      axios.post(`http://localhost:4000/api/comment/register`, {
        data: payload
      })
        .then(res => {
          console.log(res)
          window.location = '/'

        })
        .catch(err => {
          console.log(err)
          alert("Chỉ được review 1 lần")
        });
    }
    else {
      alert("Please Login")
    }


  }

  const changePage = (page) => {
    console.log(page)
    setPagination(page)

    let token = localStorage.getItem("token");
    async function getData() {
      const res = await axios.get(`http://localhost:4000/api/comment/page/${page}`)
      return res;
    }
    getData().then((res) => setDataCmt(res.data)).catch(err => {
      console.log(err);
    })

  }

  let totalStar = 0;

  for (let i = 0; i < dataCmtAll.length; i++) {
    console.log(dataCmtAll[i].star);
    totalStar += Number(dataCmtAll[i].star)
  }
  let rate = Math.round(totalStar / dataCmtAll.length);

  const oneStar = dataCmtAll.filter((item) => {
    return item.star == 1
  })

  const twoStar = dataCmtAll.filter((item) => {
    return item.star == 2
  })

  const threeStar = dataCmtAll.filter((item) => {
    return item.star == 3
  })

  const fourStar = dataCmtAll.filter((item) => {
    return item.star == 4
  })

  const fiveStar = dataCmtAll.filter((item) => {
    return item.star == 5
  })

  let renderOneStar = oneStar.length / dataCmtAll.length * 335

  let renderTwoStar = twoStar.length / dataCmtAll.length * 335

  let renderThreeStar = threeStar.length / dataCmtAll.length * 335

  let renderFourStar = fourStar.length / dataCmtAll.length * 335

  let renderFiveStar = fiveStar.length / dataCmtAll.length * 335



  return (
    <>
      {token ? (
        <div>
          <Header />
          <div className='home'>
            <div className='listData'>
              <div className='item'>
                <p>Teacher: {dataTeacher.length}</p>
              </div>
              <div className='item'>
                <p>Student: {dataStudents.length}</p>
              </div>
              <div className='item'>
                <p>Grades: {dataGrades.length}</p>
              </div>
              <div className='item'>
                <p>Class: {dataClass.length}</p>
              </div>
            </div>
            <div className='review'>
              <div className='header'>
                <div className='left'>
                  <h5>{rate}</h5>
                  <div>
                    {arrStar.map((items, index) => {
                      return (
                        <span>
                          {index + 1 <= rate ? (
                            <i className="fa-solid fa-star"></i>
                          ) : (
                            <i style={{ color: 'gray' }} className="fa-solid fa-star"></i>
                          )}

                        </span>
                      )
                    })}
                  </div>
                  <p>{dataCmtAll.length} Ratings</p>
                </div>
                <div className='right'>
                  <p>
                    5 stars
                    <span className='line'></span>
                    <span style={{ backgroundColor: '#b2d235', width: renderFiveStar }} className='line'></span>
                  </p>
                  <p>
                    4 stars
                    <span className='line'></span>
                    <span style={{ backgroundColor: '#b2d235', width: renderFourStar }} className='line'></span>
                  </p>
                  <p>
                    3 stars
                    <span className='line'></span>
                    <span style={{ backgroundColor: '#b2d235', width: renderThreeStar }} className='line'></span>
                  </p>
                  <p>
                    2 stars
                    <span className='line'></span>
                    <span style={{ backgroundColor: '#b2d235', width: renderTwoStar }} className='line'></span>
                  </p>
                  <p>
                    1 stars
                    <span className='line'></span>
                    <span style={{ backgroundColor: '#b2d235', width: renderOneStar }} className='line'></span>
                  </p>
                </div>
              </div>
              <div className='body'>
                <div className='listReview'>
                  {dataCmt.length > 0 ? (
                    <>
                      {dataCmt.map((item, index) => {
                        return (
                          <>
                            <div className='item'>
                              <div className='info'>
                                <p>{item.name}</p>
                                {arrStar.map((items, index) => {
                                  return (
                                    <span>
                                      {index + 1 <= item.star ? (
                                        <i className="fa-solid fa-star"></i>
                                      ) : (
                                        <i style={{ color: 'gray' }} className="fa-solid fa-star"></i>
                                      )}

                                    </span>
                                  )
                                })}
                                <span>{item.today}</span>
                              </div>
                              <div className='detail'>
                                <p>{item.msgReview}</p>
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </>
                  ) : ('')}
                </div>
                <div className='page'>

                  {/* 
                  {arrStar.map((item, index) => {
                    return (
                      <button onClick={() => { changePage(index + 1) }}>{index + 1}</button>
                    )
                  })} */}

                  {arrStar.map((item, index) => {

                    return (
                      index < dataCmtAll.length / 2 ? (
                        index + 1 == paginaton ? (
                          (<button style={{ backgroundColor: "red" }} onClick={() => { changePage(index + 1) }}>{index + 1}</button>)
                        ) : (
                          (<button onClick={() => { changePage(index + 1) }}>{index + 1}</button>)
                        )
                      ) : ('')
                    )

                  })}


                </div>
                <div className='vote'>
                  <h4>Review</h4>
                  <textarea
                    placeholder='Enter comment'
                    onChange={e => setMsgReview(e.target.value)}
                  /> <br />
                  <i onClick={handleStar_1} className="fa-solid fa-star"></i>
                  <i onClick={handleStar_2} className="fa-solid fa-star"></i>
                  <i onClick={handleStar_3} className="fa-solid fa-star"></i>
                  <i onClick={handleStar_4} className="fa-solid fa-star"></i>
                  <i onClick={handleStar_5} className="fa-solid fa-star"></i>
                  <button onClick={handleSend}>Send</button>

                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}

