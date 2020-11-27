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
      console.log('userInSession', this.props.loggedInUser)
    return(
      <div>
        {this.props.loggedInUser.username === "admin" && 
        <div>
            <Link to="/article/new">Ajouter une article</Link>
        </div>
        }
        

        <div>
          { this.state.listOfArticles.map( article => {
            return (
              <div key={article._id}>
                <Link to={`/article/${article._id}`}>
                  <img  src={article.imageUrl} alt="" / >
                </Link>
            
                <h1>{article.title}</h1>
                <p>{article.content}</p>
              </div>
            )})
          }
        </div>
        
    
      </div>
    )
  }
}

export default ArticlesList;