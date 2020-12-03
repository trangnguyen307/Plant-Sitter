import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import service from '../auth/auth-service'
import {upload} from '../auth/auth-service'


class AddAnnonce extends Component {
  state = { type: "",title:"", description: "",moving: "", adress: "", imageUrl: "",startDate:"", endDate:"", redirect: false }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {type,title, description, moving, adress, imageUrl,startDate,endDate} = this.state
    
    service.post("/annonce", { type, title, description, moving, adress, imageUrl, startDate, endDate })
      .then( () => {
        this.setState({type: "",title:"", description: "",moving: "", adress: "", imageUrl: "",startDate:"", endDate: "", redirect: true});
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleUpload = (event) => {
    let formData = new FormData();
    formData.append('imageUrl', event.target.files[0]);

    upload(formData)
           .then(response => this.setState({imageUrl: response.secure_url}))
           .catch(err => {
            console.log('Error while uploading the file: ', err);
          });
  }

  render(){
    console.log('date',typeof this.state.startDate, this.state.endDate)
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/annonce" />;
    }
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
            <p>
                <label>Type:
                  <select name="type" value={this.state.type} onChange={e => this.handleChange(e)}>
                    <option value="">Chosir une réponse</option>
                    <option value= "offer">Je voudrais devenir un(e) bénévole</option>
                    <option value="request">Je voudrais chercher un(e) bénévole</option>
                  </select>
                </label>
            </p>
            <p>
                <label>Title:</label>
                <textarea name="title" value={this.state.title} onChange={ e => this.handleChange(e)} />  
            </p>
            <p>
                <label>Description:</label>
                <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />  
            </p>
            <p>
                <label>Date:</label>
                <input type="date" name="startDate" value={this.state.startDate} onChange={ e => this.handleChange(e)} /> 
                <input type="date" name="endDate" value={this.state.endDate} onChange={ e => this.handleChange(e)} />  
            </p>
          
            <p>
                <label>Déplacement:</label>
                <select name="moving" value={this.state.moving} onChange={e => this.handleChange(e)}>
                  <option value="">Chosissez une réponse</option>
                  <option value= "true">Oui</option>
                  <option value="false">Non</option>
                </select>
            </p>
          
            <p>
                <label>Votre Adresse:</label>
                <textarea name="adress" value={this.state.adress} onChange={ e => this.handleChange(e)} />
            </p>
          
            <p>
            <label>
                Photo:
                <input type="file" onChange={this.handleUpload} />
            </label>
            </p>
         
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddAnnonce;