import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
    const {user, logout, checkJWT} = useAuth()
    // checkJWT()
    // console.log(validity)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link className='navbar-brand' to={user?.username ? '/home' : '/'}>Smartplug</Link>
                <Nav >
                    {user?.username && <Link className='text-white nav-link' to='/home'>Device List</Link>}
                    {user?.username && <Link className='text-white nav-link' to='/all-device-data'>All Device Data</Link>}
                    {user?.username && <Link className='text-white nav-link' to='/device-reg'>Device Management</Link>}
                    {user?.username && <span className='text-white btn btn-danger ms-2' onClick={logout}>Logout</span> }
                    {/*{user?.name && <span className='text-white nav-link'>Hello, {user?.name}</span>}*/}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;