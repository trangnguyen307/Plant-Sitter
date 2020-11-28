import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Homepage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import {loggedin} from './components/auth/auth-service';
import AnnonceList from './components/annonces/AnnoncesList'
import AnnonceDetails from './components/annonces/AnnonceDetails'
import AddAnnonce from './components/annonces/AddAnnonce'
import ArticlesList from './components/articles/ArticlesList';
import ProtectedRoute from './components/auth/protected-routes'
import AddArticle from './components/articles/AddArticle';
import ProfileUser from './components/profileUser/ProfileUser';
import ArticleDetails from './components/articles/ArticleDetails'

class App extends React.Component {
  state = { 
    loggedInUser: null
  }

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
    console.log('userinsession:', this.state.loggedInUser)
    return(
      <div className="App">
          <Navbar userInSession={this.state.loggedInUser} updateUser={this.updateLoggedInUser} />
          <Switch>
            <Route exact path="/" component = {Home} />
            <Route exact path="/signup" render={() => <Signup updateUser={this.updateLoggedInUser}/>} />
            <Route exact path='/login' render={() => <Login updateUser={this.updateLoggedInUser} user={this.state.loggedInUser}/>}/>
            <Route exact path="/annonce" component={AnnonceList} />
            <Route exact path="/annonce/new" component={AddAnnonce} />
            <Route exact path="/annonce/:id" component = {AnnonceDetails} />
            <ProtectedRoute exact path="/article" user={this.state.loggedInUser} component={ArticlesList} />
            <Route exact path="/article/new" component={AddArticle} />
            <Route exact path="/article/:id" render= {(props) => <ArticleDetails {...props}  user={this.state.loggedInUser}/>} />
            <Route exact path="/profile/:id" render={(props) => <ProfileUser {...props} updateUser={this.updateLoggedInUser}/>} />
          </Switch>
        <Footer />
        </div>
    )

  }
}


export default App;
