import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from '../auth/auth-service'

const navbar = (props) => {
  return (
    <nav className="nav-style">
      {props.userInSession ? (
        <ul>
          <li>Welcome, {props.userInSession.username}</li>
          <li>
            <Link to='/projects' style={{textDecoration: 'none'}}>Projects</Link>
          </li>
          {/* HERE */}
          <li>
            <button onClick={(e) => {
              logout().then(() => props.updateUser(null))
            }}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to='/signup' style={{textDecoration: 'none'}}>Signup</Link>
            <Link to='/login' style={{textDecoration: 'none'}}>Login</Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default navbar;