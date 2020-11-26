import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class AnnonceList extends Component {
    state = { 
      listOfAnnonces: []
     }

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
    const listOfAnnonncesFilter = this.state.listOfAnnonces.filter(annonce =>{
      const matchAddress = annonce.adress.toLowerCase().includes(this.props.queryAddress);
      let matchMoving;
      // if (this.state.queryMoving === "true" || this.state.queryMoving === "false" ) {
      //   matchMoving = annonce.moving === this.state.queryMoving
      // }

      return matchAddress
    } )
                                                           
    console.log('query:  ', this.state.queryAddress)
    return(
      <div>
        <div style={{width: '60%', float:"left"}}>
          { listOfAnnonncesFilter.map( annonce => {
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
        <div>
          <Link to="/annonce/new">Ajouter votre annonce</Link>
        </div>
    
      </div>
    )
  }
}

export default AnnonceList;