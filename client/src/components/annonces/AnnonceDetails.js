import React, { Component } from 'react';
import service from '../auth/auth-service'
import { Link } from 'react-router-dom';

class AnnonceDetails extends Component {

    state = {
      annonce: {}
    }

    getSingleAnnonce = () => {
      const { params } = this.props.match;
      console.log('params ', params)
      service.get(`/annonce/${params.id}`)
        .then( responseFromApi =>{
          const theAnnonce = responseFromApi.data;
          console.log('theAnnonce', theAnnonce)
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
      console.log('annonceDetails',this.state.annonce.author)
      return (
        <div>
          <img  src={this.state.annonce.picture} alt="" / >

          <div>
            <p>Type: {this.state.annonce.type}</p>
            <p>Description: {this.state.annonce.content}</p>
            <p>Adresse: {this.state.annonce.adress}</p>
            <p>Période: </p>
            <p>Déplacement: {this.state.annonce.moving ? "Oui" : "Non"}</p>
            <div>
              {/* <p>Créé par: {this.state.annonce.author.username}</p> */}
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