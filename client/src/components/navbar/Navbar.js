import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import {logout} from '../auth/auth-service';
import './Navbar.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.css";

const navbar = (props) => {
  return (
    <div>
      <Navbar className="nav" fixed="top">
      <Navbar.Brand href="/">Plant-Sitter</Navbar.Brand>
        <Nav className= "mr-auto">
          <Nav.Item>
            <Nav.Link to="/">A propos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/annonce">Annonce</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to="/article">Articles & Evènements</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to="/">Contact</Nav.Link>
          </Nav.Item>
        </Nav>
    {props.userInSession ? (
              <div>
                <Link to = {`/profile/myprofile/${props.userInSession._id}`}> Welcome, {props.userInSession.username}</Link>
                <button onClick={(e) => {
                  logout().then(() => props.updateUser(null))
                }}>Logout</button>
              </div>
            ) : (
              <div className="compte">
                <Redirect to="/" />
                <Link to='/signup' style={{textDecoration: 'none'}}>Créer un compte</Link>
                <Link to='/login' style={{textDecoration: 'none'}}>Me connecter</Link>
            </div> 
            )}
  </Navbar>  
    
    </div>
  )
}

export default navbar;