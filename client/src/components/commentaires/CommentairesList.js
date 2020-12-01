import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class CommentairesList extends Component {
    state = { 
      listOfCommentaires: []
     }

    getAllCommentaires = () =>{
        axios.get(`http://localhost:5000/profile`)
        .then(responseFromApi => {
            this.setState({
                listOfCommentaires: responseFromApi.data
            })
        })
        .catch(err => console.log('The list of comments does not show', err))
    }

    componentDidMount() {
      this.getAllCommentaires();
    }

    deleteCommentaire = (content) => {
        const commentairesCopy = this.state.listOfCommentaires;
        const commentaireIndex = commentairesCopy.findIndex(commentaire => commentaire.content === content);
        commentairesCopy.splice(commentaireIndex, 1);
        this.setState({
            listOfCommentaires:commentairesCopy 
        })
      }

  render(){
    const { listOfCommentaires } = this.state;
    return(
      <div>
        <div style={{width: '60%', float:"left"}}>
          { listOfCommentaires.map( commentaire => {
            return (
              <div key={commentaire._id}>
                {/*<Link to={`/profile/${commentaire._id}`}>
                </Link> */}
                <p>{commentaire.content}</p>
                <button onClick = {event => {this.deleteCommentaire(commentaire.content)}}>Supprimer le commentaire</button>
              </div>
            )})
          }
        </div>
      </div>
    )
  }
}

export default CommentairesList;