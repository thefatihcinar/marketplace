import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'

const brandName = 'Rocket Store';

const Header = () => {
    return (
       <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'>{brandName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'/>
                    <Nav className='me-auto'>
                        <Nav.Link href='/'>
                            <i className='fas fa-shopping-cart'></i>
                            Cart
                        </Nav.Link>
                        <Nav.Link href='/login'>
                            <i className='fas fa-user'></i>
                            Sign In
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
       </header>
    )
}

export default Header
