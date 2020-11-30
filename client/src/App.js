import './App.css';
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
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
import ArticleDetails from './components/articles/ArticleDetails';
import MyMessages from './components/profileUser/Mymessages';
import MyComments from './components/profileUser/MyComments';
import ProfilePublic from './components/profileUser/ProfilePublic'


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
            <Route path="/profile/myProfile/:id" id="profile">
              <div id = 'profile'>
                <div id="menu">
                  <p>Hello</p>
                  {this.state.loggedInUser && <Link to={`/profile/myProfile/${this.state.loggedInUser._id}`}>Je consulte mon profile</Link>}
                  {this.state.loggedInUser && <Link to={`/profile/myProfile/${this.state.loggedInUser._id}/messages`}>Je consulte mes messages</Link>}
                  {this.state.loggedInUser && <Link to={`/profile/myProfile/${this.state.loggedInUser._id}/comments`}>Je consulte mes comments</Link>}
                </div>
                <div>
                  <Switch>
                    <Route exact path="/profile/myProfile/:id/messages" render={(props) => <MyMessages {...props} updateUser={this.updateLoggedInUser}/>} />
                    <Route exact path="/profile/myProfile/:id/comments" render={(props) => <MyComments {...props} updateUser={this.updateLoggedInUser}/>} />
                    <Route exact path="/profile/myProfile/:id" render={(props) => <ProfileUser {...props} updateUser={this.updateLoggedInUser}/>} /> 
                  </Switch>
                </div>
                
              </div> 
            </Route>
            <Route exact path="/profile/:id" render={(props) => <ProfilePublic {...props} updateUser={this.updateLoggedInUser}/>} />
          </Switch>
        <Footer />
        </div>
    )

  }
}


export default App;
