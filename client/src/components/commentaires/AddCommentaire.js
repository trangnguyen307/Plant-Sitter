import React, { Component } from 'react';
import service from '../auth/auth-service';
import HoverRating from '../Rating';
import './Commentaires.css'



class AddCommentaire extends Component {
 
    state = { 
      content: "",
      note: "2", // J'ai mis les notes avec RATING (stars)
      commentDone: false
    }

  handleRating = (ratingValue) => { 
      this.setState({note: ratingValue}); 
  } 

   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {content, note} = this.state
    const receiverId = this.props.receiverId
    
    service.post("/commentaire", {content, receiverId, note})
      .then( (response) => {
        this.setState({content: "", note: "", commentDone:true});
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    console.log('name',name, 'value', value)
    this.setState({[name]: value});
  }

  render(){
    if (this.state.commentDone) 
      return (<p className="merci-comment">Merci pour votre commentaire !</p>)
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
            <p>
              <label>Note:</label>
              <HoverRating onSelectRating={this.handleRating}/>
            </p>
            <p id="add-commentaire">
                <label>Votre commentaire:</label>
                <textarea name="content" value={this.state.content} onChange={ e => this.handleChange(e)} />  
            </p>

            <button>Soumettre</button>
        </form>
      </div>
    )
  }
}

export default AddCommentaire;