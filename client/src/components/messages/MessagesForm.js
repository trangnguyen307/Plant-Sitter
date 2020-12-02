import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import service from '../auth/auth-service'


class MessagesForm extends Component {
  state = {
      annonce: {},
      message:'',
      redirect: false
   }

  getSingleAnnonce = () => {
    const { params } = this.props.match;
    console.log('params ', params)
    service.get(`/annonce/${params.id}`)
      .then( responseFromApi =>{
        const theAnnonce = responseFromApi.data;
        console.log('theAnnonce ', theAnnonce)
        this.setState({annonce:theAnnonce});
      })
      .catch((err)=>{
        console.log('Error while fetching project', err)
      })
  }

  componentDidMount(){
    this.getSingleAnnonce();
  }


   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {message} = this.state;
    const receiver = this.state.annonce.author._id;
    const sender = this.props.userInSession._id;
    const annonce = this.state.annonce._id
    
    service.post("/message", {message, receiver, sender,annonce})
      .then( () => {
        this.setState({message:'',redirect: true});
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    console.log('name',name, 'value', value)
    this.setState({[name]: value});
  }


  render(){
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/annonce" />;
    }
    console.log('alo', this.state.annonce)
    return(
      <div>
        {/* <div>
            <p>A: {this.state.annonce?.author.username}</p>
            <p>Pour:{this.state.annonce?.description}</p>
        </div> */}
    
        <form onSubmit={this.handleFormSubmit}> 
            <p>
                <label>Vos messages:</label>
                <textarea name="message" value={this.state.message} onChange={ e => this.handleChange(e)} />  
            </p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default MessagesForm;