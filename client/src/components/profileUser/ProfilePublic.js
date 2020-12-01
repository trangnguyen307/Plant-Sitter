import React from 'react'; 
import './ProfileUser.css'
import {Link} from 'react-router-dom'
import service from '../auth/auth-service';
import AddCommentaire from '../commentaires/AddCommentaire';

class ProfilePublic extends React.Component {

    state = {
        user: {},
        showComment: false
      }
  
      getUserProfile = () => {
        const params  = this.props.match.params;
        service.get(`/auth/profile/${params.id}`)
          .then( responseFromApi =>{
            const theUser = responseFromApi.data;
            this.setState({user:theUser});
          })
          .catch((err)=>{
            console.log('Error this is not userProfile page', err)
          })
      }
  
      componentDidMount(){
        this.getUserProfile();
      }

    render(){
        return(
          
            this.props.userInSession ? 
            <div id = "profilePublic">
              <div id="firstSection">
                  <img src={this.state.user.imageUrl} style={{width:"200px"}} alt='Avatar' />
                  <div>
                      <p><span>Username: </span>{this.state.user.username}</p>
                      <p><span>Adresse: </span>{this.state.user.adress ? this.state.user.adress : "None"}</p>
                      <p><span>Membre depuis: </span>{this.state.user.createdAt}</p>
                      <p><span>Note: </span></p>
                  </div>
              </div>
              {
                this.state.showComment ?
                <AddCommentaire />
                :
                <button onClick={ev => this.setState({showComment: true})}>Ecrire vos commentaires</button>
              }
              
            </div> 
          :
          <div>
            Connectez-vous pour consulter le profil !!!
          </div>
          
            
        )
    }
}

export default ProfilePublic;