import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './Search';


class AnnonceList extends Component {
    state = { 
      listOfAnnonces: [],
      queryAddress:'',
      queryMoving: ''

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

    updateQueryAddress = (newValue) => {
      this.setState({queryAddress:newValue})
    }
  
    updateQueryMoving = (newValue) => {
      this.setState({queryMoving:newValue})
    }

  render(){
    let listOfAnnonncesFilter;
    if (this.props.location?.query) {
      listOfAnnonncesFilter = this.state.listOfAnnonces.filter(annonce =>{
        const matchAddress = annonce.adress.toLowerCase().includes(this.props.location.query);
        return matchAddress
      } )
    } else {
      listOfAnnonncesFilter = this.state.listOfAnnonces.filter(annonce =>{
        const matchAddress = annonce.adress.toLowerCase().includes(this.state.queryAddress);
        return matchAddress
      } )
    }
    
    
                                                           
    console.log('query:  ', this.state.queryAddress)
   
    return(
      <div>
        <Search updateQueryAddress={this.updateQueryAddress} updateQueryMoving={this.updateQueryMoving} redirectToAnnonceList={this.redirectToAnnonceList}/>
        <div style={{width: '60%', float:"left"}}>
          { listOfAnnonncesFilter.map( annonce => {
             console.log('author', annonce.author)
            return (
              <div key={annonce._id}>
                <Link to={`/annonce/${annonce._id}`}>
                  <img  src={annonce.imageUrl} style={{width: "300px"}} alt="" / >
                </Link>
            
                <p>{annonce.content}</p>
                <div>
                  <p>Auteur: {annonce.author.username}</p>
                  <Link to={`/profile/${annonce.author._id}`}>Voir Profil</Link>
                  <Link to={`/send-messages/${annonce._id}`}>Envoyer Messages</Link>
                </div>
                <p>Adresse: {annonce.adress}</p>
              </div>
            )})
          }
        </div>
        <div>
          {this.props.userInSession && <Link to="/annonce/new">Ajouter votre annonce</Link>}
        </div>
    
      </div>
    )
  }
}

export default AnnonceList;