import React from 'react';
import MenuProfile from "./MenuProfile";
import {Link} from 'react-router-dom'
import service from '../auth/auth-service';
import Rating from '@material-ui/lab/Rating';
import './ProfileUser.css'

class MyComments extends React.Component {
    state ={
        commentaires: [],
        addCommentaire: '',
        
    }

    getCommentaires = () => {
        const { params } = this.props.match;
        service.get(`/commentaire/find/${params.id}`)
        .then(responseFromApi => {
            console.log('response Data', responseFromApi.data)
            this.setState({
                commentaires: responseFromApi.data
            })
        })
        .catch(err => console.log('Comments are not show', err))
    }

    handleRating = (ratingValue) => { 
        this.setState({note: ratingValue}); 
    } 
  

    componentDidMount () {
        this.getCommentaires();
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
    event.preventDefault();
    const {addCommentaire} = this.state
    
    service.post("/annonce", { addCommentaire })
        .then( () => {
        this.setState({addCommentaire:''});
        })
        .catch( error => console.log(error) )
    }

    render () {
        console.log('props userinsession',this.props.userInSession)
        if(!this.props.userInSession) return <p> Vous devez s'identifier pour consulter vos commentaires  </p>
        return (
            <div className="grand-section container-fluid">
                <div className='profile row'>
                    <div className="menu col-lg-3">
                        <MenuProfile userInSession={this.props.userInSession}/>
                    </div>
                    <div className="my-comments col-lg-6">
                        { this.state.commentaires.map( commentaire => {
                            return (
                            <div key={commentaire._id} className="commentairesSection">
                                <div className="displayName">
                                    <p>{commentaire.sender._id === this.props.userInSession._id ? "Envoyé à " + commentaire.receiver.username : commentaire.sender.username}</p>
                                </div>
                                <div className="displayCommentaires">
                                    <div>
                                        <Rating value={commentaire.note}/>
                                        <p>{commentaire.content}</p>
                                    </div>
                                </div>
                    
                            </div>
                            )})
                        }
                    </div>
                
                </div>
            </div>
            
        )
    }
}

export default MyComments;