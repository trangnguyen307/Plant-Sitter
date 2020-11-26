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
import Search from './components/annonces/Search'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import ArticlesList from './components/articles/ArticlesList';
import ProtectedRoute from './components/auth/protected-routes'
import AddArticle from './components/articles/AddArticle';

class App extends React.Component {
  state = { 
    loggedInUser: null,
    query : {
      queryAddress:'',
      queryMoving: ''
    },
    redirectToAnnonceList: false
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
  
  updateQueryAddress = (newValue) => {
    this.setState({queryAddress:newValue})
  }

  updateQueryMoving = (newValue) => {
    this.setState({queryMoving:newValue})
  }

  redirectToAnnonceList = (value) => {
    if (value === true) {
      this.setState({redirectToAnnonceList: true})
    }
  }
  render () {
    const { redirectToAnnonceList } = this.state;
    if (redirectToAnnonceList) {
      return <Redirect to="/annonce" />
    }
    console.log('userinsession:', this.state.loggedInUser)
    return(
      <div className="App">
          <Navbar userInSession={this.state.loggedInUser} updateUser={this.updateLoggedInUser} />
          <Search updateQueryAddress={this.updateQueryAddress} updateQueryMoving={this.updateQueryMoving} redirectToAnnonceList={this.redirectToAnnonceList}/>
          <Switch>
            <Route exact path="/" component = {Home} />
            <Route exact path="/signup" render={() => <Signup updateUser={this.updateLoggedInUser}/>} />
            <Route exact path='/login' render={() => <Login updateUser={this.updateLoggedInUser}/>}/>
            <Route exact path="/annonce" render = {() => <AnnonceList queryAddress = {this.state.query.queryAddress} queryMoving = {this.state.query.queryMoving}/>} />
            <Route exact path="/annonce/:id" component = {AnnonceDetails} />
            <Route exact path="/annonce/new" render={() => <AddAnnonce />} />
            <ProtectedRoute exact path="/article" user={this.state.loggedInUser} component={ArticlesList} />
            <ProtectedRoute exact path="/annonce/new" component={AddArticle} />
          </Switch>
        <Footer />
        </div>
    )

  }
}


export default App;
