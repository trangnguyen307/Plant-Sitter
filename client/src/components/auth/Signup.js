import React, { Component } from 'react';
import {signup} from './auth-service'
import { Link } from 'react-router-dom'; // HERE

class Signup extends Component {

  state = { 
      username: '' ,
      email: '',
      password: '',
      avatar: null // par défaut
    }

  // HERE
  handleFormSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const avatar = this.state.avatar;

    signup(username, email, password, avatar)
      .then(response => {
        this.setState({
            username: "",
            email: "", 
            password: "",
            avatar: null
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

  handleChangeFile = (e) => {  
    const {name, value} = e.target.files[0];
    this.setState({[name]: value});
  }

  // handleChange() and handleSubmit() will be added here

  render() {
    return (
      <div>
        {/* HERE */}
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <label>Email:</label>
          <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type="text" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

          <label>Avatar :</label>  
          <input type="file" name="avatar" value={this.state.avatar} onChange={e => this.handleChangeFile(e)}/>
          
          <button>I Signup</button>
        </form>
  
        <p>Already have account? 
          <Link to={"/"}>Login</Link>
        </p>
  
      </div>
    )
  }
}

export default Signup;