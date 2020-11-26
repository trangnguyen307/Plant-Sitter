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

    render () {
      console.log(this.state)
      return (
        <div>
          <img  src={this.state.article.picture} alt="photo" / >

          <div>
            
        
              <Link to="/">Messages</Link>
              <Link to="/">Modifier</Link>
            
           
          </div>

          <Link to='/annonce'>Retourner</Link>
        </div>
      )
    }
}

export default AnnonceDetails;