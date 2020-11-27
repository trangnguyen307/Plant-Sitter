import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import service from '../auth/auth-service'


class AddArticle extends Component {
  state = { title: "", content: "",photo:{}, redirect: false }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, content,photo} = this.state

    service.post("/article", { title, content,photo })
      .then( () => {
        this.setState({title: "", content: "",redirect: true});
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    console.log('file',event.target.files[0])
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleUpload = (event) => {
    let formData = new FormData();
    formData.append('picture', event.target.files[0]);

    this.setState({photo: formData})
  }

  render(){
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/article" />;
    }
    console.log('connected')
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
            <p>
                <label>Titre:</label>
                <textarea name="title" value={this.state.title} onChange={ e => this.handleUpload(e)} />  
            </p>
         
            <p>
                <label>Contenu:</label>
                <textarea name="content" value={this.state.content} onChange={ e => this.handleChange(e)} />  
            </p>
          
            <p>
            <label>
                Photo:
                <input type="file" name="photo" onChange={e => this.handleUpload(e)} />
            </label>
            </p>
         
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddArticle;