import React from 'react'; 
import service from '../auth/auth-service';

class profileUser extends React.Component {

    state = {
        user: {}
      }
  
      getUserProfile = () => {
        const params  = this.props.match;
        console.log('params ', params)
        service.get(`/profile/${params.id}`)
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
      console.log('this.state.user profileuser:  ', this.state.user)
        return(
            <div>
                <img  src={this.state.user.avatar} alt="avatar"/ >
            <div className="my-profile">
                <h3>Mon profil</h3>
                <p>Salut {this.state.user.username} !</p>
                <p>Je consulte mes messages</p> {/*en attendant que les messages soient créées*/}
                <p>Je consulte mes commentaires</p> {/*en attendant que les commentaires soient créées*/}
            </div>
            </div>
        )
    }
}

export default profileUser;
