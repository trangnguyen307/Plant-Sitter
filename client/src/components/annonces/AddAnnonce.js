import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import service from '../auth/auth-service'


class AddAnnonce extends Component {
  state = { type: "", description: "",moving: "", adress: "", redirect: false }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const type = this.state.type;
    const description = this.state.description;
    const moving = this.state.moving;
    const adress = this.state.adress;
    const author = this.props.userInSession;
    service.post("/annonce", { type, description, moving, adress,author })
      .then( () => {
        this.setState({type: "", description: "",moving: "", adress: "",redirect: true});
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

//   handleUpload = (event) => {
//     let formData = new FormData();
//     formData.append('picture', event.target.files[0]);

//     authService.upload(formData)
//       .then(response => {
//         this.props.updateUser(response);
//       })
//     ;
//   }

  render(){
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/annonce" />;
    }
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
            <p>
                <label>Type:</label>
                <select name="type" value={this.state.type} onChange={this.handleChange}>
                  <option value="">Chosir une réponse</option>
                  <option value= "offer">Je voudrais devenir un(e) bénévole</option>
                  <option value="request">Je voudrais chercher un(e) bénévole</option>
                </select>
            </p>
         
            <p>
                <label>Description:</label>
                <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />  
            </p>
          
            <p>
                <label>Déplacement:</label>
                <select name="moving" value={this.state.moving} onChange={this.handleChange}>
                  <option value="">Chosir une réponse</option>
                  <option value= "true">Oui</option>
                  <option value="false">Non</option>
                </select>
            </p>
          
            <p>
                <label>Votre Adresse:</label>
                <textarea name="adress" value={this.state.adress} onChange={ e => this.handleChange(e)} />
            </p>
          
            {/* <p>
            <label>
                Photo:
                <input type="file" name="picture" onChange={this.handleUpload} />
            </label>
            </p> */}
         
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddAnnonce;