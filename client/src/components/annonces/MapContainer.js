import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAHKGKuwYMxmiDc0Q9dpjqVcPze82tb30M");
Geocode.setLanguage("fr");
Geocode.setRegion("fr");


const MapContainer = (props) => {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 48.856613, lng: 2.352222
  }

  let locations = [];
  
  props.annonces.map(annonce => Geocode.fromAddress(annonce.adress).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      locations.push({
        name:annonce,
        location: {
          lat: lat,
          lng:lng
        }
      })
    },
    error => {
      console.error(error);
    }
  ))
  console.log('location', locations)
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyAHKGKuwYMxmiDc0Q9dpjqVcPze82tb30M'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          {
            
            locations.map(item => <Marker key={item.name.title} position={{lat:item.location.lat, lng:item.location.lng}} name={"mymarker"}/>)
          }
        </GoogleMap>
     </LoadScript>
  )
}
export default MapContainer;