import './Header.scss'
import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { NavLink, Link } from 'react-router-dom'

import jwt_decode from "jwt-decode";

export default function Header() {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
  }

  const handleLogout = () => {
    if (window.confirm(" Are you Logout ?")) {
      localStorage.removeItem("token");
      window.location = '/'
    }
  }
  return (
    <>
      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand href='#'>
            <img
              className='image'
              src='https://reactjsexample.com/assets/favicon.png'
              height='70'
              alt=''
              loading='lazy'
            />
          </MDBNavbarBrand>
          <MDBNavbarBrand>
            <NavLink to={'/'}>
              <i style={{ marginLeft: 50 }} className="fa-solid fa-house"></i>
            </NavLink>
            <NavLink to={'/qlgrades'}>
              <i style={{ marginLeft: 50 }} className="fa-solid fa-landmark"></i>
            </NavLink>
            <NavLink to={'/qlclass'}>
              <i style={{ marginLeft: 50 }} className="fa-solid fa-table-cells-large"></i>
            </NavLink>
            <NavLink to={'/qlteacher'}>
              <i style={{ marginLeft: 50 }} className="fa-solid fa-user-tie"></i>
            </NavLink>
            <NavLink to={'/qlstudent'}>
              <i style={{ marginLeft: 50 }} className="fa-solid fa-graduation-cap"></i>
            </NavLink>

            {token == null ? (
              <NavLink to={'/login'}>
                <i style={{ marginLeft: 50 }} className="fa-solid fa-right-from-bracket"></i>
              </NavLink>
            ) : (
              <NavLink to={''}>
                <i onClick={handleLogout} style={{ marginLeft: 50 }} className="fa-solid fa-right-from-bracket"></i>
              </NavLink>
            )}
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}