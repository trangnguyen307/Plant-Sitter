import React, { Component } from 'react';
import service from '../auth/auth-service'
import { Link } from 'react-router-dom';
import './AnnoncesList.css';
import MapContainer from './MapContainer';

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
    deleteAnnonce = () => {
      const { params } = this.props.match;
      service.delete(`/annonce/${params.id}`)
        .then(() =>{
            this.props.history.push('/annonce'); // !!!         
        })
        .catch((err) => {
            console.log('Error while deleting annonce', err)
        })
    }

    render () {
      if (!this.state.annonce.author) {
        return <p>Vous devez connecter afin de consulter cette annonce. Merci !</p>
      }
      return (
        <div className="container-fluid">
          <div className="row annonce-detail">
            <div className="col-lg-7 col-md-10 col-xs-12 col-12">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-10 col-xs-12 col-12">
                  <img  src={this.state.annonce.imageUrl} alt="" / >
                </div>
              
                <div className="col-lg-7 col-md-10 col-xs-12 col-12">
                  <h3>{this.state.annonce.title}</h3>
                  <div className="divider"></div>
                  <p><span>Type:</span> {this.state.annonce.type}</p>
                  <p><span>Description:</span> {this.state.annonce.description}</p>
                  <p><span>Adresse:</span> {this.state.annonce.adress}</p>
                  <p><span>Période:</span> Du {this.state.annonce.startDate} Au {this.state.annonce.endDate}</p>
                  <p><span>Déplacement:</span> {this.state.annonce.moving ? "Oui" : "Non"}</p>
                  <p><span>Créé par:</span> {this.state.annonce.author.username}</p>
                  <Link to={`/send-messages/${this.state.annonce._id}`}>Envoyer Messages</Link>
                  {this.props.userInSession?._id === this.state.annonce.author._id && <p className="deleteButton" onClick={() => this.deleteAnnonce()}>Supprimer</p>}
                  <Link to='/annonce'>Retourner</Link>
                </div>
              </div>
              
            </div>
            
            <div className=" col-lg-5 map-div">
              <MapContainer annonces={[this.state.annonce]} className="map" />
            </div>
          </div>
        </div>
      )
    }
}

export default AnnonceDetails;