import React from 'react';
import {logout} from './auth-service';
import {upload} from './auth-service';
import Popin from './popin';
import profileUser from '../profileUser/profileUser';
import { Redirect } from 'react-router-dom';


class Profile extends React.Component {

  logout = (event) => {
    logout()
      .then(response => {
        this.props.updateUser(false);
      })
    ;
  }

  handleUpload = (event) => {
    let formData = new FormData();
    formData.append('photo', event.target.files[0]);

    upload(formData)
      .then(response => {
        this.props.updateUser(response);
      })
    ;
  }

  render() {
    return (
      <>
        {!this.props.user._id ? (
          <Redirect to="/profileUser" />
        ) : (
          <Popin one={(
            <>
              <h1>Profile</h1>
              
              <p>
                <em>Username</em>
                <span>{this.props.user.username}</span>
              </p>
              

    
              <div className="cta">
                <button className="btn logout" onClick={this.logout}>Logout</button>
              </div>
            </>
          )} two={(
            <>
              <form>
                <label>
                  <img className="avatar" src={this.props.user.image || "https://material.io/tools/icons/static/icons/baseline-person-24px.svg"} />
                  <input type="file" name="imaghandleUpload = (event) => {
    let formData = new FormData();
    formData.append('photo', event.target.files[0]);

    authService.upload(formData)
      .then(response => {
        this.props.updateUser(response);
      })
    ;
  }e" onChange={this.handleUpload} />
                </label>
              </form>
    
              <p>
                <small>The user is able to upload a new profile photo, using NodeJS and Multer uploader.</small>
              </p>
            </>
          )} />
        )}
      </>
    );
  }
}

export default Profile;