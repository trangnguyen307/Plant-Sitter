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
            <div className="page">
              <div className="container-profile">
              <div className="container-image-profile">
              <div className="my-profile">
              <h3>Bonjour {this.state.user.username} !</h3>
                  <div className="upload-photo">
                      <form onSubmit={this.handleFormSubmit} className="form-profile">
                          <img className="avatar" alt="" style={{width:"200px"}} src={this.state.user.imageUrl || "https://material.io/tools/icons/static/icons/baseline-person-24px.svg"} />
                          <p>
                            <input type="file" ref={ref=> this.fileInput = ref} name="imageUrl" onChange={this.handleUpload} />
                          </p>  
                        <input type="submit" value="Télécharger" className="button"/>
                      </form>
                  </div>
                  <h5>Mon profil</h5>
                  <MenuProfile userInSession={this.props.userInSession}/>
              </div>
              </div>
              </div>
            </div>
        )
    }
}

export default ProfileUser;
