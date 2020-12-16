import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import service from '../auth/auth-service';
import {upload} from '../auth/auth-service';
import '../annonces/AddAnnonce.css';


class AddArticle extends Component {
  state = { title: "",intro:"", content: "", imageUrl: "", redirect: false }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {title,intro, content,imageUrl} = this.state

    service.post("/article", { title, intro, content,imageUrl })
      .then( () => {
        this.setState({title: "",intro:"", content: "",imageUrl: "", redirect: true});
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
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/article" />;
    }
    
    return(
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="section-annonce col-lg-6 col-md-8 col-12">
            <h2>Nouvel Article</h2>
            <form onSubmit={this.handleFormSubmit}>
                <p>
                    <label>Titre:</label>
                    <textarea name="title" value={this.state.title} onChange={ e => this.handleChange(e)} />  
                </p>
                <p>
                    <label>Introduction:</label>
                    <textarea name="intro" value={this.state.intro} onChange={ e => this.handleChange(e)} />  
                </p>
            
                <p>
                    <label>Contenu:</label>
                    <textarea name="content" value={this.state.content} onChange={ e => this.handleChange(e)} />  
                </p>
              
                <p>
                <label>
                    Photo:
                    <input type="file" onChange={e => this.handleUpload(e)} />
                </label>
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

export default AddArticle;