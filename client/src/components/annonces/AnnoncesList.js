import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class AnnonceList extends Component {
    state = { listOfAnnonces: [] }

    getAllAnnonces = () =>{
        axios.get(`http://localhost:5000/annonce`)
        .then(responseFromApi => {
            this.setState({
            listOfAnnonces: responseFromApi.data
            })
        })
        .catch(err => console.log('Error while fetching projects', err))
    }

  componentDidMount() {
    this.getAllAnnonces();
  }

  render(){
    return(
      <div>
        <div style={{width: '60%', float:"left"}}>
          { this.state.listOfAnnonces.map( annonce => {
            return (
              <div key={annonce._id}>
                <Link to={`/annonce/${annonce._id}`}>
                  <img  src={annonce.picture} alt="" / >
                </Link>
            
                <p>{annonce.content}</p>
                <p>Auteur: {annonce.author.username}</p>
                <p>Adresse: {annonce.adress}</p>
              </div>
            )})
          }
        </div>
    
      </div>
    )
  }
}

export default AnnonceList;