import React, { Component } from 'react';
import AnnoncesList from './AnnoncesList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './Search';
import MapContainer from './MapContainer';


class AnnonceList extends Component {
    state = { 
      listOfAnnonces: [],
      queryAddress:'',
      queryMoving: '',
      queryStartDate:'',
      queryEndDate:''
     }

    getAllAnnonces = () =>{
        axios.get(`${process.env.REACT_APP_APIURL || ""}/annonce`)
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
    updateQueryStartDate = (newValue) => {
      this.setState({queryStartDate: newValue})
    }
    updateQueryEndDate = (newValue) => {
      this.setState({queryEndDate: newValue})
    }

  render(){
    let listOfAnnonncesFilter = [...this.state.listOfAnnonces];
    if (this.props.location?.query) {
      this.props.location && console.log(this.props.location.query)
      listOfAnnonncesFilter = listOfAnnonncesFilter.filter(annonce =>annonce.adress.toLowerCase().includes(this.props.location.query))
    } else {
      if(this.state.queryAddress) listOfAnnonncesFilter = listOfAnnonncesFilter.filter(annonce =>annonce.adress.toLowerCase().includes(this.state.queryAddress)  )
      console.log('list of Annonce after query address', listOfAnnonncesFilter)  
      if(this.state.queryMoving === "true" || this.state.queryMoving === "false") {
        let isTrueSet = (this.state.queryMoving === "true")
        listOfAnnonncesFilter = listOfAnnonncesFilter.filter(annonce => annonce.moving === isTrueSet)
      }
      
    }
    
    
    console.log('list of Annonce', listOfAnnonncesFilter)                                                       
    console.log('query:  ', this.state.queryAddress, typeof this.state.queryMoving, this.state.queryEndDate, this.state.queryStartDate)
    
    return(
      <div className="container-fluid">
        <div className="row justify-content-center search-bar">
          <div className="col-lg-8 col-md-10 col-xs-12">
            <Search updateQueryAddress={this.updateQueryAddress} 
                  updateQueryMoving={this.updateQueryMoving} 
                  updateQueryStartDate={this.updateQueryStartDate}
                  updateQueryEndDate= {this.updateQueryEndDate}
                  redirectToAnnonceList={this.redirectToAnnonceList}
            />
          </div>
          {this.props.userInSession &&
            <div className="col-lg-2 col-md-2 col-xs-8 col-10 new-annonce">
              <Link to="/annonce/new">Ajouter votre annonce</Link>
            </div>
          } 
          
        </div>
        <div className="row justify-content-center annonce-list">

          <div className="col-lg-6 col-md-11  annonce-list">
            { listOfAnnonncesFilter.map( annonce => (
                <div key={annonce._id} className="annonces row">
                  <div className="col-xs-12 col-md-5 col-lg-5">
                    <Link to={`/annonce/${annonce._id}`}>
                      <img  src={annonce.imageUrl} alt="" / >
                    </Link>
                  </div>
              
                  <div className="col-xs-12 col-md-7 col-lg-7">
                    <p className="title">{annonce.title}</p>
                    <p><span className="label">Type:</span> {annonce.type === "offer" ? "Offer" : "Chercher un(e) bénévol(e)"}</p>
                    <p><span className="label">Période:</span> De {annonce.startDate} A {annonce.endDate}</p>
                    <p><span className="label">Adresse:</span> {annonce.adress}</p>
                    <div>
                      <p><span className="label">Auteur:</span> {annonce.author.username}</p>
                      <Link to={`/profile/${annonce.author._id}`}>Voir Profil</Link>
                      <Link to={`/send-messages/${annonce._id}`}>Envoyer Messages</Link>
                    </div>  
                  </div>
                </div>
              ))
            }
          </div>

          <div className="col-lg-6 map-div">
            {this.state.listOfAnnonces.length !== 0 && <MapContainer annonces={this.state.listOfAnnonces} className="map" />}
          </div>

        </div>
        
        

          
    
      </div>
    )
  }
}

export default AnnonceList;