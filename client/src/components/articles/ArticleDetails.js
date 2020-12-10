import React, { Component } from 'react';
import service from '../auth/auth-service'
import { Link } from 'react-router-dom';


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
        <div style={{marginTop:"50px"}}>
          <img  src={this.state.article.imageUrl} alt="" / >

          <div>    
            <h1>{this.state.article.title}</h1>
            <p>{this.state.article.content}</p>

            <button onClick={this.addLike}>👍</button>  <span>{this.state.likeArray.length}</span>
            {this.props.user.username === "admin" && (
                <div>
                    {/* <Link to="/">Modifier</Link> */}
                    <button onClick={() => this.deleteArticle()}>Supprimer</button>
                </div>
            )}
            
            
           
          </div>

          <Link to='/article'>Retourner</Link>
        </div>
      )
    }
}

export default AnnonceDetails;