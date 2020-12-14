import React, { Component } from 'react';
import service from '../auth/auth-service'
import { Link } from 'react-router-dom';
import './AnnoncesList.css'

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
        return <p>Vous devez connecter afin de consulter cette annonce. Merci !</p>
      }
      return (
        <div className="container">
          <div className="row annonce-detail">
            <div className="col-lg-5">
              <img  src={this.state.annonce.imageUrl} alt="" / >
            </div>
          
            <div className="col-lg-7">
              <h3>{this.state.annonce.title}</h3>
              <p><span>Type:</span> {this.state.annonce.type}</p>
              <p><span>Description:</span> {this.state.annonce.description}</p>
              <p><span>Adresse:</span> {this.state.annonce.adress}</p>
              <p><span>Période:</span> Du {this.state.annonce.startDate} Au {this.state.annonce.endDate}</p>
              <p><span>Déplacement:</span> {this.state.annonce.moving ? "Oui" : "Non"}</p>
              <div className="author">
                <p>Créé par: {this.state.annonce.author.username}</p>
                <Link to={`/send-messages/${this.state.annonce._id}`}>Envoyer Messages</Link>
              </div>
              <Link to='/annonce'>Retourner</Link>
            </div>

          
          </div>
        </div>
      )
    }
}

export default AnnonceDetails;