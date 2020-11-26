import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import service from '../auth/auth-service'


class AddArticle extends Component {
  state = { title: "", content: "", redirect: false }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, content} = this.state

    service.post("/article", { title, content })
      .then( () => {
        this.setState({title: "", content: "",redirect: true});
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
      return <Redirect to="/article" />;
    }
    console.log('connected')
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
            <p>
                <label>Titre:</label>
                <textarea name="title" value={this.state.title} onChange={ e => this.handleChange(e)} />  
            </p>
         
            <p>
                <label>Contenu:</label>
                <textarea name="content" value={this.state.content} onChange={ e => this.handleChange(e)} />  
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

export default AddArticle;