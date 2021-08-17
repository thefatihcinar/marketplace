import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom'

const brandName = 'Rocket Store';

const Header = () => {
    return (
       <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to = '/'>
                        <Navbar.Brand>{brandName}</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'/>
                    <Nav className='me-auto'>
                        <LinkContainer to = '/cart'>
                            <Nav.Link>
                                <i className='fas fa-shopping-cart'></i>
                                Cart
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to = '/login'>
                            <Nav.Link>
                                <i className='fas fa-user'></i>
                                Sign In
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
       </header>
    )
}

export default Header
