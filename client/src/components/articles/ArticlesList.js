import React, { Component } from 'react';
import service from '../auth/auth-service';
import { Link } from 'react-router-dom';
import './Article.css';


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
      <div id="article-list" className="container-fluid">
        {this.props.user.username === "admin" && 
        <div className="row add-button">
            <Link to="/article/new">Ajouter une article</Link>
        </div>
        }
        
        <div className="row justify-content-center">
        <div className="col-lg-10 col-xs-12">
          { this.state.listOfArticles.map( article => 
             (
              <div className="row justify-content-center article">
                <div key={article._id} className="col-lg-5"> 
                  <img  src={article.imageUrl} alt="" / >
                </div>
                <div className="col-lg-7">
                  <h1>{article.title}</h1>
                  <p>{article.intro}</p>
                  <Link to={`/article/${article._id}`}>Voir plus</Link>
                </div>
              </div>
            ))
          }
          </div>
        </div>
    
      </div>
    )
  }
}

export default ArticlesList;