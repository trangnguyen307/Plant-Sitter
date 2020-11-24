import React from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom'

import AnnonceList from './annonces/AnnoncesList'
import AnnonceDetails from './annonces/AnnonceDetails'


class Home extends React.Component {
    
    render () {
        return (
            <div>
               <Link to="/annonce">Annonce</Link> 
               <Switch>
                   <Route exact path="/annonce" component = {AnnonceList} />
                   <Route exact path="/annonce/:id" component = {AnnonceDetails} />
               </Switch>
                
            </div>
        )
    }
}

export default Home;