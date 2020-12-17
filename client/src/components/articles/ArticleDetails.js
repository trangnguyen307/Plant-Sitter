import React, { Component } from 'react';
import service from '../auth/auth-service'
import { Link } from 'react-router-dom';
import './Article.css';

class AnnonceDetails extends Component {

    state = {
      article: {},
      likeArray: [],
      liked: false

    }

    getSingleArticle = () => {
      const { params } = this.props.match;
      service.get(`/article/${params.id}`)
        .then( responseFromApi =>{
          const theArticle = responseFromApi.data;
          this.setState({article:theArticle, likeArray: theArticle.likes});
          console.log('likes',this.state.likeArray)
        })
        .catch((err)=>{
          console.log('Error while fetching project', err)
        })
    }
    
    addLike = () => {
      console.log('connected')
      let likes= [...this.state.likeArray];
      let index = likes.indexOf(this.props.user._id);
      if(index===-1) {
          likes.push(this.props.user._id);
      } else {
          likes.splice(index,1);
      }
      console.log('likes addLike', likes)
      const { params } = this.props.match;
      service.put(`/article/${params.id}`,{likes})
          .then( (responseFromApi) => {
            this.getSingleArticle();
            this.setState({liked: !this.state.liked})}
            )
          .catch(err=> console.log(err))
      
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
        <div id="article-detail" className="container">
          <div className="row justify-content-center article">
            <div className="col-lg-11 col-md-11 col-xs-12">
              <img  src={this.state.article.imageUrl} alt="" / >
            </div>
            
          </div>
          <div className="row justify-content-center article">
            <div className="col-lg-11 col-md-11 col-xs-12"> 
              <div className="title">
                <h1>{this.state.article.title}</h1>
                <span>{this.state.likeArray.length} 👍</span>
              </div>   
              
              <p>{this.state.article.intro}</p>

              <p>{this.state.article.content}</p>

              <button onClick={this.addLike}>👍 J'aime</button>  
              {this.props.user?.username === "admin" && <button onClick={() => this.deleteArticle()}>Supprimer</button>}  
              <Link className="button-article" to='/article'>Retourner</Link>  
            </div>
          </div>

          
        </div>
      )
    }
}

export default AnnonceDetails;