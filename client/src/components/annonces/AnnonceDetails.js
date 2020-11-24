import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AnnonceDetails extends Component {

    state = {
      annonce: {}
    }

    getSingleAnnonce = () => {
      const { params } = this.props.match;
      console.log('params ', params)
      axios.get(`http://localhost:5000/annonce/${params.id}`)
        .then( responseFromApi =>{
          const theAnnonce = responseFromApi.data;
          this.setState({annonce:theAnnonce});
        })
        .catch((err)=>{
          console.log('Error while fetching project', err)
        })
    }

    componentDidMount(){
      this.getSingleAnnonce();
    }

    render () {
      console.log(this.state)
      return (
        <div>
          <img  src={this.state.annonce.picture} alt="photo" / >

          <div>
            <p>Type: {this.state.annonce.type}</p>
            <p>Description: {this.state.annonce.content}</p>
            <p>Adresse: {this.state.annonce.adress}</p>
            <p>Période: </p>
            <p>Déplacement: {this.state.annonce.moving ? "Oui" : "Non"}</p>
            <div>
              <p>Créé par: {this.state.annonce.author}</p>
              <Link to="/">Messages</Link>
              <Link to="/">Modifier</Link>
            
            </div>
          </div>

          <Link to='/annonce'>Retourner</Link>
        </div>
      )
    }
}

export default AnnonceDetails;