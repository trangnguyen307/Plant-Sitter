import React, { Component } from 'react';
import {signup} from './auth-service'
import { Link } from 'react-router-dom'; // HERE
import axios from 'axios';

class Signup extends Component {

  state = { 
      username: '' ,
      email: '',
      password: '',
      avatar: null 
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
    this.setState({
      avatar: e.target.files[0],
      loaded: 0,
    });
  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.avatar)
    axios.post("http://localhost:5000/auth", data, { 
       // receive two    parameter endpoint url ,form data
   })
   .then(res => { // then print response status
    console.log(res.statusText)
 })
}

  // handleChange() and handleSubmit() will be added here

  render() {
    return (
      <div>
        {/* HERE */}
        <form onSubmit={this.handleFormSubmit}>
          <label>Nom:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <label>Email:</label>
          <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          
          <label>Mot de passe:</label>
          <input type="text" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

          <label>Avatar:</label>  
          <input type="file" name="avatar" value={this.state.avatar} onChange={e => this.handleChangeFile(e)}/>
          <button type="button" class="button" onClick={this.onClickHandler}>Upload</button> 
          
          <button>Envoyer</button>
        </form>
  
        <p>Tu as déjà un compte? 
          <Link to={"/"}>Me connecter</Link>
        </p>
  
      </div>
    )
  }
}

export default Signup;