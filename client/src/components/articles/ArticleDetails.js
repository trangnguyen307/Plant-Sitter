import React, { Component } from 'react';
import service from '../auth/auth-service'
import { Link } from 'react-router-dom';

class AnnonceDetails extends Component {

    state = {
      article: {}
    }

    getSingleArticle = () => {
      const { params } = this.props.match;
      service.get(`/article/${params.id}`)
        .then( responseFromApi =>{
          const theArticle = responseFromApi.data;
          this.setState({article:theArticle});
        })
        .catch((err)=>{
          console.log('Error while fetching project', err)
        })
    }

    componentDidMount(){
      this.getSingleArticle();
    }

    deleteArticle = () => {
        const { params } = this.props.match;
        service.delete(`/article/${params.id}`)
          .then(() =>{
              this.props.history.push('/article'); // !!!         
          })
          .catch((err) => {
              console.log('Error while deleting article', err)
          })
      }

    render () {
      console.log('user articledetail:', this.props.user)
      return (
        <div>
          <img  src={this.state.article.photo} alt="" / >

          <div>    
            <h1>{this.state.article.title}</h1>
            <p>{this.state.article.content}</p>
            
            {this.props.user.username === "admin" && (
                <div>
                    {/* <Link to="/">Modifier</Link> */}
                    <button onClick={() => this.deleteArticle()}>Supprimer</button>
                </div>
            )}
            
            
           
          </div>

          <Link to='/annonce'>Retourner</Link>
        </div>
      )
    }
}

export default AnnonceDetails;