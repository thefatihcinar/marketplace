import React from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import CartItemsCountIndicator from './CartItemsCountIndicator';
import { useSelector, useDispatch } from 'react-redux'
/* Actions */
import { logout } from '../actions/userActions'

const brandName = 'Rocket Store';

const Header = () => {

    const dispatch = useDispatch();

    let cart = useSelector(state => state.cart)
    let { cartItems } = cart
    let countItemsInCart = cartItems.length

    let userLogin = useSelector(state => state.userLogin)
    let { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch( logout() )
    }

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
                        {userInfo
                         ? <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                    </NavDropdown.Item>
                           </NavDropdown>
                         : <LinkContainer to = '/login'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i>
                                    <span> </span>
                                    Sign In
                                </Nav.Link>
                            </LinkContainer>
                        }
                        
                    </Nav>
                </Container>
            </Navbar>
       </header>
    )
}

export default Header
