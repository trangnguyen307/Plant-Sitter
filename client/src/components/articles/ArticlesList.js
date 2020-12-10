import React, { Component } from 'react';
import service from '../auth/auth-service';
import { Link } from 'react-router-dom';


class ArticlesList extends Component {
    state = { 
      listOfArticles: []
     }

    getAllArticles = () =>{
        service.get(`/article`)
        .then(responseFromApi => {
            this.setState({
                listOfArticles: responseFromApi.data
            })
        })
        .catch(err => console.log('Error while fetching projects', err))
    }

    componentDidMount() {
      this.getAllArticles();
    }

  render(){
      // console.log('userInSession', this.props.loggedInUser)
    return(
      <div style={{marginTop:"100px"}}>
        {this.props.user.username === "admin" && 
        <div>
            <Link to="/article/new">Ajouter une article</Link>
        </div>
        }
        

        <div>
          { this.state.listOfArticles.map( article => {
            return (
              <div key={article._id}> 
                <img  src={article.imageUrl} alt="" / >
                <h1>{article.title}</h1>
                <Link to={`/article/${article._id}`}>Voir plus</Link>
              </div>
            )})
          }
        </div>
        
    
      </div>
    )
  }
}

export default ArticlesList;