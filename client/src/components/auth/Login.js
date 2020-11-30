import React, { Component } from 'react';
import {login} from './auth-service';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  state = { 
      username: '', 
      password: '',
      redirect: false
    }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    login(username, password)
      .then(response => {
          this.setState({ username: "", password: "", redirect: true });
          this.props.updateUser(response)
      })
      .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    console.log('this.props.user: ', this.props.user)
    const { redirect } = this.state;
    if (this.props.user?._id) {
      return <Redirect to= {`/profile/myProfile/${this.props.user._id}`}/>;
    }
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nom:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          
          <label>Mot de passe:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Login" />
        </form>
        <p>Tu n'as pas de compte? 
          <Link to={"/signup"}>Me créer un compte</Link>
        </p>
      </div>
    )
  }
}

export default Login;