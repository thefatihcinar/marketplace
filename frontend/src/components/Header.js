import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import CartItemsCountIndicator from './CartItemsCountIndicator';
import { useSelector } from 'react-redux'

const brandName = 'Rocket Store';

const Header = () => {

    let cart = useSelector(state => state.cart)
    let { cartItems } = cart
    let countItemsInCart = cartItems.length

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
                                <span> </span>
                                Cart
                            </Nav.Link>
                        </LinkContainer>
                        <CartItemsCountIndicator count={countItemsInCart}/>
                        <LinkContainer to = '/login'>
                            <Nav.Link>
                                <i className='fas fa-user'></i>
                                <span> </span>
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
