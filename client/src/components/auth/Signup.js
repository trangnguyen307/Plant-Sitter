import React, { Component } from 'react';
import './Signup.css';
import {signup} from './auth-service'
import { Link } from 'react-router-dom'; // HERE


class Signup extends Component {
  
    state = { 
      username: '' ,
      email: '',
      password: '',
    }

   

  // HERE
  handleFormSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;

    signup(username, email, password)
      .then(response => {
        this.setState({
            username: "",
            email: "", 
            password: "",
        });
        this.props.updateUser(response)
      })
      .catch( error => console.log(error) )
  }

  // HERE
  handleChange = (e) => {  
    const {name, value} = e.target;
    this.setState({[name]: value});
  }


  // handleChange() and handleSubmit() will be added here

  render() {
    return (
      <div className="page">
      <div className="container">
        <div className="form-signup">
        {/* HERE */}
          <form onSubmit={this.handleFormSubmit} className="form-signup">
            <label>Nom:</label>
            <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          
            <label>Mot de passe:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
            <button>Envoyer</button>
          </form>
  
          <p>Tu as déjà un compte? 
            <Link to={"/"}> Me connecter</Link>
          </p>
      </div>
      </div>
      </div>
      
    )
  }
}

export default Signup;