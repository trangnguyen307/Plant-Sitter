import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/homepage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import {loggedin} from './components/auth/auth-service';
import AnnonceList from './components/annonces/AnnoncesList'
import AddAnnonce from './components/annonces/AddAnnonce'

class App extends React.Component {
  state = { loggedInUser: null }

  // HERE
  fetchUser() {
    if (this.state.loggedInUser === null) {
      loggedin()
        .then(response => {
          this.setState({loggedInUser: response})
        })
        .catch(err => {
          this.setState({loggedInUser: false}) 
        })
    }
  }

  // HERE
  componentDidMount() {
    this.fetchUser();
  }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  

  render () {
    return(
      <div className="App">
          <Navbar userInSession={this.state.loggedInUser} updateUser={this.updateLoggedInUser} />
          <Switch>
          <Route exact path="/" component = {Home} />
          <Route exact path="/signup" render={() => <Signup updateUser={this.updateLoggedInUser}/>} />
          <Route exact path='/login' render={() => <Login updateUser={this.updateLoggedInUser}/>}/>
          <Route exact path="/annonce" component = {AnnonceList} />
          <Route exact path="/annonce/new" render={() => <AddAnnonce userInSession={this.state.loggedInUser}/>} />
        </Switch>
        <Footer />
        </div>
    )

  }
}


export default App;
