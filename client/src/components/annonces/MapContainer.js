import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './AnnoncesList.css'

import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage("fr");
Geocode.setRegion("fr");


class MapContainer extends React.Component {
  state ={
    mapStyles : { 
      minHeight: "500px",       
      height: "100%",
      width: "100%"
    },
    defaultCenter : {
      lat: 48.856613, lng: 2.352222
    },
    locations: [],
    selected: {}
  }
  
  getLocations = (address) => {
    let locations=this.state.locations;
    address.map(item => Geocode.fromAddress(item.adress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        locations.push({
          name:item,
          location: {
            lat: lat,
            lng:lng 
          }
        });
        this.setState({locations:locations});
      },
      error => {
        console.error(error);
      }
    ))
  }
  componentDidMount() {
    this.getLocations(this.props.annonces)
  }
  
 render () {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
       <GoogleMap
         mapContainerStyle={this.state.mapStyles}
         zoom={13}
         center={this.state.defaultCenter}
       >
         {
           
           this.state.locations.map(item => 
            <Marker key={item.name._id} name={item.name.title}
                position={{lat:item.location.lat, lng:item.location.lng}} 
                onClick={()=>{
                  this.setState({selected:item})
                }}
            />
            )
         }
         {
            this.state.selected.location && 
            (
              <InfoWindow
              position={this.state.selected.location}
              clickable={true}
              onCloseClick={() => this.setState({selected:{}})}
            >
              <div className="info-window-map">
                <img src={this.state.selected.name.imageUrl} alt='' />
                <p className="title">{this.state.selected.name.title}</p>
                <p>{this.state.selected.name.adress}</p>
              </div>
            </InfoWindow>
            )
         }
       </GoogleMap>
    </LoadScript>
 )
 }
  
}
export default MapContainer;