import React, { Component } from 'react';
import service from '../auth/auth-service';
import '../profileUser/ProfileUser.css';

import MenuProfile from "../profileUser/MenuProfile";


class MessageDetail extends Component {

    state = {
      theMessage: {},
      addMessage: ''
    }

    getSingleMessage = () => {
      const { params } = this.props.match;
      console.log('params detail', params.profileid)
      service.get(`/message/${params.messageid}`)
        .then( responseFromApi =>{
          const theMessage = responseFromApi.data;
          console.log('theMessage', theMessage)
          this.setState({theMessage:theMessage});
        })
        .catch((err)=>{
          console.log('Error while fetching project', err)
        })
    }

    componentDidMount(){
      this.getSingleMessage();
    }

    handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
    }
  
    handleFormSubmit = (event) => {
      event.preventDefault();
      const {addMessage} = this.state;
      const author = this.props.userInSession._id;
      const { params } = this.props.match;
      service.put(`/message/add-message/${params.messageid}`, { addMessage,author })
        .then( (response) => {
          console.log('response', response)
        this.getSingleMessage();
          this.setState({addMessage:''});
        })
        .catch( error => console.log(error) )
    }

    render () {
     const {theMessage} = this.state
     if (!theMessage._id) return <p>Loading...</p>

     if(!this.props.userInSession) return <p> Vous devez s'identifier pour consulter vos messages  </p>

      return (
        <div className="grand-section container-fluid">
          <div className="profile messages-detail-section row">
            <div className="menu col-lg-3">
              <MenuProfile userInSession={this.props.userInSession}/> 
            </div>
           
            <div className="messages col-lg-7">
                <div className="row">
                  <div className="left-part col-lg-3">
                      <span>{theMessage.sender._id === this.props.userInSession._id ? theMessage.receiver.username : theMessage.sender.username }</span>  
                  </div>
                  <div className="right-part col-lg-8">
                    <div>
                      {theMessage.annonce && <span>Pour: {theMessage.annonce.title}</span>}
                      {
                          theMessage.messagesBox.map(el => el.author === this.props.userInSession._id ? 
                          <p className="send" key= {el._id}>{el.message}</p> : 
                          <p className="receiver" key= {el._id}>{el.message}</p>)    
                      }
                    </div>

                    <div>
                      <form onSubmit={e => this.handleFormSubmit(e)}>  
                          <input name="addMessage" value= {this.state.addMessage} placeholder="Ecrivez vous un message" onChange={ e => this.handleChange(e)} />  
                          <button>Envoyer</button>
                      </form>
                    </div>
                      
                  </div>
                </div> 
            </div> 
    
          </div>
        </div>
        
      )
    }
}

export default MessageDetail;