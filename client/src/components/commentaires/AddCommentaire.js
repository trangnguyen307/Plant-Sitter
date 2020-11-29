import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import service from '../auth/auth-service';
import Rating from '../Rating';



class AddCommentaire extends Component {
  state = { 
      content: "", 
      //note: 0 , // J'ai mis les notes avec RATING (stars)
      redirect: false 
    }

    
  ratingChanged = (newRating) => {
    console.log(newRating);
  };
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {content} = this.state
    
    service.post("/profile", { content})
      .then( () => {
        this.setState({content: "", redirect: true});
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    console.log('name',name, 'value', value)
    this.setState({[name]: value});
  }


  render(){
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/profile" />; // Un seul profile pour le user et le bénévole
    }

    

    return(
      <div>
            <p>
              <label>Note:</label>
              <Rating />
            </p>
        <form onSubmit={this.handleFormSubmit}>
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