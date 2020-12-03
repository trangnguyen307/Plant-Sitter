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
      if (!this.state.annonce.author) {
        return "Loading..."
      }
      return (
        <div>
          <img  src={this.state.annonce.imageUrl} alt="" / >

          <div>
            <p>Type: {this.state.annonce.type}</p>
            <p>Description: {this.state.annonce.description}</p>
            <p>Adresse: {this.state.annonce.adress}</p>
            <p>Période: De {this.state.annonce.startDate} A {this.state.annonce.endDate}</p>
            <p>Déplacement: {this.state.annonce.moving ? "Oui" : "Non"}</p>
            <div>
              <p>Créé par: {this.state.annonce.author.username}</p>
              <Link to={`/send-messages/${this.state.annonce._id}`}>Envoyer Messages</Link>
            </div>
          </div>

          <Link to='/annonce'>Retourner</Link>
        </div>
      )
    }
}

export default AnnonceDetails;