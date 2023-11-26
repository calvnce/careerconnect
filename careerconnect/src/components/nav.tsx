import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsPerson } from 'react-icons/bs';
import LoginForm from 'views/login-form';

function MainNavBar() {
  const navigate = useNavigate();
  const [showLogInModal, setShowLogInModal] = useState(false);

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand='lg'
        className='bg-body-tertiary'
        data-bs-theme='dark'
        aria-label='Main Navigation'
      >
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Career Connect
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto' role='navigation'>
              <NavDropdown title='Career Fair' id='career-fair-dropdown'>
                <NavDropdown.Item href='#careerfairs'>Career fairs</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#employer'>Employers</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='Employer' id='employer-dropdown'>
                <NavDropdown.Item href='#jobs'>Jobs</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate('/signup/employer')}>
                  Register
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='Student' id='student-dropdown'>
                <NavDropdown.Item href='#careerfairs'>Career fairs</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate('/signup/student')}>
                  Register
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title={<BsPerson />} id='user-dropdown'>
                <NavDropdown.Item role='menuitem' onClick={() => setShowLogInModal(true)}>
                  Login
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginForm show={showLogInModal} onHide={() => setShowLogInModal(false)} />{' '}
    </header>
  );
}

export default MainNavBar;
