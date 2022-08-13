import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './logoDXC.png';
import './Navbar.css'
// import NavDropdown from 'react-bootstrap/NavDropdown';


function NavScroll() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className='pixelSize'>
            <img src={logo} alt="Logo" className='logoDXC'></img>
        </div>
        <Navbar.Brand href="#" className='nameSystem'>BAE SYSTEM</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;