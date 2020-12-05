import React from "react";
import service from "../auth/auth-service";
import { upload } from "../auth/auth-service";
import MenuProfile from "./MenuProfile";

class ProfileUser extends React.Component {
    state = {
        user: {},
        updateAvatar: '',
        show: 'profile'
      }

      handleFormSubmit = (event) => {
        event.preventDefault();
        const params  = this.props.match.params;
  
        const imageUrl = this.state.updateAvatar
        console.log('imageUrl', imageUrl)
        service.put(`/auth/profile/${params.id}`, {imageUrl})
               .then(response => {
                 console.log('Le profil a été modifié');
                 this.getUserProfile();
                 this.fileInput.value = "";
                })
      }
  
      getUserProfile = () => {
        const params  = this.props.match.params;
        console.log('params ', params)
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

      handleUpload = (event) => {
        let formData = new FormData();
        formData.append('imageUrl', event.target.files[0]);
        console.log('file upload', event.target.files)
    
        upload(formData)
               .then(response => this.setState({updateAvatar: response.secure_url}))
               .catch(err => {
                console.log('Error while uploading the file: ', err);
              });
        
      }

    render(){
        return(
            <div>
              <MenuProfile userInSession={this.props.userInSession}/>
              <h3>Mon profil</h3>
              <p>Salut {this.state.user.username} !</p>
              <div className="my-profile">
                  <div className="upload-photo">
                      <form onSubmit={this.handleFormSubmit}>
                          <img className="avatar" alt="" style={{width:"200px"}} src={this.state.user.imageUrl || "https://material.io/tools/icons/static/icons/baseline-person-24px.svg"} />
                          <p>
                            <input type="file" ref={ref=> this.fileInput = ref} name="imageUrl" onChange={this.handleUpload} />
                          </p>  
                        <input type="submit" value="Télécharger"/>
                      </form>
                  </div>
                  
              </div>
            </div>
        )
    }
}

export default ProfileUser;
