import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button, Dropdown } from 'react-bootstrap';

function Sidebar() {
  return (
    <div className='d-flex' id='wrapper'>
      <div className='border-end bg-white' id='sidebar-wrapper'>
        <div className='sidebar-heading border-bottom bg-light'>Start Bootstrap</div>
        <div className='list-group list-group-flush'>
          <Nav.Link href='#!'>Dashboard</Nav.Link>
          <Nav.Link href='#!'>Shortcuts</Nav.Link>
          <Nav.Link href='#!'>Overview</Nav.Link>
          <Nav.Link href='#!'>Events</Nav.Link>
          <Nav.Link href='#!'>Profile</Nav.Link>
          <Nav.Link href='#!'>Status</Nav.Link>
        </div>
      </div>
      <div id='page-content-wrapper'>
        <Navbar className='navbar-expand-lg navbar-light bg-light border-bottom'>
          <Container fluid>
            <Button className='btn-primary' id='sidebarToggle'>
              Toggle Menu
            </Button>
            <Navbar.Toggle aria-controls='navbarSupportedContent' />
            <Navbar.Collapse id='navbarSupportedContent'>
              <Nav className='ms-auto mt-2 mt-lg-0'>
                <Nav.Link href='#!'>Home</Nav.Link>
                <Nav.Link href='#!'>Link</Nav.Link>
                <NavDropdown title='Dropdown' id='navbarDropdown'>
                  <Dropdown.Item href='#!'>Action</Dropdown.Item>
                  <Dropdown.Item href='#!'>Another action</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href='#!'>Something else here</Dropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className='container-fluid'>
          <h1 className='mt-4'>Simple Sidebar</h1>
          <p>
            The starting state of the menu will appear collapsed on smaller screens, and will appear
            non-collapsed on larger screens. When toggled using the button below, the menu will
            change.
          </p>
          <p>
            Make sure to keep all page content within the
            <code>#page-content-wrapper</code>. The top navbar is optional, and just for
            demonstration. Just create an element with the
            <code>#sidebarToggle</code>
            ID which will toggle the menu when clicked.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
