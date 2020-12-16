import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage("fr");
Geocode.setRegion("fr");


class MapContainer extends React.Component {
  state ={
    mapStyles : {        
      height: "100%",
      width: "100%"
    },
    defaultCenter : {
      lat: 48.856613, lng: 2.352222
    },
    locations: []
  }
  
  getLocations = (address) => {
    let locations=this.state.locations;
    console.log('get location',locations,'address',address)
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
         {/* {locations.length >0 && <Marker position={{lat:locations[0].location.lat,lng: locations[0].location.lng}} />} */}
         {
           
           this.state.locations.map(item => <Marker key={item.name._id} position={{lat:item.location.lat, lng:item.location.lng}} name={item.name.title}/>)
         }
       </GoogleMap>
    </LoadScript>
 )
 }
  
}
export default MapContainer;