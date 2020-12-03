import React, { Component } from 'react';
import service from '../auth/auth-service';
import HoverRating from '../Rating';



class AddCommentaire extends Component {
 
    state = { 
      content: "", 
      note: "" // J'ai mis les notes avec RATING (stars)
    }

  handleRating = (ratingValue) => { 
      this.setState({note: ratingValue}); 
  } 

   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {content, note} = this.state
    
    service.post("/commentaire", { content, note})
      .then( (response) => {
        this.setState({content: "", note: ""});
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    console.log('name',name, 'value', value)
    this.setState({[name]: value});
  }

  render(){
    
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
            <p>
              <label>Note:</label>
              <HoverRating onSelectRating={this.handleRating}/>
            </p>
            <p>
                <label>Votre commentaire:</label>
                <textarea name="content" value={this.state.content} onChange={ e => this.handleChange(e)} />  
            </p>

          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddCommentaire;