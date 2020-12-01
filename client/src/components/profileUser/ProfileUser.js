import React from "react";
import service from "../auth/auth-service";
import { upload } from "../auth/auth-service";
import AddCommentaire from "../commentaires/AddCommentaire";
import CommentairesList from "../commentaires/CommentairesList";

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
  // handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   // const imageUrl = this.state.user.imageUrl;
  //   // service.post("/profile", { imageUrl })
  //   //   .then( () => {
  //   //     this.setState({imageUrl: ""});
  //   //   })
  //   //   .catch( error => console.log(error) )
  //   this.props.updateUser(this.state.updateAvatar);
  // };

  // getUserProfile = () => {
  //   const user = this.props.user;
  //   console.log("user !!!", user);
  //   service
  //     .get(`/auth/profile/${user._id}`)
  //     .then((responseFromApi) => {
  //       const theUser = responseFromApi.data;
  //       this.setState({ user: theUser });
  //     })
  //     .catch((err) => {
  //       console.log("Error this is not userProfile page", err);
  //     });
  // };

  // componentDidMount() {
  //   this.getUserProfile();
  // }

  // handleUpload = (event) => {
  //   let formData = new FormData();
  //   formData.append("imageUrl", event.target.files[0]);

  //   upload(formData)
  //     .then((response) => this.setState({ updateAvatar: response }))
  //     .catch((err) => {
  //       console.log("Error while uploading the file: ", err);
  //     });
  // };

  // render() {
  //   console.log("this.state.user profileuser:  ", this.state.user);
  //   return (
  //     <div>
  //       <AddCommentaire />
  //       <div className="my-profile">
  //         <div className="upload-photo">
  //           <form onSubmit={this.handleFormSubmit}>
  //             <label>
  //               Avatar :
  //               <img
  //                 className="avatar"
  //                 src={
  //                   this.state.user.imageUrl ||
  //                   "https://material.io/tools/icons/static/icons/baseline-person-24px.svg"
  //                 }
  //               />
  //               <input type="file" name="image" onChange={this.handleUpload} />
  //             </label>
  //             <input type="submit" value="Submit" />
  //           </form>
  //         </div>
  //         <h3>Mon profil</h3>
  //         <p>Salut {this.state.user.username} !</p>
  //         <p>Je consulte mes messages</p>{" "}
  //         {/*en attendant que les messages soient créées*/}
  //         <p>
  //           Je consulte mes commentaires : <CommentairesList />
  //         </p>{" "}
  //         {/*en attendant que les commentaires soient créées*/}
  //       </div>
  //     </div>
  //   );
  // }
}

export default ProfileUser;
