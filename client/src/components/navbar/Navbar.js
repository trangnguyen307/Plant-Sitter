import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from '../auth/auth-service';
import './Navbar.css';

const navbar = (props) => {
  return (
    <nav className="nav-style">
  
       
          
        
      
        <ul className="nav">
          <li className="nav-elements">
            <div className="nav-title">
              <Link to='/' style={{textDecoration: 'none'}}>PLANT-SITTER</Link>
            </div>
            <div className="nav-el">
              <Link to='/' style={{textDecoration: 'none'}}>A propos</Link>
              <Link to='/annonce' style={{textDecoration: 'none'}}>Annonce</Link>
              <Link to='/' style={{textDecoration: 'none'}}>Articles & Evènements</Link> 
              <Link to='/' style={{textDecoration: 'none'}}>Contact</Link>
            </div>
            {props.userInSession ? (
              
              <div>
                <div>Welcome, {props.userInSession.username}</div>
                <button onClick={(e) => {
                  logout().then(() => props.updateUser(null))
                }}>Logout</button>
              </div>
            ) : (
              <div className="compte">
              <Link to='/signup' style={{textDecoration: 'none'}}>Créer un compte </Link>
              <Link to='/login' style={{textDecoration: 'none'}}>Me connecter</Link>
            </div> 
            )}
             
          </li>
        </ul>
     
    </nav>
  )
}

export default navbar;