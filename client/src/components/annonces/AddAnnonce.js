import React, { Component } from 'react';
import './AddAnnonce.css';
import { Redirect } from 'react-router-dom';
import service from '../auth/auth-service';
import {upload} from '../auth/auth-service';


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
      <div className="container-fluid">
        <div id="annonce" className="row justify-content-center">
          <div className="section-annonce col-lg-6 col-md-8 col-12">
            <h2>Poste ton annonce</h2>
            <form onSubmit={this.handleFormSubmit}>
              <p>
                  <label>Type</label>
                    <select name="type" value={this.state.type} onChange={e => this.handleChange(e)}>
                      <option value="">Choisir une réponse</option>
                      <option value= "offer">Je voudrais devenir un(e) plant-sitter</option>
                      <option value="request">Je cherche un(e) plant-sitter</option>
                    </select>
              </p>
              <p>
                  <label>Titre</label>
                  <textarea name="title" value={this.state.title} onChange={ e => this.handleChange(e)} />  
              </p>
              <p>
                  <label>Description</label>
                  <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />  
              </p>
              <p>
                  <label>Du</label>
                  <input type="date" name="startDate" value={this.state.startDate} onChange={ e => this.handleChange(e)} /> 
                  <label>Au</label>
                  <input type="date" name="endDate" value={this.state.endDate} onChange={ e => this.handleChange(e)} />  
              </p>
            
              <p>
                  <label>Déplacement</label>
                  <select name="moving" value={this.state.moving} onChange={e => this.handleChange(e)}>
                    <option value="">Chosissez une réponse</option>
                    <option value= "true">Oui</option>
                    <option value="false">Non</option>
                  </select>
              </p>
            
              <p>
                  <label>Votre Adresse</label>
                  <textarea name="adress" value={this.state.adress} onChange={ e => this.handleChange(e)} />
              </p>
            
              <p>
                  <label> Photo</label>
                  <input type="file" onChange={this.handleUpload} />
              </p>
          
              <p>
              <button>Soumettre</button>
              </p>
            </form>
         </div>
        
        </div>
        
      </div>
    )
  }
}

export default AddAnnonce;